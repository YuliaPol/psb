
jQuery(function ($) {
    $(document).ready(function () {

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

        if($('.background').val()){
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
                            $('.modal').fadeIn(300);
                            $('.modal').find('.text').html("Введите, пожалуйста, ответ.");
                            $(el[i]).parents('.question-wrapper').addClass('has-error');
                            $(el[i]).focus(function (e) {
                                $(e.target).parents('.question-wrapper').removeClass('has-error');
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