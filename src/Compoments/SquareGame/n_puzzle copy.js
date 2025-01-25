class N_Puzzle{
    constructor( size = 500, N = 3, canvas){
      this.size = size;
      this.N = N; 
      this.board;
      this.canvas = canvas;
    }
    createBoard(){
      const squareSize = this.size/this.N
      this.board = new Array(this.N**2).fill(0)
                                      .map((_, i) => 
                                        new Square( i+1, 
                                                    i%this.N * squareSize,
                                                    Math.floor(i/this.N) * squareSize,
                                                    this.N, 
                                                    squareSize, 
                                                    this.canvas))
                                          
  
    }
    draw(){
      const ctx = this.canvas.getContext('2d')
      ctx.fillStyle = 'black'
      ctx.fillRect(0,0,this.size,this.size) 
      this.board.forEach(square => square.draw())
    }
  }
class Square{
constructor(value, x, y, n, size, canvas){
    this.value = value
    this.n = n
    this.x = x
    this.y = y
    this.size = size
    this.canvas = canvas
}
draw(){
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.fillStyle = 'white'
    ctx.font ="100px serif"
    ctx.fillText(this.value, this.x + this.size/2 - 25, this.y + this.size/2 + 25)
    ctx.strokeStyle = 'white'
    ctx.strokeRect(this.x, this.y, this.size,this.size)
}
}