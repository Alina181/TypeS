import { Figure, Point, Edge, Polygon } from '../entities';

export default class Sphere extends Figure {
  constructor (R: number = 15, count: number = 80) {
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];
    let color: null | string = null;

    //точки
    const dt: number = Math.PI * 2 / count;
    for (let i = 0; i <= Math.PI; i += dt) {
      for (let j = 0; j < Math.PI * 2; j += dt) {
        points.push(new Point(
          R * Math.cos(j) * Math.sin(i),
          R * Math.cos(i),
          R * Math.sin(j) * Math.sin(i),
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