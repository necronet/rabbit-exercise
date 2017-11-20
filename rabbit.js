const garden = [[5, 7, 8, 6, 3],
 [0, 0, 7, 0, 4],
 [4, 6, 3, 4, 9],
 [3, 1, 0, 5, 8]]

 const AWAKE = 0;
 const SLEEPING = 2;

 rabbit = {
    state:AWAKE,
    carrots_eaten:0,
    garden: garden,
    col:0,
    row:0,
    moveTo:function(coords) {
      this.col = coords.col;
      this.row = coords.row;
    },
    eat:function() {
      //don't attempt to do anything while rabbit is sleeping game over
      if(this.state==SLEEPING) {
        console.log("Game over the rabbit is sleeping");
        return;
      }
      this.carrots_eaten += this.garden[this.row][this.col];
      //the rabbit eat this carrot so there will be no left in this spot
      this.garden[this.row][this.col] = 0;
      this.move();
    },

    move: function(){
      const maxInRow = get_max_carrots(this.garden,[this.row - 1, this.row + 1],[this.col]);
      const maxInCols = get_max_carrots(this.garden,[this.row],[this.col-1, this.col+1]);

      if(maxInRow.carrots > maxInCols.carrots) {
        this.col = maxInRow.col;
        this.row = maxInRow.row;
      } else {
        this.col = maxInCols.col;
        this.row = maxInCols.row;
      }

      if(maxInRow.carrots==0 && maxInCols.carrots==0) {
        this.state = SLEEPING;
      }

    }
  };

function get_max_carrots(garden,centerRows,centerCols) {
  maxCarrots = 0;
  colInit = 0;
  rowInit = 0;

  for(i = 0 ; i< centerRows.length; i++) {
      if(centerRows[i]<0) continue;
      for(j = 0 ; j< centerCols.length; j++) {
        if(centerCols[j]<0) continue;
        carrotsAtPosition = garden[centerRows[i]][centerCols[j]];
        if(carrotsAtPosition>maxCarrots){
          maxCarrots=carrotsAtPosition;
          rowInit = centerRows[i];
          colInit = centerCols[j];
        }
    }
  }
  return {col:colInit, row:rowInit, carrots:maxCarrots};
}

function init(garden) {
  const rowsNum = garden.length
  const colsNum = garden[0].length

  const centerCols = [Math.ceil(colsNum/2)-1];
  const centerRows = [Math.ceil(rowsNum/2)-1];

  if(rowsNum % 2 == 0)
      centerRows.push(centerRows[0]+1);
  if(colsNum % 2 == 0)
      centerCols.push(centerRows[0]+1);

  return get_max_carrots(garden, centerRows,centerCols);
}

initial_coords = init(garden);
rabbit.moveTo(initial_coords);
while(rabbit.state == AWAKE) {
  rabbit.eat();
}
