
$(document).ready(function(){
    $("#bodyer").fadeIn(500);

    init();

    function init(response,session){
        detectEnterKey();
        loginInputAction();

        $("#create_acc").on("click",callCreateAccountWindow);
        $("#login_lubycon").on("click",function(){
            signin();
        });
    }
    function signin(){
        var id = $("#login_id").val(),
            pass = $("#login_pass").val();

        if(id.isEmail() && pass.isPassword() === 0 || id === "admin"){ //admin is TEST CODE
            $("#loading_icon").show();
            Request({
                url: "./pages/controller/sign_in/sign_in.php",
                data: {
                    id: id,
                    password: pass
                },
                callback: action
            });
        }
        else{
            $(".alertKey").lubyAlert({
                type: "message",
                cancelButton: false,
                fontSize: 14,
                icon: "fa-key",
                text: "Please make sure your Email or Password.",
                autoDestroy: false
            });
        }

    }

    function action(res){
        console.log(res);
        $("#loading_icon").hide();
        if(res.result.code === "0000"){
            location.href = "./index.php";
        }
        else {
            console.log(res.result);
            $(".alertKey").lubyAlert({
                type: "message",
                cancelButton: false,
                fontSize: 14,
                icon: "fa-key",
                text: "Please make sure your Email or Password.",
                autoDestroy: false
            });
        }
    }

    function detectEnterKey(){
        $("#login_input").on("keypress",function(event){
            if(event.which === 13) $("#login_lubycon").trigger("click");
        });
    }

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
    }
});
