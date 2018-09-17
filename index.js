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


function startGame() {
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
    let key = event.keyCode - 48;
    if (key < 2 || key > 9) return;
    if (!started) return;
    if (guessed) return;

    guessed = true;

    if (key === boo_num) {
        started = false;
        $("#prompt").html("Score: " + Math.round(score) + "<br><br>Click anywhere to start!").show();
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
        number --;
    } else {
        $("#prompt").hide();
    }

    number ++;

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

$(function() {
    fizz = $(".fizz");
    buzz = $(".buzz");
    boo = $(".boo");
    num = $("#number");

    setTimeout(gameTick, 0);

    $(document).click(startGame);
    $(document).keydown(keyDown);
});
