import React, { useEffect, useState } from 'react';
import './App.css';
import socketService from './services/socketService';
import styled from "styled-components";
import GameContext, { IGameContextProps } from './gameContext';
import { JoinRoom } from './components/joinRoom';
import Game from './components/game';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {

  const [isInRoom, setInRoom] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [p1Hand, setP1Hand] = useState([])
  const [p2Hand, setP2Hand] = useState([])
  const [p1Table, setP1Table] = useState([])
  const [p2Table, setP2Table] = useState([])
  const [deck, setDeck] = useState([])
  const [roomName, setRoomName] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState<"P1" | "P2">("P1");

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    isGameStarted,
    setGameStarted,
    p1Hand,
    setP1Hand,
    p2Hand,
    setP2Hand,
    p1Table,
    setP1Table,
    p2Table,
    setP2Table,
    deck,
    setDeck,
    roomName,
    setRoomName,
    playerSymbol,
    setPlayerSymbol
  };

  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>Truco!</WelcomeText>
        <MainContainer>
          {!isInRoom && <JoinRoom />}
          {isInRoom && <><Game /></>}
        </MainContainer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
