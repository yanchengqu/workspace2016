/**
 * @author: Brave
 * @email: u9648u6653u52c7@gmail.com
 * @date: 2014-08-01
 *
 */

! function (window, document, undefined) {
	
	/**
	 * @module H
	 */

	var $root = window,
		$doc  = document,
		$location = $root.location;

	var H = {

		version: '1.0.0',
		
		/**
		 * namespace
		 * @method namespace
		 * @param {String}
		 * @return {Object} 自定义的命名空间
		 */

		namespace: function (ns_string) {
			
			var parts = ns_string.split('.'),
				parent = H,
				i = 0;
			if (parts[0] === 'H') {
				parts.shift();
			}

			for (i; i < parts.length; i++) {
				
				if (typeof parent[parts[i]] === 'undefined') {
					parent[parts[i]] = {};
				}
				parent = parent[parts[i]];
			}
			
			return parent;
		},

		/**
		 * @method varType
		 * @param {}
		 * @return {String} 变量类型
		 */

		varType: function (input) {
			var type = /^\[object\s+(\w*)\]$/.exec((this.toString.call(input)).toLowerCase());				
			return type ? type[1] : type; 
		},

		/**
		 * @method isString
		 * @param {}
		 * @return {Boolean}
		 */

		isString: function (input) {
			return typeof input === 'string';
		},
		
		/**
		 * @method isNumber
		 * @param {}
		 * @return {Boolean}
		 */

		isNumber: function (input) {
			return typeof input === 'number';
		},

		/**
		 * @method isBoolean
		 * @param {}
		 * @return {Boolean}
		 */

		isBoolean: function (input) {
			return this.varType(input) === 'boolean';
		},

		/**
		 * @method isUndefined
		 * @param {}
		 * @return {Boolean}
		 */

		isUndefined: function (input) {
			return input === void 0;
		},
		/**
		 * @method isNull
		 * @param {}
		 * @return {Boolean}
		 */

		isNull: function (input) {
			return this.varType(input) == 'null';
		},
		/**
		 * @method isFunction
		 * @param {}
		 * @return {Boolean}
		 */

		isFunction: function (input) {
			return this.varType(input) === 'function';
		},

		
		/**
		 * @method isarray
		 * @param {}
		 * @return {Boolean}
		 */

		isArray: Array.isArray || function (input) {
			return this.varType(input) === 'array';
		},

		/**
		 * @method isRegExp
		 * @param {}
		 * @return {Boolean}
		 */

		isRegExp: function (input) {
			return this.varType(input) === 'regexp';
		},
		/**
		 * @method isObject
		 * @param {}
		 * @return {Boolean}
		 */

		isObject: function (input) {
			return this.varType(input) === 'object';
		},

		/**
		 * @method isDate
		 * @param {}
		 * @return {Boolean}
		 */

		isDate: function (input) {
			return this.varType(input) === 'date';
		},

		/**
		 * 暂时使用内置函数
		 * @method isNaN
		 * @param {}
		 * @return {Boolean}
		 */

		isNaN: isNaN || function (input) {
			return !this.isNumber(input) && input != +input;
		},
		
		/**
		 * 判断数组或者散列表是否含有数据
		 * @method isEmpty
		 * @param {}
		 * @return {Boolean}
		 */

		isEmpty: function (input) {
			
			if (this.isNull(input)) return true;

			if (this.isArray(input) || this.isString(input)) return input.length == 0;

			if (this.isObject(input)) {
				for (var i in input) {
					if (this.has(input,i)) {
						return false;
					}
				}
			}
			
			return true;
		},

		/**
		 * 判断两个数组或者散列表是否含有相同数据
		 * @method isEqual
		 * @param {}
		 * @return {Boolean}
		 */

		isEqual: function (origin, target) {

		},

		/**
		 * 判断是否是DOM节点
		 * @method isDom
		 * @param {}
		 * @return {Boolean}
		 */

		isDom: function (input) {
			return !!(input && input.nodeType === 1);
		},

		/**
		 * 判断数组或散列表是否含有某个key
		 * @method has
		 * @param {Object}
		 * @param {String}
		 * @return {Boolean}
		 */

		has: function (hash, key) {
			return this.hasOwnProperty.call(hash, key);
		},

		/**
		 * @method toString
		 */

		toString: (function () {
			if ($root.toString && typeof $root.toString === 'function') {
				return $root.toString;
			}
			return Object.prototype.toString;
		})(),

		/**
		 * @method hasOwnProperty
		 */

		hasOwnProperty: (function () {
			if ($root.hasOwnProperty && typeof $root.hasOwnProperty === 'function') {
				return $root.hasOwnProperty;
			}
			return Object.prototype.hasOwnProperty;
		})(),

		/**
		 * 过滤掉字符串左边的空格
		 * @method ltrim
		 * @param {String}
		 * @return {String}
		 */

		ltrim: function (input) {
			if (this.isString(input)) {
				return input.replace(/(^\s*)/, '');
			}
		},

		/**
		 * 过滤掉字符串右边的空格
		 * @method ltrim
		 * @param {String}
		 * @return {String}
		 */

		rtrim: function (input) {
			if (this.isString(input)) {
				return input.replace(/(\s*$)/, '');
			}
		},

		/**
		 * 过滤掉字符串两边的空格
		 * @method trim 
		 * @param {String}
		 * @return {String}
		 */

		trim: function (input) {
			if (this.isString(input)) {
				return input.replace(/(^\s*)|(\s*$)/g, '');
			}
		},

		/**
		 * @method each 
		 * @param {Array,Object}
		 * @param {Function}
		 * @param {Object} 
		 * @return {Object}
		 */

		each: function (list, iterator, context) {
			var i = 0,
				length = null;
			if (this.isArray(list)) {
				length = list.length;
				for (i; i < length; i++) {
					if (iterator.call(context,list[i], i, list) === false) {
						break;
					}
				}
			}
			if (this.isObject(list)) {
				for (i in list) {
					if (this.has(list, i)) {
						if (iterator.call(context,list[i], i, list) === false) {
							break;
						}
					}
				}	
			}
			
			return list;
		},
		/**
		 * 
		 * @method merge 
		 * @param {Object}
		 * @param {Object}
		 * @return {Object}
		 */

		merge: function (origin, target) {
			if (!this.isObject(origin)) return origin;
			this.each(target,function (value, key) {
				origin[key] = value;
			});
			return origin;
		},

		/**
		 * 
		 * @method clone 
		 * @param {Object}
		 * @return {Object}
		 */

		clone: function (obj) {
			return this.isObject(obj) ? this.merge({},obj) : obj;
		},

		/**
		 * 
		 * @method indexOf 
		 * @param {Array}
		 * @param {String,Number}
		 * @param {Number}
		 * @return {Number}
		 */

		indexOf: (function () {
			var nativeIndexOf =  Array.prototype.indexOf;
			if ( nativeIndexOf ) {
				return function (array, item, fromIndex) {
					return nativeIndexOf.call(array, item, fromIndex)	
				}
			}
			return function (array, item, fromIndex) {
				var i = +fromIndex || 0,
					length = array && array.length;
				if ( !this.isArray(array) || length === 0 || Math.abs(i) > length) return -1;
				i = Math.max(i >= 0 ? i : length - Math.abs(i), 0)
				while ( i < length ) {					
					if (array[i] === item) return i;
					i++;
				}
				return -1;
			} 

		})(),

		/**
		 * 
		 * @method lastIndexoF 
		 * @param {Array}
		 * @param {String,Number}
		 * @param {Number}
		 * @return {Number}
		 */

		lastIndexOf: (function () {
			var nativeLastIndexOf =  Array.prototype.lastIndexOf;
			if ( nativeLastIndexOf ) {
				return function (array, item, fromIndex) {
					return nativeLastIndexOf.call(array, item, fromIndex ? fromIndex : array.length-1)	
				}
			}
			return function (array, item, fromIndex) {
				var i = +fromIndex || 1,
					length = array && array.length;
				if ( !this.isArray(array) || length === 0 || Math.abs(i) > length) return -1;
				i = Math.max(i > 1 ? i : length - Math.abs(i), 0);
				while ( i >=0 ) {					
					if (array[i] === item) return i;
					i--;
				}
				return -1;
			} 
		})(),

		noConflict: function (deep) {
			$root._ = void 0;
			if (deep) {
				$root.H = void 0;
			}
			return H;
		}
	};

	$root.H = $root._ = H;


}(window, document); 

