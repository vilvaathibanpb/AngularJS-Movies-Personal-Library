var form = $('form'),search = $('#search');

form.submit(function(e) {
    e.preventDefault();

    search.addClass('searching').val('');

    setTimeout(function() {
        search.removeClass('searching');
    }, 3600);
});