!function(){
	/*
	H.Event.tapClick(function(e){
		if(!/btn-line/.test(e.target.className)) return;
		var params = {};
		$.ajax({
			url:'',
			type:'',
			data:params,
			success:function(data){
				if(!data || !data.success) return;
				//
			},
			error:function(info){
				throw new Error('删除收货地址失败！');
			}
		});
	});
	*/
	
	var addressItems = G('addressItems');
	if(addressItems){
		var isUserCenter = !!~~(addressItems.getAttribute('data-usercenter'));
		H.Event.tapClick(function(e){
			var $target = $(e.target).closest('.item-head');
			if(!$target.length) return;
			if($target.next('.item-body').find('.checkbox--checked').length && !isUserCenter){
				redirect();
				return;
			}
			var params = {'addrId':$target.attr('data-id')};
			$.ajax({
				url:'/v2/h5/shippingAddress/updateDefaultAddr.html',
				type:'get',
				data:params,
				success:function(data){
					if(data.success) {
						if(!isUserCenter) redirect();
						else{
							$(addressItems).find('.checkbox').removeClass('checkbox--checked');
							$target.next('.item-body').find('.checkbox').addClass('checkbox--checked');
						}
					}
				},
				error:function(){
					alert('设置默认地址失败！');
					throw new Error('设置默认地址失败！');
				}
			});
		},addressItems);
	}

	function redirect(){
		window.location.href = '/v2/h5/order/pageInfo.html';
	}

}();