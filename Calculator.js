function show(num){
	document.getElementById('display').value += num.value;
}
function blank(){
	document.getElementById('display').value = "";
}
function keyLimit(){
	var calcString = document.getElementById('display').value
	var calcReplace = calcString.replace(/[^0-9|+|\-|*|/|^|(|)|\.]/, "");
	document.getElementById('display').value = calcReplace
}
function handleKeyPress(event){
	var code = event.charCode || event.keyCode;
	//alert(event.keyCode)
    if (code == 27) {
        blank();
    }
	if(code == 13){
		calc();
	}
	
}
function sqrt(){
    calc()
    var numString = document.getElementById('display').value
	  var numInt = parseFloat(numString);
       document.getElementById('display').value = Math.sqrt(numInt);
}
function sq(){
    calc()
    var numString = document.getElementById('display').value
	  var numInt = parseFloat(numString);
	   document.getElementById('display').value = Math.pow(numInt,2);
}
function ln(){
    calc()
    var numString = document.getElementById('display').value
	  var numInt = parseFloat(numString);
	   document.getElementById('display').value = Math.log(numInt);

}
function sin(){
    calc()
    var numString = document.getElementById('display').value
	  var numInt = parseFloat(numString);
	   document.getElementById('display').value = Math.sin(numInt)
}
function cos(){
    calc()
    var numString = document.getElementById('display').value
	  var numInt = parseFloat(numString);
	   document.getElementById('display').value = Math.cos(numInt)
}
function tan(){
    calc()
    var numString = document.getElementById('display').value
	  var numInt = parseFloat(numString);
	   document.getElementById('display').value = Math.tan(numInt)
}


function calc(){
    var calcString = document.getElementById('display').value
	if(divZero(calcString)){ // div by 0 check
		alert("You cannot divide by 0");
		return false;
	}else if(!validBracket(calcString)){ //bracket match check
		alert("Your brackets don't match");
		return false;
	}else if(calcStart(calcString)){ //don't start with operator check except for -
		alert("You cannot start calculation with an operator")
	}else if(doublePeriod(calcString)){ //won't allow 2 periods between operators
		alert("You cannot have 2 periods between operators")
	}else if(doubleOp(calcString)){ //won't allow 2 oerators to next to each other
		alert("You cannot have 2 operator together")
	}else{
        var calcReplace = calcString.replace(/\^/, "**");
		document.getElementById('display').value = eval(calcReplace);
	}

}
//check that a number is not divide by 0, allows for numbers to be divide by 0.x
function divZero(num){
	var calcRegex = /[/]+0(?!.\d)/;
	return calcRegex.test(num);
}

//check that open and close brackets matchup
function validBracket(num){
	var bracket = "()";
	var stack = []
	for(i=0; character=num[i]; i++){
		bracketPos = bracket.indexOf(character);
		if(bracketPos === -1){
			continue;
		}
		if(bracketPos % 2 === 0){
			stack.push(bracketPos + 1);
		}else{
			if(stack.pop() !== bracketPos){
				return false;
			}
		}
	}
	return stack.length === 0;
}

//check that calculation doesn't begin with operator except for -
function calcStart(num){
	opArray=["+","/","*","^"]
	for(i=0; i<opArray.length; i++){
		if(num[0] == opArray[i]){
			return true;
		}		
	}
}

//this method only checks for 2 periods beside each other
//new method also makes sure you don't have 2 periods anywhere between operators
//check that 2 periods aren't next to each other
/*function doublePeriod(num){
	var periodRegex = /\.+\./;
	return periodRegex.test(num);
}*/

//check that there isn't 2 periods between operators
function doublePeriod(num){
   	var periodCount=0;
	for(i=0; character=num[i]; i++){
		if(character=="."){
			periodCount++
			if(periodCount>=2){
				return true
			}
		}else if(character=="+"||character=="-"||character=="*"||character=="/"||character=="^"){
			periodCount=0;
		}
	};
};

//check that 2 operators aren't next to each other
function doubleOp(num){
	/*var opArray = ["+","-","*","[/]","^"]
	for(i=0; i<opArray.length; i++){
		for(x=0; x<opArray.length; x++){
			var opCheck1 = opArray[i];
			var opCheck2 = opArray[x];
			var opRegex = new RegExp(opCheck1 + opCheck2);
			alert(opRegex)
			if(opRegex.test(num)){
				return true;
			}
		}
	}*/ //i don't know why this isn't working
	var opRegex = /\++\+|\++\*|\++[/]|\++\^|\-+\+|\-+\*|\-+[/]|\-+\^|\*+\+|\*+\*|\*+[/]|\*+\^|[/]+\+|[/]+\*|[/]+[/]|[/]+\^|\^+\+|\^+\*|\^+[/]|\^+\^/
	return opRegex.test(num);
}