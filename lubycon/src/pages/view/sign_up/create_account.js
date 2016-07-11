$(function(){
    var emailCheck = false; //for submit able
    var passwordCheck = false;
    var passwordCheck2 = false;
    var currentPasswordCheck = false; //account setting page check
    var nicknameCheck = false;

    var inputAction = {
        blankAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");
            var $checkMessage = $this.siblings(".check-message");

            $this.css({ "border-left" : "none" });
            $checkIcon.attr("class","check-icon");
            $checkMessage.text("").show();
            console.log("blank");
        },
        trueAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");

            $this.css({ 'border-left': '5px solid #48cfad' });
            $checkIcon.attr("class","check-icon");
            $checkIcon.addClass('fa fa-check');
            console.log("true input");
        },
        falseAction: function(element){
            var $this = element;
            var $checkIcon = $this.siblings(".check-icon");

            $this.css({ 'border-left': '5px solid #ec6446' });
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
            switch (type){
                case "email" : checkEmail.call($this); break;
                case "password" : checkPassword.call($this); break;
                case "re-password" : checkPasswordAgain.call($this); break;
                case "current-password" : checkPasswordCurrent.call($this); break;
                case "nickname" : checkNickname.call($this); break;
                default: return false; break;
            }
        });
        $(document).on("click","#create_account_area",submitCheck);
    }

    function checkEmail() {
        var $this = $(this); //input
        var checkMessage = $this.siblings(".check-message");
        var value = $this.val();

        emailCheck = false;

        if(value.isNullString()) inputAction.blankAction($this);
            
        else if (!value.isEmail()){ //wrong email address to regex
            checkMessage.text('This E-mail is wrong').show();
            inputAction.falseAction($this);
        }
        else{ //complite go ajax, enter to AJAX Logic by SsaRu
            $.ajax({
                type: "POST",
                url: "./pages/controller/sign_up/overlap_check.php",
                data: 'data=' + value + '&' + 'id=email',
                cache: false,
                success: function (data) {
                    if (data == ""){
                        inputAction.blankAction($this);
                        console.log("RETURN VALUE IS EMPTY FROM DATABASE");
                    }
                    else if (data == 1){
                        checkMessage.text(value + ' is exist already').show();
                        inputAction.falseAction($this);
                        console.log("THIS IS EXIST IN DATABASE");
                    }
                    else if (data == 0){
                        checkMessage.text('').show();
                        inputAction.trueAction($this);
                        emailCheck = true;
                        console.log("THIS IS USABLE");
                    }
                    else{
                        checkMessage.text("Database is not response. Please do again").show();
                        inputAction.falseAction($this);
                        console.log("QUERY ERROR");
                    }
                    console.log(data);
                }
            })
        }
    };

    function checkPassword() {
        var $this = $(this);
        var $repeatPassword = $(this).parents(".account_input_wrap.userinfo").next().find("input");
        var checkMessage = $this.siblings(".check-message");
        var value = $this.val();

        passwordCheck = false;

        var checking = value.isPassword();

        switch(checking){
            case 0 : 
                passwordCheck = true;
                checkMessage.text("").show();
                inputAction.trueAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 1 : 
                inputAction.blankAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 2 : 
                checkMessage.text("You must write 10words at least").show();
                inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 3 : 
                checkMessage.text('You must write the Alpabet at least one').show();
                inputAction.falseAction($this);
                inputAction.blankAction($repeatPassword);
            break;
            case 4 : 
                checkMessage.text('You can not write special characters').show();
                inputAction.falseAction($this);
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
    };

    function checkPasswordAgain() { // repeat pass check
    	var $this = $(this);
        var $password = $(this).parents(".account_input_wrap.userinfo").prev().find("input");
        var checkMessage = $this.siblings(".check-message");
        var originalCheckMessage = $password.siblings(".check-message");
        var value = $this.val();

        passwordCheck2 = false;

        if(value.isNullString()) inputAction.blankAction($this); 
        	
        else if(value !== $password.val()) { //not same
            checkMessage.text("This is not same").show();
            inputAction.falseAction($this);
        } 
        else if(value === $password.val()) { //complite
            checkMessage.text('').show();
            inputAction.trueAction($this);
            passwordCheck2 = true;
        }
    };

    function checkNickname() {
    	var $this = $(this);
        var checkMessage = $this.siblings(".check-message");
        var value = $this.val();

        nicknameCheck = false;

        if(value.isNullString()) inputAction.blankAction($this);

        else if(value.isAbuseWord()){ //abuse names
            checkMessage.text(value + " is not good for your name").show();
            inputAction.falseAction($this);
        } 
        else if(!value.isAlphabetNumber()){
            checkMessage.text('You can use only english and number').show();
            inputAction.falseAction($this);
        } 
        else if(value.match("null")){
            checkMessage.text('You can not write "null"').show();
            inputAction.falseAction($this);
        } 
        else { //complite, enter to AJAX Logic by SsaRu
            $.ajax({
                type: "POST",
                url: "./pages/controller/sign_up/overlap_check.php",
                data: 'data=' + value + '&' + 'id=nick',
                cache: false,
                success: function (data) {
                    if (data == ""){
                        inputAction.blankAction($this);
                        console.log("RETURN VALUE IS EMPTY FROM DATABASE");
                    }
                    else if (data == 1){
                        checkMessage.text(value + ' is exist already').show();
                        inputAction.falseAction($this);
                        console.log("THIS IS EXIST IN DATABASE");
                    }
                    else if (data == 0){
                        checkMessage.text('').show();
                        inputAction.trueAction($this);
                        nicknameCheck = true;
                        console.log("THIS IS USABLE");
                    }
                    else{
                        checkMessage.text("Database is not response. Please do again").show();
                        inputAction.falseAction($this);
                        console.log("QUERY ERROR");
                    }
                }
            });
        }
    };

    function submitCheck(){
        var submitBt = $(this).find(".account_submit");
        if(emailCheck && nicknameCheck && passwordCheck && passwordCheck2 && $('.document_check_box:checked').length == 2){
            console.log("SUBMIT ENABLE");
            submitBt.prop("disabled",false);
            submitBt.on("click",finalSubmit);
        }
        else{ 
            console.log("SUBMIT DISABLE");
            submitBt.prop("disabled",true);
            submitBt.off("click",finalSubmit);
        }
    }

    function finalSubmit(){
        console.log("submit");
        $("#account_idpass").submit();
    }

});
