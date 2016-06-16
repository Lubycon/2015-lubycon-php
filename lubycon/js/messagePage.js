$(function(){
	var $messageWrapper = $(document).find(".message.message-wrapper");

	var submitBt = $messageWrapper.find(".btn.submit-bt"),
	cancelBt = $messageWrapper.find(".btn.cancel-bt"),
	otherBt = $messageWrapper.find(".btn.other-bt");

	messageAlign.call($messageWrapper);
	cancelBt.on("click",gotoBack);
	submitBt.on("click",submit);
	otherBt.on("click",otherBtAction);

	initFocus();
	initChecker();

	function initFocus(){
		var $input = $(document).find("input[type='text']");
		if($input.length) $input.first().focus();
	}

	function initChecker(){
		var $input = $(document).find("input[type='text']");
		if($input.length) $input.on("keyup",checkValue);
	}

	function checkValue(){
		var $this = $(this),
		value = $this.val();

		if(!value.isNumber()) $this.val(value.slice(0,-1));
	}

	function messageAlign(){
		var $this = $(this);
		
		var w = $this.outerWidth(),
		h = $this.outerHeight();

		$this.css({
			"margin-left" : (w/2)*-1 + "px",
			"margin-top" : (h/2)*-1 + "px"
		});
	}

	function otherBtAction(){
		var $this = $(this);
		$this.each(function(){
			var data = $this.data("value");

			switch(data){
				case "resend" : /*VALUE RESEND*/ break;
				case "gotoIndex" : gotoIndex(); break;
				default : console.log("THERE IS NO DATA-VALUE"); return false; break;
			}
		});
	}

	function gotoBack(){
		history.back();
	}

	function gotoIndex(){
		location.href = "../../index.php";
	}

	function submit(){
		alert("SUBMIT");
	}
});