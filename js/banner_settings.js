
jQuery(function ($) {
    $(document).ready(function () {
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
        if($('.bannercontainer').attr('data-fontFamily')){
            var fontFamily = 'font' + $('.bannercontainer').attr('data-fontFamily');
            $('.bannercontainer').addClass(fontFamily);
        }
        if($('.bannercontainer .elements').children().length>0){
            ResizeScreen();
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
                        var newheight = parseInt($(element).height());
                        if(newtop + newheight < $('.bannercontainer .elements').height()){
                            $(element).css('top', newtop  + 'px' );
                        }
                        else {
                            newtop = $('.bannercontainer .elements').height() - newheight;
                            $(element).css('top', newtop  + 'px' );
                        }
                    }
                });
            }
        }
        CheckTextCovering();
        function CheckTextCovering(){
            var elements = $('.bannercontainer .elements').find('.text');
            elements.each(function (index, element) {
                var top = parseInt($(element).position().top);
                var left = parseInt($(element).position().left);
                var right = left +  parseInt($(element).width());
                var bottom = top +  parseInt($(element).height());
                var elements2 = $('.bannercontainer .elements').find('.text');
                elements2.each(function (index, element2) {
                    var top2 = parseInt($(element).position().top);
                    var left2 = parseInt($(element).position().left);
                    var right2 = left +  parseInt($(element).width());
                    var bottom2 = top +  parseInt($(element).height());
                    if(right < left2){
                        // cover 
                        if(bottom>top2){
                            console.log("cover right bottom");
                        }
                    }
                    if(right < left2){
                    }
                });
                console.log(top);
                console.log(left);
                console.log(right);
                console.log(bottom);
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
                    if($('.bannercontainer').attr('data-backgroundtext')){
                        var backgroundtext = $('.bannercontainer').attr('data-backgroundtext');
                        $(element).css('background', backgroundtext);
                    }
                }
            });
        }
        ResizeScreen();
        SetTextSettings();
        $(window).resize(function() {
            ResizeScreen();
        });
    });
});