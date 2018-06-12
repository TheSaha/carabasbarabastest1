<html><body>
<?
require_once ("recaptchalib.php");

// get a key at http://www.google.com/recaptcha/mailhide/apikey
$mailhide_pubkey = '01IuTuveshE03gkuTtLeztGg==';
$mailhide_privkey = '261b2a0840a730e0fec2e957e8784fcc';

?>

The Mailhide version of example@example.com is
<? echo recaptcha_mailhide_html ($mailhide_pubkey, $mailhide_privkey, "newg4me178@gmail.com"); ?>. <br>

The url for the email is:
<? echo recaptcha_mailhide_url ($mailhide_pubkey, $mailhide_privkey, "newg4me178@gmail.com"); ?> <br>

</body></html>
