import * as w4 from "./wasm4";

const SPACE_BAR = memory.data<u8>([
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b11111111,
    0b01111110,
    0b00000000,
]);

function getCharFromXY(x:i32, y:i32): string {
    const baseChar = 65
    const charOffset = y * 9 + x 
    const charCode = baseChar + charOffset
    return String.fromCharCode(charCode)
}

function drawAlphabet(): void {
    for (let yi = 0; yi < 3; yi++) {
        for (let xi = 0; xi <9; xi++) {
            const asciiChar = getCharFromXY(xi, yi)
            const x_loc = 9 + xi*16 
            const y_loc = 25 + yi*16
            if (yi == 2 && xi == 8) {
                w4.blit(SPACE_BAR, x_loc, y_loc, 8, 8, w4.BLIT_1BPP)
            } else {
                w4.text(asciiChar, x_loc, y_loc)
            }
        }
    }
}


export function update (): void {
    store<u16>(w4.DRAW_COLORS, 2);
   
    const gamepad = load<u8>(w4.GAMEPAD1);
    if (gamepad & w4.BUTTON_1) {
        store<u16>(w4.DRAW_COLORS, 4);
    }

    drawAlphabet()

    w4.text("Press X to blink", 16, 90);
}
