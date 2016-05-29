function scroll_from_cookie(contents_number)
{
    //console.log($('.' + contents_number));
    var contents_offsetTop = $('.' + contents_number).offset().top;
    $("html,body").animate({ scrollTop: contents_offsetTop - 200 }, "slow");
    $('.' + contents_number).css('background', '#ccc')
    
}

function scroll_from_param(now_page)
{
    console.log($(".page_bottom_" + now_page));

    if (now_page <= 1) {
        $("html,body").animate({ scrollTop: 0 }, "slow");
    } else
    {
        $("html,body").animate({ scrollTop: $(".page_bottom_" + now_page).offset().top - 200 }, "slow");
    }
}