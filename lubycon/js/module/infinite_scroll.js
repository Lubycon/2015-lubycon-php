
    var AJAX_EVENTING = false; //ajax bubbling banned
    var DOWN_PAGE_FINISH = false; //check last page valuable
    var UP_PAGE_FINISH = false; // check fist page valuabel
    var NOW_PAGE;//
    var ALL_PAGE_COUNT;
    $(document).ready(function () // paege ready to check
    {
        NOW_PAGE = parseInt(getUrlParameter('page')); // set param
        ALL_PAGE_COUNT = parseInt($(".sliderKey").attr('max'));
        $(".sliderKey").val(NOW_PAGE);
        finish_check(); //check final function
        down_call_contents(1, 1);
    });
    $(document).scroll(function () //scroll handler
    {
        NOW_PAGE = parseInt(getUrlParameter('page')); // set param
        var window_position = $(document).height() - $(document).scrollTop();
        var ajax_call_boundary = 150; //ajax start boundary
        var pageCountUp = NOW_PAGE + 1;
        var pageCountDown = NOW_PAGE - 1;

        finish_check(); // check last page function
        page_checker(NOW_PAGE); // url page param reset function

        if (window_position <= ($(window).height() + ajax_call_boundary) && AJAX_EVENTING == false && DOWN_PAGE_FINISH == false) {
            console.log('down ajax call');
            AJAX_EVENTING = true; //bubbleing banned
            down_call_contents(NOW_PAGE, pageCountUp); //down ajax call
        }
    });
    $(document).on('click',".prev_page_call", function ()
    {
        var up_ajax_NOW_PAGE = NOW_PAGE - 2;
        var up_ajax_target_page = NOW_PAGE - 1;

        up_call_contents(up_ajax_NOW_PAGE, up_ajax_target_page);
        console.log('up ajax call');
    });


    $(document).ready(function () {
        $(".sliderKey").slider(
        {
            mouseUpEvent: function (a)
            {
                if (!AJAX_EVENTING && NOW_PAGE != a)
                {
                    slider_by_paging(a);
                }
            }
        })
    });

    function slider_by_paging(page_number)
    {
        AJAX_EVENTING = true; //bubbleing banned
        $(".contents_wrap").html('');
        down_call_contents(page_number-1, page_number);
        setUrlParameter('page', page_number);
        NOW_PAGE = parseInt(page_number); // set param
    };


    function up_call_contents(NOW_PAGE, pageNumber) //up scroll ajax
    {
        //var top_bound = ($("#main_header").height() + $("#nav_guide").height() + $("#lnb_nav > ul:nth-child(1)").height());
        var remember_scroll = $('.contents_wrap > li:nth-child(2)');
        var remember_scroll_value = remember_scroll.offset().top;
        $.ajax
        ({
            type: "POST",
            url: "../ajax/infinite_scroll_ajax.php",
            data: 'cate_param=' + CATE_PARAM + '&mid_cate_param=' + MID_CATE_PARAM + '&page_param=' + pageNumber + '&now_page_param=' + NOW_PAGE,
            cache: false,
            success: function (data)
            {
                remember_scroll.before(data);
                $(document).scrollTop(remember_scroll.offset().top - remember_scroll_value);
                $(".prev_page_call").remove(); //reset button
                finish_check();
                AJAX_EVENTING = false;
               
            }
        })
    };
    function down_call_contents(NOW_PAGE, pageNumber) //down scroll ajax
    {
        var data_array = {
            'cate_param' : CATE_PARAM,
            'mid_cate_param' : Number(MID_CATE_PARAM),
            'page_param' : pageNumber,
            'now_page_param' : NOW_PAGE,
            'mid_cate_value' : $(".categoryFilter").prop('selectedIndex'),
            'copyright_value' : $(".copyrightFilter").prop('selectedIndex'),
            'prefer_value': $(".preferFilter").prop('selectedIndex'),
        };

        $.ajax
        ({
            type: "POST",
            url: "../ajax/infinite_scroll_ajax.php",
            data: data_array,
            datatype:JSON,
            cache: false,
            success: function (data)
            {
                if (NOW_PAGE == 1 && pageNumber == 1)
                { $(".contents_wrap").html('')};
                $(".contents_wrap").append(data);
                finish_check();
                AJAX_EVENTING = false;
            }
        })
    };


    function page_checker(NOW_PAGE) //page url changer by scroll
    {
        var up_count_page = NOW_PAGE + 1;
        var down_count_page = NOW_PAGE - 1;
        var scrolltop = $(document).scrollTop();
        var window_height = $(window).height();
        var scrollbottom;
        var scroll_prev;
        if ($('.page_bottom_' + NOW_PAGE).length) //valuable set
        { scrollbottom = $('.page_bottom_' + NOW_PAGE).offset().top - window_height - 1; }
        if ($('.page_bottom_' + down_count_page).length) // if element exists
        {
            scroll_prev = $('.page_bottom_' + down_count_page).offset().top - window_height - 1;
        }

        if (scrolltop > scrollbottom && NOW_PAGE < ALL_PAGE_COUNT) //page ++
        {
            setUrlParameter('page', up_count_page);
            $(".sliderKey").val(up_count_page);
            console.log('page checker up');
        } else if (scroll_prev > scrolltop)
        {
            setUrlParameter('page', down_count_page);
            $(".sliderKey").val(down_count_page);
            console.log('page cound up');
        }
        //console.log(NOW_PAGE);
    }

    function finish_check() // check it last page
    {
        if ($("#contents_box > ul > .finish_contents").hasClass('finish_contents') || $("#contents_box > ul > .no-data-wrapper").hasClass('no-data-wrapper')) {
            DOWN_PAGE_FINISH = true; //finish bottom page
        } else
        {
            DOWN_PAGE_FINISH = false; //more next page
        }


        if ($(".page_bottom_1").hasClass('page_bottom_1')) {
            UP_PAGE_FINISH = true; //finish prev page
        } else {
            UP_PAGE_FINISH = false; //more prev page
            $('.contents_wrap > li:nth-child(1)').before('<p class="prev_page_call">call more prev contents</p>');
        }

    }
