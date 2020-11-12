
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
        if($('.hellopage').attr('data-width')){
            prevwidth = $('.hellopage').attr('data-width');
        }
        if($('.hellopage').attr('data-height')){
            prevheight = $('.hellopage').attr('data-height');
        }
        if($('.hellopage').attr('data-shadowtext')){
            var shadowText = $('.hellopage').attr('data-shadowtext');
            if(shadowText == 'on'){
                $('.hellopage').addClass('addshadowtext');
            }
        }
        if($('.hellopage').attr('data-position')){
            var positionClass = 'align' + $('.hellopage').attr('data-position');
            $('.hellopage').addClass(positionClass);
        }
        if($('.hellopage').attr('data-fontFamily')){
            var fontFamily = 'font' + $('.hellopage').attr('data-fontFamily');
            $('.hellopage').addClass(fontFamily);
        }
        if(windowWidth > 992){
            if($('.hellopage .elements').children().length>0){
                SetTextSettings();
                CheckTextCovering();
                SetBtnSettings();
                ResizeScreen();
            }
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
               SetBtnSettings();
            }
        });
        function CheckTextCovering(){
            var ContHeight = parseInt($('.hellopage .elements').height());
            var ContWidth = parseInt($('.hellopage .elements').width());
            var elements = $('.hellopage .elements').find('.text');
            elements.each(function (index, element) {
                var top = parseInt($(element).position().top);
                var left = parseInt($(element).position().left);
                var right = left +  parseInt($(element).outerWidth());
                var bottom = top +  parseInt($(element).outerHeight());
                var elements2 = $('.hellopage .elements').find('.text');
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
            var elements = $('.hellopage .elements').children();
            elements.each(function (index, element) {
                if($(element).hasClass('text')){
                    var fontSize = $(element).attr('data-fontSize') + 'px';
                    $(element).css('font-size', fontSize);
                    var color = $(element).attr('data-color');
                    $(element).css('color', color);
                    if($('.hellopage').attr('data-radius')){
                        var radius = $('.hellopage').attr('data-radius') + 'px';
                        $(element).css('border-radius', radius);
                    }
                    if($('.hellopage').attr('data-backgroundtext') && $('.hellopage').attr('data-setbackgroundtext')=='on'){
                        var backgroundtext = $('.hellopage').attr('data-backgroundtext');
                        $(element).css('background', backgroundtext);
                    }
                }
            });
        }
        function SetBtnSettings(){
            //set text settings
            var elements = $('.hellopage .elements').children();
            elements.each(function (index, element) {
                if($(element).hasClass('btn-el')){
                    var position = $(element).attr('data-position');
                    var btnwidth = $(element).attr('data-btnwidth');
                    var btnheight = $(element).attr('data-btnheight');
                    var btnradius = $(element).attr('data-btnradius');
                    var btncolor = $(element).attr('data-btncolor');
                    var btntextcolor = $(element).attr('data-btntextcolor');
                    if(position){
                        $(element).find('.btn-cont').css('text-align', position);
                    }
                    if(btnwidth){
                        $(element).find('.btn').css('width', btnwidth);
                    }
                    if(btnheight){
                        $(element).find('.btn').css('height', btnheight);
                    }
                    if(btnradius){
                        $(element).find('.btn').css('border-radius', btnradius + 'px');
                    }
                    if(btncolor){
                        $(element).find('.btn').css('background', btncolor);
                    }
                    if(btntextcolor){
                        $(element).find('.btn').css('color', btntextcolor);
                    }
                }
            });
        }
        function ResizeScreen(){
            //set position of element
            if(prevwidth && prevheight){
                var elements = $('.hellopage .elements').children();
                elements.each(function (index, element) {
                    var width;
                    var height;
                    var top;
                    var left;
                    top = parseInt($(element).attr('data-top')) + 50;
                    left = parseInt($(element).attr('data-left'));
                    width = parseInt($(element).attr('data-width'));
                    height = parseInt($(element).attr('data-height'));

                    if( width && top) {
                        var smwidth = prevwidth;
                        var prevleft = (100 * left)/smwidth;
                        var smwidthnew = parseInt($('.hellopage .elements').outerWidth());
                        var newleft = Math.round((prevleft*smwidthnew)/100);
                        var pertop = top * (100/prevheight);
                        var newtop = pertop * (parseInt($('.hellopage .elements').outerHeight())/100);
                        if(width + newleft > parseInt($('.hellopage .elements').width())){
                            var index = 0;
                            while(width + newleft + 20 > parseInt($('.hellopage .elements').outerWidth()) && index < 20){
                                if(width > parseInt($('.hellopage .elements').outerWidth()) - 100){
                                    newleft = newleft - 20;
                                }
                                else {
                                    newleft = newleft - 20;
                                }
                                index ++;
                            }
                            if(width + newleft > parseInt($('.hellopage .elements').outerWidth()) ){
                                newleft = parseInt($('.hellopage .elements').outerWidth()) - 20 - width;
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
                        if(newtop + newheight < $('.hellopage .elements').height()){
                            $(element).css('top', newtop  + 'px' );
                        }
                        else {
                            newtop = $('.hellopage .elements').height() - newheight;
                            $(element).css('top', newtop  + 'px' );
                        }
                        if($(element).hasClass('btn-el')){
                            $(element).css('height', height + 'px');
                            $(element).css('width', elwidth + 'px');
                        }
                        if($(element).hasClass('text') &&  /\S/.test($(element).html())){
                            $(element).textfill({ minFontPixels: 10, maxFontPixels: $(element).attr('data-fontSize')});
                        }
                    }
                });
            }
        }
        function MobileSettings(){
            var elements = $('.hellopage .elements').children();
            if(elements.length>0){
                elements.sort(function(a, b){
                    return parseInt($(a).attr('data-top'))-parseInt($(b).attr('data-top'))
                });
                var images = new Array(0);
                $('.hellopage .elements').html(' ');
                elements.each(function (index, element) {
                    if(!$(element).hasClass('image')){
                        if($(element).hasClass('text')){
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
                            if($('.hellopage').attr('data-radius')){
                                var radius = $('.hellopage').attr('data-radius') + 'px';
                                $(element).css('border-radius', radius);
                            }
                            if($('.hellopage').attr('data-backgroundtext') && $('.hellopage').attr('data-setbackgroundtext')=='on'){
                                var backgroundtext = $('.hellopage').attr('data-backgroundtext');
                                $(element).css('background', backgroundtext);
                            }
                            $(element).css('max-width', '100%');
                            $(element).css('width', width);
                            $(element).css('height', 'auto');
                            $(element).appendTo($('.hellopage .elements'));
                        }
                        else {
                            var position = $(element).attr('data-position');
                            var btnwidth = $(element).attr('data-btnwidth');
                            var btnheight = $(element).attr('data-btnheight');
                            var btnradius = $(element).attr('data-btnradius');
                            var btncolor = $(element).attr('data-btncolor');
                            var btntextcolor = $(element).attr('data-btntextcolor');
                            if(position){
                                $(element).find('.btn-cont').css('text-align', position);
                            }
                            if(btnwidth){
                                $(element).find('.btn').css('width', btnwidth);
                            }
                            if(btnheight){
                                $(element).find('.btn').css('height', btnheight);
                            }
                            if(btnradius){
                                $(element).find('.btn').css('border-radius', btnradius + 'px');
                            }
                            if(btncolor){
                                $(element).find('.btn').css('background', btncolor);
                            }
                            if(btntextcolor){
                                $(element).find('.btn').css('color', btntextcolor);
                            }
                            $(element).appendTo($('.hellopage .elements'));
                        }

                    }
                    else {
                        images.push(element);
                    }
                });
                if(images.length>0){
                    for (let i = 0; i < images.length; i++) {
                        width = parseInt($(images[i]).attr('data-width'));
                        height = parseInt($(images[i]).attr('data-height'));
                        $(images[i]).css('max-height', height);
                        $(images[i]).css('max-width', '100%');
                        $(images[i]).css('width', width);
                        $(images[i]).find('img').css('max-width', width);
                        $(images[i]).find('img').css('max-height', height);
                        $(images[i]).appendTo($('.hellopage .elements'));
                    }
                }
            }
        }
    });
});