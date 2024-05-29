"use client";

import { CornerDownLeft, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import BotMessage from "./BotMessage";
import ChatInput from "./ChatInput";
import Container from "./Container";
import UserMessage from "./UserMessage";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatFormRef = useRef<HTMLFormElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <>
      <Container className="max-w-5xl">
        <div
          className="flex h-full w-full flex-1 flex-col gap-y-5"
          ref={chatBoxRef}
        >
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? (
                <UserMessage>{m.content}</UserMessage>
              ) : (
                <BotMessage>{m.content}</BotMessage>
              )}
            </div>
          ))}
        </div>
      </Container>
      <div className="mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6">
        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          ref={chatFormRef}
        >
          <div className="flex w-full items-center gap-1.5 p-1.5 lg:gap-3.5">
            <div className="flex items-center gap-1.5">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
            </div>
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <div className="mr-1.5 flex flex-1">
              <ChatInput
                value={input}
                onChange={handleInputChange}
                chatFormRef={chatFormRef}
              />
            </div>

            <Button
              variant="outline"
              type="submit"
              size="icon"
              className="ml-auto gap-1.5"
            >
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
