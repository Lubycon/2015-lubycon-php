//----------------------------creat account statt----------------------------

var regx = /[`;',./~!@\#$%<>^&*\()\-=+_\’]/gi; //special letters
var space = / /gi //space check
var regex = /^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/; //email check
var only_alpha_number = /^[A-Za-z0-9+]*$/; //only alpabet, number

var email_com; //for submit able
var pass_com;
var pass1_com;
var now_pass_com; //account setting page check
var nick_com;
var focus_com;

function blank_function(current_id)
{
    // this function's run to blank input box and blur
    $(current_id).css({ 'border-left': 'none', 'width': '190px' });
    $(current_id).next().removeClass();
    $(current_id + "_check").text('').show();
};
function re_pass_blank_function(current_id)
{
    $('#re_pass_id').css({ 'border-left': 'none', 'width': '190px' });
    $('#re_pass_id').next().removeClass();
    $('#re_pass_id_check').text('').show();
}
function false_function(current_id)
{
    // this function's run to blank input box and blur
    $(current_id).css({ 'border-left': '5px solid #ec6446', 'width': '187px' });
    $(current_id).next().removeClass();
    $(current_id).next().addClass('fa fa-times');
};
function true_function(current_id)
{
    // this function's run to blank input box and blur
    $(current_id).css({ 'border-left': '5px solid #48cfad', 'width': '187px' });
    $(current_id).next().removeClass();
    $(current_id).next().addClass('fa fa-check');
};
$(document).on("click , blur", "#create_account_area input[type|='text'] , #create_account_area input[type|='password']", function ()
{
    focus_com = false;

    var current_id = '#' + $(this).attr('id');
    switch (current_id)
    {
        case '#email_id': email_check(current_id); break;
        case '#pass_id': pass_check(current_id); break;
        case '#re_pass_id': re_pass_check(current_id); break;
        case '#now_pass_id': now_pass_check(current_id); break;
        case '#nick_id': nick_check(current_id); break;
        default: break;
    }
});

$(document).on("blur", "#create_account_area input[type|='text'] , #create_account_area input[type|='password']", function ()
{
    focus_com = true;
});

function email_check(current_id) {
    /////////////////////////////////////////////////////////
    //      e-mail check start
    /////////////////////////////////////////////////////////
    var current_stat = $(current_id + "_check");
    var value = $(current_id).val();

    if (value == '') { //blank case

        email_com = false; 
        blank_function(current_id);

    } else if (regex.test(value) === false) { //wrong email address to regex

        $(current_stat).text('wrong email adress').show();
        false_function(current_id);
        email_com = false
    }
    else { //complite go ajax
        //enter to AJAX Logic by SsaRu
        $.ajax({
            type: "POST",
            url: "php/account/overlap_check.php",
            data: 'data=' + value + '&' + 'id=email',
            cache: false,
            success: function (data) {
                if (data == '') { //void value
                    console.log('DB return value empty');
                    console.log(data);

                    blank_function(current_id);
                    email_com = false;
                }
                else if (data == 1) { //overlapping
                    console.log('DB return value overlapping');
                    console.log(data);
                    
                    $(current_stat).text('Overlapping').show();
                    false_function(current_id);
                    email_com = false

                }
                else if (data == 0) { //Non-overlapping
                    console.log('DB return value non-overlapping, done');
                    console.log(data);
                    
                    //$(current_id).val($(current_id).val().toLowerCase()); // lowercase and uppercase same
                    true_function(current_id);
                    $(current_stat).text('').show();
                    email_com = true;
                }
                else {
                    console.log("return value error");
                    console.log(data);

                    email_com = false;
                }
            }
        })
    }
};
/////////////////////////////////////////////////////////
//      e-mail check end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      password check end
/////////////////////////////////////////////////////////
function pass_check(current_id) {

    var current_stat = $(current_id + "_check");
    var value = $(current_id).val();

    if (value == '') { //blank
        
        blank_function(current_id);
        re_pass_blank_function();
        pass_com = false;
        pass1_com = false;

    } else if (value.match(/[^0-9]/g) == null) //문자한개필요
    {

        $(current_stat).text('you must use least one alpabet').show();
        false_function(current_id);
        re_pass_blank_function();
        pass_com = false;
        pass1_com = false;

    } else if (value.match(regx)) //특수문자 불가
    {
        $(current_stat).text('you can not write !@#%').show();
        false_function(current_id);
        re_pass_blank_function();
        pass_com = false;
        pass1_com = false;

    } else if (value.match(space) || value.match('null') == null == false) //공백 불가
    {
        $(current_stat).text('you can not write null').show();
        false_function(current_id);
        re_pass_blank_function();
        pass_com = false;
        pass1_com = false;

    } else if (value.length < 8 || value.length > 20) {  // 8 to 20 letters

        $(current_stat).text('8~16 write plz').show();
        false_function(current_id);
        re_pass_blank_function();
        pass_com = false;
        pass1_com = false;

    } else if (value != $('#re_pass_id').val() && $('#re_pass_id').val() != '') { //not same repeat pass

        $('#re_pass_check').text('It`s not same').show();
        false_function(current_id);
        re_pass_blank_function();
        pass_com = false;
        pass1_com = false;


    } else if (value.length >= 8 && value.length <= 20 ) { // complite

        //$(this).val(value.toLowerCase()); // lowercase and uppercase same
        $(current_stat).text('').show();
        true_function(current_id);
        re_pass_blank_function();
        pass_com = false;
        pass1_com = true;
        //1차 ok

        if (value == $('#re_pass_id').val()) {
            $('#re_pass_id').css({ 'border-left': '5px solid #48cfad', 'width': '187px' });
            $('#re_pass_id').next().removeClass();
            $('#re_pass_id').next().addClass('fa fa-check');
            $('#re_pass_check').text('').show();
            pass_com = true;

            //2차 ok done
        };
    };

    // Repeat 3 words
    var val = value;
    var ch = '';
    var cnt = 0;
    for (var i = 0 ; i < val.length ; i++) {
        if (ch == val.charAt(i)) {
            cnt++;
            if (cnt > 2) {
                $(current_stat).text('Repeat 3 words').show();
                false_function(current_id);
                re_pass_blank_function();
                pass_com = false;
                pass1_com = false;
                break;
            }
        }
        else {
            ch = val.charAt(i);
            cnt = 1;
        }
    };
};

