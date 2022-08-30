import React, { useEffect, useState } from 'react';
import './App.css';
import styled from "styled-components";
import GameContext, { IGameContextProps } from './context/gameContext';
import Home from './pages/home';
import AuthContext, { IAuthContextProps } from './context/authContext';
import Login from './pages/login';
import Register from './pages/register';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  background-color: #aaa;
`;


function App() {

  const [isInRoom, setInRoom] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState<"P1" | "P2">("P1");

  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [hasAccount, setHasAccount] = useState(true)


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

  const authContextValue: IAuthContextProps = {
    logged,
    setLogged,
    username,
    setUsername,
    hasAccount,
    setHasAccount
  }



  return (
    <GameContext.Provider value={gameContextValue}>
      <AuthContext.Provider value={authContextValue}>
        <AppContainer>
          {!logged ? <>{hasAccount ? <Login/> : <Register/>}</> : <Home />}
        </AppContainer>
      </AuthContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
