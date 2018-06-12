<title>You are banned</title>
<center><h1>You are banned from this site!</h1></center><br>
Reason of ban: 

<?php if($user['ReasonBan'] == '') {
	echo "Unknown";
}else{
	echo $user['ReasonBan'];
}
	













?>