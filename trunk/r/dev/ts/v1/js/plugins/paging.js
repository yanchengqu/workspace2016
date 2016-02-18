var Paging = (function(win){
	var G = function(id){ 
		return document.getElementById(id);
	}
	var getElement=function(html){
		var dom = document.createElement('div');
		dom.innerHTML = html;
		return dom.firstChild;
	}
	//字符替换方法
	var replace = function(html){ 
		if(!html || arguments.length<2) return;
		for(var i=1;i<arguments.length;i++){ 
			var reg = new RegExp('\\{'+(i-1)+'\\}','g');
			html = html.replace(reg,arguments[i]);
		}
		return html;
	}
	//应用模板
	function applyTemplate(data,templateId,$el){ 
		var scriptTemplate = G(templateId).innerHTML,
			compiled = _.template(scriptTemplate),
			html = compiled(data);
		$el.append(html);
	}

	//template 
	var swiperTemplate = '<ul class="pagination__inner"></ul>',
		prevTemplate = '<li class="pagination__item" data-type="{0}"><a href="#" class="pagination__turn">&lt;&lt;上一页</a></li>',
		itemTemplate = '<li class="pagination__item{1}" data-type="{2}" data-page="{0}"><a href="#">{0}</a></li>',
		dotTemplate =  '<li class="pagination__item" data-type="{0}"><a href="#">...</a></li>',
		nextTemplate = '<li class="pagination__item" data-type="{0}"><a href="#" class="pagination__turn">下一页&gt;&gt;</a></li>';
		
	//opts
	var opt = { 
		//分页插件的容器
		containerId:'pagination',
		//-------------分页参数------------
		//总页数
		pageCount:100,
		//显示页数
		showItemCount:7,
		//头数量
		headCount:2,
		//当前页数（初使化页数）
		currentPage:1,
		

		//------------数据请求参数--------
		//请求分页数据url
		pageUrl:'',
		//分页数据请求方式
		requestType:'get',
		//分页数据请求参数
		requestParam:{},
		//pageIndex名称
		requestPageIndexName:'pageIndex',
		///处理数据方法
		resetData:function(data){return data;},

		//-----------模样相关参数---------
		itemTemplateId:'',
		itemContainerId:'',
	};
	var GridType={ 
		'Prev':0,
		'Num':1,
		'Dot':2,
		'Next':3
	}
	function Grid(type,text) { 
		this.type = type;
		this.text =  text;
	}
	//plugins Page
	var Page = function(opts){ 
		if(!win.jQuery || !win._) return;
		for(var key in opts){ 
			if(opt[key]!==undefined){ 
				opt[key] = opts[key] || opt[key];
			}
		}
		this.opt = opt;
		this.init();
		this.initEvent();
	}
	//Page.Prototype
	Page.prototype={ 
		init:function(){ 
			this.setPage();
		},
		setPage:function(){ 
			if(!opt.containerId) return;
			var containerEl = G(opt.containerId);
			this.containerEl = containerEl;
			if(!containerEl) return;

			containerEl.innerHTML = swiperTemplate;
			var pageEl = this.pageEl = containerEl.firstChild;
			var data= [];
			var current = opt.currentPage;
			var hcount = opt.headCount;

			if(opt.currentPage>0) data.push(new Grid(GridType.Prev));

			if(opt.pageCount<=opt.showItemCount){ 
				for(var i=1;i<=opt.pageCount;i++){ 
					data.push(new Grid(GridType.Num,i));
				}
			}
			else {
				if(opt.currentPage<=opt.showItemCount-hcount){ 
					for(var i=1;i<=opt.showItemCount;i++){ 
						data.push(new Grid(GridType.Num,i));
					}
					data.push(new Grid(GridType.Dot));
				}
				else {
					for(var i=1;i<=hcount;i++){ 
						data.push(new Grid(GridType.Num,i));
					}
					data.push(new Grid(GridType.Dot));	

					if(opt.currentPage<opt.pageCount-hcount){ 
						for(var i=opt.currentPage-hcount;i<=opt.currentPage+hcount;i++){ 
							data.push(new Grid(GridType.Num,i));
						}
						data.push(new Grid(GridType.Dot));	
					}
					else{ 
						for(var i=opt.pageCount-hcount*2;i<=opt.pageCount;i++){ 
							data.push(new Grid(GridType.Num,i));
						}
					}
				}
			}

			if(opt.currentPage<=opt.pageCount) data.push(new Grid(GridType.Next));

			var html = this.getHtml(data);
			pageEl.innerHTML = html;
		},
		resetPage:function(index){ 
			if(index<1 || index>opt.pageCount) return;
			var self = this;
			//请求数据
			self.queryData(index,function(data){ 
				//应用模板
				self.applyTemplate(data,function(){ 
					//重新设定分页插件
					opt.currentPage = index;
					self.setPage();
				});
			});
		},
		nextPage:function(){ 
			this.resetPage(opt.currentPage+1);
		},
		prevPage:function(){ 
			this.resetPage(opt.currentPage-1);
		},
		initEvent:function(){ 
			var self=this;
				$(this.containerEl).on('click','li.pagination__item',function(e){
					var $el = $(this); 
					var type = Number($el.attr('data-type'));
					switch(type){ 
						case GridType.Prev:
							self.prevPage();
							break;
						case GridType.Num:
							var page = Number($el.attr('data-page') || 0);
							self.resetPage(page);
							break;
						case GridType.Dot:
							break;
						case GridType.Next:
							self.nextPage();
					}
				});
		},
		getHtml:function(data){ 
			var html = '';
			var currentStr = '';
			for(var i=0,l=data.length;i<l;i++){ 
				var item = data[i];
				switch(item.type){ 
					case GridType.Prev:
						html += replace(prevTemplate,item.type);
					break;
					case GridType.Num:
						currentStr = (opt.currentPage == item.text) ? ' active' : '';
						html += replace(itemTemplate,item.text,currentStr,item.type);
					break;
					case GridType.Dot:
						html += replace(dotTemplate,item.type);
					break;
					case GridType.Next:
						html += replace(nextTemplate,item.type);
					break;
				}
			}
			return html;
		},
		queryData:function(pageIndex,successCallback){ 
			var mdata=opt.requestParam;
				mdata[opt.requestPageIndexName] = pageIndex;
			$.ajax({ 
				url:opt.pageUrl,
				type:opt.requestType,
				data:mdata,
				dataType:'json',
				success:function(data){
					var mdata = opt.resetData(data);
					mdata && successCallback && successCallback(mdata);
				},
				error:function(info){ 
				}
			});
		},
		applyTemplate:function(data,callback){
			var itemContainer = G(opt.itemContainerId);
			if(itemContainer)	{ 
				debugger;
				itemContainer.innerHTML = '';
				applyTemplate(data,opt.itemTemplateId,$(itemContainer));
			}
			callback && callback();
		}
	}
	return Page;
})(window);