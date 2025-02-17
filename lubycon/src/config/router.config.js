$(function(){
    var href = getUrlParameter('dir');
    var d1 = new $.Deferred(),
        d2 = new $.Deferred(),
        d3 = new $.Deferred(),
        d4 = new $.Deferred(),
        d5 = new $.Deferred();

    var header = $("#main-header");
    var mobileMenu = $("#mobile-menu");
    var wrapper = $("#app-wrapper");
    var footer = $("#footer");
    var scripts = [
        './component/view/index/ui.js',
        './component/view/index/mobile.js',
        '../plugin/JS/sticky.js'
    ];

    $.when(d1, d2, d3, d4, d5).then(function(){
        console.log("UI LOADED");
        $("body").show();
    },function(){
        $.error("UI COMPONENT LOADING IS FAILED");
    });

    // LOADING HEADER.....
    header.load("./component/view/index/header.html",function(){
        d1.resolve();
    });

    // LOADING MOBILE MENU.....
    mobileMenu.load("./component/view/mobile/menu.html",function(){
        d5.resolve();
    })

    // LOADING BODY.....
    if(href) {
        wrapper.load(href + ".php",function(){
            console.log("D2");
            d2.resolve();

        });
    }
    else {
        if(isMobile()){
            wrapper.load('./pages/view/index/index_body.mobile.php',function(){
                d2.resolve();
            })
        }
        else {
            wrapper.load("./pages/view/index/index_body.php",function(){
                console.log("D2");
                d2.resolve();
            });
        }  
    }

    // LOADING FOOTER.....
    footer.load("./component/view/index/footer.html",function(){
        console.log("D3");
        d3.resolve();
        $.getMultiScripts(scripts)
        .done(function(res) {
            console.log("SCRIPTS ARE SUCCESSFULLY LOADED",res);
             d4.resolve();
        })
        .fail(function(error) {
             console.log("SCRIPT LOADING IS FAILED");
        });
    });

    // LOADING SCRIPTS.....
});
