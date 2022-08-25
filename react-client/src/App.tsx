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
  background-color: #aaa;
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
  const [roomName, setRoomName] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState<"P1" | "P2">("P1");


  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    isGameStarted,
    setGameStarted,
    roomName,
    setRoomName,
    playerSymbol,
    setPlayerSymbol,

  };

  const connectSocket = async () => {
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        
        <MainContainer>
          {!isInRoom && <><WelcomeText>Truco!</WelcomeText> <JoinRoom /></>}
          {isInRoom && <><Game /></>}
        </MainContainer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
