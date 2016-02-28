
<!-- include libraries(jQuery, bootstrap, fontawesome) -->

<script src="js/bootstrap.min.js" type="text/javascript"></script>
<link href="css/bootstrap.min.css" type="text/css" rel="stylesheet" /> 
<!-- include summernote css/js-->
<link href="css/summernote.css" type="text/css" rel="stylesheet" />
<body>
<div name="summernote" id="summernote">Hello world</div><!--default-->

<script src="js/summernote.min.js" type="text/javascript" ></script>
<script>
		$('#summernote').summernote({
			height:490,
			minHeight:null,
			maxHeight:null,
			focus:true,
		});
		console.log("a");
</script>
</body>
