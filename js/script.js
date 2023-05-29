var btn = $('#start');
var reset = $('#stop');
var outerDiv;
var flag = 0;
var xFlag = 0;
var turn = $('#whoes-turn');
var counter = 0;
var grid;
var clrDiv;
var whoTurn;
var whoNextTurn;
var winCountX = 0;
var winCountO = 0;

btn.click(function(){
	grid = $('#dropdown-menu option:selected').val();
	if(grid!=0){
		$('#welcome').remove();
		$('#choseGridMsg').remove();
		$('#dropdown-menu').prop('disabled', true);
		$('#score-turn').css('display','block');
		if(flag == 0){
			createGrid();
			flag =1;
		}else{
			outerDiv.remove();
			createGrid();
			flag =1;
		}
	}
});

function createGrid(){
	outerDiv = $('<div>');
	outerDiv.css('width', (130*grid+grid*10));
	outerDiv.css('height', (130*grid+grid*10));
	outerDiv.css('margin', '50px auto');

	$('#container').append(outerDiv);

	for(var i=1; i<=grid; i++){
		for(var j=1; j<=grid; j++){
			addDynamicGrid(i,j);
		}
	}
	clrDiv = $('<div>');
	clrDiv.css('clear', 'both');
	$('#container').append(clrDiv);
};

//dynamic grid created
function addDynamicGrid(a,b){
	var dynamicGrid = $('<div id="box'+a+'_'+b+'"></div>');
		dynamicGrid.css({'width':'130px','height':'130px','margin':'2.5px','background-color':'white','float':'left','cursor':'pointer'});

	outerDiv.append(dynamicGrid);

	//hover on grid
	dynamicGrid.mouseover(function(){
		dynamicGrid.css('background-color', '#dbd4d4');
	});

	dynamicGrid.mouseout(function(){
		dynamicGrid.css({'background-color':'white'});
	}); 
	
	//X & O printing logic
	dynamicGrid.click(function(){
		if(dynamicGrid.text() != ""){
		//	dynamicGrid.disabled = true;
		}else if(xFlag == 0){
			dynamicGrid.css({'font-size':'110px','text-align':'center'}).text("X");
			xFlag = 1;
			whoTurn = "X";
			whoNextTurn = "O";
			turn.text("Now O's Turn");
			winningCondition();
		}else{
			dynamicGrid.css({'font-size':'110px','text-align':'center'}).text("O");
			xFlag = 0;
			whoTurn = "O";
			whoNextTurn = "X";
			turn.text("Now X's Turn");
			winningCondition();
		}
	}); 
}

//winning staisfactory conditions
function winningCondition(){
	var k = parseInt(grid)+1;
	var draw = 0;
	var wFlag = 0;
	//row
	for(var i=1; i<= grid; i++){
		var winning= 0;
		for(var j=1; j<= grid; j++){
			if(($("#box"+i+'_'+j+"").text() == whoNextTurn) || ($("#box"+i+'_'+j+"").text() == "")){	
				break;
			}else if(($("#box"+i+'_'+j+"").text() == whoTurn)){
				winning++;
			}
		}
			if(winning == grid){ 
			wFlag = 1;
			win();
			points();
			break;
		}
	}
		
	//column
	for(var i=1; i<= grid; i++){
		var winningCol = 0;
		for(var j=1; j<= grid; j++){
			if(($("#box"+j+'_'+i+"").text() == whoNextTurn) || ($("#box"+j+'_'+i+"").text() == "")){	
				break;
			}else if(($("#box"+j+'_'+i+"").text() == whoTurn)){
				winningCol++;
			}
		}
		if(winningCol == grid){
			wFlag = 1;
			win();
			points();
			break;	
		}
	}

	//diagonal first
	for(var i=1; i<= grid; i++){
		var winningDiag = 0;
		for(var j=1; j<= grid; j++){
			if(($("#box"+j+'_'+j+"").text() == whoNextTurn) || ($("#box"+j+'_'+j+"").text() == "")){	
				break;
			}else if(($("#box"+j+'_'+j+"").text() == whoTurn)){
				winningDiag++;
			}
		}
		if(winningDiag == grid){
			wFlag = 1;
			win();
			points();
			break;
		}
	}

	//diagonal Second
	for(var i=1; i<= grid; i++){
		var winningDiagsec = 0;
		for(var j=1; j<= grid; j++){
		if(($("#box"+j+'_'+(k--)+"").val() == whoNextTurn) || ($("#box"+j+'_'+(k)+"").text() == "")){	
				break;
			}else if(($("#box"+j+'_'+(k)+"").text() == whoTurn)){
				winningDiagsec++;
			}
		}
		if(winningDiagsec == grid){
			wFlag = 1;
			win();
			points();
			break;
		}
	}

	//draw
	if(wFlag == 0){
		for(var i=1; i<= grid; i++){
			for(var j=1; j<= grid; j++){
				if(($("#box"+i+'_'+j+"").text() != "")){
					draw++;
				} 
			}if(draw == (grid*grid)){
				$('#popup').css('display','block');
				$('.Winpopup').css('display','block');
				$('#wins').text("Draw..!!");
			}
		}
	}
}

//winning msg popup
function win(){
	$('#popup').css('display','block');
	$('.Winpopup').css('display','block');
	$('#wins').text("Congratulations "+whoTurn+" Wins..!!")
}

//popup close
$('#popup').click(function(){
	resetValue();
	$('#popup').css('display','none');
	$('.Winpopup').css('display','none');
	$('#dropdown-menu').prop('disabled', false);
});

//score
function points(){
	if(whoTurn == "X"){
		winCountX++;
		$('#xPoints').text(winCountX);
	}else{
		winCountO++;
		$('#oPoints').text(winCountO);
	}
}

//stop
reset.click(function(){
	window.location.reload();
});

//reset
function resetValue(){
	for(var i=1; i<= grid; i++){
		for(var j=1; j<= grid; j++){
			if(($("#box"+i+'_'+j+"").text() != "")){
				$("#box"+i+'_'+j+"").text("");
			} 
		}
	}
}

$('#resetbtn').click(function(){
	resetValue();
	winCountX = 0;
	$('#xPoints').text(winCountX);
	winCountO = 0;
	$('#oPoints').text(winCountO);
});