
jQuery(function ($) {
    $(document).ready(function () {

        // Restricts input for the set of matched elements to the given inputFilter function.
        $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                var max = 999999999;
                if($(this).parents('.col-phone').find('.code').val()){
                    if($(this).parents('.col-phone').find('.code').val().length < 4){
                       max = 9999999999;
                    }
                }
                if (inputFilter(this.value) && this.value < max ) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                    } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                    } else {
                    this.value = "";
                }
            });
        };
             

        $(".col-phone .phone").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9999999999);
        });


        //set new range value when change value
        $('.container').on('input', '.range input[type=range]', function(e){
            SetRangeValue(this, $(this).val());
        });

        //set range value on start
        // var ranges = $('.range .input-box input[type=range]');
        // if(ranges.length>0){
        //     ranges.each(function (index, range) {
        //         if(!$(range).attr('min')) {
        //             $(range).attr('min', 0);
        //         }
        //         if(!$(range).attr('max')) {
        //             $(range).attr('max', 10);
        //         }
        //         if($(range).val()){
        //             SetRangeValue(range, $(range).val());
        //         }
        //         else {
        //             SetRangeValue(range, 0);
        //         }
        //     });
        // }
        
        //set new range value
        function SetRangeValue(rangeinput, value){
            var value = $(rangeinput).val();
            var max = $(rangeinput).attr('max');
            var min = $(rangeinput).attr('min');
            var range = max - min;
            var relvalue = value - min;
            var percent = (100/range)*relvalue;
            var parents = $(rangeinput).parents('.range');
            var paddleft = (30*percent)/100;
            parents.find('.label').css('left', 'calc(' + percent + '% - ' + paddleft + 'px)');
            parents.find('.label .value').html(value);
            parents.find('.input-box .bar-filled').css('width', percent + '%');
            parents.find('.label').css('background-position', percent + '%');
        };

        //show hidden question
        $('.show-detail-answer input[type=radio]').change(function (e) {
            if($(this).val()<4){
                $('.show-detail-answer').next('.hidden-answer').find('.answer13').fadeIn(300);
                $('.show-detail-answer').next('.hidden-answer').find('.answer45').fadeOut(0);
            }
            else {
                $('.show-detail-answer').next('.hidden-answer').find('.answer45').fadeIn(300);
                $('.show-detail-answer').next('.hidden-answer').find('.answer13').fadeOut(0);
            }
        });


        //video play
        $('.video').parent().click(function () {
            if($(this).children(".video").get(0).paused){
                $(this).children(".video").get(0).play();
                $(this).children(".play").fadeOut();
            }else{
               $(this).children(".video").get(0).pause();
                $(this).children(".play").fadeIn();
            }
        });

        //modal
        $('.modal .close').click(function (e) {
            $('.modal').fadeOut(300);
        });
        $('.modal').click(function (e) {
            if (!$(event.target).closest('.modal-content').length && !$(event.target).is('.modal-content')) {
                $('.modal').fadeOut(300);
            }
        });

        $('.container').on('click', '.mediablock img', function(e){
            $(this).parents('.mediablock').find('.image').removeClass('active');
            $(this).parents('.mediablock').find('.image .imageclick').val(0);
            $(this).parents('.image').addClass('active');
            $(this).parents('.image').find('.imageclick').val(1);
        });

        //ranging
        //ranging up 
        $('.container').on('click', '.ranging-list .item-up', function(e){
            if($(this).parents('.rangint-item').prev().length>0){
                $(this).parents('.rangint-item').insertBefore($(this).parents('.rangint-item').prev());
            }
        });

        //ranging down 
        $('.container').on('click', '.ranging-list .item-down', function(e){
            if($(this).parents('.rangint-item').next().length>0){
                $(this).parents('.rangint-item').insertAfter($(this).parents('.rangint-item').next());
            }
        });

        //branching hidden question show
        $('.container').on('change', '.branching-wrapper input[type=radio]', function(e){
            var idQuestion = $(this).attr('id').split('-')[1];
            var idPoint = parseInt($(this).attr('id').split('-')[2]);
            if($(this).is(':checked')){
                $(this).parents('.question-wrapper').find('.hidden-question-group').fadeOut(300);
                $('#hiddenquestion_' + idQuestion + '_' + idPoint).fadeIn(300);
            }
        });

        
        //branching hidden question show
        $('.container').on('change', '.scalebranching input[type=radio]', function(e){
            var idvalue = parseInt($(this).val());
            $(this).parents('.scalebranching').find('.hidden-answer .answerscale').fadeOut(0);
            $(this).parents('.scalebranching').find('.hidden-answer .answerscale input[type=text]').val('');
            if($(this).is(':checked')){
                var Answers = $(this).parents('.scalebranching').find('.hidden-answer').children();
                Answers.each(function (index, answer) {
                    var ranges = $(answer).attr('data-range').split("-");
                    if (ranges.length>1){
                        var min = ranges[0];
                        var max = ranges[1];
                        if(idvalue >= min && idvalue <= max) {
                            $(answer).fadeIn(300);
                        }
                    }
                    else {
                        if(idvalue == ranges[0]) {
                            $(answer).fadeIn(300);
                        }
                    }
                });
            }
        });
        

        //dropdown show\hide
        $('.container').on('click', '.dropdown-list .question-name', function(e){
            if($(this).parents('.dropdown-block').hasClass('active')){
                $(this).parents('.dropdown-block').removeClass('active');
                $(this).parents('.dropdown-block').find('.dropdown-content').fadeOut(300);
            }
            else {
                $(this).parents('.dropdown-list').find('.dropdown-block').removeClass('active');
                $(this).parents('.dropdown-list').find('.dropdown-content').fadeOut(300);
                $(this).parents('.dropdown-block').addClass('active');
                $(this).parents('.dropdown-block').find('.dropdown-content').fadeIn(300);
            }
        });
        //ranging sortable
        $('.container .ranging-list').sortable({});

        //phone cpuntry code 
        $('.phone-wrapper input.code').intlTelInput({
            initialCountry: "ru",
        });

        $('.audiowave').each(function(){
            //Generate unic ud
            var path = $(this).attr('data-audiopath');//path for audio
            var id = '_' + Math.random().toString(36).substr(2, 9);
            //Set id to container
            $(this).attr('id', id);

            var thisAudioWave = this;
        
            //Initialize WaveSurfer
            var wavesurfer = WaveSurfer.create({
                container: '#' + id,
                scrollParent: true,
                backgroundColor: '#FFFFFF',
                height: 40,
                barMinHeight: 1,
                barWidth: 1.5,
                cursorWidth: 0,
                barGap: 2,
                waveColor: 'rgba(87, 34, 222, 0.2)',
                hideScrollbar: true,
                progressColor: "#5722DE"
            });
        
            //Load audio file
            wavesurfer.load(path);
        
            
            wavesurfer.on('finish', function () {
                $(thisAudioWave).parents('.audioblock').find('.audioheard').val(1);
                console.log('Audio finished');
            });

            //Add button event
            $(this).parents('.audioblock').find('.playaudio').click(function(){
                wavesurfer.playPause();
            });
        });
        
        //video play
        $('.container').on('click', '.videoblock', function(e){
            if($(this).children('video').get(0).paused){
                $(this).children('video').get(0).play();
                $(this).children('.play').fadeOut();
            }else{
                $(this).children('video').get(0).pause();
                $(this).children('.play').fadeIn();
            }
        });
        $('.container .videoblock video').on('ended', function(e){
            $(this).parents('.videoblock').find('.videoviewed').val(1);
            console.log("Video ended");
        });
        
        //date russian calendar
        $.datepicker.setDefaults(
            {
            closeText: 'Закрыть',
            prevText: '',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        });
        //set plugins for date
        $('.date-wrapper input').datepicker();
        //show calendar
        $('.container').on('click', '.date-wrapper .icon-date', function(e){
            $(this).parents('.date-wrapper').find('input').datepicker('show');
        });

        var TelCountries = $('.phone-wrapper .inputs .code');
        if(TelCountries.length>0){
            TelCountries.each(function (index, telcountry) {
                var idQuestion =  $(telcountry).attr('name').split('_')[1];
                if($(telcountry).val().split(',').length != 0 && !$(telcountry).val().includes('+')){
                    country =  $(telcountry).val().split(',');
                }
                else {
                    country = 'all';
                }
                if(country.includes('all')) {
                    $(telcountry).parents('.phone-wrapper').find('input.code').val('');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .selected-flag').css('pointer-events','all');
                    $(telcountry).parents('.phone-wrapper').find(' .intl-tel-input .country').css('display', 'block');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .selected-flag .flag').addClass('all-country');    
                }
                else if(country.length == 1) {
                    $(telcountry).parents('.phone-wrapper').find('input.code').val('');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .country').css('display', 'block');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .selected-flag').css('pointer-events','none');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .country[data-country-code="'+ country + '"]').click();
                }
                else {
                    $(telcountry).parents('.phone-wrapper').find('input.code').val('');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .selected-flag').css('pointer-events','all');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .selected-flag .flag').addClass('all-country');
                    $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .country').css('display', 'none');
                    for(const element of country){
                        $(telcountry).parents('.phone-wrapper').find('.intl-tel-input .country[data-country-code="'+ element + '"]').css('display', 'block');
                    }
                }
            });
        }
        customSelectActive();
        function customSelectActive(){
            $('.customselect').each(function(){
                if(!$(this).hasClass('select-hidden')){
                    if($(this).attr('multiple')){
                        $(this).parent().addClass('customselect-wrapper');
                        var $this = $(this),
                        numberOfOptions = $(this).children('option').length;
                        $this.addClass('select-hidden'); 
                        $this.wrap('<div class="select"></div>');
                        $this.after('<div class="select-styled"></div>');
                        var $styledSelect = $this.next('div.select-styled');
                        if($this.find('option:selected').length == 0){
                            $styledSelect.html('<div class="default">Выберите ответ</div>');
                        }
                    
                        var $list = $('<ul />', {
                            'class': 'select-options'
                        }).insertAfter($styledSelect);
                        for (var i = 0; i < numberOfOptions; i++) {
                            var lioption;
                            var id = Math.floor(Math.random() * 100000);
                            $this.children('option').eq(i).attr('data-id', id);
                            if($this.children('option').eq(i)[0].selected){
                                $styledSelect.append('<div class="selectvalue" data-value="' + $this.children('option').eq(i).text() + '" data-id="'+ id + '">' + $this.children('option').eq(i).text() + '</div>');
                                lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '"><div class="checked active"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                            }
                            else {
                                lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '" ><div class="checked"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                            }
                            $(lioption).appendTo($list);
                        }
                    
                        var $listItems = $list.children('li');
                    
                        $styledSelect.click(function(e) {
                            e.stopPropagation();
                            $('div.select-styled.active').not(this).each(function(){
                                $(this).removeClass('active').next('ul.select-options').hide();
                            });
                            $(this).toggleClass('active').next('ul.select-options').toggle();
                        });
                    
                        $listItems.click(function(e) {
                            e.stopPropagation();
                            if($(e.currentTarget).find('.checked').hasClass('active')) {
                                $(e.currentTarget).find('.checked').removeClass('active');
                                var id = $(e.currentTarget).attr('data-id');
                                $styledSelect.find('.selectvalue[data-id="' + id + '"]').remove();
                                if($styledSelect.find('.selectvalue').length == 0){
                                    $styledSelect.html('<div class="default">Выберите ответ</div>');
                                }
                                $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", false)
                            }
                            else {
                                $(e.currentTarget).find('.checked').addClass('active');
                                var id = $(e.currentTarget).attr('data-id');
                                if($styledSelect.find('.default').length > 0){
                                    $styledSelect.find('.default').remove();
                                }
                                $styledSelect.append('<div class="selectvalue" data-value="' + $(e.currentTarget).attr('rel') + '" data-id="'+ id + '">' + $(e.currentTarget).attr('rel') + '</div>');
                                $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", true)
                            }
                            $this.change();
                        });

                        $(document).mousedown(function(e) {
                            if($(e.target).parents('.customselect-wrapper').length == 0) {
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
                        });

                        $(document).click(function() {
                            $styledSelect.removeClass('active');
                            $list.hide();
                        });
                    }
                    else {
                        $(this).parent().addClass('customselect-wrapper');
                        var $this = $(this),
                        numberOfOptions = $(this).children('option').length;
                        $this.addClass('select-hidden'); 
                        $this.wrap('<div class="select"></div>');
                        $this.after('<div class="select-styled"></div>');
                        var $styledSelect = $this.next('div.select-styled');
                        if($this.find('option:selected').length>0){
                            $styledSelect.text($this.find('option:selected').text());
                        }
                        else {
                            $styledSelect.text('Выберите ответ');
                        }
                    
                        var $list = $('<ul />', {
                            'class': 'select-options'
                        }).insertAfter($styledSelect);
                    
                        for (var i = 0; i < numberOfOptions; i++) {
                            var id = Math.floor(Math.random() * 100000);
                            $this.children('option').eq(i).attr('data-id', id);
                            lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '">'+ $this.children('option').eq(i).text() + '</li>';
                            $(lioption).appendTo($list);
                        }
                    
                        var $listItems = $list.children('li');
                    
                        $styledSelect.click(function(e) {
                            e.stopPropagation();
                            $('div.select-styled.active').not(this).each(function(){
                                $(this).removeClass('active').next('ul.select-options').hide();
                            });
                            $(this).toggleClass('active').next('ul.select-options').toggle();
                        });
                    
                        $listItems.click(function(e) {
                            e.stopPropagation();
                            $styledSelect.text($(this).text()).removeClass('active');
                            $this.val($(this).attr('rel'));
                            $list.hide();
                            $this.change();
                        });
                        $(document).mousedown(function(e) {
                            if($(e.target).parents('.customselect-wrapper').length == 0) {
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
                        });
                        $(document).click(function() {
                            $styledSelect.removeClass('active');
                            $list.hide();
                        });
                    }
                }
            });   
        }
        //color set 
        if($('.fontpage').val()){
            //font
            $('body').addClass('font' + $('.fontpage').val());
        }
        if($('.positionpage').val()){
            //position
            $('.container').addClass('align' + $('.positionpage').val());
        }
        if($('.color1').val()){
            //color 1 level
            $('.container .question-wrapper .question').css('color', $('.color1').val());
            $('.container .question-wrapper .question-name').css('color', $('.color1').val());
        }

        if($('.color2').val()){
            //color 2 level
            $('.container .question-wrapper label').css('color', $('.color2').val());
            $('.container .question-wrapper p').css('color', $('.color2').val());
            $('.container .question-wrapper .description').css('color', $('.color2').val());
            $('.container .question-wrapper .text').css('color', $('.color2').val());
            $('.container .question-wrapper .matrix-table .value').css('color', $('.color2').val());
            $('.customselect-wrapper .select-styled').css('color', $('.color2').val());
        }

        if($('.pickcolor').val()){

            //color pick
            var style =  
            '<style title="colorpickselectstyle">'
            +'    .container input[type=checkbox]:checked + label::before,'
            +'    .container input[type=radio]:checked + label::before {'
            +'    background: ' + $('.pickcolor').val() + ';'
            +'    }'
            +'    .container input[type=checkbox] + label::before,'
            +'    .container input[type=radio] + label::before {'
            +'    border-color: ' + $('.pickcolor').val() + ';'
            +'    }'
            '</style>';
            $('head').append(style);
        }

        if($('.pickcolor').val()){
            //color input
            $('.container .question-wrapper input[type=text]').css('color', $('.pickcolor').val());
            $('.container .question-wrapper input[type=email]').css('color', $('.pickcolor').val());
            $('.container .question-wrapper input[type=tel]').css('color', $('.pickcolor').val());
            $('.container .question-wrapper textarea').css('color', $('.pickcolor').val());
        }
        if($('.backgroundquestion').val()){
            $('.container').addClass('bg-image');
            var value = $('.backgroundquestion').val();
            var opacity = $('.opacityquestion').val();
            var rgbaCol = 'rgba(' + parseInt(value.slice(-6, -4), 16) + ',' + parseInt(value.slice(-4, -2), 16) + ',' + parseInt(value.slice(-2), 16) + ',' + opacity + ')';
            $('.container .question-wrapper').css('background', rgbaCol);
        }
        else if($('.background').val()){
            $('.container').css('background', $('.background').val());
        }


        //validation
        var formValid = document.getElementsByClassName('form-valid')[0];
        $('.valid-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                var el = document.querySelectorAll('.form-valid [data-reqired]');
                var erroreArrayElemnts = [];

                var mediaValid = true;
                if($('.form-valid').find('.audioblock').length>0){
                    var audioBlocks = $('.form-valid ').find('.audioblock');
                    audioBlocks.each(function (index, audioblock) {
                        if($(audioblock).find('.audioheard').length>0){
                            if($(audioblock).find('.audioheard').val()!=1) {
                                $('.modal').find('.text').html("Прослушайте, пожалуйста, аудио.");
                                $('.modal').fadeIn(300);
                                mediaValid = false;
                                erroreArrayElemnts.push($(audioblock).find('.audioheard'));
                            }
                        }
                    });
                }

                if($('.form-valid').find('.videoblock').length>0){
                    var videoBlocks = $('.form-valid ').find('.videoblock');
                    videoBlocks.each(function (index, videoblock) {
                        if($(videoblock).find('.videoviewed').length>0){
                            if($(videoblock).find('.videoviewed').val()!=1) {
                                $('.modal').find('.text').html("Посмотрите, пожалуйста, видео.");
                                $('.modal').fadeIn(300);
                                mediaValid = false;
                                erroreArrayElemnts.push($(videoblock).find('.videoviewed'));
                            }
                        }
                    });
                }

                if($('.form-valid').find('.imageblock').length>0){
                    var imageBlocks = $('.form-valid ').find('.imageblock');
                    imageBlocks.each(function (index, imageblock) {
                        if($(imageblock).find('.image').length>0){
                            var imageclick = true;
                            var images = $(imageblock).find('.image');
                            images.each(function (index, image) {
                                if($(image).find('.imageclick').length>0){
                                    if($(image).find('.imageclick').val()==1) {
                                        console.log($(image).find('.imageclick').val());
                                        imageclick = false;
                                    }
                                }
                            });
                            console.log(imageclick);
                            if(imageclick) {
                                $('.modal').find('.text').html("Выберите, пожалуйста, картинку.");
                                $('.modal').fadeIn(300);
                                mediaValid = false;
                                erroreArrayElemnts.push($(imageblock));
                            }
                        }
                    });
                }

                if(mediaValid){
                    for (var i = 0; i < el.length; i++) {
                        if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                            erroreArrayElemnts.push(el[i]);
                            console.log($(el[i]).attr('type'));
                            if($(el[i]).attr('type')=='text'){
                                $(el[i]).addClass('borderred');
                            }
                            if($(el[i]).hasClass('phone')){
                                $(el[i]).parents('.col-phone').find('.lines').addClass('borderredphone');
                            }
                            if($(el[i]).hasClass('code')){
                                $('.modal').find('.text').html("Выберете, пожалуйста, код страны.");
                                $(el[i]).parents('.col-phone').find('.lines').addClass('borderredcode');
                            }
                            else {
                                $('.modal').find('.text').html("Введите, пожалуйста, ответ.");
                            }
                            $('.modal').fadeIn(300);
                            $(el[i]).parents('.question-wrapper').addClass('has-error');
                            $(el[i]).focus(function (e) {
                                $(e.target).parents('.question-wrapper').removeClass('has-error');
                                $(el[i]).removeClass('borderred');
                                $(el[i]).parents('.col-phone').find('.lines').removeClass('borderredcode');
                                $(el[i]).parents('.col-phone').find('.lines').removeClass('borderredphone');
                            });
                        }
                    }

                    var el = document.querySelectorAll('.form-valid input[type="radio"]');
                    for (var i = 0; i < el.length; i++) {
                        if (el[i].tagName === 'INPUT') {
                            var name = el[i].getAttribute('name');
                            if (document.querySelectorAll('[name=' + name + ']:checked').length === 0) {
                                erroreArrayElemnts.push(el[i]);
                                if($(el[i]).parents('.question-wrapper')){
                                    $(el[i]).parents('.question-wrapper').addClass('has-error');
                                }
                                $(el[i]).focus(function (e) {
                                    $(e.target).parents('.question-wrapper').removeClass('has-error');
                                });
                                $('.modal').find('.text').html("Выберете, пожалуйста, ответ.");
                                $('.modal').fadeIn(300);
                            }
                        }
                    }
                }
                if (erroreArrayElemnts.length == 0) {
                    formValid.submit();
                }
                if (erroreArrayElemnts.length > 0) {
                    console.log('Valid error');
                    $("html, body").animate({ scrollTop: $(erroreArrayElemnts[0]).offset().top }, 600);
                    return false;
                }
            });
        });
    });
});