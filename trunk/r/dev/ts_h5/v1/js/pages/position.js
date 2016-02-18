
!function(window, $, undefined){ 
	
	function changePos(id) {
		var obj = document.getElementById(id),
			height = obj.offsetTop || parseInt(getComputedStyle(obj)["height"]),
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		if (scrollTop <= height) {
			
			obj.style.position = 'relative';
			$('.listContainer .comment-box').css('margin-top','1.5rem');
			$('.listContainer .rule-box').css('margin-top','0rem');
			$('.listContainer .summary-box').css('margin-top','0rem');
			$('.listContainer .service-box').css('margin-top','0rem');
		} else {
			
			obj.style.position = 'fixed';
			$('.listContainer .comment-box').css('margin-top','3.8rem');
			$('.listContainer .rule-box').css('margin-top','2.3rem');
			$('.listContainer .summary-box').css('margin-top','2.3rem');
			$('.listContainer .service-box').css('margin-top','2.3rem');
		}
	}

	$(window).on('scroll', function(){ 
		changePos('details-box');
	});

	var START = "ontouchstart" in window ? "touchstart" : "mousedown";
	var clickEvent = "ontouchstart" in window ? "touchstart" : "click";
	$('.summary-box,.rule-box,.comment-list,.service-box').on(START,function(){ 
	    if($('.details-box.active').length){
	    	var $h2 = $('#details-box h2');
    			$h2.next().hide();
    			$h2.trigger(clickEvent);
    	}
	});

}(this, this.$);