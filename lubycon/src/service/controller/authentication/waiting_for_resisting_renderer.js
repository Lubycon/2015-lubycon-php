$(function(){
    Request({
        callback: init
    });

    function init(res){
        var submitBt = $(".btn.submit-bt");

        submitBt.on('click',submit);

            // value.isAlphabetNumber && length 12
    }

    function submit(){
        var input = $(".input-message[name='certificationCode']"),
            code = input.val();

        if(code.isAlphabetNumber() && code.length === 12){
            Request({
                url: "./pages/controller/sign_up/certificateEmail.php",
                data: {
                    code: code
                },
                callback: action
            });
        }
        else{
            // CODE IS WRONG
        }
    }

    function action(res){
        if(res.status.code === "0000") location.href = "./index.php";
        else console.log("SERVER RETURN ERROR : " + res.status.code);
    }

});
