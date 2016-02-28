
$(function (){ //account setting script
    $('#change_pass').click(function (){ //change pass remove attr
        if($('#now_pass_id').attr('disabled'))
        {
            $('#now_pass_id , #pass_id ,#re_pass_id').removeAttr('disabled');
            $('#change_pass').text('Not change Password');
        }else
        {
            $('#now_pass_id , #pass_id ,#re_pass_id').attr('disabled', 'disabled');
            $('#change_pass').text('change Password');
            $('#now_pass_id , #pass_id ,#re_pass_id').val('').next().removeClass();
            $('#pass_check, #now_pass_check').text('').show();
        }
    });

    var i = 1;
    $(document).ready(function (){
        $("#lang_minus_id").hide();
        $(".privacyFilter").lubySelector({
            width: 100,
            theme: "white",
            icon: "fa fa-lock",
            float: "none"
        })
        $(".jobFilter").lubySelector({
            width: 300,
            theme: "white",
            "float": "none",
            "icon": "fa fa-suitcase"
        });
        $(".locationFilter").lubySelector({
            width: 300,
            theme: "white",
            "float": "none",
            searchBar: true,
            "icon": "fa fa-globe"
        });
        $(".langFilter").lubySelector({
            width: 300,
            theme: "white",
            "float":"none"
        });
    });
    $(document).on("click touchend", "#lang_plus", function (event) //clone language div and change id
    {
        eventHandler(event, $(this));
        if (i < 4) {
            var lang_div = '<div id="lang_clone' + i + '"><div id="lang_option_' + i + '" class="language_option"><select class="langFilter" name="lang_ability[]"><option value="Beginer">Beginer</option><option value="Advanced">Advanced</option><option value="Fluent">Fluent</option><option value="Native">Native</option></select></div><input id="lang_input_' + i + '" class="language_text" name="language[]" type="text"></div>';
            $("#clone_div").append(lang_div);
            $(".langFilter").lubySelector({
                theme:"white",
                "float":"none"
            });
            $("#lang_minus_id").show();
            i++; //int plus

            if (i == 4) {
                $("#lang_plus").hide();
            }
        }
    });

    $(document).on("click touchend", ".lang_minus", function (event) {
        eventHandler(event, $(this));
        $("#lang_plus").show();
        $("#clone_div > div:last-child").remove();
        i--; //int minus
        if( i == 1 ){
            $("#lang_minus_id").hide();
        }
        // clone div remove
    });

});

var history_stack = 1;
$(document).ready(function ()
{
    $(".accountFilter").lubySelector({
        maxHeight:200,
        float: "none",
        theme: "white"
    });
    $("#history_minus").hide();
})
$(document).on("click touchend", "#history_plus", function (event) //clone language div and change id
{
    eventHandler(event, $(this));
    $(".history_cell .history_data:first-child").clone(true).appendTo(".history_cell");
    $(".history_cell .history_data:last-child").children('.history_text').val("");
    $("#history_minus").show();
    history_stack++;
});
$(document).on("click touchend", "#history_minus", function (event) //clone language div and change id
{
    eventHandler(event, $(this));
    if (history_stack == 2)
    {
        $(".history_cell .history_data:last-child").remove();
        $("#history_minus").hide();
    } else if (history_stack > 1) {
        $(".history_cell .history_data:last-child").remove();
    }
    history_stack--;
});
$(".lubySelector li").on("click", function ()
{
    //console.log($(this).parents('.lubySelector').next().val());
    var history_array = [];


    $('.history_cell .history_data').each(function (index) {
        history_array.push(
            {
                'index':  index,
                'year':  $(this).children('select:nth-of-type(1)').val(),
                'month': $(this).children('select:nth-of-type(2)').val(),
                'kind':  $(this).children('select:nth-of-type(3)').val(),
                'text': $(this).find('.history_text').val()
            });
        //console.log(history_array[index]);
    });

    aftersort = history_array.sort(CompareForSort);
    function CompareForSort(first, second) {
        if (first.year == second.year) // sort by year
            if (first.month < second.month) { // if same value year, sort by month
                return -1; //bigger than second month
            } else
            {
                return 1; //bigger than first month
            }
        if (first.year < second.year) 
            return -1; // bigger than second year
        else 
            return 1; // bigger than first year
    }

    $('.history_cell .history_data').each(function (index) {
        $(this).children('select:nth-of-type(1)').val(aftersort[index].year); //hidden selecter value change
        $(this).find('.history_year_changer').text(aftersort[index].year); //luby ui lubySelector_selected.span text change

        $(this).children('select:nth-of-type(2)').val(aftersort[index].month);
        $(this).find('.history_month_changer').text(aftersort[index].month);

        $(this).children('select:nth-of-type(3)').val(aftersort[index].kind);
        $(this).find('.history_kind_changer').text(aftersort[index].kind);

        $(this).children('.history_text').val(aftersort[index].text);
        //$(this).find('.history_year').val(aftersort[index].year).attr('selected', 'selected');
        //$(this).find('.history_month').val(aftersort[index].month).attr('selected', 'selected');
        //$(this).find('.history_kind').val(aftersort[index].kind).attr('selected', 'selected');
        //$(this).find('.history_text').val(aftersort[index].text);
    });
});
////////////////////////////delete button interaction start
$(function(){
    ////////cancel bt start/////////////////////////////////
    $('.dark_overlay, .index_cancel_bt').on("click touchend",function (){
        eventHandler(event,$(this));
        $('.dark_overlay').stop().fadeOut(200);
        $('#confirm_btAlert').stop().fadeOut(200);
    });
    $(".index_confirm_bt").on("click touchend",function(){
        eventHandler(event,$(this));
        $("#confirmAlert").css("display","none");
        $("#successAlert").css("display","inline-block");
        $("#successAlert").attr("class","lubyAlert zoomIn animated");
        setTimeout("removeAlert()",1500);
    })
    //////////cancel bt end/////////////////////////////////
});
function eventHandler(event, selector) {//
    event.stopPropagation();
    event.preventDefault();
    if (event.type === 'touchend'){
        selector.off('click');
    }
};
function removeAlert(){
    $("#successAlert").fadeOut(500);
    $(".dark_overlay").fadeOut(500);
}

////////////////////////////delete button interaction end
