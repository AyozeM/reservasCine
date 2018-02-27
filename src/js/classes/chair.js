/**
 * Clase butaca
 * @class
 */
class chair{
    /**
     *@constructor
     */
    constructor(data){
        this.row = data.row;
        this.column = data.column;
        this.state = data.state;
        this.room = data.room;
        this.svgns = 'http://www.w3.org/2000/svg';
        this.xlinks = 'http://www.w3.org/1999/xlink';
    }
    
    draw(){        
        let useTag = document.createElementNS(this.svgns,'use');
        useTag.setAttributeNS(this.xlinks,'href','#chair');
        this.room.appendChild(useTag);
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

    getRow(){
        return this.row;
    }
    getColumn(){
        return this.column;
    }
}

export default chair;