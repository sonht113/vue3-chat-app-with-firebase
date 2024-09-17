import { Timestamp } from "firebase/firestore";

export type UserDataType = {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  isConnected: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type RoomDataType = {
  id: string;
  latestMessage: string;
  members: { [key: string]: { id: string; avatar: string; fullname: string } };
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type MessageDataType = {
  id: string;
  images: string[];
  content: string;
  senderId: string;
  roomId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
