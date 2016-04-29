var windowWidth = $(window).width();
function eventHandler(event, selector) {//
    event.stopPropagation();
    event.preventDefault();
    if (event.type === 'touchend'){
        selector.off('click');
    }
};

/*-------------------------json loader start-------------------------------*/
////////////import data start
var likeChart;
var viewChart;
var upChart;
var downChart;

var likedata = [];
var likedata_loader = 
$.getJSON("../../js/chart/data/likedata.json", function(data) {
    $.each(data, function(i, v) {
        //console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        likedata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    console.log("loaded likedata"); 
    success : likeChart(); console.log("likeChart complete");
});

var viewdata = [];
var viewdata_loader = 
$.getJSON("../../js/chart/data/viewdata.json", function(data) {
    $.each(data, function(i, v) {
        //console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        viewdata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    console.log("loaded viewdata"); 
    success : viewChart(); console.log("viewChart complete");
     
});

var updata = [];
var updata_loader = 
$.getJSON("../../js/chart/data/updata.json", function(data) {
    $.each(data, function(i, v) {
        //console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        updata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    console.log("loaded updata");
    success : upChart(); console.log("upChart complete");
      
});

var downdata = [];
var downdata_loader = 
$.getJSON("../../js/chart/data/downdata.json", function(data) {
    $.each(data, function(i, v) {
        //console.log("date :" + v["date"] +", "+ "value :" + v["value"]);
        downdata.push({
            date: v["date"],
            value: v["value"]
        });
    });
    console.log("loaded downdata");  
    success: downChart(); console.log("downChart complete");
});
////////////import data end
/*-------------------------json loader end-------------------------------*/
/*-------------------------make chart start-------------------------------*/ 
/*---------------------------------------------------------------------------------------------------------------------------*/
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
            "ignoreAxisWidth":true
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
        "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#7feed2",//navigation bar color
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":50,
          "scrollbarHeight":10
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
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
    
/*---------------------------------------------------------------------------------------------------------------------------*/
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
            "ignoreAxisWidth":true
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
        "chartScrollbar": {
            "graph": "g2",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#ec6446",//navigation bar color
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":50,
          "scrollbarHeight":10
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
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
            "ignoreAxisWidth":true
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
        "chartScrollbar": {
            "graph": "g3",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#488ccb",//navigation bar color
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":50,
          "scrollbarHeight":10
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
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
            "ignoreAxisWidth":true
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
        "chartScrollbar": {
            "graph": "g4",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#ffbe54",
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":50,
          "scrollbarHeight":10
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
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

/*------------------------------------------select chart action start------------------------------------------------*/
$(document).ready(function(){
    var chart_icon = $("#chart_icon");
    var chart_name = $("#chart_name");
    var chartboxes = $(".chartboxes");
    var chartbox1 = $("#chartdiv1");
    var chartbox2 = $("#chartdiv2");
    var chartbox3 = $("#chartdiv3");
    var chartbox4 = $("#chartdiv4");
    var chartlist_toggle = 0;

    $(".chart_title").on("click touchend",function(){
        eventHandler(event,$(this));
        switch(chartlist_toggle){
            case 0 : 
                selectorStart();
            break;
            case 1 :
                selectorEnd();
            break;
        }
    });
    $(".chart_list").on("click touchend",function (event){
        eventHandler(event,$(this));
        switch(event.target.id){
            case "showlike" :
                chart_icon.attr("class","fa fa-heart");
                chart_icon.css("color","#48cfad");
                chart_name.text("Like");
                chartboxes.hide();
                chartbox1.show();
                selectorEnd();
            break;
            case "showview" :
                chart_icon.attr("class","fa fa-eye");
                chart_icon.css("color","#ec6446");
                chart_name.text("View");
                chartboxes.hide();
                chartbox2.show();
                selectorEnd();
            break;
            case "showupload" :
                chart_icon.attr("class","fa fa-cloud-upload");
                chart_icon.css("color","#488ccb");
                chart_name.text("Uploaded");
                chartboxes.hide();
                chartbox3.show();
                selectorEnd();
            break;
            case "showdownload" :
                chart_icon.attr("class","fa fa-cloud-download");
                chart_icon.css("color","#ffbe54");
                chart_name.text("Downloaded");
                chartboxes.hide();
                chartbox4.show();
                selectorEnd();
            break;
            default : return;
        }//swtich end
    });

    function selectorStart(){
        $("#toggle_arrow").attr("class","fa fa-caret-up");
        $("#chart_selector").stop().fadeIn(200);
        chartlist_toggle = 1;
    };
    function selectorEnd(){
        $("#toggle_arrow").attr("class","fa fa-caret-down");
        $("#chart_selector").stop().fadeOut(200);
        chartlist_toggle = 0;
    };
/*------------------------------------------select chart action end------------------------------------------------*/
});