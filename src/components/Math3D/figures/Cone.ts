import { Figure, Point, Edge, Polygon } from '../entities';  
 
export default class Cone extends Figure {  
    constructor(count: number = 10, a: number = 4, b: number = 4, c: number = 4) {  
        const points: Point[] = [];  
        const edges: Edge[] = [];  
        const polygons: Polygon[] = [];  
 
        // точки 
        // боковины 
        const dt = 2 * Math.PI / count;  
        for (let i = 0; i <= count; i++) {  
            const angle = i * dt;
            points.push(new Point(a * Math.cos(angle), 0, b * Math.sin(angle)));
        }

        // основание 
        points.push(new Point(0, -c/2, 0));
        points.push(new Point(0, c/2, 0));
 
        // ребра  
        for (let i = 0; i < points.length - 2; i++) {
            edges.push(new Edge(i, i+1));
            edges.push(new Edge(points.length-2, i));
            edges.push(new Edge(points.length-1, i+1));
        }

        edges.push(new Edge(0, points.length-2));
        edges.push(new Edge(points.length-3, points.length-1));

        // полигоны  
        for (let i = 0; i < count; i++) {
            polygons.push(new Polygon([i, (i+1)%(count), points.length-2]));
            polygons.push(new Polygon([i, (i+1)%(count), points.length-1]));
        } 
         
        super(points, edges, polygons);  
    }   
}