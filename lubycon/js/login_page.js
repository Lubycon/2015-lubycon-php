
var windowHeight = $(window).height();


$(document).ready(function(){
    var loginTest = getUrlParameter("login");
    console.log(typeof loginTest);
    if(loginTest === "0") alert("Please Login again");

	$("#bodyer").fadeIn(500);
});
/////////////////////////////////////////////////////////
//      sign in ajax start
/////////////////////////////////////////////////////////
$(document).ready(function(){
    $("#login_input").on('keypress', function(e) {
        if(e.which == 13) {// 13 == enter key@ascii
            $("#login_lubycon").click();
        };//if end
    });//keypress end
});    //ajax
function go_index(){
    //location.replace("../../index.php");
    location.href = "index.php";//just use for debuging
};
/////////////////////////////////////////////////////////
//      sign in ajax end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      create account bt popup event start (ajax)
/////////////////////////////////////////////////////////
$(function () { //create account bt popup event start
    $('#create_acc').hover(function (){
        $(this).stop().animate({ opacity: 0.8 }, 200);
    }, function (){
        $(this).stop().animate({ opacity: 1 }, 200);
    });

    $("#create_acc").click(function () {
        $.ajax({
            type: "POST",
            url: "php/ajax/create_account_popup.php", //이페이지에서 중복체크를 한다
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
});

/////////////////////////////////////////////////////////
//      create account bt popup event end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      before sign in input reset start
/////////////////////////////////////////////////////////

$(function () {//e-mail and password value reset start
    var emailbox = $('#login_id');
    var passbox = $('#login_pass');

    emailbox.focus(function () {
        if (emailbox.val() == 'E-mail') {
            emailbox.val('');
        }
        $('#email_icon').css('color','#48cfad');
    });
    emailbox.blur(function () {
        if (emailbox.val() == '') {
            emailbox.val('E-mail');
        }
         $('#email_icon').css('color','#b1b1b1');
    });

    passbox.focus(function () {
        if (passbox.val() == 'Password') {
            passbox.val('');
            passbox.attr('type', 'password');
        }
        $('#pass_icon').css('color','#48cfad');
    });
    passbox.blur(function () {
        if (passbox.val() == '') {
            passbox.val('Password');
            passbox.attr('type', 'text');
        }
        $('#pass_icon').css('color','#b1b1b1');
    });
});     //e-mail and password value reset end

/////////////////////////////////////////////////////////
//      before sign in input reset end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      before sign in input shiny start
/////////////////////////////////////////////////////////
$(function () {
    $('#email_id_find').focus(function () {
        $('#email_input label').css('color', '#48cfad');
    });
    $('#email_id_find').blur(function () {
        $('#email_input label').css('color', '#838282');
    });
});
/////////////////////////////////////////////////////////
//      before sign in input shiny end
/////////////////////////////////////////////////////////
$('#addcontent_bt').click(function () {
    $('.dark_overlay').stop().fadeIn(100);
    $('.editor_popup').css("display","block");
    $('.editor_popup').attr("class","editor_popup fadeInDown animated");
});
