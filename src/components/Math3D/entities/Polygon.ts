import Point from './Point';

class Polygon {
  points: Point[];
  color: {r: number, g: number, b: number};
  distance: number;
  lumen: number;
  visibility: boolean;
  center: Point;

  constructor(points: Point[] = [], color = '#0000fa') {
    this.points = points;
    this.color = this.hexToRgb(color);
    this.distance = 0;
    this.lumen = 1;
    this.visibility = true;
    this.center = new Point();
  }

  hexToRgb(hex: string): {r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : {
      r: 0,
      g: 0,
      b: 0,
    };
  }

  rgbToHex(r: number, g: number, b: number): string {
    return `rgb(${r},${g},${b})`;
  }
}
export default Polygon;
