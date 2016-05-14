/*
function up_call_contents() {
    var top_bound = ($("#main_header").height() + $("#nav_guide").height() + $("#lnb_nav > ul:nth-child(1)").height());
    $("#contents_box > ul").before('<p class="progressbar"><i class="fa fa-spinner fa-pulse"></i></p>');

    $.ajax
    ({
        type: "POST",
        url: "php/ajax/infinite_scroll_ajax.php", //이페이지에서 중복체크를 한다
        data: 'third_param=' + third_param,//test.asp에 id 값을 보낸다
        cache: false,
        success: function (data)
        {
            $("#contents_box > ul > li:nth-child(1)").before(data);
            $(document).scrollTop($("#contents_box > ul > li").height() * 6 + top_bound);
            console.log(top_bound);
            $(".progressbar").remove();
            ajax_eventing = false;
           
        }
    })
};
*/
function down_call_contents() {
    var pageCountUp = parseInt(getUrlParameter('page')) + 1;
    $.ajax
    ({
        type: "POST",
        url: "../ajax/infinite_scroll_ajax.php", //이페이지에서 중복체크를 한다
        data: 'cate_param=' + cate_param + '&page_param=' + pageCountUp,//test.asp에 id 값을 보낸다
        cache: false,
        success: function (data) {
            $("#contents_box > ul:nth-child(1)").append(data);
            if ($("#contents_box > ul > .finish_contents").hasClass('finish_contents'))
            {
                return false;
            } else {
                replaceUrlParameter('page', pageCountUp);
            }
            ajax_eventing = false;
        }
    })
};

var ajax_eventing = false;

$(document).scroll(function () {
    var window_position = $(document).height() - $(document).scrollTop();
    var ajax_call_boundary = 150;

    if (window_position <= ($(window).height() + ajax_call_boundary) && ajax_eventing == false) {
        console.log('down ajax call');
        ajax_eventing = true;
        down_call_contents();

    } else if ($(document).scrollTop() == 0) {

        console.log('up ajax call');
        //ajax_eventing = true;
        //up_call_contents();

    }
});