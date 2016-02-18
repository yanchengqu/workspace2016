var SliderAside = (function(win){
	HTMLElement.prototype.getClassObj=function(){
		var arr=this.className.trim().replace(/(?:\s{2,})/g,' ').split(' ');
		var obj={};
		for(var i=0,l=arr.length;i<l;i++){
			var value=arr[i];
			obj[value]=value;
		}
		return obj;
	}
	HTMLElement.prototype.addClass=function(name){
		if(this.classList) {
			this.classList.add(name);
			return this;
		}
		var obj=this.getClassObj();
		obj[name]=name;
		var className='';
		for(var key in obj){
			className+=key+' ';
		}
		this.className=className;
		return this;
	}
	HTMLElement.prototype.removeClass=function(name){
		if(this.classList) {
			this.classList.remove(name);
			return this;
		}
		var obj=this.getClassObj();
		delete obj[name];
		var className='';
		for(var key in obj){
			className+=key+' ';
		}
		this.className=className;
		return this;
	}
	var options = {
		//划出菜单选择器
		sliderSelector:'.menu_slidebar',
		//内容区html
		html:'',
		//点击划出菜单的dom选择器
		showBtn:null,
		//划出菜单后回调事件
		showCallback:null,
		//隐藏菜单后回调事件
		hideCallback:null,
		//点击返回按钮前回调，回调函数返回true则菜单关闭
		preHideCallback:null,
		//点击划出菜单前回调
		preShowCallback:null
	};
	function Slider(opts){
		var opt={};
		for(var key in options){
			opt[key] = opts[key]!==undefined ? opts[key] : options[key];
		}
		this.opt=opt;
		this.startBtn = document.querySelector(opt.showBtn);
		var container = document.querySelector(this.opt.sliderSelector);
		this.backBtn = container.querySelector('.menu_slidebar .slidebar-title-back');
		this.mask = container.querySelector('.list_content_mask');
		this.sliderContent = container.querySelector('.slidebar-content');
		if(this.opt.html) container.querySelector('.slidebar_detail').innerHTML=this.opt.html;
		if(!this.startBtn) return;
		this.init();
	}
	Slider.prototype={
		init:function(){
			this.initEvent();
		},
		initEvent:function(){
			var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
			var click = hasTouch ? 'touchend' : 'click';
			var self = this;
			this.startBtn.addEventListener(click,function(){self.show()});
			this.backBtn.addEventListener(click,function(){self.hide()});
		},
		show:function(){
			this.opt.preShowCallback && this.opt.preShowCallback();
			var htmlDom = win.document.documentElement;
			htmlDom.addClass('slidebar-org');
			var self = this;
			setTimeout(function(){
				htmlDom.addClass('slidebar-move');
				self.mask.style.display='block';
				self.sliderContent.style.display='block';	
			});
			if(this.opt.showCallback){
				setTimeout(function(){
					self.opt.showCallback();
				},500);
			} 
		},
		hide:function(isComplate){
			if(!isComplate && this.opt.preHideCallback){
				var result = this.opt.preHideCallback();
				if(result) return;
			}
			var htmlDom = win.document.documentElement;
			htmlDom.removeClass('slidebar-move');
			this.mask.style.display='none';
			this.sliderContent.style.display='none';
			var self = this;
			if(this.opt.hideCallback){
				setTimeout(function(){
					self.opt.hideCallback();
				},50);
			}
		}
	}
	return Slider;
})(window);
