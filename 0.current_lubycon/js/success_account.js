var timer = 0;
$(function(){
	////////////////////////////////////////////first animation start
	$("#thanks").animate({opacity:1},1000);//1s
	$("#thanks2").animate({opacity:1},1000);//1s	
	$("#circle").animate({opacity:1},700);//1s
    draw_circle();			
	/////////////////////////////////////////////first animation end
	$("#circle").queue(function(){
		/////////////////////////////////////////second animation start					
		$("#cir_body").animate({marginLeft:-5, marginTop:-5, width:90, height:90},230);
		$("#cir_body").animate({marginLeft:0, marginTop:0, width:80, height:80},230);
		/////////////////////////////////////////second animation end		
		$("#thanks2").queue(function(){
			////////////////////////////////////third animation start
			setTimeout("go_index()", 4000);//4s
			setInterval("remove_rect()", 1000);//1s
			///////////////////////////////////third animation end		
		});
	});
});




function go_index(){
	//location.replace("../../index.php");
	location.href = "../../index.php";//just use for debuging
};



function remove_rect(){
	$(".timer_rect:last").removeClass("timer_rect");
	timer++;
	if(timer==2){
		clearInterval(timer);
	}
};



function draw_circle(){
	var context = $('#cir_body')[0].getContext('2d');
	var numalt = 3600;
	var i = 0;
		
	context.translate(66,66);//center
	context.rotate(315*(Math.PI/42));//start point and draw speed
	
	setInterval(function(){
		context.beginPath();
		if( i > -numalt ){
			context.arc(0 ,0 ,50 ,0 ,i*(Math.PI/60) ,true);
			i--;
		};
			
		context.strokeStyle = '#48cfad';
		context.lineWidth = 100;
		context.stroke();
	},2);
};