/**
 * @author: Brave
 * @email: u9648u6653u52c7@gmail.com
 * @date: 2014-08-01
 * 
 */

! function (window, document, undefined) {
	
	var Cookie = H.namespace('H.Cookie');
	
	/**
	 * @method set
	 * @namespace Cookie
	 * @param {String} name  
	 * @param {String} value 
	 * @param {string number date} expiredays 
	 * 字符串型表示天数 数字型表示秒数 日期型表示日期对象
	 * @param {String} path
	 * @param {String} domain 
	 * @param {Boolean} secure
	 * @return {Boolean}
	 */

	 Cookie.set = function (name, value, expiredays, path, domain, secure) {

		if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) { return false; }
		var expires = '',
			today = new Date();
		if (expiredays) {
			switch (expiredays.constructor) {
			case Number:
				 expires = expiredays === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + expiredays;
				 break;
			case String:
				today.setDate(today.getDate() + expiredays*1);
				expires = '; expires=' + today.toUTCString();
				break;
			case Date:
				expires = '; expires=' + expiredays.toUTCString();
				break;
			}
		}
		document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + 
						  expires + 
						  (domain ? '; domain=' + domain : '') + 
					      (path ? '; path=' + path : '') + 
						  (secure ? '; secure' : '');
		return true; 
	 };
	
	/**
	 * @method get
	 * @namespace Cookie
	 * @param {String} name  
	 * @return {String}
	 *
	 */

	 Cookie.get = function (name) {
		
		return decodeURIComponent(
				document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + 
				encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') +
				'\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
	 };

	/**
	 * @method rm
	 * @namespace Cookie
	 * @param {String} name  
	 * @param {String} path
	 * @param {String} domain 
	 * @return {Boolean}
	 *
	 */

	 Cookie.rm = function (name, path, domain) {
		 
		if (!name || !this.has(name))  return false;     
		document.cookie = encodeURIComponent(name) + 
							'=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + 
							( domain ? '; domain=' + domain : '') + 
							( path ? '; path=' + path : '');
		return true;
	 };
	
	/**
	 * @method has
	 * @namespace Cookie
	 * @param {String} name  
	 * @return {Boolean}
	 *
	 */

	 Cookie.has = function (name) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);	 
	 };
	
	/**
	 * cookie 记录的一次性操作
	 * @method once
	 * @namespace Cookie
	 * @param {String} name  
	 * @param {String} value 
	 * @param {string number date} expiredays ［可选］
	 * 字符串型表示天数 数字型表示秒数 日期型表示日期对象
	 * @param {String} path    ［可选］
	 * @param {String} domain  ［可选］
	 * @param {Boolean} secure ［可选］
	 * @param {Function} callback
	 * @return {Boolean}
	 *
	 */

	 Cookie.once = function (name, value, expiredays,path,domain, secure,  callback) {
		 var args = Array.prototype.slice.call(arguments),
			 name = args.shift(),
			 callback = args.pop();
		 if (this.has(name)) return false;
		 this.set(name, args[0], args[1], args[2], args[3], args[4]);
		 callback && typeof callback == 'function' &&  callback();
		 return true;	
	 };

}(window, document);


