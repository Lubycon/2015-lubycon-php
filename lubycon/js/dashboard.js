var windowWidth = $(window).width();

$(document).ready(function(){
    $(".toggle_info").on("click",toggle.single).on("click touchend",infoToggle);
        
        function infoToggle(){
            eventHandler(event,$(this));
            var $this = $(this),
            $body = $this.parent().next(".dash_body");

            if($this.hasClass("selected")){
                $this.attr("class","fa fa-angle-down toggle_info");
                $body.css("min-height","0px").stop().slideUp(300);
            }else{
                $this.attr("class","fa fa-angle-up toggle_info");
                $body.stop().slideDown(300,function(){
                    $body.css("min-height","150px");
                });
            }
        }
})
/*----------------------------toggle section button start------------------------------*/

/*----------------------------toggle section button end------------------------------*/
/*----------------------------time card in dashboard page start------------------------*/
function localTime() {
    var localtime = new Date();
    var local_h = localtime.getHours();
    var local_m = localtime.getMinutes();
    var local_s = localtime.getSeconds();
    var mid = "";
    var clock = setTimeout(localTime, 1000);
    
    if(local_h <= 12){ //At 00 hours we need to show 12 am
    	mid = "am";
    }
    else if(local_h > 12){ // pm
    	local_h = local_h - 12;
    	mid = "pm";
    };
    //console.log("<"+mid+">"+local_h+":"+local_m+":"+local_s);

    local_h = checkTime(local_h);
    local_m = checkTime(local_m);
    local_s = checkTime(local_s);
    $("#user_ampm").text(mid);
    $("#userclock").html(local_h + "<span class='colon'>:</span>" + local_m);
    $("#local_ampm").text(mid);
    $("#localclock").html(local_h + "<span class='colon'>:</span>" + local_m);
};

function checkTime(i) {
    if (i < 10){
    	i = "0" + i
	};  // add zero in front of numbers < 10

    return i;
};

function blinkColon() {
	var colon_count = 0;
    var blink_time = setInterval(function(){
        var colon = $(".colon");
    	if(colon_count == 0){
    		colon.css("visibility","hidden");
    		colon_count = 1;
    		//console.log(colon_count);
    	}
    	else if(colon_count == 1){
    		colon_count = 0;
    		colon.css("visibility","visible");
    		//console.log(colon_count);
    	}
    },500);
};

localTime();
blinkColon();
/*----------------------------time card in dashboard page end--------------------------*/
/*----------------------------chart in dashboard page start--------------------------*/
///////////////loader start
var likeChart;
var viewChart;
var upChart;
var downChart;

var likedata = [];
var viewdata = [];
var updata = [];
var downdata = [];

