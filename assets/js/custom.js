////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function($) {
    "use strict";

    var $body = $("body");

    if( $body.hasClass("has-loading-screen") ){
        $body.append('<div class="loader"></div>');
        //$.getScript( "assets/js/pace.min.js", function( data, textStatus, jqxhr ) {
            Pace.on("done", function() {
                $body.addClass("loading-done");
                setTimeout(function() {
                    $body.addClass("hide-loading-screen");
                }, 500);
                $.each( $(".animate"), function (i) {
                    var $this = $(this);
                    setTimeout(function(){
                        $this.addClass("show-it");
                    }, i * 100);
                });
            });
        //});
    }

//  "img" into "background-image" transfer

    $("[data-background-image]").each(function() {
        $(this).css("background-image", "url("+ $(this).attr("data-background-image") +")" );
    });

    $(".bg-transfer").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });

//  Custom background color

    $("[data-background-color]").each(function() {
        $(this).css("background-color", $(this).attr("data-background-color") );
    });

//  Side panel opening

    $(".open-side-panel").on("click", function(e){
        e.preventDefault();
        if( !$body.hasClass("show-panel") ){
            $("body").addClass("show-panel");
            setTimeout(function(){
                $("body").addClass("in");
            }, 200);
        }
    });

//  Side panel closing

    $("#page, .close-panel, .open-side-panel").on("click", function(e){
        if( $body.hasClass("show-panel in") ){
            $body.removeClass("show-panel");
            $body.removeClass("in");
        }
    });

//  Close side panel on ESC key pres

    $(document).keydown(function(e) {
        if( !$("body").hasClass("mfp-zoom-out-cur") ){
            switch(e.which) {
                case 27: // ESC
                    $(".show-panel #page").trigger("click");
                    break;
            }
        }
    });


//  Magnific Popup

    if ($(".image-popup").length > 0) {
        $(".image-popup").magnificPopup({
            type: "image",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden"
        });
    }

    if ($(".video-popup").length > 0) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }


});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Rain

function rain() {
    var image = document.getElementById('rainy-image');
    var parent = document.getElementById('rainy-parent');
    image.onload = function() {
        var engine = new RainyDay({
            image: this,
            parentElement: parent
        });
        engine.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100);
    };
    image.crossOrigin = 'anonymous';
    image.src = $("#rainy-image").attr("src");
}