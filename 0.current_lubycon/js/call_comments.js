/////////////////////////////////////////////////////////
//      event handler start
/////////////////////////////////////////////////////////
//This function will be canceled the click event when users touch in mobile devices
//So if you want use any function in mobile, This eventHandler must be called to your function//
function eventHandler(event, selector) {
    event.stopPropagation();
    event.preventDefault();
    if (event.type === 'touchend'){
        selector.off('click');
    }
};
/////////////////////////////////////////////////////////
//      event handler end
/////////////////////////////////////////////////////////
var ajax_eventing = false;

function call_comments() {
    $.ajax
    ({
        url: "../ajax/call_comments_ajax.php",
        processData: false,
        contentType: false,
        //data: formData,
        type: "POST",
        cache: false,
        success: function (data)
        {
            $("#comment_list").append(data);
            ajax_eventing = false;
        }
    })
};

$(document).on("click touchend", "#comment_more_bt", function (event) { 
    eventHandler(event,$(this));
    if (ajax_eventing == false)
    {
        ajax_eventing = true;
        call_comments();
    }
    else{
        return;
    }
});