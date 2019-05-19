/*
Author: Erilisdesign
*/


(function($) {
	"use strict";

	// Vars
	var $body = $('body'),
		$navigationLinks = $('a.scrollto'),
		$homeBlock = $('.home-block'),
		$contentBlock = $('.content-block'),
		$btnCloseContentBlock = $('.close-content-block'),
		$globalOverlay = $('.global-overlay'),
		$preloader = $('#preloader'),
		preloaderDelay = 1200,
		preloaderFadeOutTime = 500,
		target,
		trueMobile;

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}


	function leon_systemDetector() {

		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
			}
		};

		trueMobile = isMobile.any();

	}


	function leon_preloader() {
		$preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
	}


	function leon_backgrounds() {


		var $bgImage = $('.bg-image-holder');
		if($bgImage.length > 0) {
			$bgImage.each(function(){
				var src = $(this).children('img').attr('src');

				$(this).css('background-image','url('+src+')').children('img').hide();
			});
		}


		if ($globalOverlay.hasClass('slideshow-background')) {
			$globalOverlay.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-4.jpg' }
				]
			});
		}


		if ($globalOverlay.hasClass('slideshow-zoom-background')) {
			$globalOverlay.vegas({
				preload: true,
				timer: false,
				delay: 7000,
				transition: 'zoomOut',
				transitionDuration: 4000,
				slides: [
					{ src: 'demo/images/image-4.jpg' },
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' },
					{ src: 'demo/images/image-15.jpg' }
				]
			});
		}


		if ($globalOverlay.hasClass('slideshow-video-background')) {
			$globalOverlay.vegas({
				preload: true,
				timer: false,
				delay: 5000,
				transition: 'fade',
				transitionDuration: 1000,
				slides: [
					{ src: 'demo/images/image-15.jpg' },
					{ src: 'demo/video/marine.jpg',
						video: {
							src: [
								'demo/video/marine.mp4',
								'demo/video/marine.webm',
								'demo/video/marine.ogv'
							],
							loop: false,
							mute: true
						}
					},
					{ src: 'demo/images/image-16.jpg' },
					{ src: 'demo/images/image-17.jpg' }
				]
			});
		}


		if ($globalOverlay.hasClass('kenburns-background')) {

			var kenburnsDisplayBackdrops = false;
			var kenburnsBackgrounds = [
				{ src: 'demo/images/image-15.jpg', valign: 'center' },
				{ src: 'demo/images/image-14.jpg', valign: 'center' },
				{ src: 'demo/images/image-17.jpg', valign: 'center' }
			];

			$globalOverlay.vegas({
				preload: true,
				transition: 'swirlLeft',
				transitionDuration: 4000,
				timer: false,
				delay: 10000,
				slides: kenburnsBackgrounds,
				walk: function (nb) {
					if (kenburnsDisplayBackdrops === true) {
						var backdrop;

						backdrop = backdrops[nb];
						backdrop.animation = [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ];
						backdrop.animationDuration = 20000;
						backdrop.transition = 'fade';
						backdrop.transitionDuration = 1000;

						$globalOverlay
							.vegas('options', 'slides', [ backdrop ])
							.vegas('next');
					}
				}
			});
		}


		if ($('#youtube-background').length > 0) {
			var videos = [
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:true, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);
		}


		if ($('#youtube-multiple-background').length > 0) {

			var videos = [
				{videoURL: "CG20eBusRg0", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true},
				{videoURL: "iXkJmJa4NvE", showControls:false, containment:'.overlay-video',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
			];

			$('.player').YTPlaylist(videos, true);

		}


		if($body.hasClass('mobile')) {
			$('.video-wrapper').css('display', 'none');
		}

		$('[data-gradient-bg]').each(function(index,element){
			var granimParent = $(this),
				granimID = 'granim-'+index+'',
				colours = granimParent.attr('data-gradient-bg'),
				colours = colours.replace(' ',''),
				colours = colours.replace(/'/g, '"')
				colours = JSON.parse( colours );


			granimParent.prepend('<canvas id="'+granimID+'"></canvas>');

			var granimInstance = new Granim({
				element: '#'+granimID,
				name: 'basic-gradient',
				direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
				opacity: [1, 1],
				isPausedWhenNotInView: true,
				states : {
					"default-state": {
						gradients: colours
					}
				}
			});
		});

	}


	function leon_navigation() {
		$body.removeClass('has-content-block-open');

		$navigationLinks.off('click');
		$navigationLinks.on('click', function(e) {
			if (this.hash !== '') {
				e.preventDefault();

				var hash = this.hash;

				if( getWindowWidth() >= 1200 ){
					if( !$(hash).parents('.content-block').length > 0 )
						return;

					if( !$body.hasClass('has-content-block-open') && !$body.hasClass('layout-alternative') ){
						$body.addClass('has-content-block-open');
					}

					var offset = document.querySelector(hash).offsetTop;
					$contentBlock.find('.content-block-inner').animate({
						scrollTop: offset
					}, 800);
				} else {
					if( $(hash).length > 0 )
						$(window).scrollTop( $(hash).offset().top );
				}
			}
		});

		$btnCloseContentBlock.off('click');
		$btnCloseContentBlock.on('click', function(e) {
			e.preventDefault();

			if( $body.hasClass('layout-alternative') )
				return;

			if( getWindowWidth() >= 1200 ){
				$body.removeClass('has-content-block-open');
				setTimeout(function(){
					$contentBlock.find('.content-block-inner').scrollTop(0);
				}, 500);
			}
		});

	}


	function leon_lightbox() {
		if(!$().featherlight) {
			console.log('Featherlight: featherlight not defined.');
			return true;
		}

		$.extend($.featherlight.defaults, {
			closeIcon: '<i class="fas fa-times"></i>'
		});

		$.extend($.featherlightGallery.defaults, {
			previousIcon: '<i class="fas fa-chevron-left"></i>',
			nextIcon: '<i class="fas fa-chevron-right"></i>'
		});

		$.featherlight.prototype.afterOpen = function() {
			$body.addClass('featherlight-open');
		};

		$.featherlight.prototype.afterContent = function() {
			var title = this.$currentTarget.attr('data-title');
			var text = this.$currentTarget.attr('data-text');

			if( !title && !text )
				return;

			this.$instance.find('.caption').remove();

			var title = title ? '<h4 class="title-gallery">' + title + '</h4>' : '',
				text = text ? '<p class="text-gallery">' + text + '</p>' : '';

			$('<div class="caption">').html( title + text ).appendTo(this.$instance.find('.featherlight-content'));
		};

		$.featherlight.prototype.afterClose = function() {
			$body.removeClass('featherlight-open');
		};

		$('a.open-popup-link').featherlight({
			targetAttr: 'href',
			variant: 'featherlight-popup',
			beforeOpen: function(){
				leon_mailchimp();
				leon_contactForm();
			}
		});
	}


	function leon_slider() {
		var $slider = $('.slider');

		if($slider.length > 0){
			if( getWindowWidth() >= 992 && getWindowHeight() >= 768 ){
				if( !$slider.hasClass('slick-initialized') ){
					$slider.slick({
						slidesToShow: 1,
						infinite: true,
						nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
						prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>'
					});
				}
			} else {
				if( $slider.hasClass('slick-initialized') ){
					$slider.slick('unslick');
				}
			}
		}
	}

	function leon_countdown() {
		var countdown = $('.countdown[data-countdown]');

		if (countdown.length > 0) {
			countdown.each(function() {
				var $countdown = $(this),
					finalDate = $countdown.data('countdown');
				$countdown.countdown(finalDate, function(event) {
					$countdown.html(event.strftime(
						'<div class="countdown-container row"><div class="countdown-item col-6 col-sm"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-item col-6 col-sm"><div class="number">%H</div><span>Hours</span></div><div class="countdown-item col-6 col-sm"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-item col-6 col-sm"><div class="number">%S</div><span>Seconds</span></div></div>'
					));
				});
			});
		}
	}


	function leon_fixScrolling() {
		// Fix scrolling when mouse is over another element
		if( getWindowWidth() >= 1200 ){
			var outerDiv = $('.content-block-inner');

			$(document).on( 'mouseenter', '.site-header,.home-block', function() {
				if( $body.hasClass('has-content-block-open') || $body.hasClass('layout-alternative') ){
					$(document).on( 'mousewheel DOMMouseScroll', function(e){
						if ( e.preventDefault ) {
							e.preventDefault();
						}
						e.stopPropagation();

						var delta = ( e.originalEvent.wheelDelta || -e.originalEvent.detail );

						if ( delta > 0 && delta < 100 )
							delta = 100;
						if (delta < 0 && delta > -100 )
							delta = -100;

						outerDiv.scrollTop( outerDiv.scrollTop() - delta );
					});
				}
			});

			$(document).on( 'mouseleave', '.site-header,.home-block', function() {
				$(document).off('mousewheel DOMMouseScroll');
			});

			// Add Keyboard support - up/down
			$(document).on( 'keydown', function(e) {
				if( $body.hasClass('has-content-block-open') || $body.hasClass('layout-alternative') ){
					if ( e.which == 40 ) {
						outerDiv.scrollTop( outerDiv.scrollTop() - -20 );
					} else if ( e.which == 38 ) {
						outerDiv.scrollTop( outerDiv.scrollTop() - 20 );
					}
				}
			});

		} else {
			$(document).off( 'mouseenter mouseleave', '.site-header,.home-block');
		}
	}
	leon_fixScrolling();
	
	// document.ready function
	jQuery(document).ready(function($) {
		$('html, body').scrollTop(0);
		leon_backgrounds();
		leon_navigation();
		leon_lightbox();
		leon_slider();
		leon_countdown();
		leon_mailchimp();
		leon_contactForm();
	});

	// window load function
	$(window).on('load', function() {
		$(window).scroll();
		leon_preloader();
	});

	// window.resize function
	$(window).on('resize', function() {
		leon_navigation();
		leon_slider();
		leon_fixScrolling();
	});

})(jQuery);