!function(win,doc){
	//变量
	var urlObj = {
		deleteOrder : '/v2/h5/cart/delect.json',
		updateNumber: '/v2/h5/cart/update.json'
	};
	var totalPriceEl = $('.totalPrice')[0];
	var checkedClass = 'checkbox--checked';

	function productQuantityChange(quantity,num){
		var item = $(quantity).closest('.item')[0];
		if(!item) return;
		var productId = item.getAttribute('data-productid');
		var params = {'productId':productId,'number':num};
		$.ajax({
			type:'get',
			url:urlObj.updateNumber,
			data:params,
			success:function(data){
				if(data.success){
					updateTotalPrice();
				}
			},
			error:function(){
				throw new Error('请求修改数量失败！');
			}
		});
	}

	function deleteOrder(item){
		if(!item) return;
		var productId = item.getAttribute('data-productid');
		var params = {'productId':productId};
		$.ajax({
			type:'get',
			url:urlObj.deleteOrder,
			data:params,
			success:function(data){
				if(data.success){
					var count = parseInt(doc.querySelectorAll('.item').length);
					if(count<=1) win.location.href=win.location.href;
					item.parentNode.removeChild(item);
					updateTotalPrice();
					setCheckAll();
				}
			},
			error:function(){
				throw new Error('请求删除商品失败！');
			}
		});	
	}
	
	function getNumber(input){
			var isOk = /^[1-9]\d*$/.test(input.value);
			var value =  isOk ? parseInt(input.value) : 1;
			if(!isOk) input.value = 1;
			return value;
	}

	function BindQuantitys(containerEl,changeCallback){
		
		H.Event.tapClick(function(e){
			var dom = e.target,
				className = dom.className,
				input = null,
				num = 1;
			if(/quantity__btn--decrease/.test(className)){
				input = dom.nextElementSibling || dom.nextSibling;
				num = getNumber(input);
				if(num<=1) return;
				input.value = --num;
				changeCallback && changeCallback(input.parentNode,num);
				return;
			}

			if(/quantity__btn--increase/.test(className)){
				input = dom.previousElementSibling ||  dom.previousSibling;
				num = getNumber(input);
				if(num>999) return;
				input.value = ++num;
				changeCallback && changeCallback(input.parentNode,num);
				return;
			}

			//点击checkbox 
			if(/(item-head)|(checkbox)/.test(className)){
				if(/item-head/.test(className)) dom = dom.querySelector('span.checkbox');
				setCheckBox(dom);
				updateTotalPrice();
				return;		
			}

			if(/(deleteBtn)|(btn-line)/.test(className)){
				deleteOrder($(dom).closest('.item')[0]);
				return;
			}

			if(/nav__back/.test(className)){
				if(win.hdk)	H.Common.back();
				return;
			}

			if(dom.id==='J_pay'){
				submitCart();
			}

		},containerEl);
		
		
		['keydown','keyup','paste'].forEach(function(eventName){
			containerEl.addEventListener(eventName,function(e){
				if(/quantity__input/.test(e.target.className)){
					e.preventDefault();
					return false;
				}
			});
		});
		
		var body = doc.body;
		body.onselectstart = body.onpaste = body.oncopy = body.oncut = 'return false;';
	}

	function updateTotalPrice(){
		var totalprice = 0;
		Array.prototype.forEach.call(doc.querySelectorAll('.checkbox.checkbox--checked'),function(cb){
			var item = $(cb).closest('.item')[0];
			if(!item) return;
			var num = parseInt(item.querySelector('.quantity__input').value);
			var price = parseInt(item.getAttribute('data-price'));
			totalprice += num * price;
		});
		setPrice(totalPriceEl,totalprice);
	}

	function setCheckBox(cb){
		var $this = $(cb);
		var checked = $this.hasClass(checkedClass);
		if(cb.id==='J_checkall') {
			$('.checkbox:not(#J_checkall)').toggleClass(checkedClass,!checked);
			$this.toggleClass(checkedClass,!checked);
		}
		else{
			$this.toggleClass(checkedClass,!checked);
			if(checked) $('#J_checkall').removeClass(checkedClass);
			else setCheckAll();
		}
	}

	function setCheckAll(){
		var isAllCheck = true;
		$('.checkbox:not(#J_checkall)').each(function(index,item){
			if(!$(item).hasClass(checkedClass))	isAllCheck = false;
		});
		$('#J_checkall').toggleClass(checkedClass,isAllCheck);
		$('#itemsTotal').html($('.checkbox:not(#J_checkall)').length);
	}

	function setPrice(el,value){
		el.setAttribute('data-value',value);
		el.innerHTML = H.Common.resetPrice(parseInt(value),true);			
	}

	function submitCart(){
		if(!H.Common.checklogin()) return;
		var proIds = [],nums = [];
		$('.checkbox.checkbox--checked:not(#J_checkall)').each(function(index,dom){
			var $item = $(dom).closest('.item');
			proIds.push($item.attr('data-productid'));
			var input = $item.find('.quantity__input')[0];
			nums.push(getNumber(input));
		});

		if(proIds.length > 0 && proIds.length===nums.length){
			var params = {
				productIds:proIds.join(),
				numbers:nums.join()
			}
			win.location.href = '/v2/h5/order/pageInfo.html?productIds=' + proIds + '&numbers=' + nums;
		}
	}

	BindQuantitys(doc,productQuantityChange);
	H.Common.updatePrice('.totalPrice,.price',true);

}(this,document);