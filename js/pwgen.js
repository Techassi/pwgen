(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var PwGen = window.PwGen || {};

    PwGen = (function() {

        var instanceUid = 0;

        function PwGen(element, settings) {
            $(element).append("\
                <p>length:</p>\
                <input type='number' min='6' id='length' class='input' />\
                <p>include:</p>\
                <input type='text' id='include' class='input' />\
                <button id='genIt'>gen it!</button>\
                <p>password:</p>\
                <input type='text' id='pw' class='input' />\
                <span class='copy'>copy to clipboard</span>\
                <p class='tools'>debug:</p>\
                <div class='debug'>\
                    <input type='checkbox' name='debug' class='debug-checkbox' id='debug'>\
                    <label class='debug-label' for='debug'></label>\
                </div>\
            ");

            $('body').append("\
                <div class='hint'>\
                    <p></p>\
                </div>\
            ");

            initPwgen();
        }

        function initPwgen() {
            $('button').click(function(){
                // getting the desired length (if empty or smaller than 6 -> length = 6)
                var length = $('#length').val();
                ( length < 6 ) ? length = 6 : length = length;

                // get the desired include value (empty possible)
                var include = $('#include').val();

                // setting up all required variables
                // run varibale 'i' and varibale 'pw'
                var backup_include = include,
                    chooseInclude,
                    included,
                    chooseAlphabet,
                    size,
                    i = 0,
                    pw = "";

                // the alphabet to generate the pw
                var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "<", ">", "!", "?", "-", "_"];

                while(i < length) {

                    // you won't fool me hehe
                    if(include.length >= length) {
                        console.log('error');
                        pw = "error :(";
                        break;
                    }

                    if(( i + include.length ) < length) {
                        chooseInclude = Math.round(Math.random() * 3);
                        if(chooseInclude == 1) {
                            pw += include;
                            i = i + include.length;
                            include = "";
                            included = 1;
                        } else {
                            chooseAlphabet = Math.round(Math.random() * 66);
                            pw += alphabet[chooseAlphabet];
                            i++;
                            included = 0;
                        }

                        // gets executed if chooseInclude wasn't 1 until there isn't room left for the include string
                        if(included != 1 && ( i + include.length ) == length) {
                            pw += include;
                            i = i + include.length;
                            include = "";
                        }
                    } else {
                        chooseAlphabet = Math.round(Math.random() * 66);
                        pw += alphabet[chooseAlphabet];
                        i++;
                    }
                }

                size = 25 * (17/pw.length);
                (size > 25) ? size = 25 : size = size;

                // if debug mode is enabled through ui button
                if ($('.debug-checkbox').is(":checked")) {
                    var rusha = new Rusha();
                    var hexHash = rusha.digest(pw);
                    console.log("pwgen: \n- length: " + length + "\n- include: " + backup_include + "\n- pw: " + pw + "\n- sha1 hash: " + hexHash);
                }

                // output the generated pw
                $('#pw').val(pw).css("font-size", size);
            });

            var copyTextareaBtn = document.querySelector('.copy');

            copyTextareaBtn.addEventListener('click', function(event) {
                var copyTextarea = document.querySelector('#pw');
                copyTextarea.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    if ($('.debug-checkbox').is(":checked")) {
                        console.log('Copying text command was ' + msg);
                    }
                    $('.hint p').text("Copied!");
                    $('.hint').css("opacity", "1")
                      .delay(2000)
                      .queue(function (next) {
                        $(this).css({"opacity":"0" });
                        next();
                      });
                } catch (err) {
                    if ($('.debug-checkbox').is(":checked")) {
                        console.log('O.o unable to copy');
                    }
                    $('.hint p').text("Failed :(");
                    $('.hint').css("opacity", "1")
                      .delay(2000)
                      .queue(function (next) {
                        $(this).css({"opacity":"0" });
                        next();
                      });
                }
            });
        }

        return PwGen;

    }());

    $.fn.pwgen = function() {
        var _ = this,
            // opt = arguments[0],
            // args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i;
            // ret;
        _[0].pwgen = new PwGen(_[0], 'test');
        // for (i = 0; i < l; i++) {
        //     if (typeof opt == 'object' || typeof opt == 'undefined')
        //         _[i].pwgen = new PwGen(_[i], opt);
        //     else
        //         ret = _[i].pwgen[opt].apply(_[i].pwgen, args);
        //     if (typeof ret != 'undefined') return ret;
        // }
        return _;
    };
}));
