var junRegion = (function(){ 
	var opt = {
		requestOnlyOne : false,		//是否只请求一次就返回整个数据
		requestOnlyOne_childen_key : 'children',	//只请求一次的数据的子字段名称
		provinceUrl :'',			//省请求url
		cityUrl:'',					//市请求url
		areaUrl:'',					//地区请求url
		provinceSel:null,			//省Select
		citySel:null,				//市Select
		areaSel:null,				//区Select
		provinceChangeCallback:null,//省改变时回调
		cityChangeCallback:null,	//市改变时回调
		areaChangeCallback:null,	//区域改变时回调
		dataKey:'',					//数据字段
		key:'name',					//显示文本字段
		value:'id',					//Select值字段
		defKey:'-请选择-',			//默认值字段,
		defValue : '0',
		initData: null,				// {pid:'0',cid:'0',aid:'0'}
		ajaxFun:null
	};
	var junRegion = function(opts){ 
		this.opt = opt;
		for(var key in opts){ 
			this.opt[key] = opts[key];
		}
		if(!this.opt.ajaxFun) return;
		this.init();
	}
	junRegion.prototype={ 
		init:function(){ 
			this.addEvent();
			this.initProvince();
		},
		addEvent:function(){ 
			var self = this;
			var opt = this.opt;
			if(opt.provinceSel){ 
				opt.provinceSel.onchange=function() { 
					var value =this.value;
					self.cleanSelect(opt.areaSel);
					if(value!==opt.defValue){
						if(opt.requestOnlyOne && self.treeData){ 
							var currentProvince = self.findData(value,self.treeData);
							if(currentProvince) { 
								self.cityData = currentProvince[opt.requestOnlyOne_childen_key];	
							}
						}
						self.initCity(value);
					}
					else{ 
						self.cleanSelect(opt.citySel);
						opt.citySel.onchange();
						self.cleanSelect(opt.areaSel);
						opt.areaSel.onchange();
					}
					opt.provinceChangeCallback && opt.provinceChangeCallback(value);
				}
			}
			if(opt.citySel){ 
				opt.citySel.onchange=function() { 
					var value =this.value;
					if(value!==opt.defValue){
						if(opt.requestOnlyOne && self.cityData){ 
							var currentCity = self.findData(value,self.cityData); 
							if(currentCity) {
								self.areaData = currentCity[opt.requestOnlyOne_childen_key];
							}
						}
						self.initArea(value);
					}
					else{ 
						self.cleanSelect(opt.areaSel);
						opt.areaSel.onchange();
					}
					opt.cityChangeCallback && opt.cityChangeCallback(value);
				}
			}
			if(opt.areaSel){ 
				opt.areaSel.onchange=function(){ 
					var value =this.value;
					opt.areaChangeCallback && opt.areaChangeCallback(value);
				}
			}
		},
		getProvinces:function(callback){ 
			var self = this;
			var opt = this.opt;
			var dataKey = opt.dataKey;
			this.getAjaxRequest(this.opt.provinceUrl,null,function(data){ 
				var treeData = data[dataKey];
				if(opt.requestOnlyOne) { 
					self.treeData = treeData;
				}
				callback(data[dataKey]);
			});
		},
		getCitys:function(pid,callback){
			var self = this;
			var opt = this.opt; 
			var dataKey = opt.dataKey;
			if(opt.requestOnlyOne && self.cityData){ 
				callback(self.cityData);
			}
			else{ 
				this.getAjaxRequest(this.opt.cityUrl,{'pid':pid},function(data){ 
					callback(data[dataKey]);
				});
			}
		},
		getAreas:function(cid,callback){ 
			var self = this;
			var opt = this.opt; 
			var dataKey = opt.dataKey;
			if(opt.requestOnlyOne && self.areaData){ 
				callback(self.areaData);
			}
			else{ 
				this.getAjaxRequest(this.opt.areaUrl,{'cid':cid},function(data){ 
					callback(data[dataKey]);
				});
			}
		},
		getAjaxRequest:function(murl,mdata,msuccess,merror){ 
			var ajax = this.opt.ajaxFun;
			ajax({ 
				url:murl,
				data:mdata,
				success:function(data){
					if(msuccess){
						data = (data instanceof Object) ? data : JSON.parse(data);
						msuccess(data);
					}
				},
				error:function(info){ 
					if(merror)	merror(info);
				}
			})
		},
		initProvince:function(){ 
			var self =this;
			var opt = self.opt;
			var initPid = opt.initData ? opt.initData.pid : null;
			self.getProvinces(function(data){ 
				self.initSelect(opt.provinceSel,data,initPid);
				opt.initData && (opt.initData.pid = null);
			});
		},
		initCity:function(pid){ 
			var self =this;
			var opt = self.opt;
			var initCid = opt.initData ? opt.initData.cid : null;
			self.getCitys(pid,function(data){ 
				self.initSelect(opt.citySel,data,initCid);
				opt.initData && (opt.initData.cid = null);
			});
		},
		initArea:function(cid){ 
			var self =this;
			var opt = self.opt;
			var initAid = opt.initData ? opt.initData.aid : null;
			self.getAreas(cid,function(data){ 
				self.initSelect(opt.areaSel,data,initAid);
				opt.initData && (opt.initData.aid = null);
			});
		},
		initSelect:function(sel,data,selectedValue){ 
			var opt = this.opt;
			this.initCommonSelect(sel,data,opt.key,opt.value,opt.defKey,selectedValue);
		},
		initCommonSelect:function(sel,data,key,value,defKey,selectedValue,defValue) { 
			if(sel){ 
				sel.innerHTML = '';
				var defObj = {};
				defObj[key] = defKey;
				defObj[value] = defValue || this.opt.defValue;
				var reData = JSON.parse(JSON.stringify(data));
				reData.splice(0,0,defObj);
				var html = '';
				for(var i=0,l=reData.length;i<l;i++){ 
					var item = reData[i];
					var xkey = item[key];
					var xvalue = item[value]; 
					if(xkey!=undefined && xvalue!=undefined){ 
						html += '<option value="'+xvalue+'">'+xkey+'</option>';
					}
				}
				sel.innerHTML = html;
				if(selectedValue && selectedValue!=this.opt.defValue){ 
					sel.value = selectedValue;
					sel.onchange && sel.onchange();
				}
			}
		},
		cleanSelect:function(sel){ 
			sel.innerHTML = '<option value="0" selected="selected">'+this.opt.defKey+'</option>';
		},
		findData:function(id,data){ 
			var opt = this.opt;
			for(var i=0,l=data.length;i<l;i++){ 
				var item = data[i];
				var value = item[opt.value];
				if(value == id) return item;
			}
		}
	}
	return junRegion;
})();