
/*----------------------------editor start----------------------------*/
/////////////////////////////////////////////////////////
//      editor aside tab start
/////////////////////////////////////////////////////////
$(function () {
    $(".tab_body").click(function(event){
        if(!$(this).hasClass("selected_tab")){
            $(".tab_body").removeClass("selected_tab");
            $(this).addClass("selected_tab");

            console.log(event.target.id);

            switch(event.target.id){
                case "file_tab" :
                    $("#edit_tab_section").show();
                    $("#thumbnail_tab_section").hide();
                    $("#setting_tab_section").hide();
                break;
                case "thumbnail_tab":
                    $("#edit_tab_section").hide();
                    $("#thumbnail_tab_section").show();
                    $("#setting_tab_section").hide();
                break;
                case "setting_tab" :
                    $("#edit_tab_section").hide();
                    $("#thumbnail_tab_section").hide();
                    $("#setting_tab_section").show();
                break;
            }//switch end
        }else{
            return;
        }//if,else end
    });//click end
});//function end

/////////////////////////////////////////////////////////
//      editor aside tab end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      change tool box icon start
/////////////////////////////////////////////////////////
$(function(){
    var caret = $(".note-toolbar panel-heading").find(".caret");
    caret.attr("class","fa fa-plus");
    console.log(true);
});
/////////////////////////////////////////////////////////
//      change tool box icon end
/////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////
//      editor content_name start
/////////////////////////////////////////////////////////
$(function () {
    var editor_content_name = $("#editor_content_name");

    editor_content_name.focus(function () {
        if (editor_content_name.val() == 'input text...') {
            editor_content_name.val('');
        }
    });
    editor_content_name.blur(function () {
        if (editor_content_name.val() == '') {
            editor_content_name.val('input text...');
        }
    });
});
/////////////////////////////////////////////////////////
//      editor content_name end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      show cc_selector start
/////////////////////////////////////////////////////////
$(function(){
    var toggle_count = 0;
    $(document).on('click','#modify_cc', function(){
        switch(toggle_count){
            case 0:
                $(this).next("#cc_selector_box").fadeIn(200);
                toggle_count = 1;
            break;

            case 1:
                $(this).next("#cc_selector_box").fadeOut(200);
                toggle_count = 0;
            break;
        };
    });
});
/////////////////////////////////////////////////////////
//      show cc_selector end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      cc_selector start
/////////////////////////////////////////////////////////
$(function(){
    cc_checked();
    $("input:radio[name='cc_info']").click(function (event){
        event = event || window.event;
        switch(event.target.id){
            case "cc_radio" :
                $("#cc_checkboxes").stop().slideDown(400);
                cc_check_detector();
                cc_checked();
            break;
            case "cp_radio" :
                $("#cc_checkboxes").stop().slideUp(400);
                $(".cc_icon").hide();
            break;
        }
    });  
});

function cc_check_detector(){
    $("#cc_main").show();
    $("#cc_by").show();
    if($("#nc").is(":checked")){
        $("#cc_nc").show();
        $("#cc_nc").css("display","inline-block");
    }
    else{
        $("#cc_nc").hide();
    };//cc_nc end
    if($("#nd").is(":checked")){
        $("#cc_nd").show();
        $("#cc_nd").css("display","inline-block");
    }
    else{
        $("#cc_nd").hide();
    };//cc_nc end
    if($("#sa").is(":checked")){
        $("#cc_share").show();
        $("#cc_share").css("display","inline-block");
    }
    else{
        $("#cc_share").hide();
    };//cc_nc end
};

function cc_checked(){
    $("input:checkbox[name='cc_check']").change(function(){
        if($("#nc").is(":checked")){
            $("#cc_nc").show();
            $("#cc_nc").css("display","inline-block");
        }
        else{
            $("#cc_nc").hide();
        }//cc_nc end
    });
    $("input:checkbox[name='cc_check']").change(function(){
        if($("#nd").is(":checked")){
            $("#cc_nd").show();
            $("#cc_nd").css("display","inline-block");
        }
        else{
            $("#cc_nd").hide();
        }//cc_nc end
    });
    $("input:checkbox[name='cc_check']").change(function(){
        if($("#sa").is(":checked")){
            $("#cc_share").show();
            $("#cc_share").css("display","inline-block");
        }
        else{
            $("#cc_share").hide();
        }//cc_nc end
    });
};

