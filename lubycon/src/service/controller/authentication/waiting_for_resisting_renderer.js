$(function(){
    Request({
        callback: init
    });

    function init(res){
        var submitBt = $(".btn.submit-bt");
        submitBt.on("click",submit);

        var _sec = 1000,
            _min = _sec * 60,
            _hour = _min * 60,
            _day = _hour * 24;

        var oldDate = new Date(res.SignInDate.replace("-","/")),
            today = new Date(),
            limitDate = new Date(Date.parse(oldDate) + 7 * 1000 * 60 * 60 * 24);

        console.log(oldDate," - ",today," - ",limitDate);

        if(limitDate.getTime() - today.getTime() > 0){
            console.log("OK");
            // 기간 남음
            setInterval(function(){
                today = new Date(),
                distance = limitDate.getTime() - today.getTime();
                countDate(distance,[_day,_hour,_min,_sec],res.usercode);
            }, _sec);
        }
        else {
            console.log("FIRED");
            rejectAction(res.usercode);
        }
    }

    function countDate(distance,date,usercode){
        var day = Math.floor(distance / date[0]),
            hours = Math.floor(distance % date[0] / date[1]),
            min = Math.floor(distance % date[1] / date[2]),
            sec = Math.floor(distance % date[2] / date[3]);

        if(day + hours + min + sec < 0) rejectAction(usercode);

        console.log(day,hours,min,sec);

        var dayBox = $(".day-box"),
            hourBox = $(".hour-box"),
            minBox = $(".minute-box"),
            secBox = $(".second-box");
        dayBox.text(day);
        hourBox.text(hours);
        minBox.text(min);
        secBox.text(sec);
    }

    function rejectAction(usercode){
        /*Request({
            url: "",
            usercode: usercode,
            callback: function(res){
                if(res.status.code === "0000"){
                    location.href = "./index.php";
                }
            }
        });*/
        console.log("EJECT");
    }

    function submit(){
        var input = $(".input-message[name='certificationCode']"),
            code = input.val().trim();
        console.log(code);

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
        if(res.status.code === "0000") location.href = "?dir=service/view/success_account";
        else console.log("SERVER RETURN ERROR : " + res.status.code);
    }

});
