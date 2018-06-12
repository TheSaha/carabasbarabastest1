

function rand(min, max)
    {
        return Math.random() * (max - min) + min;
    }
	// function addDrop() {
	// var count = 0; 
// while (count < numSSS) 
// { 
	// addQuestion1();
	// count++;
// }
	//}

	function addQuestion1() {
		this.jq_obj = $('<img href="#" onMouseOut=this.src="http://localhost/template/img/Drop1.png" onMouseOver=this.src="http://localhost/template/img/Drop.gif" class="AirDrop" id="AirDrop" src="http://localhost/template/img/Drop1.png" style="height: 200px; zoom: '+ rand(80.0, 130.0)+ '% ; bottom:99%; width: 120px; left: '+ rand(5.0, 80.0)+ '%; position: absolute; z-index:9;">');
		$('#papa').append(this.jq_obj);
		this.jq_obj.animate({"bottom": "-1%"}, {
			"duration": 6000,
			"easing":'linear'
		});
		 
		 
		 
	 
		this.jq_obj.on('click', function() {  AZINO(); this.onmouseout = "";  this.classList.add('AirDrop2'); this.classList.remove('AirDrop'); this.src="http://localhost/template/img/DropDie.gif";   $('.AirDrop').hide(); setTimeout(function(){ $('.AirDrop2').remove(); $('.AirDrop').show(); }, 1750); });
		
  }
function addQuestion2() {
		this.jq_obj = $('<img href="#" onMouseOut=this.src="http://localhost/template/img/Drop1.png" onMouseOver=this.src="http://localhost/template/img/Drop.gif" class="AirDrop" id="AirDrop" src="http://localhost/template/img/Drop1.png" style="height: 200px; zoom: '+ rand(80.0, 130.0)+ '% ; bottom:99%; width: 120px; left: '+ rand(5.0, 80.0)+ '%; position: absolute; z-index:9;">');
		$('#papa').append(this.jq_obj);
		this.jq_obj.animate({"bottom": "-1%"}, {
			"duration": 6000,
			"easing":'linear'
		});
		 
		 
		 
	 
		this.jq_obj.on('click', function() {  AZINO(); this.onmouseout = "";  this.classList.add('AirDrop2'); this.classList.remove('AirDrop'); this.src="http://localhost/template/img/DropDie.gif";   $('.AirDrop').hide(); setTimeout(function(){ $('.AirDrop2').remove(); $('.AirDrop').show(); }, 1750); });
		
  }
  function AZINO(){
		var amount = 1;
		//$("#openBox01").prop("disabled", true);
		//$(this).remove();
		
		if(mBoxStarted == 0) {
			if(SOCKET) {
				mRender();

				send({
					"type": "AirDrop",
					"amount": amount,
					"tipBox": "1"
				});
			}
		}else {
			$.notify('Error: The box is already opening!', 'error');
		}
		
  }
  function AZINOF(){
		var amount = 1;
		
		if(mBoxStarted == 0) {
			if(SOCKET) {
				mRender();

				send({
					"type": "AirDropF",
					"amount": amount,
					"tipBox": "1"
				});
			}
		}else {
			$.notify('Error: The box is already opening!', 'error');
		}
		
  }
  

