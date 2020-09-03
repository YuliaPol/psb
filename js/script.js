
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
                        $(el[i]).addClass('has-error');
                        $(el[i]).focus(function (e) {
                            $(e.target).removeClass('has-error');
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