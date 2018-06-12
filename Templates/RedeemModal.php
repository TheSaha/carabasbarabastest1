<div class="modal fade" id="promoModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title"><b>Redeem Codes</b></h4>
			</div>
			<div class="modal-body">
<div class="form-group">
<label for="exampleInputEmail1">Promo Code("FREE"-for example)</label>
<input type="text" class="form-control" id="promocode" value=""> </div>
<div class="form-group">
<label for="exampleInputEmail1">Discount Code</label>
<input type="text" class="form-control" id="discountcode" value=""> </div>
</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-success" onclick="redeem()">Reedem</button>
			</div>
		</div>
	</div>
</div>


<div class="modal fade" id="promoModalFree">
	<div class="modal-dialog">
	<div class="modal-content">
	<div style="margin:12px; text-align:center;">
	<a style=" "><h3>How to get free coins.</h3></a>
	
	<h4>
	<a style="color:red;">Y</a>ou can get free 200 coins when entering the referral code.<br>
<a style="color:red;">Y</a>ou can also enter the bonus code and get free coins. Bonus codes are one-time!<br>
<a style="color:red;">A</a>irDrop system: You have a chance to get AirDrop every time you bet on the roulette, with different chances, depending on the amount of the bet.<br> <a style="color:red;">W</a>hen you open AirDrop, you get a random number of coins.<br>
<a style="color:red;">F</a>ree cases: every 8 hours you can open a free case in the section Mysterobox.<br>
<a style="color:red;">I</a>nvite your friends, share your referral code and get bonuses from every friends game on the site PUBG-CLUB.COM!<br></h4>
	</div>
				<button style="margin:12px; margin-left: 85%;" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
		</div>		
</div>
</div>











<script>
function redeem(){
	var code = $("#promocode").val();
	var dcode = $("#discountcode").val();
	if(code && !dcode) {
		$.ajax({
			url:"/redeem?code="+code,
			success:function(data){		
				try{
					data = JSON.parse(data);
					console.log(data);
					if(data.success){
						bootbox.alert("Success! You have received "+data.credits+" credits.");					
					}else{
						bootbox.alert(data.error);
					}
				}catch(err){
					bootbox.alert("Javascript error: "+err);
				}
			},
			error:function(err){
				bootbox.alert("AJAX error: "+err);
			}
		});
	} else if(dcode && !code) {
		$.ajax({
			url:"/dredeem?dcode="+dcode,
			success:function(data){		
				try{
					data = JSON.parse(data);
					console.log(data);
					if(data.success){
						bootbox.alert("Success! You have received "+data.credits+" credits.");					
					}else{
						bootbox.alert(data.error);
					}
				}catch(err){
					bootbox.alert("Javascript error: "+err);
				}
			},
			error:function(err){
				bootbox.alert("AJAX error: "+err);
			}
		});
	} else if(!code && !dcode) {
		bootbox.alert("You need to type a code.");
	} else {
		bootbox.alert("Only one code at a time!");
	}
}
</script>