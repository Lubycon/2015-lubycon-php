var ajax_eventing = false; //ajax bubbling banned
var down_page_finish = false; //check last page valuable
var up_page_finish = false; // check fist page valuabel
var now_page;//
var all_page_count;

$(document).ready(function () // paege ready to check
{
    now_page = parseInt(getUrlParameter('page')); // set param
    all_page_count = $("#contents_pager option:last-child").val();
    finish_check(); //check final function
});
$(document).scroll(function () //scroll handler
{
    now_page = parseInt(getUrlParameter('page')); // set param
    var window_position = $(document).height() - $(document).scrollTop();
    var ajax_call_boundary = 150; //ajax start boundary
    var pageCountUp = now_page + 1;
    var pageCountDown = now_page - 1;

    finish_check(); // check last page function
    page_checker(now_page); // url page param reset function

    if (window_position <= ($(window).height() + ajax_call_boundary) && ajax_eventing == false && down_page_finish == false) {
        console.log('down ajax call');
        ajax_eventing = true; //bubbleing banned
        down_call_contents(now_page, pageCountUp); //down ajax call

    }
});
$(document).on('click',".prev_page_call", function ()
{
    var up_ajax_now_page = now_page - 2;
    var up_ajax_target_page = now_page - 1;

    up_call_contents(up_ajax_now_page, up_ajax_target_page);
    console.log('up ajax call');
});
$(document).on('change', '#contents_pager', function () // °íÀå ¤Ð¤Ð
{
    $("#contents_box > ul:nth-child(2)").html('');
    down_call_contents($(this).val()-1, $(this).val());
    replaceUrlParameter('page', $(this).val());
    now_page = parseInt(getUrlParameter('page')); // set param
});


function up_call_contents(now_page, pageNumber) //up scroll ajax
{
    //var top_bound = ($("#main_header").height() + $("#nav_guide").height() + $("#lnb_nav > ul:nth-child(1)").height());
    var remember_scroll = $('#contents_box > ul:nth-child(2) > li:nth-child(2)');
    var remember_scroll_value = remember_scroll.offset().top;
    $.ajax
    ({
        type: "POST",
        url: "../ajax/infinite_scroll_ajax.php",
        data: 'cate_param=' + CATE_PARAM + '&mid_cate_param=' + MID_CATE_PARAM + '&page_param=' + pageNumber + '&now_page_param=' + now_page,
        cache: false,
        success: function (data)
        {
            remember_scroll.before(data);
            $(document).scrollTop(remember_scroll.offset().top - remember_scroll_value);
            $(".prev_page_call").remove(); //reset button
            finish_check();
            ajax_eventing = false;
           
        }
    })
};
function down_call_contents(now_page, pageNumber) //down scroll ajax
{
    $.ajax
    ({
        type: "POST",
        url: "../ajax/infinite_scroll_ajax.php",
        data: 'cate_param=' + CATE_PARAM + '&mid_cate_param=' + MID_CATE_PARAM + '&page_param=' + pageNumber + '&now_page_param=' + now_page,
        cache: false,
        success: function (data) {
            $("#contents_box > ul:nth-child(2)").append(data);
            finish_check();
            ajax_eventing = false;
        }
    })
};


function page_checker(now_page) //page url changer by scroll
{
    var up_count_page = now_page + 1;
    var down_count_page = now_page - 1;
    var scrolltop = $(document).scrollTop();
    var window_height = $(window).height();
    var scrollbottom;
    var scroll_prev;
    if ($('.page_bottom_' + now_page).length) //valuable set
    { scrollbottom = $('.page_bottom_' + now_page).offset().top - window_height - 1; }
    if ($('.page_bottom_' + down_count_page).length) // if element exists
    {
        scroll_prev = $('.page_bottom_' + down_count_page).offset().top - window_height - 1;
    }

    //console.log($('.page_bottom_' + down_count_page));
    //console.log(scroll_prev);
    //console.log(scrolltop);
    //console.log(down_page_finish);
    //console.log($('.page_bottom_' + now_page));
    //console.log(all_page_count);

    if (scrolltop > scrollbottom && now_page < all_page_count) //page ++
    {
        replaceUrlParameter('page', up_count_page);
        console.log('page checker up');
    } else if (scroll_prev > scrolltop)
    {
        replaceUrlParameter('page', down_count_page);
        console.log('page cound up');
    }
}

function finish_check() // check it last page
{
    if ($("#contents_box > ul > .finish_contents").hasClass('finish_contents')) {
        down_page_finish = true; //finish bottom page
    } else
    {
        down_page_finish = false; //more next page
    }


    if ($(".page_bottom_1").hasClass('page_bottom_1')) {
        up_page_finish = true; //finish prev page
    } else {
        up_page_finish = false; //more prev page
        $('#contents_box > ul:nth-child(2) > li:nth-child(1)').before('<p class="prev_page_call">call more prev contents</p>');
    }

}