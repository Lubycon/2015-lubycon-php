function up_call_contents(now_page,pageNumber) {
    //var top_bound = ($("#main_header").height() + $("#nav_guide").height() + $("#lnb_nav > ul:nth-child(1)").height());
    var remember_scroll = $('#contents_box > ul:nth-child(2) > li:nth-child(1) > div');
    var remember_scroll_value = remember_scroll.offset().top;

    $.ajax
    ({
        type: "POST",
        url: "../ajax/infinite_scroll_ajax.php", //이페이지에서 중복체크를 한다
        data: 'cate_param=' + CATE_PARAM + '&mid_cate_param=' + MID_CATE_PARAM + '&page_param=' + pageNumber + '&now_page_param=' + now_page,
        cache: false,
        success: function (data)
        {
            $('#contents_box > ul:nth-child(2) > li:nth-child(1)').before(data);
            $(document).scrollTop(remember_scroll.offset().top - remember_scroll_value);
            //console.log(remember_scroll.offset().top);
            ajax_eventing = false;
           
        }
    })
};
function down_call_contents(now_page, pageNumber) {
    $.ajax
    ({
        type: "POST",
        url: "../ajax/infinite_scroll_ajax.php", //이페이지에서 중복체크를 한다
        data: 'cate_param=' + CATE_PARAM + '&mid_cate_param=' + MID_CATE_PARAM + '&page_param=' + pageNumber + '&now_page_param=' + now_page,//test.asp에 id 값을 보낸다
        cache: false,
        success: function (data) {
            $("#contents_box > ul:nth-child(2)").append(data);
            finish_check('down');
            ajax_eventing = false;
        }
    })
};


function page_checker(now_page)
{
    var up_count_page = now_page + 1;
    var down_count_page = now_page - 1;
    var scrolltop = $(document).scrollTop();
    var scrollbottom = down_page_finish !== true ? $('.page_bottom_' + now_page).offset().top - $(window).height() - 1 : false;
    //console.log(scrollbottom);
    //var page_top = $('.page_top_' + now_page).offset().top;
    //var page_bottom = $('.page_bottom_' + now_page).legnth !== 0 ? $('.page_bottom_' + now_page).offset().top : false;

    //console.log(scrolltop);
    //console.log(scrollbottom);
    //console.log( down_page_finish);
    if (scrolltop > scrollbottom && down_page_finish == false)
    {
        replaceUrlParameter('page', up_count_page);
        console.log('page checker up');
    }
}

function finish_check( direction )
{
    console.log($("#contents_box > ul > .finish_contents"));
    if (direction == 'down' && $("#contents_box > ul > .finish_contents").hasClass('finish_contents')) {
        down_page_finish = true;
    } else
    {
        down_page_finish = false;
    }
}

var ajax_eventing = false;
var down_page_finish = false;
$(document).scroll(function () {
    var window_position = $(document).height() - $(document).scrollTop();
    var ajax_call_boundary = 150;
    var now_page = parseInt(getUrlParameter('page'));
    var pageCountUp = now_page + 1;
    var pageCountDown = now_page - 1;
    page_checker(now_page); // url page param reset
    if (window_position <= ($(window).height() + ajax_call_boundary) && ajax_eventing == false && down_page_finish ==false) {
        console.log('down ajax call');
        ajax_eventing = true;
        down_call_contents(now_page,pageCountUp);

    } else if ($(document).scrollTop() == 0 && pageCountDown >= 1) {
        console.log(pageCountDown);
        console.log('up ajax call');
        ajax_eventing = true;
        up_call_contents(now_page,pageCountDown);

    }
});
$(document).ready(function () {
    finish_check('down');
});

$(document).on('change','#contents_pager', function () // 고장
{
    $("#contents_box > ul:nth-child(2)").html('');
    down_call_contents($(this).val());
    replaceUrlParameter('page', $(this).val());
});