let active = 3;
let started = false;
let fizz, buzz, boo, num;

let boo_num = 4;
let number = 0;
let score = 1000;
let speed = 1;
let animation_speed = 150;
let countdown = 10;
let guessed = false;

let startup = true;
let s_block = 0;
let s_char = 0;

let TEXT = [
    [1, '[BOOT] '], [2, 'Starting drivers'], [50, '...'], [0, '<br>'],
    [1, '[BOOT] '], [2, 'Loading display'], [50, '...'], [0, '<br>'],
    [1, '[BOOT] '], [2, 'Loading userspace'], [50, '...'], [0, '<br>'],
    [1, '[User] '], [2, 'Start interface'], [0, '<br><br>'],

    [1, 'Build Operating System: Unknown'], [0, '<br>'],
    [1, 'Current Operating System: Unknown'], [0, '<br>'],
    [1, 'Boot Start Time: ' + (new Date())], [0, '<br>'],
    [1, 'Boot Host: ' + navigator.appName + ', ' + navigator.appCodeName + ', ' + navigator.platform], [0, '<br>'],
    [1, 'System renderer: ' + navigator.product], [0, '<br>'],
    [1, 'User Agent: ' + navigator.userAgent], [0, '<br>'],

    [250, ' '], [0, '<br>'],
    [0, 'Boot ready'],
];


function doStartup() {
    if (s_block >= TEXT.length) {
        $("#startup").css({color: '#ddd', backgroundColor: '#ddd', height: 1, top: '50vh'});

        setTimeout(function() {
            $("#startup").css({width: 0, left: '50vw'});

            setTimeout(function() {
                $("#game").fadeIn(1000);
                startup = false;
                return setTimeout(gameTick, 0);
            }, 100);
        }, 150);
    }
    let block = TEXT[s_block];

    let txt = $("#text");
    if (!block[0]) {
        txt.html(txt.html() + block[1]);
        s_block++;
        s_char = 0;

        setTimeout(doStartup, 100);
    } else {
        txt.html(txt.html() + block[1][s_char++]);

        if (s_char >= block[1].length) {
            s_block++;
            s_char = 0;
        }

        setTimeout(doStartup, block[0]);
    }
}

function startGame() {
    if (startup) return;

    if (started) return;
    started = true;
    number = Math.round(Math.random() * 25 + 5);
    boo_num = Math.round(Math.random() * 8 + 1);
    $("#prompt").hide();

    score = 1000;
    countdown = 10;
    speed = 1;
    guessed = false;

    $("#nums *").removeClass("right").removeClass("wrong");
}


function keyDown(event) {
    if (startup) return;

    let key = event.keyCode - 48;
    if (!started) return startGame();
    if (key < 1 || key > 9) return;
    if (guessed) return;

    guessed = true;

    if (key === boo_num) {
        started = false;
        $("#prompt").html("Score: " + Math.round(score) + "<br><br>Press any key to start!").show();
        $("#" + key).addClass("right");
        $("#score").html(Math.round(score));
    } else {
        $("#" + key).addClass("wrong");
        score -= 150;
    }
}


function gameTick() {
    if (!started) {
        // Casino animation
        switch (active) {
            case 0:
                active = 1;
                fizz.removeClass("active");
                buzz.addClass("active");
                break;
            case 1:
                active = 2;
                buzz.removeClass("active");
                boo.addClass("active");
                break;
            case 2:
                active = 3;
                boo.removeClass("active");
                num.text(Math.round(Math.random() * 25 + 2));
                num.show();
                //buzz.addClass("active");
                break;
            case 3:
                active = 0;
                num.hide();
                //buzz.removeClass("active");
                fizz.addClass("active");
                break;
        }

        setTimeout(gameTick, animation_speed);
        return
    }

    if (--countdown === 0) {
        speed += 1 / (speed * 5);
        countdown = 10;
        $("#prompt").text("Speed up").show();
        number--;
    } else {
        $("#prompt").hide();
    }

    number++;

    if (number % 3 === 0) fizz.addClass("active");
    else fizz.removeClass("active");

    if (number % 5 === 0) buzz.addClass("active");
    else buzz.removeClass("active");

    if (number % boo_num === 0) boo.addClass("active");
    else boo.removeClass("active");

    if (number % 3 !== 0 && number % 5 !== 0 && number % boo_num !== 0) {
        num.text(number);
        num.show();
    } else num.hide();

    $("#speed").html("&times;" + Math.round(speed * 100) / 100);
    $("#score").html(Math.round(score));

    score -= 5 * speed;
    guessed = false;
    setTimeout(gameTick, 1000 / speed);
}

$(function () {
    fizz = $(".fizz");
    buzz = $(".buzz");
    boo = $(".boo");
    num = $("#number");

    doStartup();
    //setTimeout(gameTick, 0);

    // $(document).click(startGame);
    $(document).keydown(keyDown);
});
