!function(win){
	//格式化价格
	H.Common.updatePrice('.price,.totalPrice',true);

	var urlObj = {
		address:'/v2/h5/shippingAddress/toAddrManager.html?returnUrl=order',
		deliveryWay:'/v2/h5/order/toChooseDeliveryWay.html',
		invoice:'/v2/h5/order/toInvoice.html'
	};

	var addressItem = G('addressItem'),
		deliveryWayItem = G('deliveryWayItem'),
		invoiceItem = G('invoiceItem'),
		remark = G('remark'),
		orderForm = G('orderForm'),
		orderSubmit = G('orderSubmit'),
		errorTip = G('errorTip');

	if(addressItem){
		H.Event.tapClick(function(){
			win.location.href = urlObj.address;
		},addressItem);
	}
	if(deliveryWayItem){
		H.Event.tapClick(function(){
			win.location.href = urlObj.deliveryWay;
		},deliveryWayItem);
	}
	if(invoiceItem){
		H.Event.tapClick(function(){
			win.location.href = urlObj.invoice;
		},invoiceItem);
	}

	remark.onchange = function(){
		if(win.localStorage) localStorage.remark = this.value;
	}
	function init(){
		if(win.localStorage && localStorage.remark) remark.value = localStorage.remark;
	}
	
	init();
	
	if(orderSubmit){
		H.Event.tapClick(function(){
			if(!check()) return;
			$.ajax({
				url:"/v2/h5/order/orderSubmit.html",
				type:"post",
				data:{remark:$("#remark").val()},
				dataType:'json',			
				success:function(result){
					if(result.success) win.location.href = "/v2/h5/order/toOrderSubmitSuccess.html?orderId="
						+result.data.order.id+"&orderSn="+result.data.order.orderSn;
					else errorTip.innerHTML = result.message;
				}
	    	});
		},orderSubmit);
	}

	function check(){
		return H.Common.ValidateForm(orderForm,{
			consigneeInfo:{required:true,reg:/^.{2,100}$/},
			billCompany:{required:true,reg:/^.{2,100}$/}
		},errorTip,function(input,msg){
			$(input).addClass('error');
			errorTip.innerHTML = msg;
			window.scrollTo(0,0);
		});
	}

}(this);