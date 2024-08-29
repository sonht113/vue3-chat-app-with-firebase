export type UserDataType = {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  isConnected: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomDataType = {
  id: string;
  latestMessage: string;
  members: { [key: string]: { id: string; avatar: string; fullname: string } };
  createdAt: Date;
  updatedAt: Date;
};
