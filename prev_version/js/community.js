$(function () {
    $(document).scroll(function () //community subject event
    {
        if ($(document).scrollTop() > 260) {
            $('#post_subject_area').css({ "position": "fixed", "top": "45px", "z-index": "2" })
        } else {
            $('#post_subject_area').css({ "position": "absolute", "top": "50px" });
        }
    });

    $(document).scroll(function () //community view banner
    {
        //console.log($('#comment_more_box').offset().top - 757);
        if ($(document).scrollTop() > 350 && $(document).scrollTop() < $('#comment_more_box').offset().top - 430) {
            $('#post_banner').css({ "position": "fixed", "top": "100px" });
        } else if ($(document).scrollTop() < 349) {
            $('#post_banner').css({ "position": "absolute", "top": "0" + "px" });
        } else if ($(document).scrollTop() > $('#comment_more_box').offset().top - 430) {
            $('#post_banner').css({ "position": "absolute", "top": $('#comment_more_box').offset().top - 757 + "px" });
        };
    });
});