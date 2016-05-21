<link href="css/croppic.css" rel="stylesheet">
<script src="js/croppic.min.js"></script>

<?php   
        //it's follow contents_card.php infomation
        $username = "Admin_User";
        $contents_name = "Contents_name";
        $price = "Free";
        $contents_thumbnail_url = "./ch/img/no_img/no_img_user1.jpg"; // it's need to change ajax
?>
<button type="button" class="editor_popup_cancel"><i class="fa fa-times"></i></button>
<header id="tnail_header">Thumbnail Image</header>
<div id="work_space">
    <div id="tnail_preview">
        <ul>
            <?php
                @include_once('../layout/content_card.php');
            ?>
        </ul>
    </div>
</div>
<div class="buttons_pop">
    <button type="button" class="next_bt" id="call_setting">Next</button>
    <button type="button" class="cancel_bt" id="tnail_cancel">Cancel</button>
</div>
<script>
    $(".contents_card").append('<div id="cropContainerMinimal"></div>');

    var croppicContaineroutputMinimal = {
        uploadUrl: 'img_save_to_file.php',
        cropUrl: 'img_crop_to_file.php',
        modal: false,
        doubleZoomControls: false,
        rotateControls: false,
        loaderHtml: '<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
        onBeforeImgUpload: function () { console.log('onBeforeImgUpload') },
        onAfterImgUpload: function () { console.log('onAfterImgUpload') },
        onImgDrag: function () { console.log('onImgDrag') },
        onImgZoom: function () { console.log('onImgZoom') },
        onBeforeImgCrop: function () { console.log('onBeforeImgCrop') },
        onAfterImgCrop: function () { console.log('onAfterImgCrop') },
        onReset: function () { console.log('onReset') },
        onError: function (errormessage) { console.log('onError:' + errormessage) }
        }
        var cropContaineroutput = new Croppic('cropContainerMinimal', croppicContaineroutputMinimal);
</script>