<link href="./pages/view/sign_in/login_page.css" rel="stylesheet" type="text/css" />
<script src="./pages/controller/sign_in/login_page_renderer.js" type="text/javascript"></script>
<div id="loginWrap">
    <div id="login_box">
        <header id="intro_wrap">
            <a href="index.php">
                <figure id="logo_lubycon"></figure>
            </a>
        </header>
        <div id="login_input">
                <input type="text" id="login_id" name="login_id" value="E-mail"/><i id="email_icon" class="fa fa-user"></i>
                <input type="password" id="login_pass" name="login_pass" value="Password" /><i id="pass_icon" class="fa fa-key"></i>
        </div> <!-- end login_input div -->
        <button id="login_lubycon" class="animate_width"><i class="fa fa-unlock-alt"></i></button><!--submit bt-->
        <p id="create_acc">Create An Account</p>
        <a href="./index.php?dir=pages/view/sign_in/find_password" target="_self"><p id="forgot_pass">Forgot your password?</p></a>
    </div>  <!-- end login_box div -->
</div>
