var third_param = CATE_PARAM;


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
    var post_number = $(".table_list_wrap .table_list:last-child .table_number").text(),
    lastRead = $(".table_list:last-child"),
    marker = $("<span/>",{"class":"readMarker"}),
    icon = $("<i/>",{"class":"fa fa-caret-right"}),
    text = $("<span/>",{"html":"You red here"});
    $.ajax({
        type: "POST",
        url: "php/ajax/community_infinite_scroll.php", //이페이지에서 중복체크를 한다
        data: 'post_number=' + post_number + '&third_param=' + third_param,//test.asp에 id 값을 보낸다
        cache: false,
        beforeSend: function(data) {
            if(marker.length!=0){ $(".readMarker").remove(); console.log(true);}
            marker.prependTo(lastRead);
            icon.appendTo(marker);
        },
        success: function (data) {
            $(".table_list_wrap").append(data);
            $(".progressbar").remove();
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