function re_pass_check(current_id) { // repeat pass check

    var current_stat = $(current_id + "_check");
    var value = $(current_id).val();

    if (value == '') { //blank

        blank_function(current_id);
        pass_com = false;

    } else if (value != $('#pass_id').val()) { //not same

        $(current_stat).text('It`s not same').show();
        false_function(current_id);
        pass_com = false;

    } else if (value == $('#pass_id').val() && pass1_com) { //complite

        $('#pass_id').css({ 'border-left': '5px solid #48cfad', 'width': '187px' });
        $('#pass_id').next().removeClass();
        $('#pass_id').next().addClass('fa fa-check');
        $('#pass_check').text('').show();

        $(current_stat).text('').show();


        true_function(current_id);
        pass_com = true;

    }
};

/////////////////////////////////////////////////////////
//      password check end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      now pass check start   ------------------------------ need check to database
/////////////////////////////////////////////////////////
$(document).on("blur", function () {

    //var current_stat = $(current_id + "_check");
    //var value = $(current_id).val();

    $('#now_pass_id').on("blur", function () //account setting page now password check
    {
        if (value == '') { //blank

            blank_function(current_id);
            now_pass_com = false;

        } else if (value != 'idiotdart') { //not same

            $(current_stat).text('Wrong your password').show();
            false_function(current_id);
            now_pass_com = false;

        } else if (value == 'idiotdart') { //complite

            $(current_stat).text('').show();
            true_function(current_id);
            now_pass_com = true;
        }
    });
});
/////////////////////////////////////////////////////////
//      now pass check end
/////////////////////////////////////////////////////////
//----------------------------end creat account password logic----------------------------

