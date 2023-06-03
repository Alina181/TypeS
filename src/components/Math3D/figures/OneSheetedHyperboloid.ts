import { Figure, Point, Edge, Polygon } from '../entities';

export default class OneSheetedHyperboloid extends Figure {
  constructor (count: number = 2, a: number = 7, b: number = 6, c: number = 5)  {
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];

    //точки
    const dt: number = Math.PI * 2 / count;
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
      for (let j = 0; j < 2 * Math.PI; j += dt) {
        points.push(new Point(
          a * Math.cosh(i) * Math.cos(j),
          c * Math.sinh(i),
          b * Math.cosh(i) * Math.sin(j)
        ));

      }
    }
    //ребра
    for (let i = 0; i < points.length; i++) {
      //вдоль
      if (i + 1 < points.length && (i + 1) % count !== 0) {
        edges.push(new Edge(
          i,
          i + 1
        ));
      } else if (i + 1 >= count && (i + 1) % count === 0) {
        edges.push(new Edge(
          i,
          i + 1 - count
        ));
      }
    }

    //полигоны
    for (let i = 0; i < points.length; i++) {
      if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
      } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count])) 
      }
    }
    super(points, edges, polygons);
  }
}