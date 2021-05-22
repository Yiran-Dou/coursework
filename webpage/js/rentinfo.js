$('#rentMoreInfo_p').click( function() {

    loadPopupBoxInforent();

    $('#rentInfoPopupBoxClose').click( function() {
        unloadPopupBoxInforent();
    });

    function unloadPopupBoxInforent() {
        $('#rentInfoPopup').css({
            'display': 'none'
        });
        $('#blur_out').css({
            'display': 'none'
        });
    }

    function loadPopupBoxInforent() {
        $('#rentInfoPopup').css({
            'display': 'inline-block'
        });
        $('#blur_out').css({
            'display': 'inline-block'
        })
    }
});
