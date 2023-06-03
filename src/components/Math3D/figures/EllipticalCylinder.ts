import { Figure, Point, Edge, Polygon } from '../entities';

export default class EllipticalCylinder extends Figure {
  constructor(count = 20, h = 15, a = 6, b = 10) {
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];
    let color: string[] | null = null;

    // точки
    const dt = 2 * Math.PI / count;
    for (let p = 0; p < h; p += 2) {
      for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
        for (let j = 0; j < 2 * Math.PI; j += dt) {
          points.push(new Point(
            a * Math.cos(i) * Math.cos(j),
            b * Math.sin(j),
            p
          ));
        }
      }
    }

    // ребра
    for (let i = 0; i < points.length; i++) {
      // вдоль
      if (i + 1 < points.length && (i + 1) % count !== 0) {
        edges.push(new Edge(
          i,
          i + 1
        ));
      } else if ((i + 1) % count === 0) {
        edges.push(new Edge(
          i,
          i + 1 - count
        ));
      }
      // поперек
      if (i < points.length - count) {
        edges.push(new Edge(
          i,
          i + count
        ));
      }
    }

    // полигоны
    for (let i = 0; i < points.length; i++) {
      if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
      } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]));
      }
    }

    // генерация цветов
    if (color === null) {
      color = [];
      let r: number;
      let g: number;
      let b: number;
      for (let i = 0; i <= points.length; i++) {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        color[i] = '#' + r.toString(16) + g.toString(16) + b.toString(16);
      }
    }

    super(points, edges, polygons, color);
  }
}