
var clockRun;
var timeCounter=0;
var click=0;
var countDown = null;
var blinkSet;

/*Blink animation from stewart*/
function blink() {
   var f = document.getElementById('countdown');
   blinkSet = setInterval(function() {
      f.style.display = (f.style.display == 'none' ? '' : 'none');
   }, 300);
}


/* fade in fade out animation that begins with the start of the 
clock timer. Attached to div1 and div2*/
$(document).ready(function(){
    $("#start").click(function(){
        //fades
        $("#div1").fadeIn(); //fades div1 in at the default speed
        $("#div1").fadeOut("default");
        $("#div1").fadeIn("slow");
        $("#div1").fadeOut("slow");
    });
        $("#start").click(function(){
        //fades
        $("#div2").fadeIn(); //fades div2 in at the default speed
        $("#div2").fadeOut("default");
        $("#div2").fadeIn("slow");
        $("#div2").fadeOut("slow");
    });
});

function clock(){
        var time=new Date();
        var hour=time.getHours(),min=time.getMinutes();
        if(hour==0){
            hour=12;
        }else if(hour>12){
            hour-=12;
        }
        if(min<=9) min="0"+min;
        if(hour<=9) hour="0"+hour;
        document.getElementById('countdown').innerHTML=hour+":"+min;
    }
    
window.onload=function(){
    clock();
    clockRun=setInterval(clock,1000);
}

function clr(){
    click=0;
    clearInterval(blinkSet);
    document.getElementById('countdown').style.display="initial";
    clockRun=setInterval(clock,1000);
}
function pause()
{
    clearInterval(countDown);
    countDown=null;

}

function addTime(num){
    if(click==0){
        clearInterval(blinkSet);
        clearInterval(clockRun);
        click++
        time=num.value
        timeCounter="00:0"+time;
        //alert(timeCounter)
        document.getElementById('countdown').innerHTML=timeCounter;
    }else if(click==1){
        time=document.getElementById('countdown').innerHTML
        click++
        time=time.substring(4)
        time+=num.value
        timeCounter="00:"+time;
        //alert(timeCounter)
        document.getElementById('countdown').innerHTML=timeCounter;
    }else if(click==2){
        time=document.getElementById('countdown').innerHTML
        click++
        time=time.substring(3)
        time+=num.value
        timeCounter="0"+time.substring(0,1)+":"+time.substring(1,3);
        //alert(timeCounter)
        document.getElementById('countdown').innerHTML=timeCounter;
    }else if(click==3){
        time=document.getElementById('countdown').innerHTML
        time=time.substring(1)
        time=time.replace(':', '')
        time+=num.value
        timeCounter=time.substring(0,2)+":"+time.substring(2,4)
        //alert(timeCounter)
        document.getElementById('countdown').innerHTML=timeCounter;
    }
}
function startTimer() {
    if (countDown===null){
    split_list = document.getElementById('countdown').innerHTML.split(":").map(Number);
    
    var mins = split_list[0];
    var secs = split_list[1];

    
    clearInterval(countDown);
    
    countDown = setInterval(function() 
    {
        // initiating timer.(Zero-padding included)
    document.getElementById('countdown').innerHTML = ((mins.toString().length < 2 ? "0" + mins : mins) + ":" + (secs.toString().length < 2 ? "0" + secs : secs));
        
        if (secs == 0) 
        {
            mins--;
            secs = 59;
        }
        if(mins < 0) 
        {

            var audio= new Audio("audio/ding.wav");

            audio.play();

            blink();

            document.getElementById('countdown').innerHTML = ("DONE");

            click=0;

            clearInterval(countDown);
            
                    
        }
        secs--;
        
    }, 1000);
    } 
};

