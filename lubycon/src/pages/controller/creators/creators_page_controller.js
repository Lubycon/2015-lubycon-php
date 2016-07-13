$(document).ready(function(){
	callController();

	function callController(){
		console.time("DATA LOADED");
		$.ajax({
            type: "POST",
            url: "./pages/controller/contents/contents_view_controller.php",
            data: 'cate=' + CATE_PARAM + '&conno=' + CONNUM_PARAM,
            cache: false,
            success: function (data){
            	console.timeEnd("DATA LOADED");
                initViewer($.parseJSON(data));
            }
        })
	}
});