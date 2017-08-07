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

        function PwGen(element, args) {
            // argument validation
            args = validateArgs(args);

            if(args.responsive)
                $(element).addClass('pwgen pwgen-responsive');
            else
                $(element).addClass('pwgen');

            if(args.length_field) {
                $(element).append("\
                    <p>length:</p>\
                    <input type='number' min='" + args.min_length + "' max='" + args.max_length + "' id='length' class='pwgen-input' />\
                ");
            }

            if(args.include_field) {
                $(element).append("\
                    <p>include:</p>\
                    <input type='text' id='include' class='pwgen-input' />\
                ");
            }

            $(element).append("\
                <button id='genIt' class='pwgen-button'>gen it!</button>\
                <p>password:</p>\
                <input type='text' id='pw' class='pwgen-input' />\
                <span class='pwgen-copy'>copy to clipboard</span>\
                <p class='tools'>debug:</p>\
                <div class='pwgen-debug'>\
                    <input type='checkbox' name='debug' class='debug-checkbox' id='debug'>\
                    <label class='debug-label' for='debug'></label>\
                </div>\
            ");

            $('body').append("\
                <div class='pwgen-hint'>\
                    <p></p>\
                </div>\
            ");

            initPwgen(args);
        }

        function initPwgen(args) {
            $('button').click(function(){

                // setting up all required variables
                // run varibale 'i' and varibale 'pw'
                var backup_include,
                    chooseInclude,
                    included,
                    chooseAlphabet,
                    size,
                    i = 0,
                    pw = "",
                    length,
                    include;

                // getting the desired length
                // if args.length_field is set -> getting length from input field
                // else choosing random number between args.max_length and args.min_length
                if(args.length_field) {
                    length = $('#length').val();
                    ( length < args.min_length ) ? length = args.min_length : length = length;
                    ( length > args.max_length ) ? length = args.max_length : length = length;
                } else {
                    length = Math.floor(Math.random() * (args.max_length - args.min_length + 1)) + args.min_length;
                }


                // get the desired include value (empty possible)
                if(args.include_field)
                    include = $('#include').val();
                else
                    include = '';

                backup_include = include;

                // if args.include_append is either right or left (other values are not supported and are discarded)
                if(args.include_append == 'right') {
                    include += args.include;
                } else if (args.include_append == 'left') {
                    include = args.include + include;
                }

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
                            chooseAlphabet = Math.round(Math.random() * alphabet.length);
                            pw += alphabet[chooseAlphabet];
                            i++;
                            included = 0;
                        }

                        // gets executed if chooseInclude wasn't '1' until there isn't room left for the include string
                        if(included != 1 && ( i + include.length ) == length) {
                            pw += include;
                            i = i + include.length;
                            include = "";
                        }
                    } else {
                        chooseAlphabet = Math.round(Math.random() * alphabet.length);
                        pw += alphabet[chooseAlphabet];
                        i++;
                    }
                }

                size = 25 * (17/pw.length);
                (size > 25) ? size = 25 : size = size;

                // if debug mode is enabled through ui button
                if ($('.debug-checkbox').is(":checked")) {
                    console.log("pwgen: \n- length: " + length + "\n- include: " + backup_include + "\n- pw: " + pw + "");
                }

                // output the generated pw
                $('#pw').val(pw).css("font-size", size);
            });

            var copyTextareaBtn = document.querySelector('.pwgen-copy');

            copyTextareaBtn.addEventListener('click', function(event) {
                var copyTextarea = document.querySelector('#pw');
                copyTextarea.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    if ($('.debug-checkbox').is(":checked")) {
                        console.log('Copying text command was ' + msg);
                    }
                    showHint('Copied!');
                } catch (err) {
                    if ($('.debug-checkbox').is(":checked")) {
                        console.log('Copying text command was ' + msg);
                    }
                    showHint('Failed :(');
                }
            });
        }

        // function used to validate arguments
        function validateArgs(args) {

            // basic validation / setting base values
            if(typeof args.responsive === 'undefined')
                args.responsive = false;

            if(typeof args.min_length === 'undefined')
                args.min_length = 6;

            if(typeof args.max_length === 'undefined')
                args.max_length = 12;

            if(typeof args.include === 'undefined')
                args.include = '';

            if(typeof args.include_append === 'undefined')
                args.include_append = 'right';

            if(typeof args.include_field === 'undefined')
                args.include_field = true;

            if(typeof args.length_field=== 'undefined')
                args.length_field = true;

            // further validation / type check
            if(typeof args.responsive !== 'boolean') {
                try {
                    throw new TypeError('args.responsive only supports type \'boolean\'');
                } catch (e) {
                    console.log('%c' + e.stack, 'color: #F44336');
                    args.responsive = true;
                }
            }

            if(typeof args.min_length !== 'number') {
                try {
                    throw new TypeError('args.min_length only supports type \'number\'');
                } catch (e) {
                    console.log('%c' + e.stack, 'color: #F44336');
                    args.min_length = 6;
                }
            }

            if(typeof args.max_length !== 'number') {
                try {
                    throw new TypeError('args.max_length only supports type \'number\'');
                } catch (e) {
                    console.log('%c' + e.stack, 'color: #F44336');
                    args.max_length = 12;
                }
            }

            if(typeof args.include_append !== 'string') {
                try {
                    throw new TypeError('args.include_append only supports type \'string\'');
                } catch (e) {
                    console.log('%c' + e.stack, 'color: #F44336');
                    args.include_append = 'right';
                }
            }

            if(typeof args.include !== 'string') {
                try {
                    throw new TypeError('args.include only supports type \'string\'');
                } catch (e) {
                    console.log('%c' + e.stack, 'color: #F44336');
                    args.include = '';
                }
            }

            if(typeof args.include_field !== 'boolean') {
                try {
                    throw new TypeError('args.include_field only supports type \'boolean\'');
                } catch (e) {
                    console.log('%c' + e.stack, 'color: #F44336');
                    args.include_field = false;
                }
            }

            if(typeof args.length_field !== 'boolean') {
                try {
                    throw new TypeError('args.length_field only supports type \'boolean\'');
                } catch (e) {
                    console.log('%c' + e.stack, 'color: #F44336');
                    args.length_field = false;
                }
            }

            return args;
        }

        function showHint(msg) {
            $('.pwgen-hint p').text(msg);
            $('.pwgen-hint').css({"opacity":"1", "z-index":"10"})
              .delay(2000)
              .queue(function (next) {
                $(this).css({"opacity":"0", "z-index":"-1"});
                next();
              });
        }

        return PwGen;

    }());

    $.fn.pwgen = function(args) {
        var _ = this,
            // opt = arguments[0],
            // args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i;
            // ret;
        _[0].pwgen = new PwGen(_[0], args);
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
