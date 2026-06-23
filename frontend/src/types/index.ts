export type AvatarState = 'idle' | 'speaking' | 'listening' | 'thinking';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string;
}

export interface VisitorData {
  name: string;
  phone: string;
  course: string;
}

export interface ChatResponse {
  text: string;
  metadata?: {
    sessionId: string;
    timestamp: string;
  };
}
