$(function () //account setting script
{
    $(document).scroll(function () { //account setting move banner
        if ($(document).scrollTop() > $('#account_setting_section').offset().top - 65) {
            $('#account_aside').css({ "position": "fixed", "top": "65px" });
        } else {
            $('#account_aside').css({ "position": "absolute", "top": "0px" });
        }
    });
    $(document).ready(function () //account setting banner event
    {
        $(document).scroll(function () { //account setting move banner
            $('#account_Setting_sub').click(function () {
                $("html, body").stop().animate({ scrollTop: ($('#account_setting_section').offset().top) - 65 }),
                $('#account_aside > ul > li').removeClass('selected_account'),
                $('#account_Setting_sub').addClass('selected_account');
            });
            $('#basic_info_sub').click(function () {
                $("html, body").stop().animate({ scrollTop: ($('#basic_info_section').offset().top) - 65 }),
                $('#account_aside > ul > li').removeClass('selected_account'),
                $('#basic_info_sub').addClass('selected_account');
            });
            $('#contact_info_sub').click(function () {
                $("html, body").stop().animate({ scrollTop: ($('#contact_info_section').offset().top) - 65 }),
                $('#account_aside > ul > li').removeClass('selected_account'),
                $('#contact_info_sub').addClass('selected_account');
            });
            $('#delete_account_sub').click(function () {
                $("html, body").stop().animate({ scrollTop: ($('#delete_account_section').offset().top) - 65 }),
                $('#account_aside > ul > li').removeClass('selected_account'),
                $('#delete_account_sub').addClass('selected_account');
            });

            if ($(document).scrollTop() > $('#account_setting_section').offset().top - 65 && $(document).scrollTop() < $('#basic_info_section').offset().top - 80) {
                $('#account_aside > ul > li').removeClass('selected_account');
                $('#account_Setting_sub').addClass('selected_account');
            } else if ($(document).scrollTop() > $('#basic_info_section').offset().top - 79 && $(document).scrollTop() < $('#contact_info_section').offset().top - 80) {
                $('#account_aside > ul > li').removeClass('selected_account');
                $('#basic_info_sub').addClass('selected_account');
            } else if ($(document).scrollTop() > $('#contact_info_section').offset().top - 79 && $(document).scrollTop() < $('#contact_info_section').offset().top - 70) {
                $('#account_aside > ul > li').removeClass('selected_account');
                $('#contact_info_sub').addClass('selected_account');
            } else if ($(document).scrollTop() == 1360) {
                $('#account_aside > ul > li').removeClass('selected_account');
                $('#delete_account_sub').addClass('selected_account');
            }
        });
    });

    var i = 2;

    $('#Change_pass').click(function () //change pass remove attr
    {
        if($('#now_pass_id').attr('disabled'))
        {
            $('#now_pass_id , #pass_id ,#re_pass_id').removeAttr('disabled');
            $('#Change_pass').text('Not Change Password');
            $('#Change_pass').css({'background':'#c1c1c1 ','margin-left':'65px'});
        }else
        {
            $('#now_pass_id , #pass_id ,#re_pass_id').attr('disabled', 'disabled');
            $('#Change_pass').text('Change Password');
            $('#Change_pass').css({ 'background': '#48CFAD ', 'margin-left': '75px' });
        }
    });
    


    $('#pass ,#repeat_pass, #repeat_pass_again').blur(function () //change pass border color
    {

        // id_overlapping Logic
        // 추가적인 비밀번호 로직 필요
        var data = $(this).val();
        var Id = $(this).attr('id');
        var CurrentId = '#'+Id;

        $.ajax({
            type:"POST",
            url:"./php/overlap_check.php",
            data:'check='+ data ,
            cache: false,
            success: function(data){

                if(data == "")
                {   console.log('empty');
                    $(CurrentId).css({ 'border-left': '2px solid #D5D5D5', 'width': '190px' });
                    $(CurrentId).next(i).removeClass();
                }
                else
                {
                    if(data == 1)//overlapping
                    {
                        console.log('overlap');
                        $(CurrentId).css({ 'border-left': '2px solid #D5D5D5', 'width': '190px' });
                        $(CurrentId).next(i).removeClass();
                        $(CurrentId).next(i).addClass('fa fa-times');
                    }
                    else if(data == 0)
                    {
                        console.log('non-overlap');
                        $(CurrentId).css({ 'border-left': '5px solid #8ec89a', 'width': '187px' });
                        $(CurrentId).next(i).removeClass();
                        $(CurrentId).next(i).addClass('fa fa-check');
                    }
                    else
                    {
                        console.log("exception");
                    }
                }
            }

        });

    });



    $('#lang_plus').click(function () //clone language div and change id
    {
        $("#clone_div").append('<div id="lang_clone"></div>');
        $("#lang_clone").append('<label>&nbsp;</label>');
        $('#lang_input_id').clone(true).appendTo('#lang_clone');
        $('#lang_option_id').clone(true).appendTo('#lang_clone');
        $("#lang_clone").append('<span id="lang_minus_id" class="lang_minus"><i class="fa fa-minus-circle"></i></span>');
        $('#lang_public_id').clone(true).appendTo('#lang_clone');


        $('#lang_clone > #lang_input_id').attr('id', 'lang_input_' + i);
        $('#lang_clone > #lang_option_id').attr('id', 'lang_option_' + i);
        $('#lang_clone > #lang_public_id').attr('id', 'lang_public_' + i);
        $('#lang_clone > #lang_minus_id').attr('id', 'lang_minus_' + i);

        $("#lang_clone").append('<br/>');

        $('#clone_div > #lang_clone').attr('id', 'lang_clone_' + i);
        i++; //int plus
    });

    $(document).on("click", ".lang_minus", function () {
        $(this).parent().remove();
        // clone div remove

    });

});

$(function () {

    $('#file_bt').click(function () // input file fake bt event
    {
        $('#file_hide').click();
    });
    $('#file_hide').change(function () {
        $('#file_text').val($(this).val());
    });
});

// input file preview
$.fn.setPreview = function (opt) {
    "use strict"
    var defaultOpt = {
        inputFile: $(this),
        img: null,
        w: 216,
        h: 216
    };
    $.extend(defaultOpt, opt);

    var previewImage = function () {
        if (!defaultOpt.inputFile || !defaultOpt.img) return;

        var inputFile = defaultOpt.inputFile.get(0);
        var img = defaultOpt.img.get(0);

        // FileReader
        if (window.FileReader) {
            // image ÆÄÀÏ¸¸
            if (!inputFile.files[0].type.match(/image\//)) return;

            // preview
            try {
                var reader = new FileReader();
                reader.onload = function (e) {
                    img.src = e.target.result;
                    img.style.width = defaultOpt.w + 'px';
                    img.style.height = defaultOpt.h + 'px';
                    img.style.display = '';
                }
                reader.readAsDataURL(inputFile.files[0]);
            } catch (e) {
                // exception...
            }
            // img.filters (MSIE)
        } else if (img.filters) {
            inputFile.select();
            inputFile.blur();
            var imgSrc = document.selection.createRange().text;

            img.style.width = defaultOpt.w + 'px';
            img.style.height = defaultOpt.h + 'px';
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\"" + imgSrc + "\")";
            img.style.display = '';
            // no support
        } else {
            // Safari5, ...
        }
    };

    // onchange
    $(this).change(function () {
        previewImage();
    });
};


$(document).ready(function () {
    var opt = {
        img: $('#img_preview'),
        w: 'auto',
        h: 216
    };

    $('#file_hide').setPreview(opt);
});