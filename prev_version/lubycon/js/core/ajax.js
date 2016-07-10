var default_content="";

$(document).ready(function(){
	
	checkURL();
	$('a').click(function (e){

			checkURL(this.hash);

	});
	
	//filling in the default content
	default_content = $('#pageContent').html();
	
	
	setInterval("checkURL()",250);
	
});

var lasturl="";

function checkURL(hash)
{
	if(!hash) hash=window.location.hash;
	
	if(hash != lasturl)
	{
		lasturl=hash;
		
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		
		if(hash=="")
		    $('#pageContent').html(default_content);
		
		else
		loadPage(hash);
	}
}


function loadPage(url)
{
	
	$.ajax({
		type: "POST",
		url: "../php/load_page/load_page.php",
		dataType: "php",
		success: function(msg){
			    $('#pageContent').html(msg);
			    alert('1');
		}
		
	});
}