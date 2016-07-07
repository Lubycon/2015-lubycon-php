$(document).ready(function(){

    initThumbnailView();
    initThumbnailPage();
    initCommentButton();

    function initThumbnailView(){
        $(document).on("click touchend",".thumbs_view",function(event){
            eventHandler(event,$(this));
            var countkind = $(this).data("value"),//if you want the other count ajax increase, add this switch to object
                contentkind = $(this).data("kind");
            var stat_check = $(this).hasClass("selected");
            //console.log(contentkind);

            like_count_up(countkind, stat_check, CONNUM_PARAM, CATE_PARAM, contentkind);
        })
    }

    function initThumbnailPage(){
        $(document).on("click touchend",".thumbs_page",function(event){
            eventHandler(event,$(this));
            var countkind = $(this).data("value"),//if you want the other count ajax increase, add this switch to object
                contentkind = $(this).data("kind"),
                contents_parents = $(this).parents('.contents_card'),
                contents_number = contents_parents.data('conno'),
                contents_category = contents_parents.data('cate');
            var stat_check = $(this).hasClass("selected");

            like_count_up(countkind, stat_check, contents_number, contents_category, contentkind);
        })
    }

    function initCommentButton(){
        initWrite();
        initDelete();

        function initWrite(){
            button = $("#comment_bt");
            button.on("click touchend",function(event){
                eventHandler(event,$(this));
                var input = $(this).prev("#comment_text"),
                    content = input.val(),
                    countkind = "comment",
                    stat_check = true;
                input.val(null);
                comment_write(countkind, stat_check, CONNUM_PARAM, CATE_PARAM, content);
            });
        }
        function initDelete(){
            var target = $(document).find(".comment-div"),
                button = target.find(".comment-delete"),
                countkind = "comment",
                stat_check = true;

            button.on("click",function(){
                var commentBox = $(this).parents(".comment-div");

                $(this).lubyAlert({
                    type: "message",
                    autoDestroy: false,
                    icon: "fa-trash",
                    text: "Are you sure?",
                    animation: "bounceInDown",
                    okAction: function(){
                        comment_delete(commentBox,countkind,stat_check, CONNUM_PARAM, CATE_PARAM);
                    }
                });
            });
        }
    }

    function like_count_up(countkind, stat_check, conno, catename, contentkind) {
        $.ajax({
            type: "POST",
            url: "../ajax/increase_like_ajax.php",
            data: 'countkind=' + countkind + '&conno=' + conno + '&cate=' + catename + '&stat_check=' + stat_check + '&contentkind=' + contentkind,// data send
            cache: false,
            success: function (data) {
                var loginStat = data.loginStat;
                loginStat = 1;
                if(loginStat){
                    like_number = $("#"+countkind+"Count");
                    stat_check = stat_check ? 1 : -1;
                    like_number.text( Number(like_number.text()) + stat_check);
                }
                else{ //NOT LOGIN
                    console.log(1);
                }
            }
        })
    }
    function comment_write(countkind,stat_check, conno, catename, content){
        $.ajax({
            type: "POST",
            url: "../ajax/comment_write_ajax.php",
            data: 'conno=' + conno + '&cate=' + catename + '&content=' + content + '&countkind=' + countkind + '&stat_check=' + stat_check, //data send
            cache: false,
            success: function (data) {
                //console.log(data);
                var result = JSON.parse(data);
                var date = result.date;
                console.log(date);

                var container = $("<div/>",{ "class" : "comment-div" }),
                    picture = $("<figure/>",{ "class" : "comment-pic" }),
                    img = $("<img/>",{ "src" : result.src }),
                    name = $("<h4/>",{ "html" : result.name }),
                    timeWrapper = $("<p/>",{ "class" : "comment-time" }),
                    time = $("<span/>", { "class" : "comment-time-counter", "html" : "Soon"}),
                    content = $("<p/>", { "class" : "comment-contents", "html" : result.content });

                img.appendTo(picture);
                time.appendTo(timeWrapper);

                picture.appendTo(container);
                name.appendTo(container);
                timeWrapper.appendTo(container);
                content.appendTo(container);

                $(".comment-list").append(container);
            }
        })
    }
    function comment_delete(element,countkind,stat_check,conno,catename){
        console.log(countkind,stat_check,conno,catename);
        $.ajax({
            type: "POST",
            url: "../ajax/file.php",
            data: 'conno=' + conno + '&cate=' + catename + '&countkind=' + countkind + '&stat_check=' + stat_check,
            cache: false,
            success: function(data){
                element.remove();
            }
        })
    }
});

