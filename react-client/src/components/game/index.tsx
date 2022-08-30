import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import gameContext from '../../context/gameContext';
import gameService from '../../services/gameService';
import socketService from '../../services/socketService';
import { fullDeck } from './fullDeck';
import CardBack from '../../cards/Back.png'
const tallyMarks = require("tally-marks");


const MainContainer = styled.div`

`

const Hand1Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  margin-top: -20px;
  height: 100px;
`;

const Hand2Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  margin-bottom: -20px;
  height: 100px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #050;
  border: 2px solid black;
  border-radius: 8px;
  height: 350px;
  width: 350px;
  justify-content: center;
  box-shadow: 10px 5px 5px black;
`;

const SingleTable = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    height: 100%;
    width: 100%;
    justify-content: center;

`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ScoreTable = styled.div`
    display: flex;
    position: absolute;
    margin-top: -500px;
    margin-left: 45%;
    gap: 90px;
    background-color: #e4b755;
    width: 210px;
    padding-bottom: 20px;
    border: 5px solid #000;
    border-radius: 12px;
    box-shadow: 10px 5px 5px black;
`

const SingleScore = styled.div`
    width: 10px;
    font-size: 30px;
    margin-left: 20px;
`
const ScoreButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 35px;

    &:hover {
    color: #fff;
    text-shadow: 4px 1px 1px black;
  }
`
const LeftDeck = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  position: absolute;
  margin-left: -100px;
  margin-top: -400px;
`

const RightDeck = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  position: absolute;
  margin-left: 400px;
  margin-top: -220px;
`
const ReturnButton = styled.button`
  outline: none;
  background-color: #8e44ad;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  //margin-top: 1em;
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 5%;
  &:hover {
    background-color: transparent;
    border: 2px solid #8e44ad;
    color: #8e44ad;
  }
`

