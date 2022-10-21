function memoryFlipTile(tile,val){
	if(tile.innerHTML === "" && memory_values.length < 2){
		tile.style.background = 'none';
		tile.innerHTML = '<img class="img-responsive" src="images/'+ val +'.png"/>';
		
		if(memory_values.length === 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		
		} else if(memory_values.length === 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);

			////// if it's a match... 
			if(memory_values[0] === memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];

            	/////////// TurnCount is increased and the next player is up
            	turnCount ++;
            	setTimeout(currentPlayer,500);
            	////// increase the appropriate player's score
            	if (playerID ===1){
            		$('#player1Score').html(player1Score++);	
            	} else {
            		$('#player2Score').html(player2Score++);
            	}
///// Check to see if the whole board is cleared/matched. If so, declare the winner!
if(tiles_flipped === memory_array.length){
    if (player1Score > player2Score) {
        swal({   title: "Player 1: #winning",   text: "Let's play again!",   imageUrl: "images/StrawberryMilkLgcopy.png" });

        ///// was having trouble with sweetAlert, leaving this commented normal alert in for now.
        //alert("Player 1: #winning. Let's play again!");   

    } else if (player2Score > player1Score) {

            swal({   title: "Heck yeah, Player 2!",   text: "Let's play again!",   imageUrl: "images/tigercopy.png" });

            ///// was having trouble with sweetAlert, leaving this commented normal alert in for now.
        //alert("Heck yeah, Player 2! Let's play again!");


    } else {
        swal({   title: "Well look at that. You're both winners.",   text: "Let's play again!",   imageUrl: "images/sabochan.png" });

        ///// was having trouble with sweetAlert, leaving this commented normal alert in for now, just in case.
        //alert("Well look at that. You're both winners! Let's play again!");

    };
    /////// clear the board, reset the turnCount, set newBoard.
    document.getElementById('gameboard').innerHTML = "";
    turnCount = 0;
    newBoard();
}
} else {

///// if it's not a match... 
function flip2Back(){
    // Flip the 2 tiles back over
    var tile_1 = document.getElementById(memory_tile_ids[0]);
    var tile_2 = document.getElementById(memory_tile_ids[1]);
    tile_1.style.background = 'url(images/starlogo.png) no-repeat center';
    tile_1.innerHTML = "";
    tile_2.style.background = 'url(images/starlogo.png) no-repeat center';
    tile_2.innerHTML = "";
    // Clear both arrays
    memory_values = [];
    memory_tile_ids = [];
}
setTimeout(flip2Back, 500);

//// increase the turn count, switch players.
    turnCount ++;
    setTimeout(currentPlayer,500);

}
}
}
};