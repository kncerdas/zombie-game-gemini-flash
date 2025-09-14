export interface GameMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: GeneratedImage;
  imageLoading?: boolean;
}

export interface GeneratedImage {
  base64Data: string;
  mediaType: string;
  uint8ArrayData?: Uint8Array;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  profileImage: string;
}

export interface GenerateStoryRequest {
  userMessage: string;
  conversationHistory: ConversationMessage[];
  isStart: boolean;
  characterId: string;
}

export interface GenerateImageRequest {
  imagePrompt: string;
  previousImage?: GeneratedImage;
  characterId: string;
}

export interface GenerateStoryResponse {
  narrative: string;
  imagePrompt: string;
}
