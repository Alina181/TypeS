interface WindowValues {
  LEFT: number;
  BOTTOM: number;
  WIDTH: number;
  HEIGHT: number;
}

interface Callbacks {
  wheel: EventListener;
  mouseUp: EventListener;
  mouseDown: EventListener;
  mouseMove: EventListener;
  mouseLeave: EventListener;
}

export default class Canvas {
  private WIN: WindowValues;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor({ id, width = 500, height = 500, WIN, callbacks = {} }: {id: string, width?: number, height?: number, WIN: WindowValues, callbacks?: Callbacks}) {
      this.WIN = WIN;
      this.canvas = document.getElementById(id) as HTMLCanvasElement;
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

      const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
      this.canvas.addEventListener('wheel', wheel);
      this.canvas.addEventListener('mousedown', mouseDown);
      this.canvas.addEventListener('mouseup', mouseUp);
      this.canvas.addEventListener('mousemove', mouseMove);
      this.canvas.addEventListener('mouseleave', mouseLeave);
  }

  xs(x: number): number {
      return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
  }

  ys(y: number): number {
      return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT);
  }

  sx(x: number): number {
      return this.WIN.WIDTH * x / this.canvas.width;
  }

  sy(y: number): number {
      return this.WIN.HEIGHT * y / this.canvas.height;
  }

  x(xs: number): number {
      return (xs * this.WIN.WIDTH) / this.canvas.width + this.WIN.LEFT;
  }

  y(ys: number): number {
      return (-ys * this.WIN.HEIGHT) / this.canvas.height + this.WIN.BOTTOM + this.WIN.HEIGHT;
  }

  clear(): void {
      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  line(x1: number, y1: number, x2: number, y2: number, color: string, width = 1, isDash?: boolean): void {
      this.context.beginPath();
      this.context.strokeStyle = color || '#960000';
      this.context.lineWidth = width;
      if (isDash) {
          this.context.setLineDash([7, 5]);
      } else {
          this.context.setLineDash([]);
      }
      this.context.moveTo(this.xs(x1), this.ys(y1));
      this.context.lineTo(this.xs(x2), this.ys(y2));
      this.context.stroke();
  }

  arc(x1: number, y1: number, r = 2, color = 'black'): void {
      this.context.beginPath();
      this.context.strokeStyle = color;
      this.context.fillStyle = color;
      this.context.arc(this.xs(x1), this.ys(y1), r, 0, Math.PI * 2, true);
      this.context.stroke();
      this.context.fill();
  }

  printText(str: string, x: number, y: number, colorfill: string): void {
      this.context.font = "25px serif";
      this.context.fillStyle = colorfill;
      this.context.fillText(str, this.xs(x), this.ys(y));
  }

  point(x: number, y: number, color = 'red', size = 4): void {
      this.context.beginPath(); 
      this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI); 
      this.context.fillStyle = color; 
      this.context.fill(); 
      this.context.closePath(); 
  }

  polygon(points: {x: number, y: number}[], color: string): void {
      if (points.length >= 3) {
          this.context.fillStyle = color;
          this.context.beginPath();
this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
          for (let i = 1; i < points.length; i++) {
              this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
          }
          this.context.lineWidth = 4;
          this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
          this.context.closePath();
          this.context.fill();
      }
  }
  
  render(): void {  
    this.context.drawImage(this.canvasVirtual, 0, 0);  
}
}
