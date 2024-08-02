"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import { chatStore } from "@/store/chat";
import { File, Chat as TChat, Message as TMessage } from "@prisma/client";
import { User } from "next-auth";
import Container from "../common/Container";
import ChatOverlayView from "./ChatOverlayView";
import ChatPanel from "./ChatPanel";
import MessageHistory from "./MessageHistory";
import { useCentrifuge, useSubscription } from "@/store/centrifuge";
import { getSubscriptionToken } from "@/use-cases/centrifuge";
import { SubscriptionState } from "centrifuge";

export interface ChatProps extends React.ComponentProps<"div"> {
  user: User;
  chat: TChat & {
    messages: TMessage[] & {
      files: File[];
    };
  };
}

const Chat: FC<ChatProps> = ({ user, chat }) => {
  const {
    store: [{ messages }, setChat],
  } = chatStore();

  const [centrifuge] = useCentrifuge();
  const [_, setSub] = useSubscription();

  useEffect(() => {
    if (!centrifuge || !chat) return;

    const channel = "rooms:" + chat.id;

    const getChannelSubscriptionToken = async () => {
      return getSubscriptionToken(channel);
    };

    let sub = centrifuge.getSubscription(channel);

    if (sub) {
      if (sub.state === SubscriptionState.Unsubscribed) {
        sub.subscribe();
      }
    } else if (!sub) {
      sub = centrifuge.newSubscription(channel, {});
      sub.subscribe();
    }

    setSub(sub);

    sub.on("subscribed", (ctx) => {
      console.log(`sub subscribed ${ctx}`);
    });

    sub.on("unsubscribed", (ctx) => {
      console.log(`sub unsubscribed ${ctx}`);
    });

    sub.on("error", (ctx) => {
      console.log(`sub error ${ctx}`);
    });

    sub.on("state", (ctx) => {
      console.log(`sub state ${ctx}`);
    });

    sub.on("join", (ctx) => {
      console.log(`sub join ${ctx}`);
    });

    sub.on("leave", (ctx) => {
      console.log(`sub leave ${ctx}`);
    });

    sub.on("publication", (ctx) => {
      console.log(`sub publication 2 ${JSON.stringify(ctx.data, null, 2)}`);
    });
  }, []);

  useEffect(() => {
    setChat((prev) => ({
      ...prev,
      id: chat.id,
      subject: chat.subject,
      ...(chat.title && { title: chat.title }),
      messages: chat.messages.map(
        ({ id, content, files, role, userId, chatId }) => {
          return {
            id,
            content,
            files: files.map(({ name, type, url }) => {
              return {
                name,
                type,
                url,
              };
            }),
            role,
            userId,
            chatId,
          };
        },
      ),
    }));
  }, []);

  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Container>
        <div className="h-full w-full flex-1">
          {messages && messages.length > 0 && (
            <MessageHistory messages={messages} />
          )}
        </div>
      </Container>
      <div ref={scrollRef} />
      <ChatPanel user={user} />
      <ChatOverlayView user={user} />
    </>
  );
};

export default Chat;
