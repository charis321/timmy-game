import {Zookeeper} from './zookeeper.js'
import React, {useState} from 'react'
import './index.css'
import { useEffect } from 'react'

const icon = ['🐘','🦒','🦓','🦁','🐅','🦏','X']

export default function ZookeeperGame(props){
  const [game, setGame] = useState(new Zookeeper())
  const [boardRender, setBoardRender] = useState()

  useEffect(() => {
    game.createBoard()
    game.checkLines()
    drawBoard(game.board)
  },[])

  function drawBoard(board){
    if(!board) return <h1>loading</h1>
    const new_board = Array(10).fill(null).map(() => Array(10).fill(null))
    for(let i=0; i<10; i++){
      for(let j=0; j<10; j++){
        new_board[i][j] =  <Cell value={board[i][j]} key={i*10+j}></Cell>
      }
    }
    setBoardRender(new_board)
  }
  function rollBoard(){
    game.roll()
    game.checkLines()
    drawBoard(game.board)
  }
  function collapseBoard(){
    drawBoard(game.board)
    game.checkLines()
    game.collapseBoard()
    drawBoard(game.board)
  }

  return (
    <div className="game-container">
      <div className='row-title'>
        <h1>Game</h1>
        <button className='roll wt-btn' onClick={rollBoard}>Roll</button>
        <button className='collaspe wt-btn' onClick={collapseBoard}>Collaspe</button>
      </div>
      <div className="game-content">
        {boardRender}
      </div>
    </div>
  );
}

function Cell(props){
  return (
    <div className={'cell' + (props.value<6?"":" highlight")}>
      <p>{icon[props.value%6]}</p>
    </div>
  )
}