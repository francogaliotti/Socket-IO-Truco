import { Socket } from "socket.io-client";
import { IGameBoard, IStartGame } from "../../components/game";
//import { ILostMessage, IPlayMatrix, IStartGame } from "../../components/game";

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));
    });
  }

  public async leaveGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("leave_game", { roomId });
      socket.on("room_leaved", () => rs(true));
    });
  }

  public async updateGame(socket: Socket, gameBoard: IGameBoard) {
    socket.emit("update_game", { matrix: gameBoard });
  }

  public async onGameUpdate(
    socket: Socket,
    listiner: (board: any) => void
  ) {
    socket.on("on_game_update", listiner);
    
  }

  public async onStartGame(
    socket: Socket,
    listiner: (options: IStartGame) => void
  ) {
    socket.on("start_game", listiner);
  }

  public async aloneInRoom(socket: Socket, listiner: () => void){
    socket.on("alone_in_room", listiner)
  }
}

export default new GameService();