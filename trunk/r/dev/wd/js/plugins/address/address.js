
var TabRegion = (function(window){
	//通用手机定制事件
	var EventObj = (function(win){ 
		var EventFun = function(){ 
			this.isMobile = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
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

	function template(tempStr,dataParam){
		var html='var html="";';
		tempStr.split(/(\<%[^<%]*%\>)/).map(function(item,index){
			var r = /^<%(=?.*)%>$/.exec(item);
			var value = '';
			if(r && r.length){
				value = r[1]; 
				if(value[0]=='=') html+=' html+'+value+';';
				else html+=value;
			}
			else{
				value = item.replace(/[\n\t]/g,'');
				html+=" html+='"+value+"';";
			}
		});
		html+=" return html;";
		var fun = new Function(dataParam || "data",html);
		return fun;
	}
	
	var options={
		container:'',
		data:null,						//数据,如果给定数据，则无需用ajax请求数据
		url:'',							//数据请求url
		dataKey:'data',					//数据字段	
		key:'name',						//显示文本字段
		value:'id',						//值字段
		children_key : 'children',		//只请求一次的数据的子字段名称		
		complateCallback:null,			//选择完成回调 complateCallback(provinceId,cityId,areaId)
		initData: null,					// {pid:'0',cid:'0',aid:'0'}
		ajaxType:'get',		
		ajaxFun:null,
		getDataComplateCallback:null
	};

	var templateStr=''
		+'<ul class="region-list<%=data.cur&&" cur"||""%>" data-level="<%=data.level%>">'
			+'<%data.data.forEach(function(item,index){%>'
				+'<li data-index="<%=index%>" data-value="<%=item[data.value]%>"<%=item.cur&&" cur"||""%>><span><%=item[data.key]%></span></li>'
			+'<%});%>'
		+'<ul/>';

	var tempFun = template(templateStr);

	function append(dom,html){
		var div=document.createElement('div');
		div.innerHTML = html;
		dom.appendChild(div.firstChild);
	}

	var regionEm = ['provinceId','cityId','areaId'];

	var tabRegion = function(opts){
		var opt={};
		for(var key in options){
			opt[key] = opts[key]!==undefined ? opts[key] : options[key];
		}
		this.opt=opt;
		if(!this.opt.container) return;
		if(!this.opt.ajaxFun) return;
		var container = document.querySelector(this.opt.container);
			container.innerHTML = '<div class="regionContainer"></div>';
		this.regionDom = container.firstChild;
		this.init();
	}
	tabRegion.prototype={
		init:function(){
			this.initData();
			this.initEvent();
		},
		initData:function(){
			var opt = this.opt;
			if(opt.data) {
				this.data = opt.data;
				return;
			}
			var self = this;
			opt.ajaxFun({
				type:opt.ajaxType,
				url:opt.url,
				dataType:'json',
				success:function(data){
					var reData = data;
					if(typeof data === 'string') reData = JSON.parse(data);
					self.data = reData[opt.dataKey];
					self.initLevel1();
					if(opt.getDataComplateCallback) opt.getDataComplateCallback(self.data);
				},
				error:function(){
					throw new Error('获取地区数据失败!');
				}
			});
		},
		initEvent:function(){
			var self = this;
			if(!self.data) return;
			EventObj.tapClick(function(dom,e){
				var target  = e.target;
				if(target.tagName.toLowerCase()==='span' && target.parentNode.tagName.toLowerCase()==='li'){
					target = target.parentNode;
				}
				if(target.tagName.toLowerCase()!=='li') return;
				var value = target.getAttribute('data-value');
				var index = target.getAttribute('data-index');
				var region = target.parentNode;
				var curLi = target.parentNode.querySelector('li.cur');
				if(curLi) curLi.className = '';
				target.className = 'cur';
				if(region.nextElementSibling && region.nextElementSibling.tagName.toLowerCase()==='ul'){
					region.className = 'region-list';
					region.nextElementSibling.className='region-list cur';
				}
				else{
					var level = parseInt(region.getAttribute('data-level'));
					if(level>=3){
						self.areaId = parseInt(value);
						if(self.opt.complateCallback){
							var provinceObj = self.data[self.level1_index];
							var cityObj = provinceObj[self.opt.children_key][self.level2_index];
							var areaObj = cityObj[self.opt.children_key][index];
							self.opt.complateCallback(provinceObj,cityObj,areaObj);
						}
						return;					
					}
					var fun = self['initLevel'+(level+1)]; 
					if(fun){
						region.className = 'region-list';
						fun.call(self,value,index);
					}
				}
			},this.regionDom);
		},
		initLevel1:function(){
			if(!this.data) return;
			var opt = this.opt;
			var html = tempFun({data:this.data,value:opt.value,key:opt.key,cur:true,level:1});
			this.regionDom.innerHTML = '';
			append(this.regionDom,html);
		},
		initLevel2:function(value,index){
			this.initLevel(value,index,this.data,2);
		},
		initLevel3:function(value,index){
			var cityData = this.data[this.level1_index];
			if(!cityData) return;
			this.initLevel(value,index,cityData[this.opt.children_key],3);
		},
		initLevel:function(value,index,data,level){
			var opt = this.opt;
			if(!value || !index) return;
			value = parseInt(value);
			index = parseInt(index);
			var mdata = data[index][opt.children_key];
			if(!mdata) throw new Error('无'+regionEm[level]+'级数据！');
			this[regionEm[level-2]] = value;
			this['level'+(level-1)+'_index'] = index;
			var html = tempFun({data:mdata,value:opt.value,key:opt.key,cur:true,level:level});
			append(this.regionDom,html);
		},
		reset:function(){
			this.initLevel1();
		},
		back:function(){
			var curDom = this.regionDom.querySelector('.region-list.cur');
			if(!curDom) return;
			var level  = parseInt(curDom.getAttribute('data-level'));
			if(level===1) return;
			curDom.className='region-list';
			var preDom = this.regionDom.querySelector('.region-list[data-level="'+(level-1)+'"]');
			if(preDom) preDom.className='region-list cur';
			setTimeout(function(){
				curDom.parentNode.removeChild(curDom);
			});
			return true;
		}
	}
	return tabRegion;
})(window);