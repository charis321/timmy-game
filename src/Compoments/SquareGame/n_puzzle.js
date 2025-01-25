class N_Puzzle{
    constructor(N = 3){
      this.N = N; 
      this.board;
      this.originBoard;
      this.boardHistorys;
    }
    start(){
      this.createBoard()
      this.shuffleBoard()
    }
    
    createBoard(){
      this.board = new Array(this.N**2).fill(0).map((_,i)=> i+1)
      let missing_digit = Math.floor(Math.random()*N**2)
      this.board[missing_digit] = "miss"
      this.boardHistorys = [this.board]
    }

    move(idx){
      const [x, y] = [Math.floor(idx/N), idx%N]
      const [miss_x, miss_y] = [Math.floor(board.indexOf("miss")/N), board.indexOf("miss")%N]

      if((x === miss_x && Math.abs(y - miss_y) === 1) || (y === miss_y && Math.abs(x - miss_x) === 1)){
        
        const new_board = [...this.board]
        new_board[i] = "miss"
        new_board[board.indexOf("miss")] = board[i]
      
        this.boardHistorys.push(this.board)
        this.board =  new_board
        return this.board
      }   
    }
    shuffleBoard(){
      const loop = 30
      const directions = [[-1,0],[1,0],[0,-1],[0,1]]

      let pre_miss; 

      shuffle()

      function shuffle(){
        const vaildMoves = []
        const [miss_x, miss_y] = [Math.floor(board.indexOf("miss")/N), board.indexOf("miss")%N]
        for(let [dx,dy] of directions){
          if( (miss_x+dx)>= 0     &&
              (miss_x+dx)<this.N  &&
              (miss_y+dy)>=0      &&
              (miss_y+dy)<this.N  &&
              ((miss_x+dx!==pre_miss[0])&&(miss_y+dy!==pre_miss[1])))
              {
              vaildMoves.push([dx,dy])
            }
         
        }
        let dir= vaildMoves[Math.floor(Math.random()*vaildMoves.length)]
        
        pre_miss = [miss_x, miss_y]
        
        let target_idx = (miss_x+dir[0])*this.N + miss_y+dir[1]
        this.move(target_idx) 
        console.log(dir)
      }
    }
}
function idxToPos(idx, n){
  return {x: Math.floor(idx/n), y: idx%n}
}
function posToIdx(pos, n){
  return pos.x*n+pos.y
}