# audio_visual_captcha

add the following CDN's
<link href='captcha/css/style.css' rel='stylesheet' type='text/css'>
<script src='https://code.responsivevoice.org/responsivevoice.js'></script>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.0.min.js"></script>
<script src="captcha/captcha_lib.js"></script>


from web page add this script
<script>
        window.onload = function init(){
            initCaptcha();
        };
</script>

place the this div block where to show the captcha
<div id="captcha_div"></div>
