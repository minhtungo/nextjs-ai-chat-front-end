export interface ChatInfoDTO {
  id: string;
  title: string;
  subject: string;
  history: Array<{
    timestamp: number;
    userid: string;
    message: {
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
    };
  }>;
}

export interface ChatListDTO {
  id: string;
  user: string[];
  title: string;
  subject: string;
  timestamp: number;
  last_active: number;
}

export interface ChatMessageDTO {
  id: string;
  message: {
    content: string;
    images: {
      name: string;
      type: string;
      url: string;
      originalWidth: number;
      originalHeight: number;
    }[];
    docs: {
      name: string;
      type: string;
      url: string;
    }[];
  };
  timestamp: number;
  userid: string;
}
