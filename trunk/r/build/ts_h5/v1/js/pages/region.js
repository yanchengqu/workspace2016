var junRegion=function(){var e={requestOnlyOne:!1,requestOnlyOne_childen_key:"children",provinceUrl:"",cityUrl:"",areaUrl:"",provinceSel:null,citySel:null,areaSel:null,provinceChangeCallback:null,cityChangeCallback:null,areaChangeCallback:null,dataKey:"",key:"name",value:"id",defKey:"-请选择-",defValue:"0",initData:null,ajaxFun:null},t=function(t){this.opt=e;for(var a in t)this.opt[a]=t[a];this.opt.ajaxFun&&this.init()};return t.prototype={init:function(){this.addEvent(),this.initProvince()},addEvent:function(){var e=this,t=this.opt;t.provinceSel&&(t.provinceSel.onchange=function(){var a=this.value;if(e.cleanSelect(t.areaSel),a!==t.defValue){if(t.requestOnlyOne&&e.treeData){var n=e.findData(a,e.treeData);n&&(e.cityData=n[t.requestOnlyOne_childen_key])}e.initCity(a)}else e.cleanSelect(t.citySel),t.citySel.onchange(),e.cleanSelect(t.areaSel),t.areaSel.onchange();t.provinceChangeCallback&&t.provinceChangeCallback(a)}),t.citySel&&(t.citySel.onchange=function(){var a=this.value;if(a!==t.defValue){if(t.requestOnlyOne&&e.cityData){var n=e.findData(a,e.cityData);n&&(e.areaData=n[t.requestOnlyOne_childen_key])}e.initArea(a)}else e.cleanSelect(t.areaSel),t.areaSel.onchange();t.cityChangeCallback&&t.cityChangeCallback(a)}),t.areaSel&&(t.areaSel.onchange=function(){var e=this.value;t.areaChangeCallback&&t.areaChangeCallback(e)})},getProvinces:function(e){var t=this,a=this.opt,n=a.dataKey;this.getAjaxRequest(this.opt.provinceUrl,null,function(i){var l=i[n];a.requestOnlyOne&&(t.treeData=l),e(i[n])})},getCitys:function(e,t){var a=this,n=this.opt,i=n.dataKey;n.requestOnlyOne&&a.cityData?t(a.cityData):this.getAjaxRequest(this.opt.cityUrl,{pid:e},function(e){t(e[i])})},getAreas:function(e,t){var a=this,n=this.opt,i=n.dataKey;n.requestOnlyOne&&a.areaData?t(a.areaData):this.getAjaxRequest(this.opt.areaUrl,{cid:e},function(e){t(e[i])})},getAjaxRequest:function(e,t,a,n){var i=this.opt.ajaxFun;i({url:e,data:t,success:function(e){a&&(e=e instanceof Object?e:JSON.parse(e),a(e))},error:function(e){n&&n(e)}})},initProvince:function(){var e=this,t=e.opt,a=t.initData?t.initData.pid:null;e.getProvinces(function(n){e.initSelect(t.provinceSel,n,a),t.initData&&(t.initData.pid=null)})},initCity:function(e){var t=this,a=t.opt,n=a.initData?a.initData.cid:null;t.getCitys(e,function(e){t.initSelect(a.citySel,e,n),a.initData&&(a.initData.cid=null)})},initArea:function(e){var t=this,a=t.opt,n=a.initData?a.initData.aid:null;t.getAreas(e,function(e){t.initSelect(a.areaSel,e,n),a.initData&&(a.initData.aid=null)})},initSelect:function(e,t,a){var n=this.opt;this.initCommonSelect(e,t,n.key,n.value,n.defKey,a)},initCommonSelect:function(e,t,a,n,i,l,c){if(e){e.innerHTML="";var r={};r[a]=i,r[n]=c||this.opt.defValue;var o=JSON.parse(JSON.stringify(t));o.splice(0,0,r);for(var u="",s=0,h=o.length;h>s;s++){var v=o[s],f=v[a],y=v[n];void 0!=f&&void 0!=y&&(u+='<option value="'+y+'">'+f+"</option>")}e.innerHTML=u,l&&l!=this.opt.defValue&&(e.value=l,e.onchange&&e.onchange())}},cleanSelect:function(e){e.innerHTML='<option value="0" selected="selected">'+this.opt.defKey+"</option>"},findData:function(e,t){for(var a=this.opt,n=0,i=t.length;i>n;n++){var l=t[n],c=l[a.value];if(c==e)return l}}},t}();