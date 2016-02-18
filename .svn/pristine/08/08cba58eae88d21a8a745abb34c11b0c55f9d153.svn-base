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