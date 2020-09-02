
jQuery(function ($) {
    $(document).ready(function () {
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
    });
});