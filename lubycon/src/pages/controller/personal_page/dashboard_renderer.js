
$(document).ready(function(){
    Controller({
        url: "./pages/controller/personal_page/dashboard_controller.php",
        callback: init
    });

    function init(data,session){
        console.log("DUMMY DATA");
        initDashboard(data);
    }

    function initDashboard(data){
        //console.log(data.insightData);
        data = { //DUMMY
            insightData:{
                totalLike: 22,
                totalView: 1242,
                totalUpload: 2051,
                totalDownload: 3
            },
            userData: {
                utc: 9,
                job: "Frontend Engineer",
                position: "Lubycon",
                website: "www.lubycon.com",
                location: {
                    city: "Seoul",
                    country: "South Korea"
                }
            },
            userLanguage: [
                {
                    name: "Korean",
                    level: "Native"
                },
                {
                    name: "English",
                    lavel: "Begginer"
                }
            ],
            userHistory: [
                {
                    year: 2001,
                    month: 3,
                    category: "work_experience",
                    content: "This is test1"
                },
                {
                    year: 2001,
                    month: 12,
                    category: "education",
                    content: "This is test2"
                },
                {
                    year: 2002,
                    month: 1,
                    category: "awards",
                    content: "This is test3"
                }
            ],
            publicOption: {
                email: false,
                mobile: false,
                fax: false,
                web: false
            }
        }

        var job = $(".content_text[data-value='job']").text(data.userData.job),
            position = $(".content_text[data-value='position']").text(data.userData.position),
            city = $(".content_text[data-value='city']").text(data.userData.location.city || ""),
            country = $(".content_text[data-value='country']").text(data.userData.location.country),
            language1 = $(".content_text[data-value='language1']").text(data.userLanguage[0].name || ""),
            language2 = $(".content_text[data-value='language2']").text(data.userLanguage[1].name || ""),

            historyWrap = $(".history_wrap"),

            totalLike = $("#total_like").find(".dash_body_content").text(data.insightData.totalLike),
            totalView = $("#total_view").find(".dash_body_content").text(data.insightData.totalView),
            totalUpload = $("#total_upload").find(".dash_body_content").text(data.insightData.totalUpload),
            totalDownload = $("#total_download").find(".dash_body_content").text(data.insightData.totalDownload),

            website = $("#user-website");
            

        initHistory(data.userHistory);
      
        $.getJSON("./component/view/chart/data/insightData.json",function(data){
            success : initChart(data);
        }).fail(function(d, textStatus, error){ 
            console.log("insight data loading is failed, status: " + textStatus + ", error: "+error) 
        });

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
                var d = date.clone().text(data[i].year + " " + data[i].month),
                    k = kind.clone().addClass(data[i].category),
                    c = content.clone().text(data[i].content);

                li.clone()
                    .append(d)
                    .append(k)
                    .append(c)
                    .appendTo(historyWrap);
            }
        }
        function initChart(data){
            var likeTimelineData = data.timeline.like,
                viewTimelineData = data.timeline.view,
                uploadTimelineData = data.timeline.upload,
                downloadTimelineData = data.timeline.download;

            $(".history_kind span").first().remove();
            $(".toggle_info").on("click touchend",infoToggle);

            chartLoader("chartdiv1","likeChart",likeTimelineData);
            chartLoader("chartdiv2","viewChart",viewTimelineData);
            chartLoader("chartdiv3","upChart",uploadTimelineData);
            chartLoader("chartdiv4","downChart",downloadTimelineData);

            initClocks();
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
        function chartLoader(target,theme,data){
            var dataArray = [];
            $.each(data, function(i,v){
                dataArray.push({
                    date: v["date"],
                    value: v["value"]
                })
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
            }
        }
    }
})

