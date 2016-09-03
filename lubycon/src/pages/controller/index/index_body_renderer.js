$(document).ready(function(){

    Request({
        url: "./pages/controller/index/index_body_controller.php",
        data: {
            "isMobile" : isMobile()
        },
        callback: init
    });

    function init(response){
        console.log(response);
        var data = response.result;
        console.log("INDEX BODY",data);

        if(isMobile()) initMainCard(data.contentData);
        else {
            initMainSlider(data.contentData);
            mainSliderRadioAction();
        }

        function initMainSlider(data){
            var wrapper = $(".main-slider-wrapper");

            var artwork = MainSlider(data[0],0).show(),
                vector = MainSlider(data[1],1).hide(),
                threed = MainSlider(data[2],2).hide();

            wrapper.append(artwork);
            wrapper.append(vector);
            wrapper.append(threed);

            function MainSlider(data,cate){
                var category = cate === 0 ? "artwork" : cate === 1 ? "vector" : "threed";

                var slider = $("<div/>", { "class" : "lubyImageSlider", "id" : "slider" + (cate + 1) }),
                    ul = $("<ul/>"),
                    li = $("<li/>"),
                    anchor = $("<a/>"),
                    img = $("<img/>"),
                    url = "?dir=pages/view/contents/viewer&cate=" + category + "&conno=";

                var group1 = addList(data.splice(0,10)),
                    group2 = addList(data.splice(0,10)),
                    group3 = addList(data.splice(0,10));

                slider.append(group1);
                slider.append(group2);
                slider.append(group3);

                function addList(data){
                    var u = ul.clone();
                    for(var i = 0; i < data.length; i++){
                        var l = li.clone(),
                            a = anchor.clone().attr("href", url + data[i].boardCode).appendTo(l),
                            p = img.clone().attr("src", data[i].thumbnail).appendTo(a);
                        l.appendTo(u);
                    }
                    return u;
                }
                return slider.lubyImageSlider();
            }
        }

        function initMainCard(data){
            console.log(data);

            var wrapper = $(".mb-section"),
                viewmore = $("<div/>",{ "class" : "viewmore-bt" }),
                url = "?dir=pages/controller/contents/contents_page&cate=";
                anchor = $("<a/>");
            var button = viewmore.append(anchor);

            var artwork = MainContents(data[0],0).show(),
                vector = MainContents(data[1],1).hide(),
                threed = MainContents(data[2],2).hide();

            var artworkButton = button.clone(true).children("a").attr("href", url + "1&page=1"),
                vectorButton = button.clone(true).children("a").attr("href", url + "2&page=1"),
                threedButton = button.clone(true).children("a").attr("href", url + "3&page=1");

            artwork.append(artworkButton).appendTo(wrapper);
            vector.append(vectorButton).appendTo(wrapper);
            threed.append(threedButton).appendTo(wrapper);

            function MainContents(data,cate){
                var category = cate === 0 ? "artwork" : cate === 1 ? "vector" : "threed";
                var categoryNumber = cate === 0 ? "1" : cate === 1 ? "2" : "3";
                console.log(data,cate);
                var card = $("<div/>",{ "class" : "mb-main-img-wrapper", "data-value" : category }),
                    ul = $("<ul/>"),
                    li = $("<li/>",{ "class" : "mb-main-img" }),
                    anchor = $("<a/>"),
                        img = $("<img/>"),
                    layer = $("<div/>",{ "class" : "layer" }),
                        descript = $("<div/>",{ "class" : "content-descript" }),
                            contentName = $("<p/>",{ "class" : "content-name"}),
                            creatorName = $("<p/>",{ "class" : "creator-name"}),
                                span = $("<span/>"),
                    url = "?dir=pages/view/contents/viewer&cate=" + categoryNumber + "&conno=";

                for(var i = 0; i < data.length; i++){
                    var l = li.clone(),
                        a = anchor.clone().attr("href",url + data[i].boardCode),
                        p = img.clone().attr("src",data[i].thumbnail),
                        lay = layer.clone(),
                        d = descript.clone(),
                        conName = contentName.clone().text(data[i].name),
                        creName = creatorName.clone().text(data[i].creator);
                    a.append(p);
                        d.append(conName);
                        d.append(creName);
                        d.appendTo(lay);
                    a.append(lay);
                    a.appendTo(l);
                    l.appendTo(ul);
                }

                ul.appendTo(card);

                return card;
            }
        }
        function mainSliderRadioAction(){
            var button = $("#slide_lnb").find(".btn");

            button.on("click", toggle.group).on("click", slideChecker);

            function slideChecker(){
                var $this = $(this),
                data = $this.data("value"),
                $sliders = $("#slide_section .lubyImageSlider");
                $target = $("#slider" + data);

                $sliders.hide();
                $target.stop().show();
            }
        }
    }
});
