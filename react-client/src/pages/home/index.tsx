import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import Game from '../../components/game';
import { JoinRoom } from '../../components/joinRoom';
import gameContext from '../../context/gameContext';
import socketService from '../../services/socketService';



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

function Home() {
    const {isInRoom} = useContext(gameContext)
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
        <MainContainer>
            {!isInRoom && <><WelcomeText>Truco!</WelcomeText> <JoinRoom /></>}
            {isInRoom && <><Game /></>}
        </MainContainer>
    )
}

export default Home