$.ajax({
            type: "POST",
            url: "./pages/controller/index/index_body_controller.php",
            data : 'device=pc',
            cache: false,
            success: function (data){
            	console.log(data);
            	//console.log($.parseJSON(data));
            }
        })