


<link href="css/bootstrap.min.css" type="text/css" rel="stylesheet"> 
<script src="js/bootstrap.min.js" type="text/javascript"></script> 
<link href="css/summernote.css" type="text/css" rel="stylesheet" />
<div class="note"></div><!--default-->
<script src="js/summernote.js" type="text/javascript" ></script>
<script>
	$(document).ready(function(){
		$('#main_work_space').summernote({
			minHeight:null,
			maxHeight:null,
			focus:true,
			placeholder: 'write here...',
			toolbar: [
                // [groupName, [list of button]]
                ['style',['style']],
                ['fontsize', ['fontname', 'fontsize']],
                ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['font', ['superscript', 'subscript']],            
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['insert', ['picture', 'video', 'link', 'table', 'hr']],
                ['misc', ['help']],
            ],
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Source Sans Pro'],
		});
	});
</script>

