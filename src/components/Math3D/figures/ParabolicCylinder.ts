import { Figure, Point, Edge, Polygon } from '../entities';

export default class ParabolicCylinder extends Figure {
  constructor (count: number = 10, a: number = 5, b: number = 2) {
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];

    //точки
    const dt: number = 2 * Math.PI / count;
    for (let i = -Math.PI; i <= Math.PI; i += dt) {
      for (let j = -Math.PI; j < Math.PI; j += dt) {
        points.push(new Point(
          b * Math.sinh(i),
          a * Math.cosh(i),
          j * 2
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
      } else if ((i + 1) % count === 0) {
        edges.push(new Edge(
          i,
          i + 1 - count
        ));
      }
      //поперек
      if (i < points.length - count) {
        edges.push(new Edge(
          i,
          i + count
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