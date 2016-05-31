

function scroll_from_cookie(contents_number)
{
    //console.log($('.' + contents_number));
    var contents_offsetTop = $('.' + contents_number).offset().top;
    $("html,body").animate({ scrollTop: contents_offsetTop - 200 }, "slow");
    $('.' + contents_number).css('background', '#ccc');
    deleteCookie('contents_history');
}

function scroll_from_param(now_page)
{
    var prev_page = now_page - 1;

    console.log($(".page_bottom_" + prev_page));
    //$("html,body").animate({ scrollTop: 0 }, 0);
    if (now_page <= 1) {
        $("html,body").animate({ scrollTop: 0 }, "fast");
    } else
    {
        $("html,body").animate({ scrollTop: $(".page_bottom_" + prev_page).offset().top - 200 }, "slow");
    }

    deleteCookie('contents_history');
}

function deleteCookie(cookieName)
{
    var expireDate = new Date();
    
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}