var likedata_loader = 
$.getJSON("../../js/chart/data/likedata.json", function(data) {
    $.each(data, function(i, v) {
        console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        likedata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    likedata.splice(0,likedata.length-7);//last 7 days
    console.log("loaded likedata"); 
    success : likeChart(); console.log("likeChart complete");  
});
var viewdata_loader = 
$.getJSON("../../js/chart/data/viewdata.json", function(data) {
    $.each(data, function(i, v) {
        console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        viewdata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    viewdata.splice(0,viewdata.length-7);//last 7 days
    console.log("loaded viewdata"); 
    success : viewChart(); console.log("viewChart complete");  
});
var updata_loader = 
$.getJSON("../../js/chart/data/updata.json", function(data) {
    $.each(data, function(i, v) {
        console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        updata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    updata.splice(0,updata.length-7);//last 7 days
    console.log("loaded updata"); 
    success : upChart(); console.log("upChart complete");  
});
var downdata_loader = 
$.getJSON("../../js/chart/data/downdata.json", function(data) {
    $.each(data, function(i, v) {
        console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        downdata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    downdata.splice(0,downdata.length-7);//last 7 days
    console.log("loaded downdata"); 
    success : downChart(); console.log("downChart complete");  
});

///////////////loader end

function likeChart(){
    likeChart = AmCharts.makeChart("chartdiv1", {
        "type": "serial",
        "theme": "likeChart",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#7feed2",//navigation bar color
            "limitToGraph":"g1",
            "valueLineAlpha":1
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        },
        "export": {
            "enabled": false
        },
        "dataProvider": likedata
    });
    likeChart.addListener("rendered", zoomChart);
    zoomChart();
    function zoomChart(){
        likeChart.zoomToIndexes(likeChart.dataProvider.length - 40, likeChart.dataProvider.length - 1);
    };    
};
function viewChart(){
    viewChart = AmCharts.makeChart("chartdiv2", {
        "type": "serial",
        "theme": "viewChart",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v2",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g2",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#ec6446",//navigation bar color
            "limitToGraph":"g1",
            "valueLineAlpha":1
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        },
        "export": {
            "enabled": false
        },
        "dataProvider": viewdata
    });
    viewChart.addListener("rendered", zoomChart);
    zoomChart();
    function zoomChart(){
        viewChart.zoomToIndexes(viewChart.dataProvider.length - 40, viewChart.dataProvider.length - 1);
    }
}; 
/*---------------------------------------------------------------------------------------------------------------------------*/
function upChart(){
    upChart = AmCharts.makeChart("chartdiv3", {
        "type": "serial",
        "theme": "upChart",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v3",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g3",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#488ccb",//navigation bar color
            "limitToGraph":"g1",
            "valueLineAlpha":1
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true,
            "color": "444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        },
        "export": {
            "enabled": false
        },
        "dataProvider": updata
    });
    upChart.addListener("rendered", zoomChart);
    zoomChart();
    function zoomChart(){
        upChart.zoomToIndexes(upChart.dataProvider.length - 40, upChart.dataProvider.length - 1);
    }
} 
/*---------------------------------------------------------------------------------------------------------------------------*/
function downChart(){
    downChart = AmCharts.makeChart("chartdiv4", {
        "type": "serial",
        "theme": "downChart",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v4",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g4",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#ffbe54",
            "limitToGraph":"g1",
            "valueLineAlpha":1
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.3
        },
        "export": {
            "enabled": false
        },
        "dataProvider": downdata
    });
    downChart.addListener("rendered", zoomChart);
    zoomChart();
    function zoomChart(){
        downChart.zoomToIndexes(downChart.dataProvider.length - 40, downChart.dataProvider.length - 1);
    }
};   
/*-------------------------make chart end-------------------------------*/
/*------------------------select chart action start---------------------*/
$(document).ready(function(){
    var chart_icon = $("#chart_icon");
    var chart_name = $("#chart_name");
    var chartboxes = $(".chartboxes");

    $(".chart_title").on("click",toggle.single).on("click touchend",chartToggle);
    $(".chart_list").on("click touchend",function (event){
        eventHandler(event,$(this));
        var data = $(this).data("target"),
        targetChart = $("#" + data);
        switch(data){
            case "chartdiv1" :
                chart_icon.attr("class","fa fa-heart");
                chart_icon.css("color","#48cfad");
                chart_name.text("Like");
                chartboxes.hide();
                targetChart.show();
            break;
            case "chartdiv2" :
                chart_icon.attr("class","fa fa-eye");
                chart_icon.css("color","#ec6446");
                chart_name.text("View");
                chartboxes.hide();
                targetChart.show();
            break;
            case "chartdiv3" :
                chart_icon.attr("class","fa fa-cloud-upload");
                chart_icon.css("color","#488ccb");
                chart_name.text("Uploaded");
                chartboxes.hide();
                targetChart.show();
            break;
            case "chartdiv4" :
                chart_icon.attr("class","fa fa-cloud-download");
                chart_icon.css("color","#ffbe54");
                chart_name.text("Downloaded");
                chartboxes.hide();
                targetChart.show();
            break;
            default : return;
        }//swtich end
    });

    function chartToggle(){
        eventHandler(event,$(this));
        var $this = $(this),
        $menuList = $("#chart_selector");
        if($this.hasClass("selected")){
            $("#toggle_arrow").attr("class","fa fa-caret-up");
            $menuList.stop().fadeIn(200);
            $menuList.hideAnywhere($this);
        }
        else{
            $("#toggle_arrow").attr("class","fa fa-caret-down");
            $menuList.stop().fadeOut(200);
        }
        
    };
});
/*----------------select chart action end------------------------------*/
/*----------------------------chart in dashboard page end--------------------------*/

