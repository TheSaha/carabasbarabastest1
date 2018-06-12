		
<link href="http://localhost/template/css/old.css" rel="stylesheet">
		<ul class="nav navbar-nav">
		
		
		
<li><a style="font-size:110%; text-align:  center; margin-top:-9px;" class="fa fa-home" href="/"><br>&nbsp;Home</a></li>
<li><a style="font-size:110%; text-align:  center; margin-top:-9px;" class="fa fa-money" href="/deposit"><br>&nbsp;Deposit</a></li>
<li><a style="font-size:110%; text-align:  center; margin-top:-9px;" class="fa fa-shopping-cart" href="/withdraw"><br>&nbsp;Withdraw</a></li>
<li><a style="font-size:110%; text-align:  center; margin-top:-9px;" class="fa fa-check" href="/rolls"><br>&nbsp;Provably Fair</a></li>
<li><a style="font-size:110%; text-align:  center; margin-top:-9px;" class="fa fa-ticket" href="#" data-toggle="modal" data-target="#promoModal"><br>&nbsp;Redeem code</a></li>


				<!--<li class="butold" style=""><a href="/deposit"><i class="" aria-hidden="true"style="
    color: white;
    margin-left: 17px;
"></i><div id="deposit"  style="
    color: white;
">&nbsp;Deposit</div></a></li>

				<li class="butold" style=""><a href="/withdraw"><i class="fa fa-shopping-cart" aria-hidden="true"style="
    color: white;
    margin-left: 21px;
"></i><div id="widthdraw" style="
    color: white;
">&nbsp;Withdraw</div></a></li>

				<li class="butold" style=""><a href="/rolls"><i class="fa fa-check" style="
    color: white;
    margin-left: 30px;
"></i><div id="p" style="
    color: white;
">&nbsp;Provably Fair</div></a></li>

		<li class style>		<a href="#" data-toggle="modal" data-target="#promoModal" class="" style="
    color: #ffffff;
    background: #bf1c2d;
    border-radius: 9px;
    margin: 3px;
    box-shadow: 0px 1px 25px 1px rgb(157, 8, 8);
"><i class="fa fa-ticket fa-fw" aria-hidden="true" style="
    color: #ffffff;
    margin-left: 31px;
"></i><div id="code" style="">&nbsp;Redeem code</div></a></li>-->


















				<?php if($user['rank'] == 100) {?>
				<li class=""><a href="/apanel"><i class="fa fa-users" aria-hidden="true"></i>&nbsp;Admin Panel</a></li>
				<?php } ?>
				<?php if(($user['rank'] == "1") OR ($user['rank'] == "100")) {?>
				<li class=""><a href="/adminsupport"><i class="fa fa-ticket" aria-hidden="true"></i>&nbsp;Support Panel</a></li>
				<?php }else{ ?>
				<li class="" style="
    color: #ffffff;
    background: #bf1c2d;
    border-radius: 9px;
    margin: 3px;
    box-shadow: 0px 1px 25px 1px rgb(157, 8, 8);
">

<li><a style="font-size:110%; text-align:  center; margin-top:-9px;" class="fa fa-envelope-o" href="/support"><br>Support</a></li>
<li><a style="font-size:110%; text-align:  center; margin-top:-9px;"	 class="fa fa-book" href="/tos"><br>Tos</a></li>
<li><a style="font-size:110%; text-align:  center; margin-top:-9px; color:red;"	 class="fa fa-usd" href="#" data-toggle="modal" data-target="#promoModalFree"><br><b>&nbsp;Free coins</b></a></li>
<!--<a href="/support"><i class="fa fa-ticket" style="
    color: white;
    margin-left: 20px;
"></i><div id="support" style="
    color: white;
">&nbsp;Support</div></a></li>
<li class="" style="
    color: #ffffff;
    background: #bf1c2d;
    border-radius: 9px;
    margin: 3px;
    box-shadow: 0px 1px 25px 1px rgb(157, 8, 8);
">
<a href="/tos"><i class="fa fa-ticket" style="
    color: white;
    margin-left: 8px;
"></i><div id="support" style="
    color: white;
">&nbsp;TOS</div></a></li>-->


<!--<li onClick="window.location.href='#AirDropInfo'" class="" style="
height:30px;
width:36px;
    background-image: url(http://localhost/template/img/PrevDrop.png);
		background-size: cover;
    border-radius: 9px;
    margin: 3px;
    
">-->





				<?php } ?>
				
				
				
			</ul>
			