!function(){ 
	
	function resetPrice(price){ 
		var sum = parseFloat(price),
			tailPrice = sum.toFixed(2).split('.')[1],
			priceSumStrOrg = parseInt(sum).toString(),
			priceSumStr = priceSumStrOrg.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		return '&yen;'+priceSumStr+'.'+tailPrice;
	}

	function updatePrice(selector){ 
		var elements = document.querySelectorAll(selector);
		for(var i=0,l=elements.length;i<l;i++){ 
			var el = elements[i];
			var value = el.getAttribute('data-value');
			if(value){ 
				var priceSumStr = resetPrice(value);
				el.innerHTML = priceSumStr;
			}
		}
	}

	updatePrice('.showPricelb');

	var clickEvent = "ontouchstart" in window ? "touchend" : "click";
	/*
	$('.link-alipay').on(clickEvent,function(){ 
		var shref = $(this).attr('shref');
		var thref = $(this).attr('thref');
		var redirectUrl = shref + '&returnUrl='+ encodeURIComponent(thref);
		window.location.href=redirectUrl;
	});
	*/
}();