$('button').on('click', function() {
    navigator.clipboard.writeText(
        $('a').prop('href')
    ); //this works across all instances :D

    alert('copied!');
});