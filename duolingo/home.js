
$(document).ready(function () {
    tryAnagram();
    $('.input-box').keyup(tryAnagram);
    $('#case-sensitive').change(tryAnagram);
});

function anagrams(a, b) {
    if (a.length != b.length) return false;

    var caseSensitive = $('#case-sensitive').is(':checked');

    for (var i=0; i<a.length; i++) {
        var charA = a.charAt(i);
        var charB = b.charAt(b.length-i-1);
        if (!caseSensitive) {
            charA = charA.toLowerCase();
            charB = charB.toLowerCase();
        }
        if (charA != charB) {
            return false;
        }
    }

    return true;
}

function tryAnagram() {
    var textA = $('#input-a').val();
    var textB = $('#input-b').val();

    var response = $('.response-area');

    var anim_duration = 100;
    var anim_easing = 'easeOutCubic'

    if (textA.length == textB.length && textA.length == 0) {
        response.text('Type in the above boxes.');
        response.switchClass('anagram-bad', 'anagram-good', anim_duration, anim_easing);
        return;
    }

    if (anagrams(textA, textB)) {
        response.text('Yep! These words are anagrams.');
        response.switchClass('anagram-bad', 'anagram-good', anim_duration, anim_easing);
    } else {
        $('.response-area').text('Nope. Not anagrams.');
        response.switchClass('anagram-good', 'anagram-bad', anim_duration, anim_easing);
    }
}
