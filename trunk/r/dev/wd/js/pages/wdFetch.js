!function(){
	var formEl = G('form');
	var tipEl = G('errorTip');
	H.Event.tapClick(function(e){
		var isOk = H.Common.ValidateForm(formEl,{
			cardId:{required:true,reg:/^.{2,100}$/},
			money:{required:true,req:/^[1-9]?\d{1,20}$/}
		},tipEl);
		if(isOk) formEl.submit();
	},G('submitBtn'));
}();