var charTypes = {
    'upper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'lower': 'abcdefghijklmnopqrstuvwxyz',
    'number': '0123456789',
    'special': '!$%^&*()-=+[]{};#:@~,./<>?'
};

window.onload = function () {
    var inputs = document.querySelectorAll('form div input[type=text]');
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var div = input.parentNode;
        //set initial value
        var type = div.id;
        input.value = charTypes[type];
        input.size = 40;
        //hook up reset handler
        var anchor = div.querySelector('a');
        anchor.onclick = function (input, type) {
            return function () {
                input.value = charTypes[type];
                return false;
            };
        }(input, type);
    }
}

function _generatePassword(passwordLength, charBlocks) {
    var allChars = "";
    for (var i = 0; i < charBlocks.length; i++) {
        allChars += charBlocks[i];
    }
    var numChars = allChars.length;
    var password = "";
    for (var i = 1; i <= passwordLength; i++) {
        password += allChars.charAt(Math.floor(Math.random() * numChars));
    }
    return password;
}

function generatePassword(passwordLength) {
    var output = document.getElementById("demo");
    var charBlocks = [];
    for (id in charTypes) {
        var isTicked = document.querySelector('div#' + id + ' input[type=checkbox]').checked;
        var value = document.querySelector('div#' + id + ' input[type=text]').value;
        if (isTicked) {
            charBlocks.push(value);
        }
    }

    var $length = document.getElementById('length');
    var passwordLength = parseInt($length.value)

    var password = _generatePassword(passwordLength, charBlocks);
    var $display = document.getElementById('display-password');
    $display.textContent = password;
    output.innerHTML = passwordLength;
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}