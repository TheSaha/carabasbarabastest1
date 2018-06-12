
<html lang="en"><head>

		<meta name="keywords" content="pubg ,fortune ,skins, roulette ,win ,gamble, roll, crash, coinflip, free ,reward, рулетка, пубг, скины, gambling ,referral">
<meta http-equiv="keywords" content="pubg ,fortune ,skins, roulette ,win ,gamble, roll, crash, coinflip, free ,reward, рулетка, пубг, скины, gambling ,referral">
<meta name="description" content="Gamble your old PUBG skins and take anyway new skins in PUBG.">
<meta http-equiv="description" content="Gamble your old PUBG skins and take anyway new skins in PUBG.">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Withdraw</title>

		<link href="http://localhost/template/css/bootstrap.min.new.css" rel="stylesheet">
		<link href="http://localhost/template/css/font-awesome.min.css" rel="stylesheet">
		<link href="http://localhost/template/css/dataTables.bootstrap.min.css" rel="stylesheet">

		<link href="http://localhost/template/css/mineNew.css?v=5" rel="stylesheet">
		<link id="style" href="" rel="stylesheet">

		<link rel="shortcut icon" href="favicon.ico">

		<script src="http://localhost/template/js/jquery-1.11.1.min.js"></script>
		<script src="http://localhost/template/js/jquery.cookie.js"></script>
		<script src="http://localhost/template/js/bootstrap.min.js"></script>
		<script src="http://localhost/template/js/bootbox.min.js"></script>
		<script src="http://localhost/template/js/jquery.dataTables.min.js"></script>
		<script src="http://localhost/template/js/dataTables.bootstrap.js"></script>
		<script src="http://localhost/template/js/tinysort.js"></script>
		<script src="http://localhost/template/js/expanding.js"></script>
		<script src="http://localhost/template/js/theme.js"></script>
		<?php include "Templates/Settings.php"; ?>
		
		
	
	
		

		<style>
			.reject{
				opacity:0.5;
			}
			.reject .price{
				background-color: #d21 !important;
				left: 0px !important;
			}
		</style>
		<script type="text/javascript">
			var DEPOSIT = false;			
		</script>

		<!-- <script src='https://www.google.com/recaptcha/api.js'></script> -->	
		
		
		<script type="text/javascript" src="http://localhost/template/js/offers.js?v=106"></script>
		
  <script type="text/javascript">
  

//			function loadCallback() {
//        grecaptcha.render('example3', {
//        'sitekey' : '6LfNPjQUAAAAAMCZv2fmYK9qQ2dL3UyG2IXptemQ',
 //       'callback' : function(response) {
//			  none();
//		  },
//        });
//	};


       
	  		
		</script>
		
				
	</head>
	<body style="padding-bottom: 25%; margin-bottom: 62px; background-attachment:fixed;">
	
		<nav class="navbar navbar-default navbar-static-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<!-- <a class="navbar-brand" style="padding-top:0px;padding-bottom:0px;padding-right:0px" href="./"><img alt="CSGO.mk" height="34" style="margin-top:8px;margin-bottom:8px;margin-right:5px" src="http://localhost/template/img/just.png"></a> -->
            <a class="navbar-brand" href="http://localhost/"><div id="logo" class="logo"></div></a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
		<?php include "Templates/Header.php"; ?>
		<?php include "Templates/UserPanel.php"; ?>
		
		</div>
	</div>
</nav>

<div class="modal fade" id="my64id">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><b>My Steam64Id</b></h4>
			</div>
			<div class="modal-body">
				<b><?=($user)?$user['steamid']:''?></b>			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal">x</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="settingsModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><b>Settings</b></h4>
			</div>
			<div class="modal-body">
				<form>	  			        	
								  
				  	<div class="checkbox">
				    	<label>
				      		<input type="checkbox" id="settings_confirm" checked>
				      		<strong>Confirm all bets over 10,000 coins</strong>
				    	</label>
				  	</div>
				  	<div class="checkbox">
				    	<label>
				      		<input type="checkbox" id="settings_sounds" checked>
				      		<strong>Enable sounds</strong>
				    	</label>
				  	</div>
				  	<div class="checkbox">
				    	<label>
				      		<input type="checkbox" id="settings_dongers">
				      		<strong>Display in $ amounts</strong>
				    	</label>
				  	</div>
				  	<div class="checkbox">
				    	<label>
				      		<input type="checkbox" id="settings_hideme">
				      		<strong>Hide my profile link in chat</strong>
				    	</label>
				  	</div>
				  
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-success" onclick="saveSettings()">Save changes</button>
			</div>
		</div>
	</div>
</div>

<?php include "Templates/RedeemModal.php"; ?>


<div class="modal fade" id="chatRules">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><b>Chat Rules</b></h4>
			</div>
			<div class="modal-body" style="font-size:24px">				  
				<ol>
					<li>No Spamming</li>
					<li>No Begging for Coins</li>
					<li>No Posting Promo Codes</li>
					<li>No CAPS LOCK</li>
					<li>No Promo Codes in Profile Name</li>
					</ol>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success btn-block" data-dismiss="modal">Got it!</button>
			</div>
		</div>
	</div>
