import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { GAME_PROMPTS } from "@/lib/prompts";
import { GAME_CONFIG } from "@/lib/consts";
import type { GenerateImageRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { imagePrompt, previousImage }: GenerateImageRequest =
      await request.json();

    const prompt = GAME_PROMPTS.GENERATE_IMAGE(imagePrompt);

    // Build content array starting with text prompt
    const content: Array<
      { type: "text"; text: string } | { type: "image"; image: string }
    > = [
      {
        type: "text" as const,
        text: prompt,
      },
    ];

    // Add café reference image only for the first generation (when no previous image exists)
    if (!previousImage) {
      content.push({
        type: "image" as const,
        image: GAME_CONFIG.IMAGE.CAFE_REFERENCE,
      });
    }

    // Add previous image for style consistency if available
    if (previousImage) {
      content.push({
        type: "image" as const,
        image: `data:${previousImage.mediaType};base64,${previousImage.base64Data}`,
      });
    }

    // Always add Friends cast reference images for character accuracy
    GAME_CONFIG.IMAGE.FRIENDS_CAST_REFERENCES.forEach((castImageUrl) => {
      // Only add non-placeholder URLs (skip placeholder URLs that start with placeholder)
      if (!castImageUrl.includes("placeholder-url")) {
        content.push({
          type: "image" as const,
          image: castImageUrl,
        });
      }
    });

    const { files } = await generateText({
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
