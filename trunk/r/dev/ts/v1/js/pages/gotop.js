/**
 * @author: yangmingfang@ehaier.com
 * @date: 2015-04-27
 * @description: gotop
 * @required: jquery.js 
 */


! function (window, $,undefined) {
	var gotop = {
        creatContainer: function(){
            this.container = $('<div>',{'class':'sbar-tools'});
            this.subBox = $('<ul>',{'class':'sbar-tools-wrapper'});

            this.container.append(this.subBox);
            $('body').append(this.container);
        },
		creatElemnet: function() {
            var that = this;
            var placeHolderA = $('<a>',{'class': 'fbar-a','href': '#'});

            that.creatContainer();
            that.element = $('<li>',{'class':'sbar-tool gotop'});

            that.element.append(placeHolderA);
            that.subBox.append(this.element);
        },
        gotop: function(){
            var that = this;

            that.element.hide();
            $(window).scroll(function(){
                if( $(window).scrollTop() > 0){

                        that.element.slideDown();
                  
                }else{
                    
                        that.element.slideUp();

                }
            });
            
            that.element.find('a').click(function(p){
                p.preventDefault();
                $("body,html").animate({scrollTop: 0},150); 
            });

        },
        init: function () {
			this.creatElemnet();
            this.gotop();
		}
    };
    $(function () {		
		gotop.init();
	});
}(this, this.jQuery);
