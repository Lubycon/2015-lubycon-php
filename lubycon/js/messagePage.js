$(function(){
	var $messageWrapper = $(document).find(".message.message-wrapper");

	var submitBt = $messageWrapper.find(".btn.submit-bt"),
	cancelBt = $messageWrapper.find(".btn.cancel-bt"),
	otherBt = $messageWrapper.find(".btn.other-bt");

	cancelBt.on("click",gotoBack);
	submitBt.on("click",submit);
	otherBt.on("click",otherBtAction);

	initFocus();
	initChecker();

	messageAlign.call($messageWrapper);

	function initFocus(){
		var $input = $(document).find(".input-message");
		if($input.length){
			$input.first().focus();
			$input.on("keyup",detectEnter);
		}
	}

	function initChecker(){
		var $input = $(document).find(".input-message[data-value='code']");
		var existInput = $input.length !== 0;
		if($input.length) $input.on("keyup",codeCheck);
	}

	function codeCheck(){
		var $this = $(this),
		value = $this.val();

		if(value.isSpecialChar()) $this.val(value.slice(0,-1));
	}

	function detectEnter(event){
		if(event.which === 13 && submitBt.length !== 0) submitBt.trigger("click"); 
	}

	function messageAlign(){
		var $this = $(this);
		console.log($this);
		
		var w = isMobile() ? 0 : $this.innerWidth(),
			h = isMobile() ? $this.innerHeight()+100 : $this.innerHeight();
		console.log(isMobile());
		console.log($this.width(),$this.height());

		$this.css({
			"margin-left" : (w/2)*-1,
			"margin-top" : (h/2)*-1
		});
		console.log($this.width(),$this.height());
	}

	function otherBtAction(){
		var $this = $(this);
		$this.each(function(){
			var data = $this.data("value");

			switch(data){
				case "resend" : gotoLink.call($this); break;
				case "gotoIndex" : gotoIndex(); break;
				case "link" : gotoLink.call($this); break;
				default : console.log("THERE IS NO DATA-VALUE"); return false; break;
			}
		});
	}

	function gotoBack(){
		if($(this).attr("href") === undefined) history.back();
		else location.href = $(this).attr("href");
	}

	function gotoIndex(){
		location.href = "../../index.php";
	}

	function gotoLink(){
		location.href = $(this).attr("href");
	}

	function submit(){
		var input = $(document).find(".input-message");
		var checker = true;
		input.each(function(){
			var value = $(this).val();
			console.log($(this).data("value"));
			switch($(this).data("value")){
				case "code" : 
					if(!value.isAlphabetNumber()) checker = false;
				break;
				case "email" : 
					if(!value.isEmail()) checker = false;
				break;
				case "password" : 
					if(value === null || value === undefined || value === "" || value === " ") checker = false;
				break;
			}
		});
		if(checker) { 
			if($(".message-form").length !== 0) $(".message-form").submit();
		}
	}
});





