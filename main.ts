input.onButtonPressed(Button.A, function () {
    if (start == 1) {
        SHIP.move(-1)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (start == 1) {
        shoot = game.createSprite(SHIP.get(LedSpriteProperty.X), SHIP.get(LedSpriteProperty.Y))
        shoot.change(LedSpriteProperty.Brightness, 80)
        music.playTone(175, music.beat(BeatFraction.Sixteenth))
        for (let index = 0; index < 4; index++) {
            shoot.change(LedSpriteProperty.Y, -1)
            if (shoot.isTouching(ENEMY) || shoot.get(LedSpriteProperty.Y) <= ENEMY.get(LedSpriteProperty.Y) && shoot.get(LedSpriteProperty.X) == ENEMY.get(LedSpriteProperty.X)) {
                shoot.delete()
                ENEMY.delete()
                ENEMY.set(LedSpriteProperty.X, 5)
                game.addScore(1)
                music.playMelody("F G F - - - - - ", 500)
                if (game.score() % 4 == 0) {
                    speed += -20
                }
            }
            basic.pause(150)
        }
        if (shoot.get(LedSpriteProperty.Y) <= 0) {
            shoot.delete()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (start == 1) {
        SHIP.move(1)
    }
})
let enemPos = 0
let ENEMY: game.LedSprite = null
let shoot: game.LedSprite = null
let SHIP: game.LedSprite = null
let start = 0
start = 0
basic.showIcon(IconNames.Ghost)
soundExpression.twinkle.playUntilDone()
basic.clearScreen()
SHIP = game.createSprite(2, 4)
shoot = game.createSprite(2, 3)
game.setScore(0)
let prev_enemPos = 5
let damage = 0
let speed = 520
start = 1
shoot.delete()
basic.forever(function () {
    enemPos = randint(0, 4)
    if (enemPos == prev_enemPos) {
        if (enemPos == 4) {
            enemPos += -1
        } else if (enemPos == 0) {
            enemPos += 1
        } else if (Math.randomBoolean()) {
            enemPos += 1
        } else {
            enemPos += -1
        }
    }
    prev_enemPos = enemPos
    ENEMY = game.createSprite(enemPos, 0)
    ENEMY.set(LedSpriteProperty.Brightness, 150)
    basic.pause(100)
    ENEMY.turn(Direction.Right, 90)
    for (let index = 0; index < 4; index++) {
        ENEMY.move(1)
        basic.pause(speed)
        if (ENEMY.isTouching(SHIP)) {
            shoot.delete()
            SHIP.delete()
            music.playMelody("G F C C C - - - ", 350)
            basic.pause(1000)
            game.gameOver()
        }
    }
    if (ENEMY.isTouchingEdge()) {
        ENEMY.delete()
        damage += 1
        music.playMelody("C D C - - - - - ", 550)
    }
    if (damage == 5) {
        shoot.delete()
        SHIP.delete()
        music.playMelody("G F C C C - - - ", 350)
        basic.pause(1000)
        game.gameOver()
    }
})
