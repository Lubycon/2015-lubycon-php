<link href="./pages/view/sign_in/login_page.css" rel="stylesheet" type="text/css" />
<script src="./pages/view/sign_in/login_page.js"></script>
<div id="loginWrap">
    <div id="login_box">
        <header id="intro_wrap">
            <a href="index.php">
                <figure id="logo_lubycon"></figure>
            </a>
        </header>
        <form id="main_login" name="main_login" method="post" action="./pages/controller/sign_in/sign_in.php">
            <div id="login_input">
                    <input type="text" id="login_id" name="login_id" value="E-mail"/><i id="email_icon" class="fa fa-user"></i>
                    <input type="password" id="login_pass" name="login_pass" value="Password" /><i id="pass_icon" class="fa fa-key"></i>
            </div> <!-- end login_input div --> 
            <button type="submit" id="login_lubycon" class="animate_width"><i class="fa fa-unlock-alt"></i></button><!--submit bt-->
        </form><!--end login_input form-->
        <p id="create_acc">Create An Account</p> 
        <a href="./service/view/find_password.php" target="_self"><p id="forgot_pass">Forgot your password?</p></a>          
    </div>  <!-- end login_box div -->
</div>
 
