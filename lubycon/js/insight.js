var windowWidth = $(window).width();
var mapData = [
    {
        "id" : "KR",
        "title" : "South Korea",
        "color" : "#48cfad"
    },
    {
        "id" : "US",
        "title" : "United State America",
        "color" : "#48cfad"
    },
    {
        "id" : "FR",
        "title" : "France",
        "color" : "#48cfad"
    },
    {
        "id" : "CN",
        "title" : "China",
        "color" : "#48cfad"
    },
    {
        "id" : "AF",
        "title" : "Afganistan",
        "color" : "#48cfad"
    }
];
$(document).ready(function(){
    initInsight();
})

function initInsight(){
    //worldmap
    worldMapLoader("worldmap",mapData);
    //Timeline
    chartLoader("like-timeline","likeChart","../../js/chart/data/likedata.json");
    chartLoader("view-timeline","viewChart","../../js/chart/data/viewdata.json");
    chartLoader("up-timeline","upChart","../../js/chart/data/updata.json");
    chartLoader("down-timeline","downChart","../../js/chart/data/downdata.json");
}

function chartLoader(target,theme,json){
    var dataArray = [];

    $.getJSON(json,function(data){
        $.each(data, function(i,v){
            dataArray.push({
                date: v["date"],
                value: v["value"]
            })
        })
        success : initLineChart(target,theme,dataArray);
    });
}

function worldMapLoader(target,data){
    console.log(target);

    var lists = $("#worldmap_body").find(".dash_rank_list").find("li p");
    lists.each(function(i){
        $(this).text(data[i].title);
        $(this).attr("data-target",data[i].id);
    })
    

    var chart = AmCharts.makeChart(target, {
        "type": "map",
        "theme": "light",
        "projection":"miller",
        "allowClickOnSelectedObject": false,
        "zoomOnDoubleClick": false,
        "dragMap": false,
        "dataProvider": {
            "map": "worldHigh",
            "getAreasFromMap": true,
            "areas": data
        },
        "areasSettings": {
            "autoZoom": false,
            "color": "#aaaaaa",
            "colorSolid": "#48cfad",
            "rollOverColor": "#cccccc"
        },
        "smallMap": {
            "enabled": false
        },
        "zoomControl": {
            "zoomControlEnabled": false,
            "homeButtonEnabled": false
        },
        "balloon": {
            "enabled": false
        },
        "export": {
            "enabled": false
        }
    });
}

function initLineChart(target,theme,data){
    var chart = AmCharts.makeChart(target, {
        "type": "serial",
        "theme": theme,
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v1",
            "position": "left",
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.5,
            "ignoreAxisWidth":true
        }],
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0.5,
            "minorGridEnabled": true
        },
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#444444"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 7,
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
            "selectedBackgroundColor": "#999999",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#444444"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#444444",//navigation bar color
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":50,
          "scrollbarHeight":10
        },
        "export": {
            "enabled": false
        },
        "dataProvider": data
    });
    chart.addListener("rendered", zoomChart);
    function zoomChart(){
        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    };  
} 
/*-------------------------make chart end-------------------------------*/

$(document).ready(function(event){
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

    function chartToggle(event){
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



