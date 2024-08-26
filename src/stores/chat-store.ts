import { defineStore } from "pinia";

export const chatStore = defineStore("chat", {
  state: () => {
    return {
      rooms: [] as string[],
      smallRooms: [] as string[],
    };
  },
  actions: {
    /**
     * Adds a room to the list of rooms. If the number of rooms exceeds 3,
     * the first room is moved to the list of small rooms.
     *
     * @param {string} idRoom - The ID of the room to be added.
     * @return {void}
     */
    setRooms(idRoom: string): void {
      this.rooms.push(idRoom);
      if (this.rooms.length > 3) {
        this.smallRooms.push(this.rooms[0]);
        this.rooms.splice(0, 1);
      } else {
        const idx = this.smallRooms.indexOf(idRoom);
        if (idx !== -1) {
          this.smallRooms.splice(idx, 1);
          this.rooms.push(idRoom);
        } else if (!this.rooms.includes(idRoom)) {
          this.rooms.push(idRoom);
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
      const index = this.rooms.indexOf(idRoom);
      this.rooms.splice(index, 1);
    },
    /**
     * Adds a room to the list of small rooms. If the room is already in the list of small rooms,
     * it is moved to the list of rooms. If the room is not in the list of rooms, it is simply added
     * to the list of small rooms.
     *
     * @param {string} idRoom - The ID of the room to be added to the list of small rooms.
     * @return {void}
     */
    setSmallRooms(idRoom: string): void {
      const index = this.rooms.indexOf(idRoom);
      this.smallRooms.push(idRoom);
      this.rooms.splice(index, 1);
    },
    /**
     * Removes a room from the list of small rooms. If the number of rooms exceeds 3,
     * the first room is moved to the list of small rooms.
     *
     * @param {string} idRoom - The ID of the room to be removed from the list of small rooms.
     * @return {void}
     */
    closeSmallRoom(idRoom: string): void {
      const index = this.smallRooms.indexOf(idRoom);
      this.smallRooms.splice(index, 1);
      this.rooms.push(idRoom);
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
