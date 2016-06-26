var likeData = [320,124];
var bookmarkData = [12,3];
var mapData = [
    {
        "id" : 200, //Country Code
        "title" : "South Korea", //Country Name
        "color" : "#48cfad", //Selected Color
        "mouseEnabled": false 
    },
    {
        "id" : 229,
        "title" : "United State America",
        "color" : "#48cfad",
        "mouseEnabled": false
    },
    {
        "id" : 72,
        "title" : "France",
        "color" : "#48cfad",
        "mouseEnabled": false
    },
    {
        "id" : 43,
        "title" : "China",
        "color" : "#48cfad",
        "mouseEnabled": false
    },
    {
        "id" : 28,
        "title" : "Brazil",
        "color" : "#48cfad",
        "mouseEnabled": false
    }
];




$(document).ready(function(){
    initInsight();

    function initInsight(){
        //give & take
        initPieChart("like-pie",likeData);
        initPieChart("bookmark-pie",bookmarkData);
        //worldmap
        worldMapLoader("worldmap",mapData);
        //Timeline
        chartLoader("like-timeline","likeChart","../../js/chart/data/likedata.json");
        chartLoader("view-timeline","viewChart","../../js/chart/data/viewdata.json");
        chartLoader("up-timeline","upChart","../../js/chart/data/updata.json");
        chartLoader("down-timeline","downChart","../../js/chart/data/downdata.json");

        initGL();

        setTimeout(integratedLicense,1000);
    }

    function integratedLicense(){
        var charts = $(document).find(".chart-boxes");
        charts.each(function(){
            var license = $(this).find("a");
            license.remove();
        })
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

    function initPieChart(target,data){
        var countViewer = $("#"+target).parents(".dash_body_sector").prev().find(".x2_inner");
        countViewer.each(function(){
            var count = $(this).find(".content_text");
            if($(this).data("value") === "got") count.text(data[0]);
            else count.text(data[1]);
        });

        var chart = AmCharts.makeChart(target,{
            "type": "pie",
            "theme": "light",
            "colors": ["#48cfad","#444444"],
            "dataProvider": [
                {
                    "title": "Got",
                    "value": data[0]
                }, 
                {
                    "title": "Gave",
                    "value": data[1]
                }
            ],
            " labelsEnabled": false,
            "titleField": "title",
            "valueField": "value",
            "labelRadius": 5,

            "radius": "42%",
            "innerRadius": "60%",
            "labelText": "[[title]]",
            "export": {
                "enabled": false
            }
        });
    }

    function worldMapLoader(target,data){
        console.log(target);

        var lists = $("#worldmap_body").find(".dash_rank_list").find("li p");
        lists.each(function(i){
            $(this).text(data[i].title);
            $(this).attr("data-target",data[i].id);
        })
        

        var chart = AmCharts.makeChart(target,{
            "type": "map",
            "theme": "light",
            "projection":"miller",
            "allowClickOnSelectedObject": false,
            "zoomOnDoubleClick": false,
            "dragMap": false,
            "dataProvider": {
                "map": "customWorldmap",
                "getAreasFromMap": true,
                "areas": data
            },
            "areas":{
                
            },
            "areasSettings": {
                "autoZoom": false,
                "color": "#aaaaaa",
                "colorSolid": "#48cfad",
                "rollOverColor": "#dddddd"
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
        var chart = AmCharts.makeChart(target,{
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

    function initGL(){

    }   
});
