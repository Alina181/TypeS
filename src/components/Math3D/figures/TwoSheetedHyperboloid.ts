import { Figure, Point, Edge, Polygon } from '../entities';

export default class TwoSheetedHyperboloid extends Figure {
  constructor(count = 5, a = 7, b = 6, c = 5)  {
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];

    //точки
    const dt: number = Math.PI * 2 / count;
    for (let i: number = 0; i <= Math.PI; i += dt) {
      for (let j: number = 0; j < 2 * Math.PI; j += dt) {
        points.push(new Point(
          a * Math.sinh(i) * Math.cos(j),
          c * Math.cosh(i),
          b * Math.cosh(i) * Math.sin(j),
        ));
      }
    }
    for (let i: number = 0; i <= Math.PI; i += dt) {
      for (let j: number = 0; j < 2 * Math.PI; j += dt) {
        points.push(new Point(
          -a * Math.sinh(i) * Math.cos(j),
          -c * Math.cosh(i),
          -b * Math.cosh(i) * Math.sin(j),
        ));
      }
    }

    //ребра
    for (let i: number = 0; i < points.length; i++) {
      //вдоль
      if (i + 1 < points.length && (i + 1) % count !== 0) {
        edges.push(new Edge(
          i,
          i + 1,
        ));
      } else if (i + 1 >= count && (i + 1) % count === 0) {
        edges.push(new Edge(
          i,
          i + 1 - count,
        ));
      }
    }

    //полигоны
    for (let i: number = 0; i < points.length / 2 - count; i++) {
      if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
      } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
      }
    }
    for (let i: number = points.length / 2; i < points.length; i++) {
      if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
      } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
      }
    }
    super(points, edges, polygons);
  }
}