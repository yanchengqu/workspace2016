window.onload=function(){function e(){var e={},t=I.getAttribute("data-value"),a=O.getAttribute("data-value"),r=w.getAttribute("data-value");return"0"!=t&&(e.pid=t,"0"!=a&&(e.cid=a,"0"!=r&&(e.aid=r))),e}function t(e,t){for(var a=0,r=t.length;r>a;a++){var i=t[a];if(i.day==e)return i.timePeriod}}function a(){var e=document.querySelector(".sliderAddr");if(e){e.className="sliderAddr active";for(var t=0,a=e.children,r=a.length;r>t;t++){var i=a[t];!function(t){EventObj.tapClick(function(){var a=e.querySelector("section.active");a!==t&&(a&&(a.className=""),t.className="active");var r=t.getAttribute("data-address");if(r){var i=JSON.parse(r);k.update(i)}startPonter=null,setTimeout(function(){e.className="sliderAddr"},500)},t)}(i)}}}function r(){_.className="bdRadius active",j.className="bdRadius",M.className="bdRadius",P.value=_.getAttribute("data-value"),R.value=_.getAttribute("data-key")}function i(){j.className="bdRadius active",M.className="bdRadius",_.className="bdRadius",P.value=j.getAttribute("data-value"),R.value=j.getAttribute("data-key")}function n(){M.className="bdRadius active",j.className="bdRadius",_.className="bdRadius",P.value=M.getAttribute("data-value"),R.value=M.getAttribute("data-key")}function o(){EventObj.tapClick(r,_),EventObj.tapClick(i,j),EventObj.tapClick(n,M)}function s(e){return e?e.options[e.selectedIndex].text:void 0}function u(e,t,a,r){for(var i=document.querySelectorAll(t),n=0,o=i.length;o>n;n++){var s=i[n],u=s.getAttribute(a),d=s.value;u&&e.hasOwnProperty(u)&&(e[u]=d)}r&&r(e)}function d(e,t,a){for(var r=document.querySelectorAll(t),i=0,n=r.length;n>i;i++){var o=r[i],s=o.getAttribute(a),u=o.value,d=B[s];if(d){var l=d.reg,c=l.test(u);if(!c){var v=B[s].errorMsg;return layer.open({content:v,shadeClose:!1,fixed:!1,top:(document.documentElement.clientHeight-200)/2,btn:["好的"]}),!1}}}return!0}function l(e,t,a,r,i){for(var n=document.querySelectorAll(t),o=0,s=n.length;s>o;o++){var u=n[o],d=u.getAttribute(a);if(e.hasOwnProperty(d)){var l=e[d];u.value=l,r.hasOwnProperty(d)&&(r[d]=l)}}i&&i(e)}function c(e,t,a,r,i,n,o){this.contacter=e,this.mobile=t,this.provinceId=a,this.cityId=r,this.regionId=i,this.regionName=n,this.address=o}function v(e,t,a,r,i,n,o,s){this.paymentCode=e,this.paymentName=t,this.isCod=a,this.deliveryType=r||1,this.reserveDate=i,this.reserveTimePeriod=n,this.memberInvoiceTitle=o,this.remark=s}function p(e,t,a){this.number=e,this.productId=t,this.tCode=a}function y(e,t,a){this.address=e,this.order=t,this.ordProduct=a}function m(e,t){var a={};for(var r in e){var i=e[r];for(var n in i){var o=t?r+"."+n:n;a[o]=i[n]}}return a}function g(e){var t=parseFloat(e),a=t.toFixed(2).split(".")[1],r=parseInt(t).toString(),i=r.split("").reverse().join("").replace(/(\d{3})/g,"$1,").replace(/\,$/,"").split("").reverse().join("");return"&yen;"+i+"."+a}function f(e){for(var t=document.querySelectorAll(e),a=0,r=t.length;r>a;a++){var i=t[a],n=i.getAttribute("data-value");if(n){var o=g(n);i.innerHTML=o}}}function b(e){var t=D.value;if(t.replace(/(^\s*)|(\s*$)/,"")){var a={sku:T,tCode:t};$.ajax({url:S.tCode.url,type:S.tCode.type,data:a,success:function(a){if(a&&a.success&&a.data){var r=a.data.couponValue;if(r){var i=parseFloat(J.getAttribute("data-org-value")),n=i-parseFloat(r);return J.setAttribute("data-value",n),f(".showPricelb"),void e(!0,t)}}e(!1)},error:function(){e(!1)}})}}function h(e){var t=JSON.parse(JSON.stringify(e));t=m(t,!1),openPage(S.pay.url,S.pay.type,t)}var A=function(e){return document.getElementById(e)};Array.prototype.map||(Array.prototype.map=function(e){var t=this.length;if("function"!=typeof e)throw new TypeError;for(var a=new Array(t),r=arguments[1],i=0;t>i;i++)i in this&&(a[i]=e.call(r,this[i],i,this));return a});var k=new c,C=new v,N=new p,S={region:{url:"/mobile/region/regionTree.html?pid=2345",type:"post"},paylis:{url:"/mobile/order/getPayAndDate.html",type:"post"},pay:{url:"/mobile/order/submit.html",type:"post"},paySuccess:{url:"/mobile/order/success.html",type:"post"},tCode:{url:"/mobile/order/getCoupons.html",type:"post"}},I=A("province_Sel"),O=A("city_sel"),w=A("area_sel"),_=A("alipaymobileBtn"),j=A("codBtn"),M=A("umspayBtn"),P=A("paymentCode"),R=A("paymentName"),T=A("sku").value,x=parseInt(A("numberHidden").value),E=new junRegion({requestOnlyOne:!0,provinceUrl:S.region.url,provinceSel:I,citySel:O,areaSel:w,dataKey:"data",key:"name",value:"id",areaChangeCallback:function(e){if(e){var a={sku:T,regionId:e,num:x};$.ajax({url:S.paylis.url,type:S.paylis.type,data:a,success:function(e){var a=A("reserveDateSel");if(e=e instanceof Object?e:JSON.parse(e),e.success){var r=e.data.resShippingList;if(r.length){for(var i=r[0],n=i.day,o=JSON.parse(JSON.stringify(r)),s=0,u=o.length;u>s;s++){var d=o[s];d.weekDay=d.day}E.initCommonSelect(a,o,"weekDay","day","-请选择-",n),a.onchange=function(){var e=this.value,a=t(e,r);if(a){a=a instanceof Object?a:JSON.parse(a);var i=A("reserveTimePeriodSel");if(a&&a.length&&i){var n=a[0];E.initCommonSelect(i,a,"value","key","-请选择-",n.key)}}},a.onchange()}var l=e.data.payList,c=_.getAttribute("data-value"),v=j.getAttribute("data-value"),p=M.getAttribute("data-value"),y=!1,m=!1;if(hasUmspay=!1,l)for(var g=0,u=l.length;u>g;g++){var f=l[g];f.paymentCode==c&&(y=!0),f.paymentCode==v&&(m=!0),f.paymentCode==p&&(hasUmspay=!0)}_.style.display=y?"block":"none",j.style.display=m?"block":"none",M.style.display=hasUmspay?"block":"none",1===l.length&&(y&&(_.className="bdRadius active",P.value=_.getAttribute("data-value"),R.value=_.getAttribute("data-key")),m&&(j.className="bdRadius active",P.value=j.getAttribute("data-value"),R.value=j.getAttribute("data-key")),hasUmspay&&(M.className="bdRadius active",P.value=M.getAttribute("data-value"),R.value=M.getAttribute("data-key")))}},error:function(e){console.dir(e)}})}},initData:e(),ajaxFun:$.ajax}),q=document.querySelector(".linkAddr");EventObj.tapClick(a,q),o();var B={contacter:{errorMsg:"姓名不正确！",reg:/^[\u4e00-\u9fa5a-zA-Z]+$/},mobile:{errorMsg:"手机号不正确！",reg:/^0?(13|15|17|18|14)[0-9]{9}$/},address:{errorMsg:"地址不正确！",reg:/^\s*([\u4e00-\u9fa5a-zA-Z0-9_()（）-\s])+\s*$/},provinceId:{errorMsg:"请选择省份！",reg:/[^0]/},cityId:{errorMsg:"请选择城市！",reg:/[^0]/},regionId:{errorMsg:"请选择县/市！",reg:/[^0]/},paymentCode:{errorMsg:"请选择支付方式！",reg:/^(alipaymobile)|(cod)|(umspay)$/},reserveDate:{errorMsg:"请选择配送日期！",reg:/[^0]/},reserveTimePeriod:{errorMsg:"请选择配送时间！",reg:/[^0]/},memberInvoiceTitle:{errorMsg:"发票格式不正确！",reg:/^\s*([\u4e00-\u9fa5a-zA-Z0-9_()（）-])*\s*$/},remark:{errorMsg:"订单备注信息格式不正确！",reg:/^\s*([\u4e00-\u9fa5a-zA-Z0-9_()（）-])*\s*$/},tCode:{errorMsg:"",reg:/^[\s\S]*$/}};c.prototype.init=function(){u(this,".link-box .data_input","data-filed",function(e){e.regionName=s(I)+s(O)+s(w)})},c.prototype.check=function(){return d(this,".link-box .data_input","data-filed")},c.prototype.update=function(e){var t=this;l(e,".link-box .data_input","data-filed",this,function(e){I.onchange(),e.cityId&&(O.value=e.cityId,O.onchange()),e.regionId&&(w.value=e.regionId,w.onchange()),e.memberAddressId&&(t.memberAddressId=e.memberAddressId)})},v.prototype.init=function(){u(this,".deliverTime .data_input,.payMode .data_input,.companyBill .data_input","data-filed",function(e){e.isCod=e.paymentCode==j.getAttribute("data-value")?1:0})},v.prototype.check=function(){return d(this,".deliverTime .data_input,.payMode .data_input,.companyBill .data_input","data-filed")},p.prototype.init=function(){u(this,".productList .data_input,.tCodeSection .data_input","data-filed")},f(".showPricelb");var D=A("tCode"),J=A("totalPrice"),F=!0,U="",z=A("checkTCode");EventObj.tapClick(function(){b(function(e,t){F=e,U=t||"";var a=F?"优惠券使用成功":"优惠券使用失败";if(layer.open({content:a,shadeClose:!1,fixed:!1,top:(document.documentElement.clientHeight-200)/2,btn:["好的"]}),!F){D.value="";var r=parseFloat(J.getAttribute("data-org-value"));J.setAttribute("data-value",r),f(".showPricelb")}})},z);var H=A("submitBtn");EventObj.tapClick(function(){if(k.check()&&C.check()){k.init(),C.init(),N.init(),N.tCode=U;var e=new y(k,C,N);h(e)}},H)};