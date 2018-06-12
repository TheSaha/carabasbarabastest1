<!DOCTYPE html>
<html>
  <head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

    <meta charset="utf-8">
	
    <title>Название документа</title>
    <style>
      #AirDropInfo {
        background: rgba(102, 102, 102, 0.5);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: none;
		
      }
      #wnd2 {
        width: 480px;
        height: 400px;
        text-align: center;
        padding: 105px;
		left: 550px;
		background-image: url(http://localhost/template/img/DropS.png);
		background-size: cover;
        color: #FFFFFF;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
text-shadow: 1px 0 1px #000, 
0 1px 1px #000, 
-1px 0 1px #000, 
0 -1px 1px #000;

        
      }
      #AirDropInfo:target {display: block;}

	  
    </style>
  </head>
 
  <body>

    <div id="AirDropInfo" onClick="window.location.href='#'">
      <div id="wnd2">
        <h1>What is AirDrop?</h1><br>
		
		<h2>	  AirDrop is the ability to regularly get free coins!<br>  	 When opened gives a random number of coins.<br>
   To get the AirDrop you need to play roulette.  	 <br>Place your bets, get AirDrop, open it and get free coins! </h2>
      </div>
    </div>
     
    <a href="#AirDropInfo">Вызвать всплывающее окно</a>
	
	
	
	
<p id="countdown">Осталось секунд: <span></span></p>
<button>Поехали!</button>

 
 <script>
 var countdown = $('#countdown span'),
    but = $('button'),
    timer;
function startCountdown(){
    var startFrom = 19;
    countdown.text(startFrom).parent('p').show();
    but.hide();
    timer = setInterval(function(){
        countdown.text(--startFrom);
        if(startFrom <= 0) {
            clearInterval(timer);
            countdown.text('приехали');
            but.show();
        }
    },1000);
}

</script>
 
 
  </body>
</html>