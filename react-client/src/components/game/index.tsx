import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import gameContext from '../../gameContext';
import gameService from '../../services/gameService';
import socketService from '../../services/socketService';
import { fullDeck } from './fullDeck';


const HandContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: #aaa;
  border: 2px solid black;
  border-radius: 8px;
  height: 130px;
  width: 280px;
  justify-content: center;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;


export interface IGameBoard {
    p1Hand: Array<string>;
    p2Hand: Array<string>;
    p1Table: Array<string>;
    p2Table: Array<string>;
    deck: Array<string>;
}
export interface IStartGame {
    symbol: "P1" | "P2";
}

function Game() {
    const {
        playerSymbol,
        setPlayerSymbol,
        setGameStarted,
        isGameStarted,
        setInRoom,
        roomName,
        setRoomName
    } = useContext(gameContext);

    const [board, setBoard] = useState<IGameBoard>({
        p1Hand: [],
        p2Hand: [],
        p1Table: [],
        p2Table: [],
        deck: fullDeck
    })

    const shuffleCards = () => {
        let newDeck = fullDeck.sort(() => Math.random() - 0.5)
        let newP1H = [newDeck[0], newDeck[2], newDeck[4]]
        let newP2H = [newDeck[1], newDeck[3], newDeck[5]]
        const newBoard = {
            p1Hand: newP1H,
            p2Hand: newP2H,
            p1Table: [],
            p2Table: [],
            deck: newDeck
        }
        setBoard(newBoard)
        console.log(newBoard)
        if (socketService.socket) {
            gameService.updateGame(socketService.socket, newBoard);
        }
    }

    const playCard = (player: string, cardId: number) => {
        let newBoard = {...board}
        if (player == "P2") {
            let newHand = board.p2Hand.filter((card, key) => key !== cardId)
            newBoard = {...board,
                p2Hand: newHand,
                p2Table: [...board.p2Table, board.p2Hand[cardId]]
            }
            setBoard(newBoard)
        } else {
            let newHand = board.p1Hand.filter((card, key) => key !== cardId)
            newBoard={
                ...board,
                p1Hand: newHand,
                p1Table: [...board.p1Table, board.p1Hand[cardId]]
            }
            setBoard(newBoard)
        }
        if (socketService.socket) {
            gameService.updateGame(socketService.socket, newBoard);
        }
    }

    const handleGameStart = () => {
        if (socketService.socket)
            gameService.onStartGame(socketService.socket, (options) => {
                setGameStarted(true);
                setPlayerSymbol(options.symbol);
            });
    };

    const handleGameUpdate = () => {
        if (socketService.socket)
            gameService.onGameUpdate(socketService.socket, (newBoard) => {
                setBoard(newBoard.matrix);
                console.log(newBoard)
            });
    };


    useEffect(() => {
        handleGameStart()
        handleGameUpdate()
    }, [])


    return (
        <div>
            <HandContainer>
                {playerSymbol == "P1" && <>
                    <Card>
                        <img src={board.p1Hand[0]} alt="" onClick={() => { playCard("P1", 0) }} />
                    </Card>
                    <Card>
                        <img src={board.p1Hand[1]} alt="" onClick={() => { playCard("P1", 1) }} />
                    </Card>
                    <Card>
                        <img src={board.p1Hand[2]} alt="" onClick={() => { playCard("P1", 2) }} />
                    </Card>
                </>}
            </HandContainer>
            <img src={board.p1Table[0]} alt="" />
            <img src={board.p1Table[1]} alt="" />
            <img src={board.p1Table[2]} alt="" />
            <h1>-------</h1>
            <img src={board.p2Table[0]} alt="" />
            <img src={board.p2Table[1]} alt="" />
            <img src={board.p2Table[2]} alt="" />
            <HandContainer>
                {playerSymbol == "P2" && <>
                    <Card>
                        <img src={board.p2Hand[0]} alt="" onClick={() => { playCard("P2", 0) }} />
                    </Card>
                    <Card>
                        <img src={board.p2Hand[1]} alt="" onClick={() => { playCard("P2", 1) }} />
                    </Card>
                    <Card>
                        <img src={board.p2Hand[2]} alt="" onClick={() => { playCard("P2", 2) }} />
                    </Card>
                </>}
            </HandContainer>

            <button onClick={() => { shuffleCards() }}>Mezclar</button>
        </div>
    )
}

export default Game