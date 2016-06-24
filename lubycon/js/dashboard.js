var windowWidth = $(window).width();

$(document).ready(function(){
    $(".history_kind span").first().remove();
    $(".toggle_info").on("click touchend",infoToggle);
        
        function infoToggle(event){
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
            "color": "#ffffff",
            "gridAlpha": 0,
            "axisAlpha" : 0
        }],
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "color": "#444444",
            "gridColor": "#444444",
            "gridAlpha": 0,
            "axisAlpha" : 0
        },
        "balloon": {
            "enabled": false
        },
        "graphs": [{
            "id": "g1",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "none",
            "lineThickness": 2,
            "title": "red line",
            "valueField": "value",
        }],
        "chartCursor": {
            "enabled": false
        },
        "export": {
            "enabled": false
        },
        "dataProvider": data
    });
}
/*----------------------------chart in dashboard page end--------------------------*/

