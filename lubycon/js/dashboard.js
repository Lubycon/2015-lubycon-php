var windowWidth = $(window).width();

$(document).ready(function(){
    $(".toggle_info").on("click touchend",infoToggle);
        
        function infoToggle(){
            eventHandler(event,$(this));
            var $this = $(this),
            $body = $this.parent().next(".dash_body");

            if($this.hasClass("selected")){
                $this.attr("class","fa fa-angle-up toggle_info");
                $body.css("min-height","0px").stop().slideUp(300);
            }else{
                $this.attr("class","fa fa-angle-down toggle_info selected");
                $body.stop().slideDown(300,function(){
                    $body.css("min-height","150px");
                });
            }
        }
})
/*----------------------------toggle section button start------------------------------*/

/*----------------------------toggle section button end------------------------------*/
/*----------------------------time card in dashboard page start------------------------*/

$(function(){

    var userClock = $("#usertime").find(".clock_wrap"),
    localClock = $("#localtime").find(".clock_wrap");

    setInterval(syncTime(userClock,localClock),1000);
    blinkColon();

    function syncTime(user,local){
        var time = initTime(),
        colon = "<span class='colon'>:</span>";

        var localTime = time.local.hour + colon + time.local.minute,
        userTime = time.user.hour + colon + time.user.minute;

        user.find(".clock").html(userTime);
        user.find(".ampm").text(time.user.ampm);

        local.find(".clock").html(localTime);
        local.find(".ampm").text(time.local.ampm);
    }(userClock,localClock);
    
    
    function initTime(){
        var localTime = new Date(),
        timezone = localTime.getTime() + (localTime.getTimezoneOffset() * 60000); //min -> ms

        var utcTime = new Date();
        utcTime.setTime(timezone);

        var userTime = new Date();
        UTC *= 3600000, //hour -> ms
        timezone = utcTime.getTime() + UTC;
        userTime.setTime(timezone);

        return {
            "local" : localTime.get12HourTime(true),
            "user" : userTime.get12HourTime(true),
            "utc" : utcTime.get12HourTime(true)
        };
    }

    function blinkColon(){
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
});
/*----------------------------time card in dashboard page end--------------------------*/
/*----------------------------chart in dashboard page start--------------------------*/

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
        dataArray.splice(0,dataArray.length-7);
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
        "dataProvider": data
    });
    chart.addListener("rendered", zoomChart);
    function zoomChart(){
        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    };  
}

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

