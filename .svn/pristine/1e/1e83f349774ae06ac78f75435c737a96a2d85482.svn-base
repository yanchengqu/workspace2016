/**
 * @author: zjliu
 * @email: zjliu2015@gmail.com
 * @date: 2015-08-18
 * 
 */
!(function(win){ 
	var isMobile = 'ontouchstart' in win,
	 	Start =  isMobile ? "touchstart" : "mousedown",
	 	Move =  isMobile ? "touchmove" : "mousemove",
	 	End =  isMobile ? "touchend" : "mouseup";
	 function addEvent(a,c,b){
			c || (c = "load"); 
		b || (b = win); 
		b.attachEvent ? b.attachEvent("on" + c, a) : b.addEventListener(c, a, false);	 	
	 }
	 function tapClick(callback,dom){
   		var startPoint = {};
   		addEvent(function(e){ 
   			var point = isMobile ? e.touches[0] : e;
			startPonter = {x:point.pageX,y:point.pageY};
   		},Start,dom);
   		addEvent(function(e){ 
			if(!startPonter) return;
			var point = isMobile ? e.changedTouches[0] : e;
			if(Math.abs(startPonter.x-point.pageX)>3 || Math.abs(startPonter.y-point.pageY)>3) return;
			startPonter = null;
			callback(e);
   		},End,dom);
	 }
	 if(win.H){
	   	var fEvent = H.namespace('H.Event');
	   	fEvent.isMobile = isMobile;
	    fEvent.addEvent = addEvent;
	    fEvent.tapClick = tapClick;
	}
	else win.EventObj = {tapClick:tapClick};
})(this);