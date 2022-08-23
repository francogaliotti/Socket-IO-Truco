import React, { useEffect, useState } from 'react'
import { fullDeck } from './fullDeck';


export interface IGameBoard {
    p1Hand: Array<string>;
    p2Hand: Array<string>;
    p1Table: Array<string>;
    p2Table: Array<string>;
    deck: Array<string>;
}

function Game() {
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
        setBoard({
            p1Hand: newP1H,
            p2Hand: newP2H,
            p1Table: [],
            p2Table: [],
            deck: newDeck
        })
    }

    const playCard = (player: string, cardId: number) => {
        if (player == "P2") {
            let newHand = board.p2Hand.filter((card, key) => key !== cardId)
            setBoard({
                ...board,
                p2Hand: newHand,
                p2Table: [...board.p2Table, board.p2Hand[cardId]]
            })
        } else {
            let newHand = board.p1Hand.filter((card, key) => key !== cardId)
            setBoard({
                ...board,
                p1Hand: newHand,
                p1Table: [...board.p1Table, board.p1Hand[cardId]]
            })
        }
    }

    useEffect(() => {

    }, [])


    return (
        <div>
            <h1>Mano 1:</h1>
            <img src={board.p1Hand[0]} alt=""  onClick={() => { playCard("P1", 0)}}/>
            <img src={board.p1Hand[1]} alt=""  onClick={() => { playCard("P1", 1)}}/>
            <img src={board.p1Hand[2]} alt=""  onClick={() => { playCard("P1", 2)}}/>
            <h1>Mesa 1:</h1>
            <img src={board.p1Table[0]} alt="" />
            <img src={board.p1Table[1]} alt="" />
            <img src={board.p1Table[2]} alt="" />
            <h1>Mesa 2:</h1>
            <img src={board.p2Table[0]} alt="" />
            <img src={board.p2Table[1]} alt="" />
            <img src={board.p2Table[2]} alt="" />
            <h1>Mano 2:</h1>
            <img src={board.p2Hand[0]} alt="" onClick={() => { playCard("P2", 0) }} />
            <img src={board.p2Hand[1]} alt="" onClick={() => { playCard("P2", 1) }} />
            <img src={board.p2Hand[2]} alt="" onClick={() => { playCard("P2", 2) }}/>
            <button onClick={() => { shuffleCards() }}>Mezclar</button>
        </div>
    )
}

export default Game