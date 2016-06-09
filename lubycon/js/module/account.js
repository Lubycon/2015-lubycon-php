$(function(){
    var regx = /[`;',./~!@\#$%<>^&*\()\-=+_\’]/gi; //special letters
    var space = / /gi //space check
    var regex = /^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/; //email check
    var only_alpha_number = /^[A-Za-z0-9+]*$/; //only alpabet, number

    var emailCheck = false; //for submit able
    var passwordCheck = false;
    var passwordCheck2 = false;
    var currentPasswordCheck = false; //account setting page check
    var nicknameCheck = false;
    var isFocused = false;

    var inputAction = {
        blankAction: function(element){
            var $this = element;
            var $checkMessage = $this.siblings(".check-message");

            $this.css({ "border-left" : "none", "width" : "190px" });
            $this.next().removeClass();
            $checkMessage.text("").show();
            console.log("blank");
        },
        trueAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");

            $this.css({ 'border-left': '5px solid #48cfad', 'width': '187px' });
            $checkIcon.attr("class","check-icon");
            $checkIcon.addClass('fa fa-check');
            console.log("true input");
        },
        falseAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");

            $this.css({ 'border-left': '5px solid #ec6446', 'width': '187px' });
            $checkIcon.attr("class","check-icon");
            $checkIcon.addClass('fa fa-times');
            console.log("false input");
        }
    }

    initAccountInputCheck(); //init
    function initAccountInputCheck(){
        $(document).on("blur",".account_input_wrap.userinfo > input",function(){
            var $this = $(this);
            var type = $this.data("value");
            switch (type)
            {
                case "email" : checkEmail.call($this); break;
                case "password" : checkPassword.call($this); break;
                case "re-password" : checkPasswordAgain.call($this); break;
                case "current-password" : checkPasswordCurrent.call($this); break;
                case "nickname" : checkNickname.call($this); break;
                default: return false; break;
            }
        });
    }

    function checkEmail() {
        var $this = $(this); //input
        var checkMessage = $this.siblings(".check-message");
        var value = $this.val();

        emailCheck = false;

        if(value.isNullString()){
            inputAction.blankAction($this);
        }
        else if (!value.isEmail()){ //wrong email address to regex
            checkMessage.text('wrong email adress').show();
            inputAction.falseAction($this);
        }
        else{ //complite go ajax, enter to AJAX Logic by SsaRu
            $.ajax({
                type: "POST",
                url: "php/account/overlap_check.php",
                data: 'data=' + value + '&' + 'id=email',
                cache: false,
                success: function (data) {
                    if (data === "") { //void value
                        console.log('DB return value empty');
                        console.log(data);
                        inputAction.blankAction(current_id);
                    }
                    else if (data === 1) { //overlapping
                        console.log('DB return value overlapping');
                        console.log(data);
                        
                        inputAction.falseAction($this);
                        checkMessage.text('This email is exist already').show();
                    }
                    else if (data === 0) { //Non-overlapping
                        console.log('DB return value non-overlapping, done');
                        console.log(data);
                        
                        //$(current_id).val($(current_id).val().toLowerCase()); // lowercase and uppercase same
                        inputAction.trueAction($this);
                        checkMessage.text("").show();
                        emailCheck = true;
                    }
                    else {
                        console.log("return value error");
                        console.log(data);
                    }
                }
            })
        }
    };

    function checkPassword() {
        var $this = $(this);
        var $repeatPassword = $(this).parents(".account_input_wrap.userinfo").next().find("input");
        var checkMessage = $this.siblings(".check-message");
        var repeatCheckMessage = checkMessage.siblings(".check-message");
        var value = $this.val();

        passwordCheck = false;
        passwordCheck2 = false;

        var checking = value.isPassword();

        switch(checking){
            case 0 : 
                passwordCheck = true;
                passwordCheck2 = true;
            break;
            case 1 : 
                checkMessage.text("You must write 10words at least").show();
                inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 2 : 
                checkMessage.text('You must write the Alpabet at least one').show();
                inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 3 : 
                checkMessage.text('You can not write special characters').show();
                inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 4 : 
                inputAction.blankAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 5 : 
                checkMessage.text('Repeat 3 words').show();
                inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 6 :
                checkMessage.text('You can not write "null"').show();
                inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            default: return false; break;
        }

        //160609 23:50


        if (value != $('#re_pass_id').val() && $('#re_pass_id').val() != '') { //not same repeat pass
            repeatCheckMessage.text('It`s not same').show();
            inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
        } else if (value.length >= 8 && value.length <= 20 ) { // complite
            checkMessage.text('').show();
            inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            passwordCheck = false;
            passwordCheck2 = true;
            //1차 ok

            if (value == $('#re_pass_id').val()) {
                $('#re_pass_id').css({ 'border-left': '5px solid #48cfad', 'width': '187px' });
                $('#re_pass_id').next().removeClass();
                $('#re_pass_id').next().addClass('fa fa-check');
                $('#re_pass_check').text('').show();
                passwordCheck = true;
                //2차 ok done
            };
        };

    };

    function checkPasswordAgain() { // repeat pass check

        var current_stat = $(current_id + "_check");
        var value = $(current_id).val();

        if (value == '') { //blank

            inputAction.blankAction(current_id);
            passwordCheck = false;

        } else if (value != $('#pass_id').val()) { //not same

            $(current_stat).text('It`s not same').show();
            inputAction.falseAction(current_id);
            passwordCheck = false;

        } else if (value == $('#pass_id').val() && passwordCheck2) { //complite

            $('#pass_id').css({ 'border-left': '5px solid #48cfad', 'width': '187px' });
            $('#pass_id').next().removeClass();
            $('#pass_id').next().addClass('fa fa-check');
            $('#pass_check').text('').show();

            $(current_stat).text('').show();


            inputAction.trueAction(current_id);
            passwordCheck = true;

        }
    };

    /////////////////////////////////////////////////////////
    //      password check end
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    //      now pass check start   ------------------------------ need check to database
    /////////////////////////////////////////////////////////
    $(document).on("blur", function () {

        var current_id = $(this).attr('id');
        var current_stat = $(current_id + "_check");
        var value = $(current_id).val();

        $('#now_pass_id').on("blur", function () //account setting page now password check
        {
            if (value == '') { //blank

                inputAction.blankAction(current_id);
                currentPasswordCheck = false;

            } else if (value != 'idiotdart') { //not same

                $(current_stat).text('Wrong your password').show();
                inputAction.falseAction(current_id);
                currentPasswordCheck = false;

            } else if (value == 'idiotdart') { //complite

                $(current_stat).text('').show();
                inputAction.trueAction(current_id);
                currentPasswordCheck = true;
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

            inputAction.blankAction(current_id);
            nicknameCheck = false;

        }
        else if (jQuery.inArray(value, abuse_name) >= 0) { //abuse names

            $(current_stat).text('abuse name').show();
            inputAction.falseAction(current_id);
            nicknameCheck = false;

            //console.log(jQuery.inArray($('#nick_id').val(), abuse_name))

        } else if (!only_alpha_number.test(value)) //영어,숫자 외 불가
        {
            $(current_stat).text('you can write only english and number').show();
            inputAction.falseAction(current_id);
            nicknameCheck = false;

        } else if (value.match(space) || value.match('null') == null == false) //공백 불가
        {
            $(current_stat).text('you can not write null').show();
            inputAction.falseAction(current_id);
            nicknameCheck = false;

        } else if (!only_alpha_number.test($('#nick_id').val())) //영어,숫자 외 불가
        {
            $(current_stat).text('you can write only english and number').show();
            inputAction.falseAction(current_id);
            nicknameCheck = false;

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

                        inputAction.blankAction(current_id);
                        nicknameCheck = false;

                    }
                    else if (data == 1)  //overlapping
                    {

                        console.log('DB return value overlapping');

                        $(current_stat).text('Overlapping').show();
                        inputAction.falseAction(current_id);
                        nicknameCheck = false;

                    }
                    else if (data == 0)  //non-overlapping
                    {
                        console.log('DB return value Non-overlapping');
                        //$(current_id).val($(current_id).val().toLowerCase()); // lowercase and uppercase same
                        $(current_stat).text('').show();
                        inputAction.trueAction(current_id);
                        nicknameCheck = true;
                    }
                    else    //exception processing
                    {
                        console.log("DB return value error");
                        console.log(data);
                        nicknameCheck = false;
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
            
        if (emailCheck && nicknameCheck && passwordCheck && $('.document_check_box:checked').length == 2 && isFocused) { //account setting submit to able
                $('.account_submit').removeAttr('disabled');
                $('.account_submit').css('background', '#48cfad');
            } else {
                $('.account_submit').attr('disabled', 'disabled');
                $('.account_submit').css('background', '#c1c1c1');
            }


            if (!$('#now_pass_id').attr('disabled')) { //account setting page submit bt disable event
                if (currentPasswordCheck && passwordCheck) {
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
         if (emailCheck && nicknameCheck && passwordCheck && $('.document_check_box:checked').length == 2) {
             $("#account_idpass").submit();
         } else
         {
             alert('error : account inform was modified');
         }
    });
});
