/*--------------------------------community editor start-------------------------------*/
$(document).ready(function(){

    $('#file_import_bt').on("click touchend",function(event) {
        eventHandler(event,$(this));
        $('#file_import_com').trigger("click");
    });
    $('#file_import_com').change(function () {
        $('#file_text_com').val($(this).val());
    });

    if($("#main_work_space").length !== 0){
        var unloadChecker = true;
        window.onbeforeunload = function(){
            console.log(unloadChecker);
            if(unloadChecker) return "a";
        }

        $("#community_submit").on("click",finalSubmit);

        $('#summernote').summernote({
            height: 250,
            minHeight: null,
            maxHeight: null,
            focus: true,
            toolbar: [
                // [groupName, [list of button]]
                ['style',['style']],
                ['fontsize', ['fontsize']],
                ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],              
                ['color', ['color']],
                ['para', ['paragraph']],
                ['insert', ['picture', 'video', 'link', 'table', 'hr']]
            ],
            callbacks:{
                onImageUpload: function (files, editor, welEditable){
                    for ( var i = files.length - 1 ; i >= 0 ; i-- ){
                        sendFile(files[i], this);
                        console.log(files[i]);
                    }
                }
            }
        });

        function sendFile(file, el){
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
                    $("form").append("<input type='hidden' name='contents_image[]' value='" + url["file_name"] + "'>");
                }
            });
        }
        //summernote end
        function postForm(){ // summernote submit event
            var content = $('textarea[name="content"]').html($('#summernote').code());
        }

        function finalSubmit(){
            unloadChecker = false;
            $("#writer_form").submit();
        }
        return true;
    }else{
        return false;
    }
    
});
/*--------------------------------community editor end-------------------------------*/