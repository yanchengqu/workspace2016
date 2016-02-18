/**
 * @author: chenxiaoyong@ehaier.com
 * @date: 2015-02-03
 * @description: TS-PC homepage
 * @required: jquery.js swiper.js
 */

! function (window, $,undefined) {
	
	var Page = {
		topSwiper: function () {

			$('#J_topSwiper').swiper({
				simulateTouch: false,
				pagination: '.pagination',
				loop:true,
				grabCursor: true,
				paginationClickable: true,
				calculateHeight: true,
				onFirstInit: function(swiper) {
					var parent  = $(swiper.container).find('.container'),
						prevBtn = parent.find('.prev'),
						nextBtn = parent.find('.next');
					prevBtn .on('click', function() {
							swiper.swipePrev();
						});
					nextBtn.on('click', function() {
						swiper.swipeNext();
					});
				}
			});
		}, 
		subSwiper: function () {
			$('.slide .swiper-container').swiper({
    			slidesPerView: 3,
    			simulateTouch: false,
    			onFirstInit: function(swiper) {
    				/**
    				 * [toggleBtn 切换左右按钮]
    				 * @param  {Number} index [slide索引值]
    				 */
    				function toggleBtn(index) {
    					index > 0 ? prevBtn.show() : prevBtn.hide();
						index >= length - 3 ? nextBtn.hide() : nextBtn.show();
    				}

					var parent  = $(swiper.container).closest('.container'),
						prevBtn = parent.find('.prev'),
						nextBtn = parent.find('.next'),
						length  = swiper.slides.length;

					if ( 3 >= length ) {
						return nextBtn.hide();
					} else {
						prevBtn .on('click', function() {
							swiper.swipePrev() && toggleBtn(swiper.activeIndex)
						});
						nextBtn.on('click', function() {
							swiper.swipeNext() && toggleBtn(swiper.activeIndex)
						});
					}
    			}
			  });
		},		
		init: function () {

			this.subSwiper();
			this.topSwiper();

			// 头部分类锚点置顶效果
			
			var 
				categoryAnchor = $('.category-anchor'),
				h = $('.header').height();

			$(window).scroll(function(event) {

				var $this     = $(this),
					scrollTop = $this.scrollTop();

				if ( scrollTop >= h  ) {
					categoryAnchor.css({
						position: 'fixed',
						left: 0,
						top: 0
					});
				} else {
					categoryAnchor.closest('.container')
						.css('position', 'relative');
					categoryAnchor.css({
						position: 'absolute',
						left: 0,
						top: 0
					});

				}

			});

		}
	};
	
	$(function () {		
		Page.init();
	});
}(this, this.jQuery)
