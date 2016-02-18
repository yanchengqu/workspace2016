!function(){
	var pageIndex = 1,
		pageSize = 5,
		memberId = $('#memberId').val();
	var pageIndexObj = {};
	var stopEventName = H.Event.isMobile ? 'touchstart' : 'scroll';

	var $wrapperList = $('#wrapperList');
	var itemFun = H.Template.template($('#itemTemplate').html());

	//H.Common.updatePrice('.wprice');

	H.Event.tapClick(function(e){
		var $this = $(e.target);
		if($this.is('span')) $this = $this.parent();
		if(!$this.is('li')) return;
		var target = $this.attr('target');
		if(!target) return;
		var $target = $(target);
		$this.addClass('cur').siblings('li.cur').removeClass('cur');
		$target.addClass('cur').siblings('.wrapper.cur').removeClass('cur');
	},$('.statusbar')[0]);

	H.Event.tapClick(function(e){
		var $target = $(e.target);
		if(!$target.hasClass('btn-line') || $target.hasClass('disabled')) return;
		var $item = $target.closest('.item');
		var params = {memberId:memberId,sku:$item.attr('data-sku')};
		$.ajax({
			url:'/v2/mstore/addProductShelvesSubmit.html',
			type:'get',
			data:params,
			success:function(data){
				if(!data || !data.success) return;
				$target.addClass('disabled');
				$target.html('已上');
			},
			error:function(e){
				throw Error('上架请求失败！');
			}
		});		
	},$('#wrapperList')[0]);

	function loadItem(){
		var $wrapper = $('.wrapper.cur',$wrapperList);
		var type = $wrapper.attr('id');
		pageIndexObj[type] = pageIndexObj[type] || 0;
		var pageIndex =  ++pageIndexObj[type];
		var $loadingEl = $('.loading',$wrapper);
		$wrapperList.addClass('mloadding');
		document.addEventListener(stopEventName,preventDefault);
		$.ajax({
			type:'get',
			url:'/v2/mstore/addStoreProductItem.html',
			data:{pageIndex:pageIndex,pageSize:pageSize,productCateStr:type,memberId:memberId},
			success:function(data){
				if(!data || !data.success) return;
				$wrapperList.removeClass('mloadding');
				if(data.data.length===0) return;
				$wrapper[0].insertBeforeHTML(itemFun(data.data),$loadingEl[0]);
			},
		  	error:function(info){
				throw new Error('分页请求数据错误！');
			},
			complete:function(){
				document.removeEventListener(stopEventName,preventDefault);
			}
		});
	}

	
	function preventDefault(e){
		e.preventDefault();
	}

	H.LazyLoad.init(loadItem);

}();