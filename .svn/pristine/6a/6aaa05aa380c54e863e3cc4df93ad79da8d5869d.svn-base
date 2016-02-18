/**
 * @author: yangmingfang@ehaier.com
 * @date: 2015-02-09
 * @description: TS-PC homepage
 * @required: jquery.js 
 */


! function (window, $,undefined) {
	var Holder = {
		_initBarFloats: function() {
            this.bar = $("div.layout__promos--head", this.div);
            this.holder = $("div.layout__promos--holder", this.div);
            this.content = $("div.promos-nav",this.div),
            this.barStatus = "sink";
            var that = this, 
	            topBar = this.bar, 
	            topHolder = this.holder, 
	            captive = this.content,
	            sctop, holdTop;
            $(window).bind("scroll resize", function() {
                sctop = $(document).scrollTop();
                holdTop = that.holder.offset().top;
				holdTop1 = holdTop + 128;

                if (sctop >= holdTop && $("body").height() > 820) {
                	captive.hide();
                	$(".operate--handle").removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    that._toggleHolder(topHolder, topBar, "show");
                    that._toggleFloat(topBar, sctop, "float");
                    that.barStatus = "float";
                } else {
                    //captive.show();
                    //$(".operate--handle").removeClass('icon-chevron-down').addClass('icon-chevron-up');
                    that._toggleHolder(topHolder, topBar, "hide");
                    that._toggleFloat(topBar, sctop, "sink");
                    that.barStatus = "sink";
                }
            });
            $(window).on("resetTab", function() {
                if (that.barStatus === "float" && $("body").height() > 820) {
                    $(window).scrollTop(that.holder.offset().top)
                }
				setTimeout(function(){
					$(captive).slideUp(1000);
	        		$(".operate--handle").removeClass('icon-chevron-up').addClass('icon-chevron-down');
				},5000);
            });
            that._toggleHandles($(".operate--handle"),captive);
			
        },_toggleHolder: function(element, heighter, state) {
            if (state === "show") {
                element.css("height", $(heighter).height() + "px");
            } else {
                if (state === "hide") {
                    element.css("height", "0px");
                }
            }
        },_toggleFloat: function(bar, scrolltop, status) {
            $(bar).css("z-index", 98);
            if (status === "float") {
                $(bar).css({position: "fixed",top: 0})
            } else {
                if (status === "sink") {
                    $(bar).css({position: "static",top: 0});
                }
            }
        },_toggleHandles: function(handle,captive){
        	handle.on("click",function(e){
        		e.preventDefault();
	        	if(handle.hasClass("icon-chevron-up")){
	        		$(captive).slideUp();
	        		handle.removeClass('icon-chevron-up').addClass('icon-chevron-down');

	        	}else{
	        		$(captive).slideDown();
	        		handle.removeClass('icon-chevron-down').addClass('icon-chevron-up');
	        	}
        	});
			
        },
        init: function () {
			this._initBarFloats();
		}
    };
    $(function () {		
		Holder.init();
		$(window).trigger("resetTab");
	});
}(this, this.jQuery);
