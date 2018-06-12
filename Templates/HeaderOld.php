		
<link href="http://localhost/template/css/old.css" rel="stylesheet">
		<ul class="nav navbar-nav">
				<li  class="butold" ><a href="/"><i  class="fa fa-home"style="
    color: white;
    margin-left: 13px;
"></i><div id="home" style="
    color: white;
">&nbsp;Home</div></a></li>
				<li class="butold" style=""><a href="/deposit"><i class="butold" aria-hidden="true"style="
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
				<!--<li class=""><a href="/dice"><i class=""></i>&nbsp;Dice</a></li>-->
				<li class="butold" style=""><a href="/rolls"><i class="fa fa-check" style="
    color: white;
    margin-left: 30px;
"></i><div id="p" style="
    color: white;
">&nbsp;Provably Fair</div></a></li>
				<!--<li class=""><a href="/affiliates"><i class="fa fa-user-plus"></i>&nbsp;Affiliates</a></li>-->
		<li class style>		<a href="#" data-toggle="modal" data-target="#promoModal" class="" style="
    color: #ffffff;
    background: #bf1c2d;
    border-radius: 9px;
    margin: 3px;
    box-shadow: 0px 1px 25px 1px rgb(157, 8, 8);
"><i class="fa fa-ticket fa-fw" aria-hidden="true" style="
    color: #ffffff;
    margin-left: 31px;
"></i><div id="code" style="">&nbsp;Redeem code</div></a></li>


















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


<a href="/support"><i class="fa fa-ticket" style="
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
">&nbsp;TOS</div></a></li>


<li onClick="window.location.href='#AirDropInfo'" class="" style="
height:60px;
width:72px;
    background-image: url(http://localhost/template/img/PrevDrop.png);
		background-size: cover;
    border-radius: 9px;
    margin: 3px;
    
">





				<?php } ?>
				
				
				
			</ul>
			