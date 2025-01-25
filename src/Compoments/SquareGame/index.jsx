import React, {useRef, useState} from 'react'
import './index.css'
import { useEffect } from 'react'

const MAX_HISTORY_LENGTH = 5

export default function N_puzzle_Game(props){
  const [board, setBoard] = useState([])
  const [history,setHistory] = useState([])
  const [message, setMessage] = useState("")
  const [isStarting, setStarting] =useState(false)
  const [isWinning, setWinning] = useState(false)
  const [gamePage, setGamePage] = useState(0)
  const [startTime, setstartTime] = useState(null)
  const [missingDigital ,setMissingDigital] = useState(-1)
  const [n ,setN] = useState(3)

  const SIZE = 300
 
  useEffect(()=>{
    if(gamePage!==1||!isStarting) return
    if(checkWin(board)){
      gameOver()
    }
  },[board])

  function gameStart(){
    let [new_board, missing_digit] = createBoard()
    new_board = shuffleBoard(new_board, Math.floor((Math.log(n)*n*n*2)))
    setstartTime(new Date())
    setHistory([new_board])
    setMissingDigital(missing_digit)
    setBoard(new_board)
    setStarting(true)
    setGamePage(1)
   
  }
  function gameOver (){
    setStarting(false)
    WinningAnime()
      .then(()=>{
        setWinning(true)
        setMessage("Game Over")
        setGamePage(2)
      }
    )
  }

  const createBoard = ()=>{
    const new_board = new Array(n**2).fill(0).map((_, i) => i+1)
    const missing_digit = Math.floor(Math.random()*n**2)
    new_board[missing_digit] = "miss"
    return [new_board, missing_digit+1]
  }

  const shuffleBoard = (board, loop)=>{
    const directions = [[-1,0],[1,0],[0,-1],[0,1]]
    let pre_miss = [-1 , -1] 
    let new_board = [...board]

    while(loop>0){
      const vaildMoves = []
      const [miss_x, miss_y] = [Math.floor(new_board.indexOf("miss")/n), new_board.indexOf("miss")%n]

      for(let [dx,dy] of directions){
        if( (miss_x+dx)>= 0     &&
            (miss_x+dx)<n  &&
            (miss_y+dy)>=0      &&
            (miss_y+dy)<n  &&
            ((miss_x+dx!==pre_miss[0])&&(miss_y+dy!==pre_miss[1])))
            {
            vaildMoves.push([dx,dy])
          }
      }
      let dir= vaildMoves[Math.floor(Math.random()*vaildMoves.length)]
      pre_miss = [miss_x, miss_y]
      let target_idx = (miss_x+dir[0])*n + miss_y+dir[1]
      new_board = swapBoard(target_idx, new_board) 
      loop--
    }
    return new_board
  }
  
  const swapBoard = (i,board)=>{
    const new_board = [...board]
    const [x, y] = [Math.floor(i/n), i%n]
    const [miss_x, miss_y] = [Math.floor(new_board.indexOf("miss")/n), new_board.indexOf("miss")%n]
    
    if((x === miss_x && Math.abs(y - miss_y) === 1) || (y === miss_y && Math.abs(x - miss_x) === 1)){
      new_board[i] = "miss"
      new_board[board.indexOf("miss")] = board[i]
      return new_board
    }
    return false
  }

  const checkWin = (board) => {
    let isWin = true
    board.forEach((value, i) => {
      if(value !== i+1 && value !== "miss") isWin = false
    })
    return isWin
  }

  const getFinishTime = (startTime)=>{
    return Math.round((new Date() - startTime)/1000)
  }

  const WinningAnime = ()=>{
    return new Promise(resolve=>{
      const squares = document.querySelectorAll(".game-content .square")
      squares.forEach((square,i) => {
        if(square.getAttribute("data-value")==="miss"){
          square.style.animation = "drop 0.5s linear forwards"
          console.log("miss")
        }else{
          square.style.animation = `wave 0.5s linear ${ 0.5 + i*0.05}s`
        }
      })
      setTimeout(()=>{
        squares.forEach((square,i) => {square.style.animation = `none`})
        resolve()
      }, 1000 + n**2*50)
    })
  }
  const addHistory = (curr_board)=>{
    const new_history = [...history, curr_board]
    if(new_history.length>MAX_HISTORY_LENGTH) new_history.shift()
    setHistory(new_history) 
  }

  // -- event handler --

  const handleInitialGame = ()=>{
    setWinning(false)
    setstartTime(0)
    setHistory([])
    setBoard([])
    setStarting(false)
    setGamePage(0)
  }
  const handleGameStart = ()=>{
    gameStart()
  }
  const handleReturnBoard = ()=>{
    if(history.length>1){
      const new_history = [...history]
      setBoard(new_history.pop())
      setHistory(new_history)
    }
  }
  const handleSquareClick = (value, i)=>{
    return () => {
      if(value==="miss"||!isStarting) return
      const new_board = swapBoard(i,board)
      if(new_board){
        setHistory(preHistory=> [...preHistory, board])
        setBoard(new_board)
      } 
    }
  }
  const handleShuffle = ()=>{
    const new_board = shuffleBoard(board, Math.floor((Math.log(n)*n*n*2)))
    setBoard(new_board)
  }  
  const handleChangeN = (d)=>{
    return ()=>{
      if((n+d) > 0 && (n+d) <=10 ) setN(preN=>preN+d)
    }
  }  

  return (
    <div className="square-game-container">
      <div className="game-switch-box" style={{marginTop: `${gamePage*-100}vh`}}>
        <section className='game-section'>
          <div className='game-start-menu'>
            <h1>N-Puzzle</h1>
            <div className='game-img'></div>
            <div className='game-n-control'>
              <button className='sm-btn' onClick={handleChangeN(-1)}>♠</button>
              <h2>{`${n} x ${n}`}</h2>
              <button className='sm-btn' onClick={handleChangeN(1)}>♠</button>
            </div>
            <button className='start wt-btn' onClick={handleGameStart}>Start</button>
          </div>
        </section>
        <section className='game-section'>
          <div className='game-main'>
            <h1>N-Puzzle</h1>
            <div className="game-content" style={{width: SIZE, height: SIZE}}>
                { 
                  board.map((value, i) => {
                    const style = {
                      width: SIZE/n,
                      height: SIZE/n,
                      top: Math.floor(i/n) * SIZE/n,
                      left: i%n * SIZE/n,
                      fontSize: SIZE/n/2
                    }
                    
                    return (
                      <div  className={value=="miss"?"square miss":'square'}
                            key={i} 
                            data-value={value}
                            style={style} 
                            onClick={handleSquareClick(value, i)}>
                        <p>{
                              value==="miss"?missingDigital:value
                            }
                        </p>
                      </div>
                    )
                  })
                }
            </div>
            <div className='game-main-control'>
              <button className='reset wt-btn' onClick={handleGameStart}>Reset ⟳</button>
              <button className='shuffle wt-btn' onClick={handleShuffle}>Shuffle</button>
              <button className='return wt-btn' onClick={handleReturnBoard}>↪</button>
              <button className='wt-btn' onClick={handleInitialGame}>Back To Menu</button>
            </div>
          </div>
        </section>
        <section className='game-section'>
          <div className='game-winning'>
            <h1>{message}</h1>
            <p>Total Final Time: {getFinishTime(startTime)} second</p>
            <button className='start wt-btn' onClick={handleGameStart}>Try Again</button>
            <button className='wt-btn' onClick={handleInitialGame}>Back To Menu</button>
          </div>
        </section>
      </div>
    </div>
  );
}