export const RGBToHex = (r: number, g: number, b: number, hash: "#" | "" = "") =>
  hash + ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

export const HexToRGB = (hex: string) => {
    const [r, g, b] = hex
        .replace(/#/, "")
        .match(/.{1,2}/g)!
        .map((x) => parseInt(x, 16));
    return { r, g, b };
    };