$(function(){
    $("input:checkbox[name='cc_check']").click(function(){
        var checked_databox = [];
        $("input:checkbox[name='cc_check']:checked").each(function() {  
            var checked_data = checked_databox.push($(this).val());
            var cc_url_sub = checked_databox.join("-");
            console.log(cc_url_sub);
            var cc_url = "http://creativecommons.org/licenses/" + cc_url_sub + "/4.0";
            $("#cc_desc_link").attr("href", cc_url);
        });
    })
})
/////////////////////////////////////////////////////////
//      cc_selector end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      editor nav start
/////////////////////////////////////////////////////////
function editor_gnv_select(gnv_sel) {
    $("#editor_gnv ol li").removeClass();
    switch (gnv_sel){
        case "edit":
            $("#editor_gnv ol li:nth-child(1)").addClass("editor_selected_gnv");
            break;
        case "call_thumb":
            $("#editor_gnv ol li:nth-child(3)").addClass("editor_selected_gnv");
            break;
        case "call_setting":
            $("#editor_gnv ol li:nth-child(5)").addClass("editor_selected_gnv");
            break;
        default :
            $("#editor_gnv ol li:nth-child(1)").addClass("editor_selected_gnv");
            break;
    }
};
$(function () {
    $(".contents_overlay").remove(); //remove contents card overlay
    $('#editor_upload_file').click(function () { //upload file window open
        $('#upload_file_input').click();
    });
/////////////////////////////////////////////////////////
//      editor nav end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      add text 
/////////////////////////////////////////////////////////
    $('#summernote').summernote({
        height: $(window).height() + 100,
        minHeight: null,
        maxHeight: null,
        focus: true,
        placeholder: '...make your preview image on here...',
        toolbar: [
            // [groupName, [list of button]]
            ['style',['style']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],              
            ['color', ['color']],
            ['para', ['paragraph']],
            ['insert', ['picture', 'video', 'link', 'table', 'hr']],
            ['misc', ['help']]
        ],
        callbacks:
        {
            onImageUpload: function (files, editor, welEditable)
            {
                for ( var i = files.length - 1 ; i >= 0 ; i-- )
                {
                    sendFile(files[i], this);
                    console.log(files[i]);
                }
            }
        }
    });

    function sendFile(file, el)
    {
        var form_data = new FormData();
        form_data.append('file', file);
        $.ajax({
            data: form_data,
            type: "POST",
            dataType: 'json',
            url: './php/editor/imageUpload.php',
            cache: false,
            contentType: false,
            processData: false,
            success: function (url)
            {
                $(el).summernote('editor.insertImage', url["file_path"]);
                $("#editor_form").append("<input type='hidden' name='contents_image[]' value='" + url["file_name"] + "'>");
            }
        });
    }
    //summernote end
    var postForm = function ()
    { // summernote submit event
        var content = $('textarea[name="content"]').html($('#summernote').code());
    }
/////////////////////////////////////////////////////////
//      add text end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      text color picker start
/////////////////////////////////////////////////////////
$(document).on('focus', '.editor_body_text', function () // text editor focus view
{
    $(this).next('.textarea_editor').stop().fadeIn(200);
    $(this).parent(".contents_div").css("background","rgba(255,255,255,0.1)");
});
$(document).on("blur",".editor_body_text", function(){
    $(this).next(".textarea_editor").stop().fadeOut(200);
    $(this).parent(".contents_div").css("background","none");
})

$(document).on('click', '.color_picker > ul > li', function () //change text color change
{
    $(this).parents('.textarea_editor').prev('.editor_body_text').css({ "color": $(this).text() });
    $(this).parent('ul').prev('.selected_color').css({ "background": $(this).text() });
    $(this).parent('ul').hide();
});

$(document).ready(function () { //outside click toggle
    $(document).click(function (e) {
        var subject = $(".text_editor");

        if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
            $('.textarea_editor').stop().fadeOut(200);
        }
    });
});

$(document).on('click', '.selected_color', function () //color picker toggle
{
    $(this).next('ul').toggle();
});

$(document).on('click', '.color_picker', function () // color picker palete making
{
    $('.color_picker > ul > li').each(function () {
        $(this).css("background", $(this).text());
    });
});
/////////////////////////////////////////////////////////
//      text color picker end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      text editor tools end
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//      editor next contents call ajax start
/////////////////////////////////////////////////////////
$(document).on('click', '.next_bt', function () {
    var check_id = $(this).attr('id');
    //console.log(check_id);

    editor_gnv_select(check_id);

    $.ajax({
        type: "POST",
        url: "php/ajax/editor_ajax.php",
        data: "check_id=" + check_id,
        cache: false,
        success: function (data) {
            /* call php data */
            $('#next_pop_body').html('').append(data).fadeIn(300).css('display', 'inline-block');

            /* remove contents card event */
            $('#tnail_preview ul li .load_view').removeClass('load_view');
            $('#tnail_preview ul li a').removeAttr('href');

            /* js align center */
            $('#next_pop_body').css('marginLeft', function () {
                return $(this).width() / -2;//set width
            });

            /* select box call function */
            $(".basic_filter").selectOrDie
            ({
                customClass: "custom",
                customID: "custom",
                size: 5
            });
            $('.dark_overlay').fadeIn(300);

            /* change card title to user type text */
            $(".contents_title").text($("#editor_content_name").val());
        }
    });
});

$('.dark_overlay').click(function () {
    $('.dark_overlay').stop().fadeOut(300);
    $('#next_pop_body').stop().fadeOut(300).html('');
    editor_gnv_select("edit");
});
$(document).on('click', '.cancel_bt, .editor_popup_cancel', function () {
    $('.dark_overlay').stop().fadeOut(300);
    $('#next_pop_body').stop().fadeOut(300).html('');
    editor_gnv_select("edit");
})
$(document).on("click","#back_bt_editor", function(){
    //please add function for go back(ajax);
});

/////////////////////////////////////////////////////////
//      editor next contents call ajax end
/////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    //      editor change thumbnail start
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    //      editor edit price start
    /////////////////////////////////////////////////////////
    $(function(){
        var price_name=$('#price_editor').find('.sod_label');
        var price_list=$('#price_editor').find('.sod_label').text();//correct
        
        price_name.on('change',function(){
            console.log(price_list);
            if(price_list=='Paid'){
                $('#price_input').removeAttr('disabled');
            }
            else{
                $('#price_input').attr('disabled','disabled');
            }
        });
    });
    /////////////////////////////////////////////////////////
    //      editor edit price end
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    //      editor edit body color picker start
    /////////////////////////////////////////////////////////
    $(document).ready(function(){
        $(function(){
            $("#body_color_picker").spectrum({
                color:"#ffffff",
                preferredFormat: "rgb",
                move: function(color){
                    var editor_body = $("#editor_preview_box");
                    editor_body.css("background",color.toRgbString());
                },
                change: function(color){
                    var editor_body = $("#editor_preview_box");
                    editor_body.css("background",color.toRgbString());
                }
            });
        });
    })
    /////////////////////////////////////////////////////////
    //      editor edit body color picker end
    /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    //      editor editor toolbar start
    /////////////////////////////////////////////////////////
    $(document).ready(function(){
        var device_height = $(window).height();
        $(".panel-heading").height = device_height;
        $("#editor_section").height = device_height;
        $(".note-editor.note-frame .note-editing-area").height = device_height;
    });
    ////////////////////////////////////////////////////////
    //      editor editor toobar end
    /////////////////////////////////////////////////////////
});
/*----------------------------editor end----------------------------*/