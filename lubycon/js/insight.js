var windowWidth = $(window).width();


var likeChartRender = chartLoader("chartdiv1","likeChart","../../js/chart/data/likedata.json"),
viewChartRender = chartLoader("chartdiv2","viewChart","../../js/chart/data/viewdata.json"),
upChartRender = chartLoader("chartdiv3","upChart","../../js/chart/data/updata.json"),
downChartRender = chartLoader("chartdiv4","downChart","../../js/chart/data/downdata.json");

function chartLoader(target,theme,json){
    var dataArray = [];

    $.getJSON(json,function(data){
        $.each(data, function(i,v){
            dataArray.push({
                date: v["date"],
                value: v["value"]
            })
        })
        success : initChart(target,theme,dataArray);
    })
}

function initChart(target,theme,data){
    var chart = AmCharts.makeChart(target, {
        "type": "serial",
        "theme": theme,
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
        "dataProvider": data
    });
    console.log(data);
    chart.addListener("rendered", zoomChart);
    function zoomChart(){
        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    };  
} 
/*-------------------------make chart end-------------------------------*/

$(document).ready(function(){
    var chart_icon = $("#chart_icon");
    var chart_name = $("#chart_name");
    var chartboxes = $(".chartboxes");
    var chartbox1 = $("#chartdiv1");
    var chartbox2 = $("#chartdiv2");
    var chartbox3 = $("#chartdiv3");
    var chartbox4 = $("#chartdiv4");

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



