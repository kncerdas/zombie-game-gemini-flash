import { useState, useEffect, useCallback } from "react";
import type {
  GameMessage,
  GenerateStoryResponse,
  Character,
} from "@/lib/types";

export function useZombieGame() {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = async (character: Character) => {
    setSelectedCharacter(character);
    setIsLoading(true);
    setMessages([]);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        body: JSON.stringify({
          isStart: true,
          characterId: character.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = (await response.json()) as GenerateStoryResponse;

      const messageId = crypto.randomUUID();

      const newMessage: GameMessage = {
        id: messageId,
        role: "assistant",
        content: data.narrative,
        imageLoading: true,
      };

      setMessages([newMessage]);
      generateImage(messageId, data.imagePrompt, [], character.id);
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (
    messageId: string,
    imagePrompt: string,
    currentMessages: GameMessage[],
    characterId: string,
  ) => {
    try {
      // Find the last message with an image for style consistency
      const lastImageMessage = currentMessages
        .slice()
        .reverse()
        .find((msg) => msg.image && !msg.imageLoading);

      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          imagePrompt: imagePrompt,
          previousImage: lastImageMessage?.image,
          characterId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const imageData = await response.json();

      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === messageId) {
            return { ...message, image: imageData.image, imageLoading: false };
          }

          return message;
        }),
      );
    } catch (_error) {
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === messageId) {
            return { ...message, imageLoading: false };
          }

          return message;
        }),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !selectedCharacter) return;

    const userMessage: GameMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setIsLoading(true);
    setInput("");
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: messages,
          isStart: false,
          characterId: selectedCharacter.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = (await response.json()) as GenerateStoryResponse;

      const messageId = crypto.randomUUID();

      const assistantMessage: GameMessage = {
        id: messageId,
        role: "assistant",
        content: data.narrative,
        imageLoading: true,
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, assistantMessage];
        generateImage(
          messageId,
          data.imagePrompt,
          prevMessages,
          selectedCharacter.id,
        ); // Pass previous messages for consistency
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.7;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const toggleSpeech = useCallback((text: string) => {
    if (isPlaying) {
      stopSpeech();
    } else {
      speakText(text);
    }
  }, [isPlaying, speakText, stopSpeech]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    messages,
    input,
    isLoading,
    selectedCharacter,
    isPlaying,
    startGame,
    handleSubmit,
    handleInputChange,
    speakText,
    stopSpeech,
    toggleSpeech,
  };
}
