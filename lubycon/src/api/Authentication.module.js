$(document).ready(function(){
    Request({
        callback: init
    });
    function init(session){
        if(session.LoginState){
            $(".signin_class").remove();
            $(".after_signin_class").show();
            console.log(session);
            $("#accountImg").find("img").attr("src","../../../../Lubycon_Contents/user/" + session.usercode + "/profile.jpg");
        }
        else {
            $(".signin_class").show();
            $(".after_signin_class").remove();
        }

        var searchFilter = $("body").find(".searchFilter");
        searchFilter.lubySelector({
            width: 130,
            theme: "transparent",
            icon: ""
        });
    }
});
