			<style>
				.sign-in {
				    font-size: 10px;
				    line-height: 30px;
				    margin: 0px auto 0;
				    width: 150px;
				    height: 40px;
				    background: linear-gradient(#d62521, #440b09);
				    border: 3px solid #d62521;
				    border-radius: 5px;
				    text-shadow: 0 0 20px rgba(255, 255, 255, .3);
				    -webkit-transition: .1s;
				    transition: .1s;
				    -webkit-transform: scale(1);
				    transform: scale(1);
				    cursor: pointer;
				    -webkit-user-select: none;
				    -moz-user-select: none;
				    -ms-user-select: none;
				    user-select: none;
				    box-shadow: 0 0 50px rgb(222, 42, 42);
				    overflow: hidden;
				    font-weight: 700;
				    text-transform: uppercase;
				    text-align: center;
				    color: #fff;
				}
			</style>
			<? if($user): ?>
				<ul href="http://localhost/profile" class="nav navbar-nav navbar-right"style="
    
margin-top:10px;
    height: 35px;
    width: 220px;
    border-radius: 10px;
">
						
					 <center><img class="rounded" style="top:10px;" src="<?=$user['avatar']?>"> <b><a class="nname" href="http://localhost/profile" style="color:white"><?=$user['name']?></a></b> <a href="#" data-toggle="modal" data-target="#settingsModal"><i class="fa fa-cog fa-fw"></i></a>  <a href="http://localhost/faq"><i class="fa fa-question">&nbsp;</i></a>  <a href="http://localhost/exit" class="logout-link"><i style="color:red;" class="fa fa-power-off"></i></a>
					 <br><!-- <div style="float:left; position: absolute; width: 28%;">&nbsp;&nbsp;lvl 55</div><div style=" height: 3px; background: green; width: 62%; float:right; margin-top:4%; margin-left:25%;"></div> -->
					 
					 <div><div id="lvl" style="margin-left:10%; float:left; width20%">lvl 00</div><div style=" z-index: 0; height: 3px; float:right; width: 69%;  margin-top:4%; background:gray; position: relative;"><div id="lvlprogress" style=" height:3px; z-index: 1; position: absolute; background: red; width:95%;" ></div></div></div>
					 <!--<a > My profile </a>--></center>
				</ul>
			<? else: ?>
			<?php if($_GET['page'] == 'main') {?>
				<ul class="nav navbar-nav navbar-right">
	            	<a style="cursor:pointer;"><div class="sign-in">Login with Steam</div></a>
				</ul>
			<?php }else{ ?>
			<ul class="nav navbar-nav navbar-right">
            	<a style="cursor:pointer;"><div>Login with Steam</div></a>
			</ul>
			<?php } ?>
			<? endif; ?>

<script>
	$(document).ready(function(){

		$('.sign-in').click(function(){
			$('#Agreement').modal('show');
		});


	});
</script>