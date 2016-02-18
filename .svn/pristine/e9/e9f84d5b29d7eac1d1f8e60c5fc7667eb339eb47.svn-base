 !function(win){ 	
 	if(!win.H) return;
 	var common = H.namespace('H.Common');
 	if(!win.G) win.G = function(id) {return document.getElementById(id)};
  	function resetPrice(price,isInt){
		var sum = parseFloat(price),
			tailPrice = sum.toFixed(2).split('.')[1],
			priceSumStrOrg = parseInt(sum).toString(),
			priceSumStr = priceSumStrOrg.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		return '&yen;'+priceSumStr+(isInt?'':'.'+tailPrice);
	}
	function updatePrice(selector,isInt){ 
		var elements = document.querySelectorAll(selector);
		for(var i=0,l=elements.length;i<l;i++){ 
			var el = elements[i];
			var value = el.getAttribute('data-value');
			if(value){ 
				var priceSumStr = resetPrice(value,isInt);
				el.innerHTML = priceSumStr;
			}
		}
	}
	function ValidateForm(formEl,rulesObj,tipEl,callback){
		callback = callback || function(input,msg){
			input.focus();
			$(input).addClass('error');
			tipEl.innerHTML = msg;
		}
		var inputs = formEl.querySelectorAll('.validate_input');
		for(var i=0,l=inputs.length;i<l;i++){
			var input = inputs[i];
			var rule = rulesObj[input.id],
				emptyMsg = input.getAttribute('emptyMsg'),
				errorMsg = input.getAttribute('errorMsg'),
				value = input.value;

			if(!rule) continue;
			if(rule.required) {
				if(!value){
					callback(input,emptyMsg);
					return;
				}
			}
			if(rule.reg){
				if(!rule.reg.test(value)){
					callback(input,errorMsg);
					return;
				}
			}
			if(rule.fun){
				if(!rule.fun(value)){
					callback(input,errorMsg);
					return;
				}
			}
			$(input).removeClass('error');
		}
		return true;
	}

	if(win.hdk && win.hdk.init) win.hdk.init("ehaier", function(){
		if(H.UA && H.UA.isHaier){
			hdk.event.on('backButtonClicked', function(type, data) {
				back();
			});
		}
	});

	function checklogin(){
		if(win.hdk && win.hdk.user){
			if(win.hdk.user.isLogin) return true;
			else {
				win.hdk.user.auth(function(status, data) {});
				return;	
			}
		}
	}

	/*
	function goBack(isback) {
		var urlReg  = /[a-zA-z]+:\/\/[^\s]+/,
			pathReg = /^([^#:]+)(\/.+)$/;
		var backBtn = document.querySelector('.nav__back');

		function back() {
			var pageConfig = window['pageConfig'],
				backConfig = pageConfig && pageConfig['back']; 
			var url = backConfig && backConfig['url'],
				isUrl = url && ( urlReg.test(url) || pathReg.test(url) );
			if ( url ) {
				if ( isUrl ) {
					window.location.href = url;
				} else {
					switch ( url ) {
						case '#appHome':
						H.UA.isHaier &&	hdk.closeView()		
						break;
					}
				}
			} else {
				window.history.back();	
			}
		}

		H.Event.tapClick(function(event){
			var target = event.target,
				isTarget = target.className.indexOf('nav__back') > -1;
			isTarget && back();	
		},win);	

		if(H.UA.isHaier){
			hdk.event.on('backButtonClicked', function(type, data) {
				back();
			});
		}

		if(isback) back();
	}

	*/

	function back() {
		var urlReg  = /[a-zA-z]+:\/\/[^\s]+/,
			pathReg = /^([^#:]+)(\/.+)$/;

		var pageConfig = window['pageConfig'],
			backConfig = pageConfig && pageConfig['back']; 
		var url = backConfig && backConfig['url'],
			isUrl = url && ( urlReg.test(url) || pathReg.test(url) );
		if ( url ) {
			if ( isUrl ) {
				window.location.href = url;
			} else {
				switch ( url ) {
					case '#appHome':
					H.UA.isHaier &&	hdk.closeView()		
					break;
				}
			}
		} else {
			window.history.back();	
		}
	}

	function addback(){
		/*
		H.Event.tapClick(function(event){
			var target = event.target,
				isTarget = target.className.indexOf('nav__back') > -1;
			if(isTarget) back();
		});
		*/

		['touchstart','mouseup'].forEach(function(name){
			document.addEventListener(name,function(e){
				var target = e.target,
					isTarget = target.className.indexOf('nav__back') > -1;
				if(isTarget) back();				
			});
		});
	}

	win.onload = addback;
	addback();
	
	common.updatePrice = updatePrice;
	common.resetPrice = resetPrice;
	common.ValidateForm = ValidateForm;
	common.checklogin = checklogin;
	common.back = back;

	// 微信JDK
	
	function loadJS (url, callback) {
		 var head = document.getElementsByTagName("head")[0];
		 var script = document.createElement('script');
		 
		 script.onload = script.onreadystatechange = script.onerror = function () {
		  if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
		  
		  script.onload = script.onreadystatechange = script.onerror = null;
		  script.src = '';
		  script.parentNode.removeChild(script);
		  script = null;

		  typeof callback == 'function' && callback();
		};
		// script.charset = params.charset || document.charset || document.characterSet || 'gb2312';
		script.src = url;
		try {
			head.appendChild(script);
		} catch (exp) {}

	}

	if ( H.UA.isWeixin ) {
		loadJS('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function(){
			var wx = window.wx,
				hasShareConfig = window['pageConfig'] && window['pageConfig']['share'];
			if ( wx ) {
				wx.ready(function(){
					if ( !hasShareConfig ) {
						wx.hideOptionMenu();
					} else {
						wx.showOptionMenu();
					}
				});
			}
		});
	}

}(this);