</div>
<script>
function saveSettings(){
	for(var i=0;i<SETTINGS.length;i++){
		setCookie("settings_"+SETTINGS[i],$("#settings_"+SETTINGS[i]).is(":checked"));
	}
	$("#settingsModal").modal("hide");
	if($("#settings_dongers").is(":checked")){
		$("#balance").html("please reload");
	}else{
		$("#balance").html("please reload");
	}
}
</script>
		<div class="modal fade" id="confirmModal">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <div class="close" data-dismiss="modal">×</div>
		                <h4 class="modal-title"><b>Confirm</b></h4>
		            </div>
		            <div class="modal-body">                           
		                <label>Tradelink - <a href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">Find my trade</a></label>
						<input type="text" class="form-control steam-input" id="tradeurl" value="<?=$_COOKIE['tradeurl']?>">
						<div class="checkbox">
					    	<label>
					      		<input type="checkbox" id="remember" checked=""> Remember tradelink
					    	</label>
						</div>
		            </div>
		            <div class="modal-footer">
		            <button class="btn btn-danger" data-dismiss="modal">Close</button>
		            <button class="btn btn-success" id="offerButton" onclick="offer()">Confirm</button>                
		            </div>
		        </div> 
		    </div>
		</div>	   			
		<div class="text-center">					
			<div style="display:inline-block">
<div class="alert alert-danger text-center">
  <b><i class="fa fa-exclamation-triangle"></i>  If you will cancel trade offer, the coins won't be credited! Technical work on the website now! BOT2 OFFLINE!</b>
</div>


    <!--<form method="post" action="capt.php">
			<?php
			//require_once('recaptchalib.php');
			//$publickey = "6LfNPjQUAAAAAMCZv2fmYK9qQ2dL3UyG2IXptemQ"; // you got this from the signup page
			//echo recaptcha_get_html($publickey);
			?>
        <input type="submit" />
    </form>-->



<!--	<form action="example-captcha.php" method="POST">
      <div id="example3"></div>
      <br>
    </form> -->
	<form>
    <script type="text/javascript">
      var verifyCallback = function(response) {
        setTimeout(ApareInventar, 2000);
		function ApareInventar() {
			$(".norobots").slideUp();
			loadLeft();
			document.getElementById('inlineAlert').style.display = 'block';
		};
		
      };
      var widgetId1;
      var widgetId2;
      var onloadCallback = function() {
        // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
        // The id of the reCAPTCHA widget is assigned to 'widgetId1'.

        grecaptcha.render('example3', {
          'sitekey' : '6LfNPjQUAAAAAMCZv2fmYK9qQ2dL3UyG2IXptemQ',
          'callback' : verifyCallback,
          'theme' : 'dark'
        });
      };
    </script>
	    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
        async defer>
    </script>
	</form>
	
	
	 
	
	
 <!-- <div id="cap4" class="g-recaptcha" data-sitekey="6Le9hjIUAAAAANGO6rpJUvAbqmUhKTYGtImma2pt"></div> -->
		<div class="alert alert-info text-center norobots">
			<b>Please complete the following CAPTCHA to continue:</b><br><br>
			
			 <div id="example3" class="g-recaptcha" style="display:inline-block" ></div>
		</div>
 
      </form>
	  
<div id="inlineAlert" class="alert alert-danger" style="display:none"  ><i class="fa fa-check"></i><b> Loading items...</b>
</div>

				
				
				<div class="panel panel-default text-left" id="offerPanel" style="display:none">
				  	<div class="panel-heading">
						<h3 class="panel-title"><b>Trade offer sent <i class="fa fa-download"></i></b></h3>
				  	</div>
  					<div class="panel-body">
						<span id="offerContent" style="line-height:34px"></span>
						<div class="pull-right"><button class="btn btn-success" id="confirmButton" data-tid="0">Complete</button></div>
						<div><b style="color:red">Please click confirm after accepting the trade.</b></div>
					</div>
					<br>
					
				</div>

				<div class="panel panel-default text-left fw-6">
					<div class="panel-heading">
						<h3 class="panel-title"><b>Bank : <span id="left_number">0</span> items</b></h3>
					</div>
					<div class="panel-body">				
						
			            <div class="btn-group" id="botFilter" style="margin-bottom:10px">
			            	<label class="btn btn-default active" data-bot="0">All</label>
			            	<?php
			            		foreach ($bots as $key) {

			            	?>
			            	<label class="btn btn-default" data-bot="<?=$key?>">Bot <?=$key?></label>
			            	<?
			            		}
			            	?>
			            </div>
			            
						<div style="margin-bottom:10px">						
							<div style="display:inline-block;float:right">
								<form class="form-inline">
									<select class="form-control" id="orderBy">
										<option value="0">Default</option>
										<option value="1">Price descending</option>
										<option value="2">Acending price</option>
										<option value="3">Name A-Z</option>
										<option value="0">Novelty</option>
									</select>
								</form>
							</div>				
	  						<div style="overflow:hidden;padding-right:2px">
	    						<input type="text" class="form-control" id="filter" placeholder="Search..." style="width:100%">
	   						</div>
   						</div>  																										
						<div id="left" class="slot-group noselect">
							<span class="reals"></span>
							<span class="bricks">
							
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								<div class="placeholder"></div>
								
							</span>		
						</div>						
					</div>
					
				</div>
				<div class="panel panel-default text-left fw-4" style="vertical-align:top">
					<div class="panel-heading">
						<center><h3 class="panel-title"><b>Coins: <span id="sum">0</span> | Balance : <span id="avail">0</span></b></h3></center>
					</div>
		 <!--| Available: <span id="manmanavail">0</span> -->			
					<div class="panel-body">
					
						<button class="btn btn-danger btn-lg" style="width:100%" onclick="showConfirm()" id="showConfirmButton"><h3>WITHDRAW</h3></button>
									
					
					</div>						
				</div>
			</div>
		</div>
	<?php include "Templates/Agreement.php"; ?>
	<?php include "Templates/Footer.php"; ?>	
	<!--<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
        async defer>
    </script>-->
	
</body></div>
</html>