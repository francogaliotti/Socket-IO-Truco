import React from "react";

export interface IGameContextProps {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
  isGameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  p1Hand: string[];
  setP1Hand: (cards: []) => void
  p2Hand: string[];
  setP2Hand: (cards: []) => void
  p1Table: string[];
  setP1Table: (cards: []) => void
  p2Table: string[];
  setP2Table: (cards: []) => void
  deck: string[]
  setDeck: (cards: []) => void
  /*player1Score: number;
  setPlayer1Score: (score: number) => void;
  player2Score: number;
  setPlayer2Score: (score: number) => void;
  roomName: string;
  setRoomName: (name: string) => void;*/
}

const defaultState: IGameContextProps = {
  isInRoom: false,
  setInRoom: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
  p1Hand: [],
  setP1Hand: () => {},
  p2Hand: [],
  setP2Hand: () => {},
  p1Table: [],
  setP1Table: (cards: []) => {},
  p2Table: [],
  setP2Table: (cards: []) => {},
  deck: [],
  setDeck: (cards: []) => {}
};

export default React.createContext(defaultState);