import { ChatInfoDTO, ChatListDTO, ChatMessageDTO } from "@/api/chat/dto";
import { ChatInfo, ChatList, ChatMessage } from "@/domain/chat";

export const dtoToChatInfo = (dto: ChatInfoDTO): ChatInfo => {
  return {
    id: dto.id,
    title: dto.title,
    subject: dto.subject,
    messages: dto.history.map((item) => ({
      id: item.message.content,
      content: item.message.content,
      images: item.message.images,
      docs: item.message.docs,
      timestamp: item.timestamp,
      userId: item.userid,
    })),
  };
};

export const dtoToChatList = (dto: ChatListDTO[]): ChatList[] => {
  return dto.map((data) => ({
    id: data.id,
    userId: data.user[0],
    title: data.title,
    subject: data.subject,
    timestamp: data.timestamp,
    last_active: data.last_active,
  }));
};

export const dtoToChatMessages = (dto: ChatMessageDTO[]): ChatMessage[] => {
  return dto.map((item) => ({
    id: item.id,
    content: item.message.content,
    docs: item.message.docs?.map((doc) => ({
      name: doc.name,
      type: doc.type,
      url: doc.url,
    })),
    images: item.message.images?.map((image) => ({
      name: image.name,
      type: image.type,
      url: image.url,
      originalWidth: image?.originalWidth,
      originalHeight: image?.originalHeight,
    })),
    timestamp: item.timestamp,
    userId: item.userid,
  }));
};
