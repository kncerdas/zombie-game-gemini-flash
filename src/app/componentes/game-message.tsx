import { Message, MessageContent } from "@/components/message";
import { Response } from "@/components/response";
import { type GameMessage as GameMessageType } from "@/lib/types";
import { Image } from "@/components/image";
import { UI_MESSAGES } from "@/lib/consts";
import { Loader } from "@/components/loader";
import { useTypewriter } from "@/app/hooks/use-typewriter";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GameMessageProps {
  message: GameMessageType;
  onToggleSpeech?: (text: string) => void;
  isPlaying?: boolean;
}

export function GameMessage({ message, onToggleSpeech, isPlaying }: GameMessageProps) {
  const { role, content, image, imageLoading } = message;
  const { displayedText, isTyping } = useTypewriter(content, 50);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  return (
    <Message from={role}>
      <MessageContent className="flex flex-col gap-4 items-center justify-center mx-auto max-w-3xl">
        {role === "assistant" && (
          <picture className="w-full max-w-2xl overflow-hidden rounded-md">
            {imageLoading && (
              <div className="w-full h-full flex items-center justify-center bg-black/10">
                <div className="flex mb-4 space-x-2">
                  <Loader />
                  <span>{UI_MESSAGES.LOADING.IMAGE}</span>
                </div>
              </div>
            )}

            {image && (
              <>
                <div 
                  className="cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => setIsImageZoomed(true)}
                >
                  <Image
                    base64={image.base64Data}
                    mediaType={image.mediaType}
                    uint8Array={new Uint8Array()}
                    alt="aventura de blossom"
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                
                {/* Zoomed Image Modal */}
                {isImageZoomed && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
                    onClick={() => setIsImageZoomed(false)}
                  >
                    <div className="relative max-w-4xl max-h-4xl p-4">
                      <Image
                        base64={image.base64Data}
                        mediaType={image.mediaType}
                        uint8Array={new Uint8Array()}
                        alt="aventura de blossom - zoom"
                        className="w-full h-full object-contain animate-in zoom-in-95 duration-300"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </picture>
        )}

        <div className="flex flex-col gap-2 w-full">
          <Response className="text-lg leading-relaxed">
            {role === "assistant" ? displayedText : content}
          </Response>
          {role === "assistant" && onToggleSpeech && !isTyping && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleSpeech(content)}
              className="self-start flex items-center gap-1"
            >
              {isPlaying ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Escuchar</span>
                </>
              )}
            </Button>
          )}
        </div>
      </MessageContent>
    </Message>
  );
}
