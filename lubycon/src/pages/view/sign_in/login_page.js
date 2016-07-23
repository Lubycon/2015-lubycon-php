
$(document).ready(function(){

    Request({
	    url: "./service/controller/encrypt/RSA.php",
	    callback: init
	});

    function init(response){
        console.log(response);
    }
    /*$("#bodyer").fadeIn(500);

    detectLoginFail();
    detectEnterKey();
    loginInputAction();

    $("#create_acc").on("click",callCreateAccountWindow);

    function detectLoginFail(){
        if(getUrlParameter("login") === "0") {
            $(".alertKey.hidden").lubyAlert({
                autoDestroy: false,
                type: "message",
                icon: "fa-key",
                text: "Please Make sure your E-mail or Password",
                animation: "bounceInDown",
                fontSize: 15,
                cancelButton: false,
                okAction: function(){ location.href = location.href.replace("?login=0",""); }
            });
            console.log(window.location);
        }
    }

    function detectEnterKey(){
        $("#login_input").on("keypress",function(event){
            if(event.which === 13) $("#login_lubycon").trigger("click");
        })
    }
    function goToIndex(){
        location.href = "index.php";
    };
    function callCreateAccountWindow(){
        $.ajax({
            type: "POST",
            url: "./pages/controller/sign_up/create_account_popup.php", //이페이지에서 중복체크를 한다
            //data: "id=" + id,//test.asp에 id 값을 보낸다
            cache: false,
            success: function (data) {
                $('#bodyer').hide().prepend(data).fadeIn(500); //해당 내용을 보여준다
                $('.dark_overlay').fadeIn(500);
                $("#modal_close_bt").on("click",function(){
                    $('.dark_overlay').stop().fadeOut(500);
                     $('#create_account_area').stop().fadeOut(500).remove();
                });
                $(".locationFilter").lubySelector({
                    width: "100%",
                    theme: "white",
                    "float": "none",
                    searchBar: true,
                    "icon": "fa fa-globe"
                });
                initCheckbox();
            }
        });
        function initCheckbox(){
            var checkbox = $(document).find(".document_check_box"),
            checkbox2 = $(document).find(".email_resive");
            checkbox.lubyCheckbox({ switchs: false });
            checkbox2.lubyCheckbox();
        }

        $('.dark_overlay').on("click",function () {
            $('.dark_overlay').stop().fadeOut(500);
            $('#create_account_area').stop().fadeOut(500).remove();
        });
    }
    function loginInputAction(){
        var emailbox = $('#login_id');
        var passbox = $('#login_pass');

        emailbox.focus(function () {
            if (emailbox.val() === 'E-mail') {
                emailbox.val('');
            }
            $('#email_icon').css('color','#48cfad');
        });
        emailbox.blur(function () {
            if (emailbox.val() === '') {
                emailbox.val('E-mail');
            }
             $('#email_icon').css('color','#b1b1b1');
        });

        passbox.focus(function () {
            if (passbox.val() === 'Password') {
                passbox.val('');
                passbox.attr('type', 'password');
            }
            $('#pass_icon').css('color','#48cfad');
        });
        passbox.blur(function () {
            if (passbox.val() === '') {
                passbox.val('Password');
                passbox.attr('type', 'text');
            }
            $('#pass_icon').css('color','#b1b1b1');
        });
    }*/
});
