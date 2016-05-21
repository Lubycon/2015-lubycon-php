var like_stat;
var like_check;
var countkind;

$(document).on("click", "#like_bt , #bookmark_bt", function () {
    switch($(this).attr('id')) // if you want the other count ajax increase, add this switch to object 
    {
        case "like_bt": countkind = 'like';
        case "bookmark_bt": countkind = 'bookmark';
        default : break;
    }
    if ($(this).hasClass('toggle')) // not like yet
    {
        like_stat = true;
        like_count_up(countkind, like_stat);
    } else
    {
        like_stat = false;
        like_count_up(countkind, like_stat);
    }
});


function like_count_up(countkind, like_stat){
    $.ajax({
        type: "POST",
        url: "../ajax/increase_like_ajax.php",
        data: 'countkind=' + countkind + '&conno=' + CONNUM_PARAM + '&cate=' + CATE_PARAM + '&like=' + like_stat,// data send
        cache: false,
        success: function (data) {
            like_number = $("#"+countkind+"Count");
            if (like_stat) {
                like_check = +1;
            } else if (!like_stat) {
                like_check = -1;
            }

            like_number.text( Number(like_number.text()) + like_check);
            console.log(data);
        }
    })
}

//tooltip start
$(document).ready(function(){
    $(".cc_icon").tooltip({"top": 30, "right": -40});
    $(".user_location").tooltip({"top": 75, "right": 0});
})


//tooltip end