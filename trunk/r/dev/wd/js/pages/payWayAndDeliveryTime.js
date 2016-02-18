!function(){
	function G(id){return document.getElementById(id)};
	var reserveDateSel = G('reserveDateSel'),
		reserveTimePeriodSel = G('reserveTimePeriodSel');
	var $form = $('#reserveForm');
	var tipEl = G('errorTip');
	var formEl = G('reserveForm');

	function getFormData(){
		var paramArr = $form.serializeArray();
		var params = {};
		paramArr.forEach(function(item){
			params[item.name] = item.value;
		});
		params.delivery = ~~(params.yuyueDay !== 'noneValue' && params.yuyueTime !=='noneValue');
		return params;			
	}

	H.Event.tapClick(function(e){
		if(!check()) return;
		formEl.submit();
	},G('deliverySubmit'));

	function check(){
		var params = getFormData();
		var errorStr = '';
		if(!params.payWay) errorStr = '请选择支付方式!';
		if(~~(params.yuyueDay==='noneValue') + ~~(params.yuyueTime==='noneValue') === 0) G('delivery').value = 1; 
		if(params.yuyueDay==='noneValue' && params.yuyueTime!=='noneValue') errorStr = '请选择日期';
		if(params.yuyueDay!=='noneValue' && params.yuyueTime==='noneValue') errorStr = '请选择时间';
		tipEl.innerHTML = errorStr;
		return !errorStr;
	}

	function onchange(){
		if(window.localStorage && this.value!=='noneValue') localStorage[this.id] = this.value;
	}

	reserveDateSel.onchange = onchange;
	reserveTimePeriodSel.onchange = onchange;

	function init(){
		if(window.localStorage && localStorage.reserveDateSel && localStorage.reserveTimePeriodSel){
			reserveDateSel.value = localStorage.reserveDateSel;
			reserveTimePeriodSel.value = localStorage.reserveTimePeriodSel;
		}
	}
	init();

}();