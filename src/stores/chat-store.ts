import { RoomDataType } from "@/ts/types";
import { defineStore } from "pinia";

export const chatStore = defineStore("chat", {
  state: () => {
    return {
      rooms: [] as RoomDataType[],
      smallRooms: [] as RoomDataType[],
    };
  },
  actions: {
    /**
     * Adds a room to the list of rooms. If the number of rooms exceeds 3,
     * the first room is moved to the list of small rooms.
     *
     * @param {RoomDataType} room.
     * @return {void}
     */
    setRooms(room: RoomDataType): void {
      const indexRoom = this.rooms.findIndex((r) => r.id === room.id);
      if (indexRoom > -1) {
        this.rooms.splice(indexRoom, 1);
      } else {
        this.rooms.push(room);
      }
      if (this.rooms.length > 3) {
        this.smallRooms.push(this.rooms[0]);
        this.rooms.splice(0, 1);
      } else {
        const idx = this.smallRooms.findIndex((r) => r.id === room.id);
        if (idx !== -1) {
          this.smallRooms.splice(idx, 1);
          this.rooms.push(room);
        } else if (this.rooms.findIndex((r) => r.id === room.id) < 0) {
          this.rooms.push(room);
        }
      }
    },
    /**
     * Removes a room from the list of rooms.
     *
     * @param {string} idRoom - The ID of the room to be removed.
     * @return {void}
     */
    closeRoom(idRoom: string): void {
      const index = this.rooms.findIndex((r) => r.id === idRoom);
      this.rooms.splice(index, 1);
    },
    /**
     * Adds a room to the list of small rooms. If the room is already in the list of small rooms,
     * it is moved to the list of rooms. If the room is not in the list of rooms, it is simply added
     * to the list of small rooms.
     *
     * @param {RoomDataType} room
     * @return {void}
     */
    setSmallRooms(room: RoomDataType): void {
      const index = this.rooms.findIndex((r) => r.id === room.id);
      this.smallRooms.push(room);
      this.rooms.splice(index, 1);
    },
    /**
     * Removes a room from the list of small rooms. If the number of rooms exceeds 3,
     * the first room is moved to the list of small rooms.
     *
     * @param {RoomDataType} room
     * @return {void}
     */
    closeSmallRoom(room: RoomDataType): void {
      const index = this.smallRooms.findIndex((r) => r.id === room.id);
      this.smallRooms.splice(index, 1);
      this.rooms.push(room);
      if (this.rooms.length > 3) {
        this.smallRooms.push(this.rooms[0]);
        this.rooms.splice(0, 1);
      }
    },
    /**
     * Clears all rooms in both the list of rooms and the list of small rooms.
     *
     * @return {void}
     */
    clearAllRoomsChat(): void {
      this.rooms = [];
      this.smallRooms = [];
    },
  },
});
