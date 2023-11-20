/**
 * Get complementary additive color
 * @param {string} hexColor hexadecimal string representing a color
 * @returns {string} hexadecimal string representing the complementary additive color
 */
export function getComplementaryAdditiveColor(hexColor) {
  const colorInt = parseInt(hexColor.substr(1), 16);
  const compColorInt = ~colorInt;
  const compColorHex = (compColorInt & 0xFFFFFF).toString(16).padStart(6, "0");

  return `#${compColorHex}`;
}

/**
 * Get complementary subtractive color
 * @param {string} hexColor hexadecimal string representing a color
 * @returns {string} hexadecimal string representing the complementary subtractive color
 */
export function getComplementarySubtractiveColor(hexColor) {
  // Convertimos a RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  const ryb = rgbToRYB(r, g, b);

  // Calculamos el complementario sustractivo desde el objeto ryb
  const compRYB = { r: 255 - ryb.r, y: 255 - ryb.y, b: 255 - ryb.b };

  // Convertimos de nuevo a RGB
  let compRGB = rybToRGB(compRYB.r, compRYB.y, compRYB.b);

  compRGB = {
    r: Math.round(compRGB.r),
    g: Math.round(compRGB.g),
    b: Math.round(compRGB.b),
  };

  return `#${(compRGB.r & 0xFF).toString(16).padStart(2, "0")}${(compRGB.g & 0xFF).toString(16).padStart(2, "0")}${(compRGB.b & 0xFF).toString(16).padStart(2, "0")}`;
}

/**
 * Converts a RGB color to RYB color.
 * @param {number} r The red component.
 * @param {number} g The green component.
 * @param {number} b The blue component.
 * @returns {{r: number, y: number, b: number}}
 * @abstract http://nishitalab.org/user/UEI/publication/Sugita_IWAIT2015.pdf
 */
function rgbToRYB(r, g, b) {
  const Iw = Math.min(r, g, b);
  const Ib = Math.min(255 - r, 255 - g, 255 - b);
  const rRGB = r - Iw;
  const gRGB = g - Iw;
  const bRGB = b - Iw;
  const minRG = Math.min(rRGB, gRGB);
  const rRYB = rRGB - minRG;
  const yRYB = (gRGB + minRG) / 2;
  const bRYB = (bRGB + gRGB - minRG) / 2;
  const n = Math.max(rRYB, yRYB, bRYB) / Math.max(rRGB, gRGB, bRGB);
  const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;
  return {
    r: rRYB / N + Ib,
    y: yRYB / N + Ib,
    b: bRYB / N + Ib
  };
}

/**
 * Converts a RYB color to RGB
 * @param {number} r The red component
 * @param {number} y The yellow component
 * @param {number} b The blue component
 * @returns {{r: number, g: number, b: number}}
 * @abstract http://nishitalab.org/user/UEI/publication/Sugita_IWAIT2015.pdf
 */
function rybToRGB(r, y, b) {
  const Iw = Math.min(r, y, b);
  const Ib = Math.min(255 - r, 255 - y, 255 - b);
  const rRYB = r - Iw;
  const yRYB = y - Iw;
  const bRYB = b - Iw;
  const minYB = Math.min(yRYB, bRYB);
  const rRGB = rRYB + yRYB - minYB;
  const gRGB = yRYB + minYB;
  const bRGB = 2 * (bRYB - minYB);
  const n = Math.max(rRGB, gRGB, bRGB) / Math.max(rRYB, yRYB, bRYB);
  const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;

  return {
    r: rRGB / N + Ib,
    g: gRGB / N + Ib,
    b: bRGB / N + Ib
  };
}
