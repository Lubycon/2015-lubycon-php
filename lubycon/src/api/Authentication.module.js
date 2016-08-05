$(document).ready(function(){
    Request({
        callback: init
    });
    function init(session){
        if(session.LoginState){
            console.log("Authentication is loaded");

            userActivity(session.MemberActivity);

            $(".signin_class").remove();
            $(".after_signin_class").show();
            console.log(session);
            $("#accountImg").find("img").attr("src","../../../../Lubycon_Contents/user/" + session.usercode + "/profile.jpg");
        }
        else {
            $(".signin_class").show();
            $(".after_signin_class").remove();
        }
    }

    function userActivity(activity){
        activity = 'inactive'; // TESTING...
        if(activity === 'inactive' && getUrlParameter('dir') !== 'service/view/waiting_for_resisting'){
            location.href = '?dir=service/view/waiting_for_resisting';
        }
        else if(activity === 'drop'){
            console.log("droped member");
            Request({
                url: "./pages/controller/sign_out/sign_out.php",
                callback: signOut
            });
        }
        else return false;
    }

    function signOut(res){
        console.log("a : " +  res);
        console.log(res.status.code === "0000");
        if(res.status.code === "0000"){
            alert("BYE!");
            location.href = "./index.php";
        }
        else {
            console.log(res);
        }
    }
});
