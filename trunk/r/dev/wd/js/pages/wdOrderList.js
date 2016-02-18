!function(){
	/*
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
	*/
	var payCheck = G('payCheck');
	if(payCheck){
		H.Event.tapClick(function(e){
			var orderSn = payCheck.getAttribute('data-orderSn'),
				orderAmount = payCheck.getAttribute('data-orderAmount');
			if(orderSn && orderAmount) toWxPay(orderSn,orderAmount);
		},payCheck);
	}

	function toWxPay(orderSn, orderAmount){
		//检查微信版本，5.0及以上版本支持微信支付
		var userAgent = window.navigator.userAgent;
		if(!userAgent || userAgent.indexOf("MicroMessenger") == -1){
	    	alert("微信支付只能在微信中完成");
			return;
	   	}
	   	if(userAgent.substring(userAgent.indexOf("MicroMessenger")+15,userAgent.indexOf("MicroMessenger")+16) < 5){
	    	alert("微信版本过低，请使用5.0及以上版本");
			return;
	   	}
	   	window.location.href = "/v2/h5/pay/wxpay/pay.html?showwxpaytitle=1&orderSn="+orderSn+"&orderAmount="+orderAmount;
	}

}();

