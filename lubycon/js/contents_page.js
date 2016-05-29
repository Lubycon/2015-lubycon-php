function scroll_from_cookie(contents_number)
{
    console.log(contents_number);
    //console.log($('.' + contents_number));
    var contents_offsetTop = $('.' + contents_number).offset().top;
    //console.log(contents_offsetTop);
    $(document).scrollTop(contents_offsetTop - 100);
    $('.' + contents_number).css('background', '#ccc')
    
}

function scroll_from_param(prev_page)
{
    var now_page = prev_page--;

    // now page = p

    if (now_page <= 1)
    {
        $(document).scrollTop(0);
    } else
    {
        $(document).scrollTop($(".page_bottom_" + prev_page).offset().top);
    }
}