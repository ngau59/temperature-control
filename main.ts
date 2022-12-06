function Hien_Thi_Đen () {
    basic.showLeds(`
        . . # # .
        # . # . .
        # # # # #
        . . # . #
        . # # . .
        `)
    basic.pause(100)
    basic.showLeds(`
        # # . . #
        . # . # #
        . . # . .
        . # . # .
        # # . # #
        `)
    basic.pause(100)
}
input.onButtonPressed(Button.A, function () {
    nhiet_đo_quy_đinh += 1
    tm1367()
})
function bat_quat () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
input.onButtonPressed(Button.B, function () {
    nhiet_đo_quy_đinh += -1
    tm1367()
})
function quat_quay () {
    if (chieu == "TquaP") {
        pins.servoWritePin(AnalogPin.P0, _do)
        _do = _do + 2
        if (_do > 150) {
            chieu = "PquaT"
        }
    }
    if (chieu == "PquaT") {
        pins.servoWritePin(AnalogPin.P0, _do)
        _do = _do - 2
        if (_do < 30) {
            chieu = "TquaT"
        }
    }
}
function tat_quat () {
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
function tm1367 () {
    tm.showNumber(input.temperature() * (100 + nhiet_đo_quy_đinh))
    tm.showDP(1, true)
}
let tm: TM1637.TM1637LEDs = null
let chieu = ""
let _do = 0
let nhiet_đo_quy_đinh = 0
nhiet_đo_quy_đinh = 35
_do = 30
pins.servoWritePin(AnalogPin.P0, _do)
chieu = "TquaP"
basic.showIcon(IconNames.Square)
tm = TM1637.create(
DigitalPin.P8,
DigitalPin.P2,
7,
4
)
tm1367()
basic.forever(function () {
    tm1367()
    if (input.temperature() > nhiet_đo_quy_đinh) {
        bat_quat()
    } else {
        tat_quat()
    }
})
basic.forever(function () {
    tm1367()
    if (input.temperature() > nhiet_đo_quy_đinh) {
    	
    } else {
        basic.showIcon(IconNames.Square)
        basic.showIcon(IconNames.SmallSquare)
        basic.showIcon(IconNames.SmallDiamond)
    }
})
