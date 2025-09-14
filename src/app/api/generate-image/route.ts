import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import fs from "fs";
import path from "path";

import { type NextRequest, NextResponse } from "next/server";

import { getCharacterPrompts } from "@/lib/prompts/index";
import { getCharacterConfig } from "@/lib/consts";
import type { GenerateImageRequest } from "@/lib/types";

// Helper function to read local image file and convert to base64
async function readLocalImageAsBase64(imagePath: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    const imageBuffer = fs.readFileSync(fullPath);
    const base64String = imageBuffer.toString("base64");
    const mimeType = imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.log(`Could not read local image: ${imagePath}`, error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { imagePrompt, previousImage, characterId }: GenerateImageRequest =
      await request.json();

    const characterPrompts = getCharacterPrompts(characterId);
    const characterConfig = getCharacterConfig(characterId);
    const prompt = characterPrompts.GENERATE_IMAGE(imagePrompt);

    // Build content array starting with text prompt
    const content: Array<
      { type: "text"; text: string } | { type: "image"; image: string }
    > = [
      {
        type: "text" as const,
        text: prompt,
      },
    ];

    // Add main character reference image (always included for character consistency)
    if (characterConfig.IMAGE.MAIN_CHARACTER_REFERENCE) {
      const mainCharacterImage = await readLocalImageAsBase64(characterConfig.IMAGE.MAIN_CHARACTER_REFERENCE);
      if (mainCharacterImage) {
        console.log(`Adding main character image: ${characterConfig.IMAGE.MAIN_CHARACTER_REFERENCE}`);
        content.push({
          type: "image" as const,
          image: mainCharacterImage,
        });
      } else {
        console.log(`Failed to load main character image: ${characterConfig.IMAGE.MAIN_CHARACTER_REFERENCE}`);
      }
    }

    // Add environment reference image only for the first generation (when no previous image exists)
    if (!previousImage && characterConfig.IMAGE.ENVIRONMENT_REFERENCE) {
      const environmentImage = await readLocalImageAsBase64(characterConfig.IMAGE.ENVIRONMENT_REFERENCE);
      if (environmentImage) {
        content.push({
          type: "image" as const,
          image: environmentImage,
        });
      }
    }

    // Add previous image for style consistency if available
    if (previousImage) {
      content.push({
        type: "image" as const,
        image: `data:${previousImage.mediaType};base64,${previousImage.base64Data}`,
      });
    }

    // Add character-specific reference images for accuracy
    for (const characterImagePath of characterConfig.IMAGE.CHARACTER_REFERENCES) {
      // Only add non-placeholder URLs
      if (!characterImagePath.includes("placeholder-url")) {
        const characterImage = await readLocalImageAsBase64(characterImagePath);
        if (characterImage) {
          console.log(`Adding character reference: ${characterImagePath}`);
          content.push({
            type: "image" as const,
            image: characterImage,
          });
        } else {
          console.log(`Failed to load character reference: ${characterImagePath}`);
        }
      }
    }

    console.log(`Sending ${content.length} content items to Gemini API`);
    
    let files;
    try {
      const result = await generateText({
        model: google("gemini-2.5-flash-image-preview"),
        messages: [
          {
            role: "user",
            content,
          },
        ],
        providerOptions: {
          google: {
            safetySettings: [
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_CIVIC_INTEGRITY",
                threshold: "BLOCK_NONE",
              },
            ],
            responseModalities: ["IMAGE"],
          },
        },
      });
      files = result.files;
    } catch (apiError) {
      console.log("API Error with reference images, trying with text-only prompt:", apiError);
      
      // Fallback: Try again with just the text prompt (no reference images)
      const fallbackResult = await generateText({
        model: google("gemini-2.5-flash-image-preview"),
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: prompt }],
          },
        ],
        providerOptions: {
          google: {
            safetySettings: [
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE",
              },
              {
                category: "HARM_CATEGORY_CIVIC_INTEGRITY",
                threshold: "BLOCK_NONE",
              },
            ],
            responseModalities: ["IMAGE"],
          },
        },
      });
      files = fallbackResult.files;
    }

    console.log("Generated images: ", files);

    return NextResponse.json({ image: files[0] || null });
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      { error: "Error generating story" },
      { status: 500 },
    );
  }
}
