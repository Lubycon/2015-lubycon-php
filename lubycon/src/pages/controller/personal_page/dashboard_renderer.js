
$(document).ready(function(){
    Request({
        url: "./pages/controller/personal_page/dashboard_controller.php",
        data: {
            usernum: USER_PARAM
        },
        callback: init
    });

    function init(data,session){
        initDashboard(data);
    }

    function initDashboard(response){
        var data = response.result,
            session = response.session;
        console.log(data);
        //console.log(data.insightData);
        var job = $(".content_text[data-value='job']").text(data.userData.job),
            position = $(".content_text[data-value='position']").text(data.userData.position),
            city = $(".content_text[data-value='city']").text(data.userData.location.city || ""),
            country = $(".content_text[data-value='country']").text(data.userData.location.country),
            language1 = $(".content_text[data-value='language1']"),
            language2 = $(".content_text[data-value='language2']"),

            historyWrap = $(".history_wrap"),

            totalLike = $("#total_like").find(".dash_body_content").text(data.insightData.totalLike),
            totalView = $("#total_view").find(".dash_body_content").text(data.insightData.totalView),
            totalUpload = $("#total_upload").find(".dash_body_content").text(data.insightData.totalUpload),
            totalDownload = $("#total_download").find(".dash_body_content").text(data.insightData.totalDownload),

            website = $("#user-website");

        var languageMap = data.userLanguage.map(function(v,i){
            return v.level === "Advanced" || v.level === "Fluent" ? v.name : null;
        }).clean();

        language1.text(languageMap[0]);
        language2.text(languageMap[1]);


        initHistory(data.userHistory.reverse());

        $.getJSON("./component/view/chart/data/insightData.json",function(data){
            success : initChart(data);
        }).fail(function(d, textStatus, error){
            console.log("insight data loading is failed, status: " + textStatus + ", error: "+error);
        });

        $(".history_kind span").first().remove();
        $(".toggle_info").on("click touchend",infoToggle);
        initClocks();

        if(data.publicOption.website){
            website.find("a").attr({
                "text" : data.userData.website,
                "href" : data.userData.website
            });
        }
        else {
            website.find("a").html("<i class='fa fa-lock'></i> Private");
        }

        function initHistory(data){
            var li = $("<li/>"),
                date = $("<div/>",{ "class" : "history_date" }),
                kind = $("<div/>",{ "class" : "history_kind" }),
                    icon = $("<i/>", { "class" : "fa fa-circle" }).appendTo(kind),
                    line = $("<span/>").appendTo(kind),
                content = $("<div/>",{ "class" : "history_content" });
            for(var i = 0; i < data.length; i++){
                var d = date.clone().text(data[i].year + " " + data[i].month.substring(0,3)),
                    k = kind.clone().addClass(data[i].category),
                    c = content.clone().text(data[i].content);

                li.clone()
                    .append(d)
                    .append(k)
                    .append(c)
                    .appendTo(historyWrap);
            }
        }

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

        function initChart(data){
            var likeTimelineData = data.timeline.like,
                viewTimelineData = data.timeline.view,
                uploadTimelineData = data.timeline.upload,
                downloadTimelineData = data.timeline.download;

            chartLoader("chartdiv1","likeChart",likeTimelineData);
            chartLoader("chartdiv2","viewChart",viewTimelineData);
            chartLoader("chartdiv3","upChart",uploadTimelineData);
            chartLoader("chartdiv4","downChart",downloadTimelineData);
        }

        function chartLoader(target,theme,data){
            var dataArray = [];
            $.each(data, function(i,v){
                dataArray.push({
                    date: v["date"],
                    value: v["value"]
                });
            });
            dataArray.splice(0,dataArray.length-7);
            initLineChart(target,theme,dataArray);
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

        function initClocks(){
            var userClock = $("#usertime").find(".clock_wrap"),
            localClock = $("#localtime").find(".clock_wrap");

            setInterval(syncTime(userClock,localClock),1000);
            blinkColon();

            syncTime(userClock,localClock);
            function syncTime(user,local){
                var time = initTime(),
                colon = "<span class='colon'>:</span>";

                var localTime = time.local.hour + colon + time.local.minute,
                userTime = time.user.hour + colon + time.user.minute;

                user.find(".clock").html(userTime);
                user.find(".ampm").text(time.user.ampm);

                local.find(".clock").html(localTime);
                local.find(".ampm").text(time.local.ampm);
            }

            function initTime(){
                var UTC = data.userData.utc;

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
                    if(colon_count === 0){
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
            }
        }
    }
});
