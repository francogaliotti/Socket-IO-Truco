import {
    ConnectedSocket,
    MessageBody,
    OnMessage,
    SocketController,
    SocketIO,
  } from "socket-controllers";
  import { Server, Socket } from "socket.io";
  
  @SocketController()
  export class RoomController {
    @OnMessage("join_game")
    public async joinGame(
      @SocketIO() io: Server,
      @ConnectedSocket() socket: Socket,
      @MessageBody() message: any
    ) {
      console.log("New User joining room: ", message);
  
      const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
      const socketRooms = Array.from(socket.rooms.values()).filter(
        (r) => r !== socket.id
      );
  
      if (
        socketRooms.length > 0 ||
        (connectedSockets && connectedSockets.size === 2)
      ) {
        socket.emit("room_join_error", {
          error: "Room is full please choose another room to play!",
        });
      } else {
        await socket.join(message.roomId);
        socket.emit("room_joined");
  
        if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
          // Sends event to the actual socket
          socket.emit("start_game", { start: true, symbol: "Jugador 1" });
          // Sends event to the other sockets in the room
          socket.to(message.roomId)
            .emit("start_game", { start: false, symbol: "Jugador 2" });
        }
      }
    }
  
    @OnMessage("leave_game")
    public async leaveGame(
      @SocketIO() io: Server,
      @ConnectedSocket() socket: Socket,
      @MessageBody() message: any
    ) {
      console.log("User leaving room: ", message);
  
      await socket.leave(message.roomId)
      socket.emit("room_leaved")
  
      if (io.sockets.adapter.rooms.get(message.roomId).size === 1) {
        // Sends event to the other sockets in the room
        socket.to(message.roomId).emit("alone_in_room");
      }
    }
  
  }