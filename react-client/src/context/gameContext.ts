import React from "react";

export interface IGameContextProps {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
  isGameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  roomName: string;
  setRoomName: (name: string) => void;
  playerSymbol: "P1" | "P2";
  setPlayerSymbol: (symbol: "P1" | "P2") => void;
}

const defaultState: IGameContextProps = {
  isInRoom: false,
  setInRoom: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
  roomName: "",
  setRoomName: () => {},
  playerSymbol: "P1",
  setPlayerSymbol: () => {},
};

export default React.createContext(defaultState);