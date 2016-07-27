$(document).ready(function(){
    Request({
        callback: init
    });
    function init(response){
        if(response){
            $(document).find(".after_signin_class").show();
            $(document).find(".signin_class").remove();


            $("#display_user").find("#accountImg > img").attr("src","../../../../Lubycon_Contents/user/" + response.usercode + "/profile.jpg");
            $("#display_user").find("#user_id").text(response.username);

            $("#sign_out").on("click",signout);

            initPersonalMenu();
            bindMyMenuAnchor();
        }
        else{
            $(document).find(".after_signin_class").remove();
            $(document).find(".signin_class").show();
        }
        $(".bigsub").hover(function(){
            $(this).children("ul").stop().fadeIn(300);
        },function(){
            $(this).children("ul").stop().fadeOut(300);
        });

        function initPersonalMenu(){
            var menu = $("#after_signin"),
                list = menu.find("ul");
            menu.on("click",toggle.single).on("click",toggleAction);

            function toggleAction(){
                var $this = $(this);
                if($this.hasClass("selected")){
                    list.stop().fadeIn(200);
                    list.hideAnywhere($this);
                }
                else {
                    list.stop().fadeOut(200);
                    list.off("hideAnywhere");
                }
            }
        }

        function bindMyMenuAnchor(){
            var menu = $(".userMenuGroup").find("li");
            menu.find("a").each(function(){
                var u = $(this).attr("href").split("&");
                var url = u.map(function(v){
                    return v === "usernum=" ? v + response.usercode : v;
                }).join("&");

                $(this).attr("href",url);
            });
        }

        function signout(){
            console.log("SIGN OUT");
            Request({
                url: "./pages/controller/sign_out/sign_out.php",
                data: "aaa",
                callback: action
            });
        }
        function action(res){
            console.log(res);
        }
    }
});
