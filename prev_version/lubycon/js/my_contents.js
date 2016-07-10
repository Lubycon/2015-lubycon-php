
$(document).ready(function(){
	var cards = $(document).find(".contents_card");
	var menuParams = "";

	cards.each(function(){
		menuParams = [
			{
				name : "Modify",
				icon : "fa-recycle",
				uri : "../personal_page/personal_page.php?cate=dashboard&usernum="
			},
			{
				name : "Delete",
				icon : "fa-trash",
				uri : "../personal_page/personal_page.php?cate=dashboard&usernum="
			}
		];
		var code = $(this).data("index");
		$.each(menuParams,function(i,v){ 
			v.uri += code;
		});
		CardMenu.call($(this),menuParams,"");

		var modifyBtn = $(this).find("li[data-value='modify']");
		modifyBtn.on("click",getContentData);
	});
	function getContentData(){
		$.ajax({
			type: 'POST',
            url: './getContentData.php',
            data: 1,
            success: function (data) {
            	console.log(data);
                if(parseInt(data) == 1){
                	var modal = initSettingWindow(data).addClass("bounceInDown animated");
                	modal.appendTo("body");
                }
                else {
                	alert("return error");
                }
            }
        });
	}
	function initSettingWindow(contentData){
		var keyCode = keycodePac;
        var modal = new ModalKit.create(submit,"setting-modal").addClass("setting-window"),
        wrapper = modal.find(".modal-wrapper"),
        closebt = modal.find(".modal-closebt").attr("data-value","modal-cancelbt").on("click",destroyModal),
        title = modal.find(".modal-title").text("Content Modify"),
        content = modal.find(".modal-content"),
        cancelbt = modal.find(".modal-cancelbt").attr("data-value","modal-cancelbt").text("Cancel").on("click",destroyModal),
        okbt = modal.find(".modal-okbt").attr({
            "data-value" : "submit",
            "disabled" : "disabled"
        }).text("Submit"),

        $innerWrap = $("<div/>",{ "class" : "setting-inner-wrapper" }).appendTo(content),
        $innerLeft = $("<div/>",{ "class" : "setting-inner-left" }).appendTo($innerWrap),
        $innerRight = $("<div/>",{ "class" : "setting-inner-right" }).appendTo($innerWrap),

        //make content
        $inputWrap = $("<div/>", { "class" : "setting-input-wrapper"}),
        $inputInner = $("<div/>",{ "class" : "setting-input" }),
        $label = $("<p/>",{ "class" : "setting-input-label"}),
        $input = $("<input>", { "class" : "setting-input", "type" : "text" }).on("keyup",errorCheck),
        $select = $("<select>", { "class" : "setting-select" }),
        $option = $("<option/>",{"class" : "select-option"});

        initContentName();
        initCategory();
        initTag();
        initDescript();
        initCC();

        function destroyModal(){
        	var $this = $(this),
        	modal = $this.parents(".modal"),
        	ccSetting = $(document).find(".modal.cc-setting.cc-setting-wrapper");
        	modal.fadeOut(200,function(){ modal.remove() });
        	if(ccSetting) ccSetting.remove();
        }
        function initContentName(){
            var $contentName = $inputWrap.clone()
            .append($label.clone().html("Content Name"))
            .append($input.clone(true).attr("name","content-name")).appendTo($innerLeft);
        }
        function initCategory(){
            var $categoryName = $inputWrap.clone()
            .append($label.clone().html("Categories")).appendTo($innerLeft),
            $categorySelect = $select.clone().addClass("chosen-select category").attr({
                "data-placeholder" : "Choose your contents categories",
                "multiple" : "multiple",
                "tabindex" : "8",
                "name" : "contents_category[]"
            }).appendTo($categoryName);

            categories = {
	            			"0" : "Action Script",
							"1" : "Basic",
							"2" : "Camel Case",
							"3" : "Dingo",
							"4" : "Element",
							"5" : "FIFO"
						};
            insertOption();

            function insertOption(){
                var categoryBox = $categorySelect;
                for(i in categories){ //categoryData is json
                    var option = $option.clone().html(categories[i]).attr("data-index",i);
                    option.appendTo(categoryBox);
                }
                categoryBox.chosen({  max_selected_options: 3 });
            };
        }
        function initTag(){
            var $hashtagName = $inputWrap.clone()
            .append($label.clone().html("Tag"))
            .append($inputInner.clone().addClass("hashTag-input-wrap")
                .append($("<input/>",{ "class" : "hashTag-input" }).on("keydown",detectTag).on("keyup",errorCheck)))
            .appendTo($innerLeft);
        }
        function initDescript(){
            var $descriptName = $inputWrap.clone()
            .append($label.clone().html("Description"))
            .append($("<textarea/>",{ "class" : "descript-input" ,"name" : "contenst_description" }).on("keyup",errorCheck)).appendTo($innerLeft);
        }
        function initCC(){
            var $ccName = $inputWrap.clone(),
            $ccLabel = $label.clone().html("Creative Commons"),
            $ccInner = $inputInner.clone().addClass("cc-inner-wrapper"),
            
            $ccIconWrap = $("<ul/>",{ "class" : "cc-list-wrapper" }),
            getLink = $("<a/>",{ "class" : "cc-list-link", "href" : "http://creativecommons.org/licenses/by-nc-nd/4.0", "target" : "_blank" }),
            $changebt = $("<p/>",{
                "class" : "cc-setting-bt",
                "html" : "<i class='fa fa-refresh'></i>Change your license"
            }).on("click",toggle.single);

            insertCCicons();

            function insertCCicons(){
                var ccIconLi = $("<li/>",{ "class" : "cc-list"}),
                $target = $ccIconWrap,
                $img = $("<img/>",{ "src" : "#" });
                for(var i = 0, l = ccPac.length; i < l; i++){
                    var list = ccIconLi.clone().attr({"data-value":ccPac[i].id, "data-tip":ccPac[i].name})
                    .append($img.clone().attr("src",ccPac[i].icon))
                    .appendTo($target).tooltip({"top":40, "left" : 0});
                    if(ccPac[i].id == "sa"){
                        list.hide();
                    }
                }
                $ccInner.append(getLink.append($target));
            }

            $ccName.append($ccLabel).append($ccInner).append($changebt)
            .on("click",showCCsetting).appendTo($innerRight);
        }
        function errorCheck(){
            var $this = $(this);
            var value = $(this).val();
            var errorCode = value.inputErrorCheck();
            
            if(!value.isNullString()){
                switch(errorCode){
                    case 0 : 
                        $this.removeClass("error"); 
                    break;
                    case 1 : 
                        $this.addClass("error");
                        console.log("This is special character"); 
                    break;
                    case 2 : 
                        $this.addClass("error"); 
                        console.log("This is abuse word"); 
                    break;
                }
            }
        }
        function detectTag(event){
                var $this = $(this),
                $wrapper = $this.parent(".hashTag-input-wrap"),
                $tagWrap = $("<ul/>",{ "class" : "hashtag-wrapper"}),
                $tag = $("<li/>",{ "class" : "hashtag-list" }),
                inKeyCode= event.which,
                value = $this.val().trim(),
                endCommand = inKeyCode == keyCode.enter || inKeyCode == keyCode.space,
                deleteCommand = inKeyCode == keyCode.delete,
                wrapperExist = $this.prev("ul").length == 0,
                errorCheck = !$this.hasClass("error");
                if(endCommand && value !== "" && errorCheck){
                    if(wrapperExist) $tagWrap.prependTo($wrapper);
                    $tag.html(value + "<i class='fa fa-times'></i>").on("click",deleteTag).appendTo(".hashtag-wrapper");
                    $this.val(null);
                }
                else if(deleteCommand && value == ""){
                    $(".hashtag-list:last-child").remove();
                }
            }
            function deleteTag(event){
                $this = $(this);
                $this.remove();
                console.log("tag is deleted");
            }
            function showCCsetting(event){
                var $this = $(this).find(".cc-setting-bt"),
                $ccSettingWrap = new ModalKit.create(null,"cc-setting").addClass("cc-setting-wrapper"),
                $ccSettingInner = $ccSettingWrap.find(".modal-wrapper").addClass("cc-setting-inner-wrapper"),

                $ccSection = $("<div/>",{ "class" : "cc-section" }),
                $ccTitleWrap = $("<div/>",{ "class" : "cc-title-wrapper" }),
                $ccRadio = $("<input/>",{"type" : "radio", "class" : "license-selector", "name" : "cc-info", "data-value": "" }),
                $ccTitle = $("<span/>",{ "class" : "cc-title"}),

                $cclistWrap = $("<ul/>",{ "class" : "cc-checklist-wrapper" }),
                $cclist = $("<li>",{ "class" : "cc-checklist"}),
                $ccCheckBox = $("<input/>",{ "type" : "checkbox", "class" : "cc-checkbox", "data-value" : ""}),
                $ccCheckDesc = $("<span/>",{ "class" : "cc-desc" }),
                $learnMore = $("<a/>",{ "class" : "goto-cc", "href" : "#", "target" : "_blank"});

                selected = $this.hasClass("selected"), //bool
                notExist = $(document).find(".cc-setting-wrapper").length == 0; //bool

                if(selected){
                    if(notExist) {
                        var makeCC = $ccSettingWrap.appendTo("body"),
                        useCC = $ccSection.clone().addClass("useCC").append($ccTitleWrap.clone()
                        .append($ccRadio.clone().prop("checked",true).attr("data-value","useCC"))
                        .append($ccTitle.clone().html("Creative Commons License"))).appendTo($(".cc-setting-inner-wrapper")).hide().stop().fadeIn(400),
                        listWrap = $cclistWrap.appendTo($(".useCC")),
                        addlist = function(){
                            for(var i = 0, l = ccPac.length; i < l; i++){
                                var disabled, checked;
                                if(i == 0) continue;
                                else if(i == 1) disabled = true, checked = true;
                                else if(i == 2 || i == 3) disabled = false, checked = true;
                                else if(i == 4) disabled = true, checked = false;
                                $cclist.clone()
                                .append($ccCheckBox.clone().attr({"data-value":ccPac[i].id,"name":"cc-check"}).prop({"disabled" : disabled,"checked" : checked}))
                                .append($ccCheckDesc.clone().html(ccPac[i].descript))
                                .appendTo($(".cc-checklist-wrapper"))
                            }
                        }(),
                        withoutCC = $ccSection.clone().addClass("withoutCC").append($ccTitleWrap.clone()
                        .append($ccRadio.clone().prop("checked",false).attr("data-value","withoutCC"))
                        .append($ccTitle.clone().html("NO USAGE WITHOUT OWNER’S PERMISSION"))).appendTo($(".cc-setting-inner-wrapper"));

                        $(".license-selector").on("change",useCC).lubyCheckbox({
                            "icon" : "fa fa-circle"
                        });
                        $(".cc-checkbox").on("change",displayCC).on("change",makelinkCC).lubyCheckbox({ switchs: false });
                        $(".cc-checkbox[data-value='nd']").add(".cc-checkbox[data-value='sa']").addClass("radioStyle");
                        ModalKit.align($(".cc-setting-wrapper"));
                    }//create cc
                    else $(".cc-setting-wrapper").fadeIn(400);
                }
                else{
                    $(".cc-setting-wrapper").fadeOut(400).remove();;
                }
            }
            function useCC(){
                $this = $(this),
                data = $this.data("value"),
                $target = $(document).find(".cc-checklist-wrapper");
                if(data == "useCC") {
                    $target.slideDown(400);
                    $(".cc-list-link").show();
                }
                else if(data == "withoutCC"){
                    $target.slideUp(400);
                    $(".cc-list-link").hide();
                } 
            }
            function displayCC(){
                $this = $(this),
                selected = $this.prop("checked"),
                data = $this.data("value"),
                $target = $(".cc-list[data-value='" + data + "']");
                if(data == "nd" || data == "sa") ccNDSA.call($this);
                if(!selected) $target.stop().fadeOut(400);
                else $target.stop().fadeIn(400);
            }
            function ccNDSA(){ //if you select nd(sa), sa(nd) will be disabled.
                var $this = $(this),
                data = $this.data("value"),
                otherData = data === "nd" ? "sa" : "nd",
                checked = $this.prop("checked"),
                others = $(".cc-checkbox[data-value='" + otherData + "']");

                if(checked) others.parents(".checkbox-wrapper").lubyCheckbox("disable");
                else others.parents(".checkbox-wrapper").lubyCheckbox("enable");
            }
            function makelinkCC(){
                var link = [],
                checked = $(".cc-checkbox[name='cc-check']:checked");
                checked.each(function(){
                    var data = $(this).data("value"),
                    addData = link.push(data),
                    checkedData = link.join("-"),
                    ccUrl = "http://creativecommons.org/licenses/" + checkedData + "/4.0";//send to DB
                    $(".cc-list-link").attr("href", ccUrl);
                });   
            }

        return modal;
    }
    function submit(){
    	alert("SUBMIT");
    }
});


