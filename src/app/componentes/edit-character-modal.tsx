"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X, Save } from "lucide-react";
import type { Character } from "@/lib/types";

interface EditCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
}

interface CharacterData {
  initialStory: string;
  continueStoryTemplate: string;
  generateImageTemplate: string;
  mainCharacterReference: string;
  environmentReference: string;
  characterReferences: string[];
}

export function EditCharacterModal({ isOpen, onClose, character }: EditCharacterModalProps) {
  const [characterData, setCharacterData] = useState<CharacterData>({
    initialStory: "",
    continueStoryTemplate: "",
    generateImageTemplate: "",
    mainCharacterReference: "",
    environmentReference: "",
    characterReferences: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && character) {
      loadCharacterData();
    }
  }, [isOpen, character]);

  const loadCharacterData = async () => {
    setIsLoading(true);
    try {
      // Load current prompts and constants for this character
      const response = await fetch(`/api/character-config/${character.id}`);
      if (response.ok) {
        const data = await response.json();
        setCharacterData(data);
      }
    } catch (error) {
      console.error("Error loading character data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCharacterData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/character-config/${character.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterData),
      });
      
      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving character data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            Edit {character.name}'s Story Configuration
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-black">
          {/* Initial Story Prompt */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Initial Story Prompt
            </label>
            <Textarea
              value={characterData.initialStory}
              onChange={(e) =>
                setCharacterData({ ...characterData, initialStory: e.target.value })
              }
              className="w-full h-32 resize-none"
              placeholder="Enter the initial story prompt..."
            />
          </div>

          {/* Continue Story Template */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Continue Story Template
            </label>
            <Textarea
              value={characterData.continueStoryTemplate}
              onChange={(e) =>
                setCharacterData({ ...characterData, continueStoryTemplate: e.target.value })
              }
              className="w-full h-32 resize-none"
              placeholder="Enter the continue story template..."
            />
          </div>

          {/* Generate Image Template */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Generate Image Template
            </label>
            <Textarea
              value={characterData.generateImageTemplate}
              onChange={(e) =>
                setCharacterData({ ...characterData, generateImageTemplate: e.target.value })
              }
              className="w-full h-24 resize-none"
              placeholder="Enter the image generation template..."
            />
          </div>

          {/* Image References */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Character Reference */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Main Character Reference Image
              </label>
              <Input
                value={characterData.mainCharacterReference}
                onChange={(e) =>
                  setCharacterData({ ...characterData, mainCharacterReference: e.target.value })
                }
                placeholder="/images/references/characters/..."
              />
            </div>

            {/* Environment Reference */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Environment Reference Image
              </label>
              <Input
                value={characterData.environmentReference}
                onChange={(e) =>
                  setCharacterData({ ...characterData, environmentReference: e.target.value })
                }
                placeholder="/images/references/environments/..."
              />
            </div>
          </div>

          {/* Character References */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Character References (one per line)
            </label>
            <Textarea
              value={characterData.characterReferences.join("\\n")}
              onChange={(e) =>
                setCharacterData({ 
                  ...characterData, 
                  characterReferences: e.target.value.split("\\n").filter(ref => ref.trim()) 
                })
              }
              className="w-full h-24 resize-none"
              placeholder="/images/references/characters/character1.jpg&#10;/images/references/characters/character2.jpg"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={saveCharacterData} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}