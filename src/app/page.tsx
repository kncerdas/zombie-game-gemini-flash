"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/conversation";
import { GameInput } from "./componentes/game-input";
import { GameLoader } from "./componentes/game-loader";
import { GameMessage } from "./componentes/game-message";
import { CharacterSelection } from "./componentes/character-selection";
import { EditCharacterModal } from "./componentes/edit-character-modal";
import { useZombieGame } from "./hooks/use-zombie-game";
import type { Character } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const {
    messages,
    input,
    isLoading,
    selectedCharacter,
    isPlaying,
    startGame,
    handleSubmit,
    handleInputChange,
    toggleSpeech,
  } = useZombieGame();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCharacterSelect = (character: Character) => {
    startGame(character);
  };

  // Show character selection if no character is selected
  if (!selectedCharacter) {
    return <CharacterSelection onCharacterSelect={handleCharacterSelect} />;
  }

  return (
    <div className="font-sans h-screen mx-auto overflow-hidden scroll-smooth scroolbar-hide">
      <div className="flex flex-col h-full">
        {/* Top Bar with Edit Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-lg font-semibold">{selectedCharacter.name}'s Adventure</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Edit Prompts
          </Button>
        </div>
        
        <Conversation>
          <ConversationContent className="w-11/12 mx-auto">
            {messages.map((message) => (
              <GameMessage 
                key={message.id} 
                message={message} 
                onToggleSpeech={toggleSpeech}
                isPlaying={isPlaying}
              />
            ))}
            {isLoading && <GameLoader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="max-w-2xl w-full mx-auto pb-4">
          <GameInput
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {/* Edit Character Modal */}
      <EditCharacterModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        character={selectedCharacter}
      />
    </div>
  );
}
