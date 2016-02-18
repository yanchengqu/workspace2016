!function(){
	var memberId = $('#memberId').val();
	H.Event.tapClick(function(e){
		var $target = $(e.target);
		if(!$target.hasClass('btn-line') || $target.hasClass('disabled')) return;
		var $item = $target.closest('.item');
		var params = {memberId:memberId,sku:$item.attr('data-sku')};
		$.ajax({
			url:'/v2/mstore/removeProductShelvesSubmit.html',
			type:'get',
			data:params,
			success:function(data){
				if(!data || !data.success) return;
				$item.height(0);
			},
			error:function(e){
				throw Error('下架请求失败！');
			}
		});
	},$('.wrapper')[0]);
}();