export interface IGameBoard {
    p1Hand: Array<string>;
    p2Hand: Array<string>;
    p1Table: Array<string>;
    p2Table: Array<string>;
    deck: Array<string>;
    player1Score: number;
    player2Score: number;
    playerTurn: string
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
        setRoomName,

    } = useContext(gameContext);

    const [board, setBoard] = useState<IGameBoard>({
        p1Hand: [],
        p2Hand: [],
        p1Table: [],
        p2Table: [],
        deck: fullDeck,
        player1Score: 0,
        player2Score: 0,
        playerTurn: "P1"
    })

    const shuffleCardsP1 = () => {
        if (board.playerTurn == "P1" && playerSymbol == "P1") {
            let newDeck = fullDeck.sort(() => Math.random() - 0.5)
            let newP1H = [newDeck[0], newDeck[2], newDeck[4]]
            let newP2H = [newDeck[1], newDeck[3], newDeck[5]]
            const newBoard = {
                ...board,
                p1Hand: newP1H,
                p2Hand: newP2H,
                p1Table: [],
                p2Table: [],
                deck: newDeck,
                playerTurn: "P2"
            }
            setBoard(newBoard)
            console.log(newBoard)
            if (socketService.socket) {
                gameService.updateGame(socketService.socket, newBoard);
            }
        }
    }

    const shuffleCardsP2 = () => {
        if (board.playerTurn == "P2" && playerSymbol == "P2") {
            let newDeck = fullDeck.sort(() => Math.random() - 0.5)
            let newP1H = [newDeck[0], newDeck[2], newDeck[4]]
            let newP2H = [newDeck[1], newDeck[3], newDeck[5]]
            const newBoard = {
                ...board,
                p1Hand: newP1H,
                p2Hand: newP2H,
                p1Table: [],
                p2Table: [],
                deck: newDeck,
                playerTurn: "P1"
            }
            setBoard(newBoard)
            console.log(newBoard)
            if (socketService.socket) {
                gameService.updateGame(socketService.socket, newBoard);
            }
        }
    }

    const playCard = (player: string, cardId: number) => {
        let newBoard = { ...board }
        if (player == "P2") {
            let newHand = board.p2Hand.filter((card, key) => key !== cardId)
            newBoard = {
                ...board,
                p2Hand: newHand,
                p2Table: [...board.p2Table, board.p2Hand[cardId]]
            }
            setBoard(newBoard)
        } else {
            let newHand = board.p1Hand.filter((card, key) => key !== cardId)
            newBoard = {
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

    const leaveRoom = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const socket = socketService.socket;
        if (!socket) return;
    
    
        const lived = await gameService
          .leaveGameRoom(socket, roomName)
    
    
        if (lived) setInRoom(false);
    
      };

    const handleGameStart = () => {
        if (socketService.socket)
            gameService.onStartGame(socketService.socket, (options) => {
                setGameStarted(true);
                setPlayerSymbol(options.symbol);
                console.log(options.symbol)
            });
    };

    const handleGameUpdate = () => {
        if (socketService.socket)
            gameService.onGameUpdate(socketService.socket, (newBoard) => {
                setBoard(newBoard.matrix);
                console.log(newBoard)
            });
    };

    const setScore = async (player: number, operation: string) => {
        let newBoard = { ...board }
        if (operation == "+") {
            if (player == 1) {
                newBoard = {
                    ...board,
                    player1Score: board.player1Score + 1
                }
            } else {
                newBoard = {
                    ...board,
                    player2Score: board.player2Score + 1
                }
            }
        } else {
            if (player == 1) {
                newBoard = {
                    ...board,
                    player1Score: board.player1Score - 1
                }
            } else {
                newBoard = {
                    ...board,
                    player2Score: board.player2Score - 1
                }
            }
        }
        setBoard(newBoard)
        if (socketService.socket) {
            await gameService.updateGame(socketService.socket, newBoard);
        }
    }

    const [rivalLeft, setRivalLeft] = useState(false)

    const handleLoneliness = () => {
        if (socketService.socket)
            gameService.aloneInRoom(socketService.socket, () => {
                setRivalLeft(true)
            })
    }


    useEffect(() => {
        handleGameStart()
        handleGameUpdate()
        handleLoneliness()
    }, [])


    return (
        <MainContainer>
            <ReturnButton onClick={leaveRoom}>Volver a Inicio</ReturnButton>
            {rivalLeft && (
                <h2>Tu Rival Abandonó la Partida</h2>
            )}
            <Hand2Container>
                {playerSymbol == "P1" ? <>
                    <Card>
                        <img src={board.p1Hand[0]} alt="" onClick={() => { playCard("P1", 0) }} />
                    </Card>
                    <Card>
                        <img src={board.p1Hand[1]} alt="" onClick={() => { playCard("P1", 1) }} />
                    </Card>
                    <Card>
                        <img src={board.p1Hand[2]} alt="" onClick={() => { playCard("P1", 2) }} />
                    </Card>
                </> : <>
                    {board.p1Hand.map((c) => {
                        return <Card><img src={CardBack} alt="" /></Card>
                    })}
                </>}
            </Hand2Container>
            <TableContainer>
                <SingleTable>
                    <Card>
                        <img src={board.p1Table[0]} alt="" />
                    </Card>
                    <Card>
                        <img src={board.p1Table[1]} alt="" />
                    </Card>
                    <Card>
                        <img src={board.p1Table[2]} alt="" />
                    </Card>
                </SingleTable>
                <SingleTable>
                    <Card>
                        <img src={board.p2Table[0]} alt="" />
                    </Card>
                    <Card>
                        <img src={board.p2Table[1]} alt="" />
                    </Card>
                    <Card>
                        <img src={board.p2Table[2]} alt="" />
                    </Card>
                </SingleTable>
            </TableContainer>
            <Hand1Container>
                {playerSymbol == "P2" ? <>
                    <Card>
                        <img src={board.p2Hand[0]} alt="" onClick={() => { playCard("P2", 0) }} />
                    </Card>
                    <Card>
                        <img src={board.p2Hand[1]} alt="" onClick={() => { playCard("P2", 1) }} />
                    </Card>
                    <Card>
                        <img src={board.p2Hand[2]} alt="" onClick={() => { playCard("P2", 2) }} />
                    </Card>
                </> : <>
                    {board.p2Hand.map((c) => {
                        return <Card><img src={CardBack} alt="" /></Card>
                    })}
                </>}
            </Hand1Container>
            <ScoreTable>
                <SingleScore>
                    <h2>J1</h2>
                    {tallyMarks(board.player1Score, { five: "卌", one: "l" })}
                    {playerSymbol == "P1" && <>
                        <ScoreButton onClick={() => { setScore(1, "+") }}>+</ScoreButton>
                        <ScoreButton onClick={() => { setScore(1, "-") }}>-</ScoreButton>
                    </>}
                </SingleScore>
                <SingleScore>
                    <h2>J2</h2>
                    {tallyMarks(board.player2Score, { five: "卌", one: "l" })}
                    {playerSymbol == "P1" && <>
                        <ScoreButton onClick={() => { setScore(2, "+") }}>+</ScoreButton>
                        <ScoreButton onClick={() => { setScore(2, "-") }}>-</ScoreButton>
                    </>}
                </SingleScore>
            </ScoreTable>
            {board.playerTurn == "P1" ?
                <RightDeck><Card><img src={CardBack} alt="" onClick={() => { shuffleCardsP1() }} /></Card></RightDeck>
                :
                <LeftDeck><Card><img src={CardBack} alt="" onClick={() => { shuffleCardsP2() }} /></Card></LeftDeck>
            }


        </MainContainer>
    )
}

export default Game