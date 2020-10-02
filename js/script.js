
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

        //validation
        var formValid = document.getElementsByClassName('form-valid')[0];
        $('.valid-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                var el = document.querySelectorAll('.form-valid [data-reqired]');
                var erroreArrayElemnts = [];
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