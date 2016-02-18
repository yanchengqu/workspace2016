!function(){
	var invoicdForm = G('invoicdForm');
	H.Event.tapClick(function(e){
		if(!check()) return;
		invoicdForm.submit();
	},G('invoiceSubmit'));

	var tipEl = G('.tips');
	function check(){
		return H.Common.ValidateForm(invoicdForm,{
			billCompany:{required:true,reg:/^.{2,100}$/},
		},G('errorTip'));
	}

}(this);