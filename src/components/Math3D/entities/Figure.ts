import Point from './Point';

export default class Figure {
  points: Point[];
  edges: any[];
  polygons: any[];
  animations: any[];
  center: Point;
  joined: any[];

  constructor(
    points: Point[] = [],
    edges = [],
    polygons = [],
    animations = [],
    center = new Point(),
    joined = []
  ) {
    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
    this.animations = animations;
    this.center = center;
    this.joined = joined;
  }

  dropAnimation(): void {
    this.animations = [];
  }

  setAnimation(method: string, value: any, center?: Point): void {
    this.animations.push({[method]: value, center: center ? center : this.center});
  }
}

