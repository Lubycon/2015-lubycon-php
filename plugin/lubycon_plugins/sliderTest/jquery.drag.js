(function($){
    $.fn.drag = function(option){
        var defaults = { 
            callback: null
        },
        d = {},
        pac = {
            init: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    console.log("drag event is enabled");
                    var $this = $(this),
                    isDragging = false;

					$this.mousedown(function(){
						isDragging = true;
						$(this).addClass("dragging");
                        $("html").mouseup(function(){
                            isDragging = false;
                            $(".dragging").removeClass("dragging");
                        })
					}).mouseup(function(){
						isDragging = false;
						$(this).removeClass("dragging");
                        $(document).off(d.callback);
					}).mousemove(function (event){
						if(isDragging){
                            var mouseX = event.pageX,
                            mouseY = event.pageY;
							d.callback(mouseX,mouseY);
						}
					});
                })
            }
        },
        start = {
            test: function () {
                return this.each(function () {
                    console.log("tested");
                })
            }
        }
        return start[option] ? 
        start[option].apply(this, Array.prototype.slice.call(arguments, 1)) : 
        "object" != typeof option && option ? 
            ($.error('No such method "' + option + '" for the lubyPictool instance'), void 0) : 
            pac.init.apply(this, arguments);
};
})(jQuery);