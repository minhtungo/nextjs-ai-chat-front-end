export interface ChatInfo {
  id: string;
  title: string;
  subject: string;
  messages: {
    id: string;
    content: string;
    images: Array<{
      name: string;
      type: string;
      url: string;
      originalWidth: number;
      originalHeight: number;
    }>;
    docs: Array<{
      name: string;
      type: string;
      url: string;
    }>;
    timestamp: number;
    userId: string;
  }[];
}

export interface ChatList {
  id: string;
  userId: string;
  title: string;
  subject: string;
  timestamp: number;
  last_active: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  images: Array<{
    name: string;
    type: string;
    url: string;
    originalWidth: number;
    originalHeight: number;
  }>;
  docs: Array<{
    name: string;
    type: string;
    url: string;
  }>;
  timestamp: number;
  userId: string;
}
