import React from 'react'

let obj = {};
let high_score=[]

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            change : 0,
            color : "black",
            game_over : 0,
            game_score : 0,
            target : 0
            //obj : {}
        }
    }

    setDirection = (i, j, minPos, array, diamond) => {

        //console.log(array);

        let x1 = minPos.x - i;
        let y1 = minPos.y - j;
            if(Math.abs(x1) > Math.abs(y1)){
                if(x1 < 0){
                    array[i][j] = 2;
                } else {
                    array[i][j] = 4
                }
            } else if(Math.abs(y1) >= Math.abs(x1)){
                if( y1 < 0){
                    array[i][j] = 5;
                } else {
                    array[i][j] = 3;
                }
            }

        obj.array = array;
        obj.diamond = diamond;
        obj.minPos = minPos;

        //console.log(obj);

    }

    calcMinDis = (i, j, array, diamond) => {
        let min=100000, minPos={};
        diamond.map((value) =>{
            let dist = Math.sqrt( ((value.x-i) * (value.x-i)) + ((value.y - j) * (value.y - j)));
            if(dist < min){
                min = dist;
                minPos = {
                    x : value.x,
                    y : value.y
                }
            }
        })
        //console.log(minPos);
        this.setDirection(i, j, minPos, array, diamond)
    }

    handleCalc = (array, diamond) => {

            // this.setState({
            //     arr : array,
            //     diamond : diamond
            // });
        
        //console.log(this.state.arr);
        //console.log(array);
        array.map((x, i)=> {
            x.map((y, j) => {
                if(y !== 1){
                    this.calcMinDis(i, j, array, diamond);
                }
            })

        })
    }

    handleClick = (i, j) => {

        

        obj = JSON.parse(localStorage.getItem("obj"));
        let pos = 0;
        obj.diamond.forEach((element, index) => {
            if(element.x === i && element.y === j){
                pos = index;
            }
        });
        obj.array.map((x, i) => {
            x.map((y, j) => {
                if(y === 2 || y===3 || y===4 || y===5){
                    //obj.color[i][j] = 'black';
                    obj.array[i][j] = 
                }
            })
        })
        if(obj.array[i][j] === 1){
            
            obj.count_diamond = obj.count_diamond + 1;
            obj.total_count = obj.total_count + 1;
            if(obj.count_diamond !== 8 ){
                
                //obj.array[i][j] = 6;
                console.log(obj.diamond);
                obj.diamond.splice(pos, 1)
                console.log(obj.diamond);
                obj.color[i][j] = "white";
                this.handleCalc(obj.array, obj.diamond);
                localStorage.setItem("obj", JSON.stringify(obj))

                this.setState({
                    change : 1,
                    color : "black"
                })
            } else {
                //alert(obj.total_count);
                obj.color[i][j] = "white";
                obj.show_score = 1;
                obj.display = "block";  
                obj.target = 1;
                localStorage.setItem("obj", JSON.stringify(obj))
                this.setState({
                    target : 1,
                   game_over : 1,
                   game_score : obj.total_count
                })
                
            }
        } else {
            //alert("prateek");
            obj.total_count = obj.total_count + 1;
            obj.color[i][j] = "white";
            localStorage.setItem("obj", JSON.stringify(obj))
            this.setState({
                name : '',
                change : 1,
                color : "black"
            })
        }

    }

    startGame = () => {

        let min=0; 
        let max=63;
        let random = []  
        for(let i =0; i < 8; i++){
            let num = Math.floor(Math.random() * (+max - +min)) + +min;
            (random.includes(num))?--i:random.push(num);
        }
        let c=0;
        let array = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];
        let diamond = [];
        let color = [
            ["black","black","black","black","black","black","black","black"],
            ["black","black","black","black","black","black","black","black"],
            ["black","black","black","black","black","black","black","black"],
            ["black","black","black","black","black","black","black","black"],
            ["black","black","black","black","black","black","black","black"],
            ["black","black","black","black","black","black","black","black"],
            ["black","black","black","black","black","black","black","black"],
            ["black","black","black","black","black","black","black","black"]
        ];
        for(let i=0 ; i<8 ; i++){
            for(let j=0; j<8; j++){
                if(random.includes(c)){
                    array[i][j] = 1;
                    diamond.push({
                        x : i,
                        y : j
                    })
                }
                else {
                    array[i][j] = 0;
                }
                c++;
            }
        }
        console.log(array);
        //console.log(array);
        //console.log(diamond);
        obj.color  = color;
        obj.total_count = 0;
        obj.count_diamond = 0;
        obj.show_score = 0;
        obj.display = "none";
        obj.target = 0;
        this.handleCalc(array, diamond);
        localStorage.setItem("obj", JSON.stringify(obj))

        this.setState({
            color : "black",
            change : 1,
            target : 0
        })

    }

    saveScore = () => {
        let high_score = JSON.parse(localStorage.getItem('high_score'));
        //alert('prateek');
        let score = {
            name : this.state.name,
            score : obj.total_count
        }

        high_score.push(score);
        high_score.sort((a, b) => {

            if(parseInt(a.score) < parseInt(b.score)){
                return 1;
            } else{
                return -1;
            }
        })
        localStorage.setItem("high_score", JSON.stringify(high_score))

        this.setState({
            name: ''
        })
        
    }

    handleName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    render(){
        
        let obj = JSON.parse(localStorage.getItem("obj"));
        //console.log(obj);
        //console.log(JSON.parse(obj));
        let leaderBoard = JSON.parse(localStorage.getItem("high_score"));

        return (
            <div class="container app">
                <div>
                    {(obj !== null)?((obj.show_score === 1)?<span><h2>Game Over</h2></span>:null):null}
                </div>
                <button type="button" onClick={this.startGame}>Start Game</button>
                <button type="button" data-target={(this.state.target === 1)?"#myModal":"#myModal1"} data-toggle="modal">Save Score</button>
                <button type="button" data-target="#myModal2" data-toggle="modal">Leaderboard</button>
                <div>
                    Your Score : {(obj !== null)?obj.total_count:0}
                </div>
                <div>
                    <table>
                        <tbody>
                            {(obj !== null)?((obj.array.map((x, i) => {
                               return (<tr>
                                {x.map((y, j) => {
                                    return <td style={{backgroundColor : obj.color[i][j]}} onClick={() => this.handleClick(i, j)}>{(y === 2)?<i class="fa fa-long-arrow-up"></i>:((y === 3)?<span className="fa fa-long-arrow-right"></span>:((y === 4)?<span className="fa fa-long-arrow-down"></span>:((y === 5)?<span className="fa fa-long-arrow-left"></span>:((y === -1)?<span></span>:<span className="fa fa-diamond"></span>))))}</td>
                                })}
                                </tr>)
                            }))):null
                            }
                        </tbody>
                    </table>
                </div>
                
                {(obj!== null && obj.show_score === 1)?<div class="modal" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">

                        
                        <div class="modal-header">
                            <h4 class="modal-title">Save Score</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        
                        <div class="modal-body">
                            <form>
                                <div className="row input">
                                    <span>Name :</span>
                                    <span id="input_span"><input type="text" className="form-control" id="input_name" value={this.state.name} onChange={this.handleName} /></span>
                                </div>
                                <br />
                                <div className="row input">
                                    <span>Score :</span>
                                    <span id="score_span"><input type="text" value={obj.total_count} className="form-control" id="input_name"/></span>
                                </div>
                                <br />
                                <div >
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveScore}>Save</button>
                                </div>
                            </form>
                        </div>

                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                </div>:null}


                <div class="modal" id="myModal1">
                    <div class="modal-dialog">
                        <div class="modal-content">

                        
                        <div class="modal-header">
                            <h4 class="modal-title">Save Score</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        
                        <div class="modal-body">
                               
                                    <span>First Complete The Game</span>
                                    
                                
                                
                        </div>

                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                </div>


                <div class="modal" id="myModal2">
                    <div class="modal-dialog">
                        <div class="modal-content">

                        
                        <div class="modal-header">
                            <h4 class="modal-title">Save Score</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        
                        <div class="modal-body">
                            <div className="row container"><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><b>Name</b> </span><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><b>Score</b></span></div>
                               {(leaderBoard !== null)?leaderBoard.map((value) => {
                                   return <div className="row container"><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6">{value.name}</span><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6">{value.score}</span></div>
                               }):null}
                                
                        </div>

                        
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;