var abuse_name = new Array('sex', 'bitch', 'pussy', 'cunt', 'fuck', 'fucking');

//----------------------------creat account nick name logic----------------------------
/////////////////////////////////////////////////////////
//      nick name check start
/////////////////////////////////////////////////////////

function nick_check(current_id) {

    var current_stat = $(current_id + "_check");
    var value = $(current_id).val();

    //console.log(jQuery.inArray($('#nick_id').val(), nick_array));
    if (value == '') { //blank

        blank_function(current_id);
        nick_com = false;

    }
    else if (jQuery.inArray(value, abuse_name) >= 0) { //abuse names

        $(current_stat).text('abuse name').show();
        false_function(current_id);
        nick_com = false;

        //console.log(jQuery.inArray($('#nick_id').val(), abuse_name))

    } else if (!only_alpha_number.test(value)) //영어,숫자 외 불가
    {
        $(current_stat).text('you can write only english and number').show();
        false_function(current_id);
        nick_com = false;

    } else if (value.match(space) || value.match('null') == null == false) //공백 불가
    {
        $(current_stat).text('you can not write null').show();
        false_function(current_id);
        nick_com = false;

    } else if (!only_alpha_number.test($('#nick_id').val())) //영어,숫자 외 불가
    {
        $(current_stat).text('you can write only english and number').show();
        false_function(current_id);
        nick_com = false;

    } else { //complite

        //enter to AJAX Logic by SsaRu
        $.ajax({
            type: "POST",
            url: "php/account/overlap_check.php",
            data: 'data=' + value + '&' + 'id=nick',
            cache: false,
            success: function (data) {
                if (data == "")  //void value
                {
                    console.log("DB return value empty");

                    blank_function(current_id);
                    nick_com = false;

                }
                else if (data == 1)  //overlapping
                {

                    console.log('DB return value overlapping');

                    $(current_stat).text('Overlapping').show();
                    false_function(current_id);
                    nick_com = false;

                }
                else if (data == 0)  //non-overlapping
                {
                    console.log('DB return value Non-overlapping');
                    //$(current_id).val($(current_id).val().toLowerCase()); // lowercase and uppercase same
                    $(current_stat).text('').show();
                    true_function(current_id);
                    nick_com = true;
                }
                else    //exception processing
                {
                    console.log("DB return value error");
                    console.log(data);
                    nick_com = false;
                }
            }
        });
    }
};

/*-------------------------check box event start-----------------------*/
/*-------------------------check box event end-----------------------*/
//----------------------------submit able event----------------------------
/////////////////////////////////////////////////////////
//      account submit event start
/////////////////////////////////////////////////////////

$(document).on("click blur", '#create_account_area', function () //submit able event
{
        
    if (email_com && nick_com && pass_com && $('.document_check_box:checked').length == 2 && focus_com) { //account setting submit to able
            $('.account_submit').removeAttr('disabled');
            $('.account_submit').css('background', '#48cfad');
        } else {
            $('.account_submit').attr('disabled', 'disabled');
            $('.account_submit').css('background', '#c1c1c1');
        }


        if (!$('#now_pass_id').attr('disabled')) { //account setting page submit bt disable event
            if (now_pass_com && pass_com) {
                $('#submit_bt').removeAttr('disabled');
                $('#submit_bt').css('background', '#47bf7e');
            } else {
                $('#submit_bt').attr('disabled', 'disabled');
                $('#submit_bt').css('background', '#c1c1c1');
            };
        }
});

$(document).on("click", '.account_submit', function () //submit able event
{
    email_check('#email_id');
    pass_check('#pass_id');
    re_pass_check('#re_pass_id');
    nick_check('#nick_id');
     if (email_com && nick_com && pass_com && $('.document_check_box:checked').length == 2) {
         $("#account_idpass").submit();
     } else
     {
         alert('error : account inform was modified');
     }
});



/////////////////////////////////////////////////////////
//      account submit event end
/////////////////////////////////////////////////////////



//----------------------------end submit able event----------------------------

/*----------------------------end creat account----------------------------*/
