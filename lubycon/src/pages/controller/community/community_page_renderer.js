$(document).ready(function(){
    $("#loading_icon").show();
    console.log(1);
    /*Request({
	    url: "./service/controller/infinite_scroll/controller.php",
        data: {
            cardType: "community",
    		page: "community",
            topCate: getUrlParameter("cate"),
            sort: $(".preferFilter").lubySelector("getValueByIndex"),
    		filter: {
    			midCate: null,
    			license: null,
    			continent: null,
    			job: null,
    			search: $(".searchFilter").lubySelector("getValueByIndex")
    		},
    		searchValue: $(".search-bar-text").val() === "Enter the keyword" ? null : $(".search-bar-text").val(),
    		nowPage: getUrlParameter("page"),
            targetPage: getUrlParameter("page")
        },
	    callback: init
	});*/

    //.split(/[- :]/)
    var dummy = {
        category: 0,
        data: [
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            },
            {
                content:{
                    code: 8888,
                    title: "TEST DUMMY TITLE...",
                    comment: Math.floor(Math.random() * 10) + 1,
                    like: Math.floor(Math.random() * 10) + 1,
                    view: Math.floor(Math.random() * 10) + 1,
                    date: "2016-01-31 14:52:16"
                },
                user:{
                    code: 0,
                    name: "EvanMoon",
                    profile: "../../../../Lubycon_Contents/user/0/profile.jpg"
                }
            }
        ]
    };
    init(dummy);
    function init(response){
        //var data = response.result;
        var category = response.category; //TESTING...
        var data = response.data; // TESTING...
        var mainboard = new Mainboard(category);
        var mainboardDOM = mainboard.render();
        mainboardDOM.appendTo($(".con_wrap"));
        mainboard.add(data);
        mainboard.renderList();
        $("#loading_icon").hide();
    }
});
