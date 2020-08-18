import io from "socket.io-client"

let socket = {};

export const socketStore = {
  actions: {
    initializeSocket({ commit, dispatch }) {
      socket = io("//localhost:3000");

      socket.on("CONNECTED", data => {
        console.log(data.message + " Let the villany commence")
      })

      //registers event listeners for emits from socketservice
      socket.on("selectSong", payload => {
        commit("addToQueue", payload)
        console.log('worked')
      })

      // socket.on("deleteCar", car => {
      //   commit("deleteCar", car)
      // })

      // socket.on("newBid", car => {
      //   commit("updateCar", car)
      // })
    },
    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "joinRoom", data: roomName })
      console.log('room Joined')
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "leaveRoom", data: roomName })

    }
  }
}