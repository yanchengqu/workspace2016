//通用手机定制事件
var EventObj = (function(win){ 
	var EventFun = function(){ 
		this.isMobile = 'ontouchstart' in win;
		this.Start = this.isMobile ? "touchstart" : "mousedown",
		this.Move = this.isMobile ? "touchmove" : "mousemove",
    	this.End = this.isMobile ? "touchend" : "mouseup";
	}
   	EventFun.prototype = { 
   		addEvent:function(a,b,c){ 
   			c || (c = "load"); 
    		b || (b = win); 
    		b.attachEvent ? b.attachEvent("on" + c, a) : b.addEventListener(c, a, false) 
   		},
   		tapClick:function(callback,dom){ 
   			var self = this;
   			var startPoint = {};
   			this.addEvent(function(e){ 
   				var point = self.isMobile ? e.touches[0] : e;
				self.startPonter = {x:point.pageX,y:point.pageY};
   			},dom,this.Start);
   			this.addEvent(function(e){ 
				e.preventDefault();
	    		e.stopPropagation();
				if(!self.startPonter) return;
				var point = self.isMobile ? e.changedTouches[0] : e;
				if(self.startPonter.x!=point.pageX && self.startPonter.y!=point.pageY) return;
				self.startPonter = null;
				callback(dom,e);
   			},dom,this.End);
   		}
   	}
   	return new EventFun();
})(window);

//创建动态表单提交
function openPage(url,method,params){
	var dynamicForm = document.getElementById("dynamicForm");
	dynamicForm.setAttribute("method",method);
	dynamicForm.setAttribute("action",url);
	dynamicForm.innerHTML = "";
	for(var key in params){ 
		var input = document.createElement("input");
		input.setAttribute("type","hidden");
		input.setAttribute("name",key);
		input.setAttribute("value",params[key]);
		dynamicForm.appendChild(input);		
	}
	dynamicForm.submit();
}