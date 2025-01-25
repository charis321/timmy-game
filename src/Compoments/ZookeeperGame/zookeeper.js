import { th } from "element-plus/es/locales.mjs"

const W = 10
const H = 10

class Zookeeper{
    constructor(){
        this.W = 10
        this.H = 10
        this.board;
    }
    createBoard(){
        this.board = Array.from({length: this.H}, () => Array.from({length: this.W}, () => Math.floor(Math.random()*6)))
        return this.board
    }
    roll(){
        this.board = Array.from({length: this.H}, () => Array.from({length: this.W}, () =>Math.floor(Math.random()*6)))
        return this.board
    }
    swap(a,b){
        [this.board[a.x][a.y], this.board[b.x][b.y]] = [this.board[b.x][b.y], this.board[a.x][a.y]]
        return this.board
    }
    collapseBoard(){
        // let row = this.H-1
        // let col = 0
        // while(col<this.W){
        //     if(this.board[row][col]>=6){ 
        //         let i = row
        //         while(i<0){
        //             if(this.board[i][col]>6){
        //                 i--
        //                 continue
        //             }else{
        //                 this.board[row][col] = this.board[i][col]
        //                 break
        //             }            
        //         }
        //     }
        //     row--
        // }
        for(let i=0;i<this.H;i++){
            let new_row;
            for(let j=0;j<this.W;j++){
                new_row = this.board[i].filter(cell => cell<6)
                new_row = new_row.concat(Array(this.W-new_row.length).fill(this.addNewCell()))
            }
            this.board[i] = new_row
        }
        console.log("collapsed",this.board)
    }
    deleteLine(line){
        
    }
    
    addNewCell(){return Math.floor(Math.random()*6)}
    
    checkLines(){
        let lines = []
        for(let i=0; i<this.H; i++){ 
            let tmp = []
            for(let j=0; j<this.W-1; j++){
                tmp.push({x:i, y:j})
                if(this.board[i][j]!==this.board[i][j+1]||j==this.W-2){
                    if(tmp.length>=3){
                        tmp.forEach(cell => {this.board[cell.x][cell.y] += 6})
                        lines.push(tmp)
                    }
                    tmp = []
                }
            }
        }
        for(let j=0; j<this.W; j++){ 
            let tmp = []
            for(let i=0; i<this.H-2; i++){
                tmp.push({x:i, y:j})
                if(this.board[i][j]!==this.board[i+1][j]||i==this.H-2){
                    if(tmp.length>=3){
                        tmp.forEach(cell => {this.board[cell.x][cell.y] += 6})
                        lines.push(tmp)
                    }
                    tmp = []
                }
            }
        }
        console.log(lines)
        return lines
    }


}
export {Zookeeper}