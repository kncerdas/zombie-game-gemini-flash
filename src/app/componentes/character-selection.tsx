"use client";

import { CHARACTERS } from "@/lib/characters";
import type { Character } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

interface CharacterSelectionProps {
  onCharacterSelect: (character: Character) => void;
}

export function CharacterSelection({
  onCharacterSelect,
}: CharacterSelectionProps) {
  const [hoveredCharacter, setHoveredCharacter] = useState<Character | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const previewCharacter = selectedCharacter || hoveredCharacter;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl w-full">
        {/* Character Preview Image */}
        <div className="flex justify-center mb-12">
          <div className="w-64 h-64 rounded-2xl bg-gray-800 border-2 border-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300">
            {previewCharacter ? (
              <Image
                src={previewCharacter.profileImage}
                alt={previewCharacter.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700"></div>
                <p>Select a character</p>
              </div>
            )}
          </div>
        </div>

        {/* Character Selection Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {CHARACTERS.map((character) => (
            <button
              key={character.id}
              onClick={() => {
                setSelectedCharacter(character);
                onCharacterSelect(character);
              }}
              onMouseEnter={() => setHoveredCharacter(character)}
              onMouseLeave={() => setHoveredCharacter(null)}
              className="group relative overflow-hidden rounded-xl bg-gray-800 border-2 border-gray-700 hover:border-purple-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <div className="aspect-square p-4">
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden group-hover:bg-purple-600 transition-colors">
                    <Image
                      src={character.profileImage}
                      alt={character.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors">
                    {character.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