/**
 * @author: Brave
 * @email: u9648u6653u52c7@gmail.com
 * @date: 2014-08-01
 * 
 */

! function (window, document, undefined) {
	
	var UA = H.namespace('H.UA');
	
	var u = navigator.userAgent;

	UA.isWeixin = u.indexOf('MicroMessenger')  > -1;
	UA.isHaier  = u.indexOf('HAIER-APP-AGENT') > -1;

}(window, document);


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
/**
 * @author: zjliu
 * @email: zjliu2015@gmail.com
 * @date: 2015-08-18
 * 
 */

!(function(win){

	if(!win.H) return;
	
 	var temp = H.namespace('H.Template');

 	//通用方法
 	function G(id){ 
		return document.getElementById(id);
	}
	//append
	if(!HTMLElement.prototype.appendHTML){
		HTMLElement.prototype.appendHTML = function(html) {
			var fragment = GetHTMLFragment(html);
			this.appendChild(fragment);
			fragment = null;
		}
	}
	//insertBefor
	if(!HTMLElement.prototype.insertBeforeHTML){
		HTMLElement.prototype.insertBeforeHTML = function(html,existingElement) {
			var fragment = GetHTMLFragment(html);
			this.insertBefore(fragment,existingElement)
			fragment = null;
		}
	}
	//insertAfter
	if(!HTMLElement.prototype.insertAfterHTML){
		HTMLElement.prototype.insertAfterHTML = function(html,existingElement) {
			var el = existingElement.nextElementSibling;
			if(el) this.insertBeforeHTML(html,el);
			else this.appendHTML(html);
		}
	}
		
 	/**
 	 * 此方法用于编译html模板返回模板函数
 	 *@param tempStr 模板html
 	 *@param dataParam 返回模板函数的形参名
 	 */
 	function template(tempStr,dataParam){
		var html='var html="";';
		tempStr.split(/(<%.+?%>)/).map(function(item){
			if(!item) return;
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

 	/**
 	 *此方法把html形成dom
 	 */
 	function GetHTMLFragment(html){ 
		var divTemp = document.createElement("div"), 
			nodes = null,
			fragment = document.createDocumentFragment();

		divTemp.innerHTML = html;
		nodes = divTemp.childNodes;
		for (var i=0, length=nodes.length; i<length; i+=1) {
		   fragment.appendChild(nodes[i].cloneNode(true));
		}
		return fragment;	
	}

	function applyTemplate(data,templateId,el,needEmpty){ 
		var scriptTemplate = G(templateId).innerHTML,
			compiled = template(scriptTemplate),
			html = compiled(data);
		needEmpty && (el.innerHTML = '');
		el.appendHTML(html);
	}

	function applyInsertAfterTemplate(data,templateId,el,existingElement){ 
		var scriptTemplate = G(templateId).innerHTML,
			compiled = template(scriptTemplate),
			html = compiled(data);
		el.insertAfterHTML(html,existingElement);
	}

	function applyInsertBeforeTemplate(data,templateId,el,existingElement){
		var scriptTemplate = G(templateId).innerHTML,
		compiled = template(scriptTemplate),
		html = compiled(data);

		el.insertBeforeHTML(html,existingElement);
	}

	/**	params说明
	 * data 数据	必须
	 * sel 下拉框	必须
	 * textName 显示文本字段名 默认 : text
	 * valueName 值字段名	默认：value
	 * defaultText 默认显示文本, 默认："--请选择--"
	 * defaultValue 默认字段值，默认：0
	 */
	function initSelect(opt){
		if(!opt || !opt.data || !opt.sel) throw new Error('须要opt.data,opt.sel');
		var selectTemplate = ''
			+'<option value="'+(opt.defaultValue||0)+'">'+(opt.defaultText||"--请选择--")+'</option>'
			+'<%data.forEach(function(item){%>'
				+'<option value="<%=item.'+opt.valueName+'%>"><%=item.'+opt.textName+'%></option>'
			+'<%});%>';
		opt.sel.innerHTML = template(selectTemplate)(opt.data);
	}

	temp.template = template;
	temp.applyTemplate = applyTemplate;
	temp.applyInsertAfterTemplate = applyInsertAfterTemplate;
	temp.applyInsertBeforeTemplate = applyInsertBeforeTemplate;
	temp.initSelect = initSelect;

})(this);
/**
 * @author: zjliu
 * @email: zjliu2015@gmail.com
 * @date: 2015-08-21
 * 
 */
!function(win,doc){
	if(!win.H) return;
 	var lazyload = H.namespace('H.LazyLoad');
 	function init(callback){
 		var $win = $(win),$doc=$(doc),isOK=true;
 		win.addEventListener('scroll',function(){
			if(!isOK) return; isOK=false;
			var scrollTop = $win.scrollTop(),
				scrollHeight = $doc.height(),
				windowHeight = $win.height();
			if(scrollTop+windowHeight===scrollHeight){
				callback && callback();
			}
			isOK=true;
 		});
	}
	lazyload.init = init;
}(this,document);
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

	// win.onload = addback;
	// addback();
	
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
