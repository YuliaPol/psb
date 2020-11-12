
jQuery(function ($) {
    $(document).ready(function () {

        //text fill
        $.fn.textfill = function(options) { 
            return this.each(function() {
            var text = $(this).html();
            var oldFontSize = parseInt($(this).css("font-size"));
            var contentFontSizes = [];
            $(this).find('*').each(function(i, e){
                contentFontSizes[i] = parseInt($(this).css("font-size"));
            });
            $(this).html('');
            var container = $('<span />').html(text).appendTo($(this));
            var min = 1, max = 200, fontSize, coef;
            do {
                fontSize = (max + min) / 2;
                coef = fontSize / oldFontSize;
                container.css('fontSize', fontSize);
                container.find('*').each(function(i, e){
                $(this).css("font-size", (contentFontSizes[i] * coef) + 'px');
            });
                var multiplier = $(this).height()/container.height();
                if (multiplier == 1) { min = max = fontSize}
                if (multiplier >  1) { min = fontSize}
                if (multiplier <  1) { max = fontSize}
            } while ((max - min) > 1);
            fontSize = min;
            coef = fontSize / oldFontSize;
            if ($(this).width() < container.width()) {
                min = 1;
                do {
                fontSize = (max + min) / 2;
                coef = fontSize / oldFontSize;
                container.css('fontSize', fontSize);
                container.find('*').each(function(i, e){
                    $(this).css("font-size", (contentFontSizes[i] * coef) + 'px');
                });
                var multiplier = $(this).width()/container.width();
                if (multiplier == 1) { min = max = fontSize}
                if (multiplier >  1) { min = fontSize}
                if (multiplier <  1) { max = fontSize}
                } while ((max - min) > 1);
                fontSize = min;
                coef = fontSize / oldFontSize;
            }
            container.remove();
            $(this).html(text);
            var minFontSize = options.minFontPixels;
            var maxFontSize = options.maxFontPixels;
            var newFontSize = minFontSize && (minFontSize > fontSize) ?
                        minFontSize :
                        maxFontSize && (maxFontSize < fontSize) ?
                        maxFontSize :
                        fontSize;
                    
            coef = minFontSize && (minFontSize > fontSize) ?
                        minFontSize / oldFontSize :
                        maxFontSize && (maxFontSize < fontSize) ?
                        maxFontSize / oldFontSize :
                        coef;
            $(this).find('*').each(function(i, e){
                $(this).css("font-size", (contentFontSizes[i] * coef) + 'px');
            });
            $(this).css('fontSize', newFontSize);
            }); 
        }; 
        
        var windowWidth = $(window).width();
        var prevwidth;
        var prevheight;
        if($('.bannercontainer').attr('data-width')){
            prevwidth = $('.bannercontainer').attr('data-width');
        }
        if($('.bannercontainer').attr('data-height')){
            prevheight = $('.bannercontainer').attr('data-height');
        }
        if($('.bannercontainer').attr('data-shadowtext')){
            var shadowText = $('.bannercontainer').attr('data-shadowtext');
            if(shadowText == 'on'){
                $('.bannercontainer').addClass('addshadowtext');
            }
        }
        if($('.bannercontainer').attr('data-position')){
            var positionClass = 'align' + $('.bannercontainer').attr('data-position');
            $('.bannercontainer').addClass(positionClass);
        }
        if($('.bannercontainer').attr('data-fontFamily')){
            var fontFamily = 'font' + $('.bannercontainer').attr('data-fontFamily');
            $('.bannercontainer').addClass(fontFamily);
        }
        if(windowWidth > 992){
            if($('.bannercontainer .elements').children().length>0){
                ResizeScreen();
            }
            ResizeScreen();
            SetTextSettings();
            CheckTextCovering();
        }
        else {
            SetTextSettings();
            MobileSettings();
        }
        $(window).resize(function() {
            windowWidth = $(window).width();
            if(windowWidth > 992){
                SetTextSettings();
                ResizeScreen();
                CheckTextCovering();
                ResizeScreen();
            }
            else {
               MobileSettings();
            }
        });
        function CheckTextCovering(){
            var ContHeight = parseInt($('.bannercontainer .elements').height());
            var ContWidth = parseInt($('.bannercontainer .elements').width());
            var elements = $('.bannercontainer .elements').find('.text');
            elements.each(function (index, element) {
                var top = parseInt($(element).position().top);
                var left = parseInt($(element).position().left);
                var right = left +  parseInt($(element).outerWidth());
                var bottom = top +  parseInt($(element).outerHeight());
                var elements2 = $('.bannercontainer .elements').find('.text');
                elements2.each(function (index2, element2) {
                    if(element2 !== element){
                        var top2 = parseInt($(element2).position().top);
                        var left2 = parseInt($(element2).position().left);
                        var right2 = left2 +  parseInt($(element2).outerWidth());
                        var bottom2 = top2 +  parseInt($(element2).outerHeight());
                        // cover cons
                        if(bottom + 10 > top2 && top<top2){
                            if(left<right2){
                                if(bottom2 + 10 < ContHeight){
                                    var addToTop = 0;
                                    while(bottom2 + addToTop < ContHeight && addToTop < 50 && (bottom + 10) > (top2 + addToTop)) {
                                        addToTop = addToTop + 10;
                                        $(element2).css('top', top2 + addToTop + 'px');
                                    }
                                }
                                else if(top - 10 > 10){
                                    var minusToTop = 10;
                                    while(top - minusToTop > 10 && minusToTop < 50) {
                                        $(element).css('top', top - minusToTop + 'px');
                                        minusToTop = minusToTop + 10;
                                    }
                                }
                                else {
                                    var fontsize1 = parseInt($(element).attr('data-fontSize')) - 2;
                                    var fontsize2 = parseInt($(element2).attr('data-fontSize')) - 2;
                                    $(element).css('font-size', fontsize1 + 'px');
                                    $(element2).css('font-size', fontsize2 + 'px');
                                }
                            }
                        }
                    }
                });
            });
        }
        function SetTextSettings(){
            //set text settings
            var elements = $('.bannercontainer .elements').children();
            elements.each(function (index, element) {
                if($(element).hasClass('text')){
                    var fontSize = $(element).attr('data-fontSize') + 'px';
                    $(element).css('font-size', fontSize);
                    var color = $(element).attr('data-color');
                    $(element).css('color', color);
                    if($('.bannercontainer').attr('data-radius')){
                        var radius = $('.bannercontainer').attr('data-radius') + 'px';
                        $(element).css('border-radius', radius);
                    }
                    if($('.bannercontainer').attr('data-backgroundtext') && $('.bannercontainer').attr('data-setbackgroundtext')=='on'){
                        var backgroundtext = $('.bannercontainer').attr('data-backgroundtext');
                        $(element).css('background', backgroundtext);
                    }
                    if( /\S/.test($(element).html())){
                        $(element).textfill({ minFontPixels: 10, maxFontPixels: $(element).attr('data-fontSize')});
                    }
                }
            });
        }
        function ResizeScreen(){
            //set position of element
            if(prevwidth && prevheight){
                var elements = $('.bannercontainer .elements').children();
                elements.each(function (index, element) {
                    var width;
                    var height;
                    var top;
                    var left;
                    top = parseInt($(element).attr('data-top'));
                    left = parseInt($(element).attr('data-left'));
                    width = parseInt($(element).attr('data-width'));
                    height = parseInt($(element).attr('data-height'));

                    if( width && top) {
                        var smwidth = prevwidth;
                        var prevleft = (100 * left)/smwidth;
                        var smwidthnew = parseInt($('.bannercontainer .elements').width());
                        var newleft = Math.round((prevleft*smwidthnew)/100);
                        var pertop = top * (100/prevheight);
                        var newtop = pertop * (parseInt($('.bannercontainer .elements').height())/100);
                        if(width + newleft > parseInt($('.bannercontainer .elements').width())){
                            var index = 0;
                            while(width + newleft > parseInt($('.bannercontainer .elements').width()) && index < 20){
                                if(width > parseInt($('.bannercontainer .elements').width()) - 100){
                                    newleft = newleft - 20;
                                }
                                else {
                                    newleft = newleft - 20;
                                }
                                index ++;
                            }
                        }

                        $(element).css('left', newleft  + 'px');
                        var prevwidthEl = (100*width)/smwidth;
                        var elwidth = Math.round((prevwidthEl*smwidthnew)/100);
                        
                        if((width<250 || $(element).hasClass('text1level')) && prevwidth>smwidthnew){
                            if($(element).hasClass('text1level') && width<350){
                                $(element).css('width', 'auto');
                            }
                            else {
                                $(element).css('width', elwidth + 'px');
                            }
                        }
                        else {
                            $(element).css('width', elwidth + 'px');
                            if($(element).hasClass('dragimage')){
                                var relative = Math.round((width/height)*100)/100;
                                var newHeight = Math.round(elwidth/relative);
                                $(element).css('height', newHeight  + 'px');
                            }
                        }
                        $(element).css('height', height + 'px');
                        var newheight = parseInt($(element).height());
                        if(newtop + newheight < $('.bannercontainer .elements').height()){
                            $(element).css('top', newtop  + 'px' );
                        }
                        else {
                            newtop = $('.bannercontainer .elements').height() - newheight;
                            $(element).css('top', newtop  + 'px' );
                        }
                        if( /\S/.test($(element).html())){
                            $(element).textfill({ minFontPixels: 10, maxFontPixels: $(element).attr('data-fontSize')});
                        }
                    }
                });
            }
        }
        function MobileSettings(){
            var elements = $('.bannercontainer .elements').children();
            if(elements.length>0){
                elements.sort(function(a, b){
                    return parseInt($(a).attr('data-top'))-parseInt($(b).attr('data-top'))
                });
                var images = new Array(0);
                $('.bannercontainer .elements').html(' ');
                elements.each(function (index, element) {
                    if(!$(element).hasClass('image')){
                        width = parseInt($(element).attr('data-width'));
                        height = parseInt($(element).attr('data-height'));
                        var fontSize = parseInt($(element).attr('data-fontSize'));
                        if(fontSize > 18) {
                            fontSize = '18px';
                        }
                        else {
                            fontSize = '14px';
                        }
                        $(element).css('font-size', fontSize);
                        var color = $(element).attr('data-color');
                        $(element).css('color', color);
                        if($('.bannercontainer').attr('data-radius')){
                            var radius = $('.bannercontainer').attr('data-radius') + 'px';
                            $(element).css('border-radius', radius);
                        }
                        if($('.bannercontainer').attr('data-backgroundtext') && $('.bannercontainer').attr('data-setbackgroundtext')=='on'){
                            var backgroundtext = $('.bannercontainer').attr('data-backgroundtext');
                            $(element).css('background', backgroundtext);
                        }
                        $(element).css('max-width', '100%');
                        $(element).css('width', width);
                        $(element).css('height', 'auto');
                        $(element).appendTo($('.bannercontainer .elements'));
                    }
                    else {
                        images.push(element);
                    }
                });
                // if(images.length>0){
                //     for (let i = 0; i < images.length; i++) {
                //         width = parseInt($(images[i]).attr('data-width'));
                //         height = parseInt($(images[i]).attr('data-height'));
                //         $(images[i]).css('max-height', height);
                //         $(images[i]).css('max-width', '100%');
                //         $(images[i]).css('width', width);
                //         $(images[i]).find('img').css('max-width', width);
                //         $(images[i]).find('img').css('max-height', height);
                //         $(images[i]).appendTo($('.bannercontainer .elements'));
                //     }
                // }
            }
        }

    });
});