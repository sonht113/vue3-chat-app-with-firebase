import { defineStore } from "pinia";

export const chatStore = defineStore("chat", {
  state: () => {
    return {
      rooms: [] as string[],
      smallRooms: [] as string[],
    };
  },
  actions: {
    setRooms(idRoom: string) {
      if (!this.rooms.includes(idRoom)) {
        this.rooms.push(idRoom);
      }
    },
    closeRoom(idRoom: string) {
      const index = this.rooms.indexOf(idRoom);
      this.rooms.splice(index, 1);
    },
    setSmallRooms(idRoom: string) {
      const index = this.rooms.indexOf(idRoom);
      this.smallRooms.push(idRoom);
      this.rooms.splice(index, 1);
    },
    closeSmallRoom(idRoom: string) {
      const index = this.smallRooms.indexOf(idRoom);
      this.smallRooms.splice(index, 1);
      this.rooms.push(idRoom);
    },
  },
});
