class chair{
    constructor(data){
        if(data != undefined){
            this.row = data.row;
            this.column = data.column;
            this.state = data.state;
        }else{

        }
    }
    

    /*
        Getters and setters
    */
    setRow(newRow){
        if(newRow > 0 && newRow <= 5){
            this.row = newRow;
        }
    }
    setColumn(newColumn){
        if(newColumn > 0 && newColumn <= 5){
            this.column = newColumn;
        }
    }

    getRow = ()=>this.row;
    getColumn = () => this.column;
}