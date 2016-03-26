
/*----------------------------editor start----------------------------*/
/////////////////////////////////////////////////////////
//      editor aside tab start
/////////////////////////////////////////////////////////
$(function () {
    $(".tab_body").click(function (event) {
        if (!$(this).hasClass("selected_tab")) {
            $(".tab_body").removeClass("selected_tab");
            $(this).addClass("selected_tab");

            console.log(event.target.id);

            switch (event.target.id) {
                case "file_tab":
                    $("#edit_tab_section").show();
                    $("#thumbnail_tab_section").hide();
                    $("#setting_tab_section").hide();
                    break;
                case "thumbnail_tab":
                    $("#edit_tab_section").hide();
                    $("#thumbnail_tab_section").show();
                    $("#setting_tab_section").hide();
                    break;
                case "setting_tab":
                    $("#edit_tab_section").hide();
                    $("#thumbnail_tab_section").hide();
                    $("#setting_tab_section").show();
                    break;
            }//switch end
        } else {
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
$(function () {
    var caret = $(".note-toolbar panel-heading").find(".caret");
    caret.attr("class", "fa fa-plus");
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
var toggle_count = 0;
$(function () {
    $(document).on('click', '#modify_cc', function () {
        switch (toggle_count) {
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
$(function () {
    cc_checked();
    $("input:radio[name='cc_info']").click(function (event) {
        event = event || window.event;
        var $id = event.target.id;
        if ($id == "cc_radio") {
            $("#cc_checkboxes").stop().slideDown(400);
            cc_check_detector();
            cc_checked();
        }
        else if ($id == "cp_radio") {
            $("#cc_checkboxes").stop().slideUp(400);
            $(".cc_icon").hide();
        }
        else {
            return;
        }
    });
});

function cc_check_detector() {
    $("#cc_main").show();
    $("#cc_by").show();
    if ($("#nc").is(":checked")) {
        $("#cc_nc").show();
        $("#cc_nc").css("display", "inline-block");
    }
    else {
        $("#cc_nc").hide();
    };//cc_nc end
    if ($("#nd").is(":checked")) {
        $("#cc_nd").show();
        $("#cc_nd").css("display", "inline-block");
    }
    else {
        $("#cc_nd").hide();
    };//cc_nc end
    if ($("#sa").is(":checked")) {
        $("#cc_share").show();
        $("#cc_share").css("display", "inline-block");
    }
    else {
        $("#cc_share").hide();
    };//cc_nc end
};

function cc_checked() {
    $("input:checkbox[name='cc_check']").change(function () {
        if ($("#nc").is(":checked")) {
            $("#cc_nc").show();
            $("#cc_nc").css("display", "inline-block");
        }
        else {
            $("#cc_nc").hide();
        }//cc_nc end
    });
    $("input:checkbox[name='cc_check']").change(function () {
        if ($("#nd").is(":checked")) {
            $("#cc_nd").show();
            $("#cc_nd").css("display", "inline-block");
        }
        else {
            $("#cc_nd").hide();
        }//cc_nc end
    });
    $("input:checkbox[name='cc_check']").change(function () {
        if ($("#sa").is(":checked")) {
            $("#cc_share").show();
            $("#cc_share").css("display", "inline-block");
        }
        else {
            $("#cc_share").hide();
        }//cc_nc end
    });
};

$(function () {
    $("input:checkbox[name='cc_check']").click(function () {
        var checked_databox = [];
        $("input:checkbox[name='cc_check']:checked").each(function () {
            var checked_data = checked_databox.push($(this).val());
            var cc_url_sub = checked_databox.join("-");
            console.log(cc_url_sub);
            var cc_url = "http://creativecommons.org/licenses/" + cc_url_sub + "/4.0";//send to DB
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
    switch (gnv_sel) {
        case "edit":
            $("#editor_gnv ol li:nth-child(1)").addClass("editor_selected_gnv");
            break;
        case "call_thumb":
            $("#editor_gnv ol li:nth-child(3)").addClass("editor_selected_gnv");
            break;
        case "call_setting":
            $("#editor_gnv ol li:nth-child(5)").addClass("editor_selected_gnv");
            break;
        default:
            $("#editor_gnv ol li:nth-child(1)").addClass("editor_selected_gnv");
            break;
    }
};
$(function () {
    $(".contents_overlay").remove(); //remove contents card overlay
    $('#editor_upload_file').click(function () { //upload file window open
        $('#upload_file_input').click();
    });
});
$(function () {
    $('.upload_check').on('change', function () {
        var $this = '#' + $(this).attr('id');
        var files = this.files;
        var $size_setting = $(this).data('maxfilesize') * 1024 * 1024; //mb
        var $zip_compress = $(this).data('zipcomprees');

        var $white_list_media = ['jpg', 'jpeg', 'png', 'psd', 'pdf', 'gif', 'bmp', 'pdd', 'tif', 'raw', 'ai', 'esp', 'svg', 'svgz', 'iff', 'fpx', 'frm', 'pcx', 'pct', 'pic', 'pxr', 'sct', 'tga', 'vda', 'icb', 'vst', 'alz', 'zip', 'rar', 'jar', '7z', 'hwp', 'txt', 'doc', 'xls', 'xlsx', 'docx', 'pptx', 'pdf', 'ppt', 'me'];
        var $white_list_img = ['jpg', 'jpeg', 'png', 'psd', 'gif', 'bmp', 'pdd', 'tif', 'raw', 'ai', 'esp', 'svg', 'svgz', 'iff', 'fpx', 'frm', 'pcx', 'pct', 'pic', 'pxr', 'sct', 'tga', 'vda', 'icb', 'vst'];
        var $white_list_zip = ['alz', 'zip', 'rar', 'jar', '7z'];
        var $white_list_txt = ['hwp', 'txt', 'doc', 'xls', 'xlsx', 'docx', 'pptx', 'pdf', 'ppt', 'me'];
        var $white_list_all = 'all';

        switch ($($this).data('type')) {
            case 'media': $white_list = $white_list_media; break;
            case 'img': $white_list = $white_list_img; break;
            case 'zip': $white_list = $white_list_zip; break;
            case 'txt': $white_list = $white_list_txt; break;
            case 'all': $white_list = $white_list_all; break;
            default: $white_list = $white_list_all; break;
        }
        files_check($this, files, $size_setting, $white_list, $zip_compress);
        // html example : <input type="file" / class="upload_check" data-type="all" max-file-size="300000" zip-comprees="true" /  name="upload_file[]" multiple/>
    });
    function files_check($this, files, $size_setting, $white_list, $zip_compress) {
        var max_total_size = $size_setting; // setted limite size
        var total_size = 0; // default value
        for (var i = 0; i < files.length; i++) { total_size += files[i].size << 0; } //total size sum
        var ext = $($this).val().split('.').pop().toLowerCase(); //slice ext
        var submit_allow = false;
        var zip_radio = false;

        if ($($this).val() != "") // isn't blank?
        {
            if ($.inArray(ext, $white_list) !== -1 || $white_list == 'all') // check ext
            {
                if (total_size <= max_total_size) { // size check
                    if ($zip_compress) // zip or not
                    {
                        zip_radio = true; // done and zip
                        submit_allow = true;
                        alert('done and do zip');
                        fileinfo_maker(files, total_size)
                        return;
                    }
                    submit_allow = true; // done and not zip 
                    alert('done and dont zip');
                    fileinfo_maker(files, total_size)
                    return;
                } else // over limit size
                {
                    alert('big pie');
                    return;
                }
            }
            else // block don't macthed with white list
            {
                alert('blocked ext');
                return;
            }
        }
    }

    function fileinfo_maker(files, total_size)
    {
        $("#fileinfo_ul").html('');
        for (var i = 0; i < files.length; i++) // 정보를 담은 배열생성
        {
            $("#fileinfo_ul").append('<li>file name : ' + String(files[i].name) + '<br/>file size : ' + String(files[i].size) + ' byte</li>');
        }
        $("#fileinfo_ul").append('<li>total size : ' + total_size + ' byte</li>');
    }



});
/////////////////////////////////////////////////////////
//      editor nav end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      add text 
/////////////////////////////////////////////////////////
$(function () {
    $('#summernote').summernote({
        height: $(window).height() + 100,
        minHeight: null,
        maxHeight: null,
        focus: true,
        placeholder: '...make your preview image on here...',
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['style']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['color', ['color']],
            ['para', ['paragraph']],
            ['insert', ['picture', 'video', 'link', 'table', 'hr']],
            ['misc', ['help']]
        ],
        callbacks:
        {
            onImageUpload: function (files, editor, welEditable) {
                for (var i = files.length - 1 ; i >= 0 ; i--) {
                    sendFile(files[i], this);
                    console.log(files[i]);
                }
            }
        }
    });

    function sendFile(file, el) {
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
            success: function (url) {
                $(el).summernote('editor.insertImage', url["file_path"]);
                $("#editor_form").append("<input type='hidden' name='contents_image[]' value='" + url["file_name"] + "'>");
            }
        });
    }
    //summernote end
    var postForm = function () { // summernote submit event
        var content = $('textarea[name="content"]').html($('#summernote').code());
    }
});
/////////////////////////////////////////////////////////
//      add text end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      text color picker start
/////////////////////////////////////////////////////////
$(document).on('focus', '.editor_body_text', function () // text editor focus view
{
    $(this).next('.textarea_editor').stop().fadeIn(200);
    $(this).parent(".contents_div").css("background", "rgba(255,255,255,0.1)");
});
$(document).on("blur", ".editor_body_text", function () {
    $(this).next(".textarea_editor").stop().fadeOut(200);
    $(this).parent(".contents_div").css("background", "none");
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
$(document).on("click", "#back_bt_editor", function () {
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
$(function () {
    var price_name = $('#price_editor').find('.sod_label');
    var price_list = $('#price_editor').find('.sod_label').text();//correct

    price_name.on('change', function () {
        console.log(price_list);
        if (price_list == 'Paid') {
            $('#price_input').removeAttr('disabled');
        }
        else {
            $('#price_input').attr('disabled', 'disabled');
        }
    });
});
/////////////////////////////////////////////////////////
//      editor edit price end
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//      editor edit body color picker start
/////////////////////////////////////////////////////////
$(document).ready(function () {
    $(function () {
        $("#body_color_picker").spectrum({
            color: "#ffffff",
            preferredFormat: "rgb",
            move: function (color) {
                var editor_body = $("#editor_preview_box");
                editor_body.css("background", color.toRgbString());
            },
            change: function (color) {
                var editor_body = $("#editor_preview_box");
                editor_body.css("background", color.toRgbString());
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
$(document).ready(function () {
    var device_height = $(window).height();
    $(".panel-heading").height = device_height;
    $("#editor_section").height = device_height;
    $(".note-editor.note-frame .note-editing-area").height = device_height;
});
////////////////////////////////////////////////////////
//      editor editor toobar end
/////////////////////////////////////////////////////////
/*----------------------------editor end----------------------------*/

$(function(){
    $("#ajax_upload").click(function()
    {
        $.ajax(
        {
            type: "POST",
            url: "./php/ajax/editor_ajax_upload_test.php", //이페이지에서 중복체크를 한다
            dataType: 'text',
            data: 'data=data:image/jpeg;base64,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',
            cache: false,
            success: function (data) 
            {
                console.log(data);
            }
        });
    });
});
