import '../../index.css';
import Point from './entities/Point';

export default class Math3D {
  private WIN: any;

  constructor({ WIN }: { WIN: any }) {
    this.WIN = WIN;
  }

  public xs(point: Point): number {
    return (point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z)) / (this.WIN.CAMERA.z - point.z);
  }

  public ys(point: Point): number {
    return (point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z)) / (this.WIN.CAMERA.z - point.z);
  }

  //зум 
  public zoom(delta: number): number[][] {
    return [
      [delta, 0, 0, 0],
      [0, delta, 0, 0],
      [0, 0, delta, 0],
      [0, 0, 0, 1]
    ];
  }

  //перенос 
  public move(dx: number, dy: number, dz: number): number[][] {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [dx, dy, dz, 1]
    ];
  }

  /**************вращения**************/
  public rotateOx(alpha: number): number[][] {
    return [
      [1, 0, 0, 0],
      [0, Math.cos(alpha), Math.sin(alpha), 0],
      [0, -Math.sin(alpha), Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
  }

  public rotateOy(alpha: number): number[][] {
    return [
      [Math.cos(alpha), 0, -Math.sin(alpha), 0],
      [0, 1, 0, 0],
      [Math.sin(alpha), 0, Math.cos(alpha), 0],
      [0, 0, 0, 1]
    ];
  }

  public rotateOz(alpha: number): number[][] {
    return [
      [Math.cos(alpha), Math.sin(alpha), 0, 0],
      [-Math.sin(alpha), Math.cos(alpha), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }

  /************************************/

  /*************анимация солнечной системы*************/
  // animateMatrix(dx, dy, dz, method, value) { 
    //     return [ 
    //         this.move(dx, dy, dz), 
    //         thismethod, 
    //         this.move(-dx, -dy, -dz) 
    //     ].reduce( 
    //         (S, matrix) => this.multMatrixes(S, matrix), 
    //         this.one() 
    //     ); 
    // }

  public one(): number[][] {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }

  /****************************************************/
/*********************тени*********************/
    //вычисляет центр полигона 
    calcCenters(figure: Figure): void { 
        figure.polygons.forEach((polygon: Polygon) => { 
            const points = polygon.points; 
            let x = 0, y = 0, z = 0; 
            for (let j = 0; j < points.length; j++) { 
                x += figure.points[points[j]].x; 
                y += figure.points[points[j]].y; 
                z += figure.points[points[j]].z; 
            }; 
            polygon.center.x = x / points.length; 
            polygon.center.y = y / points.length; 
            polygon.center.z = z / points.length; 
        }); 
    } 
    
    calcShadow(polygon: Polygon, figures: Figure[], LIGHT: Point3D): { isShadow: boolean, dark: number } { 
        const M1 = polygon.center; 
        const s = this.calcVector(M1, LIGHT); 
        for (let i = 0; i < figures.length; i++) { 
            for (let j = 0; j < figures[i].polygons.length; j++) { 
                const poly = figures[i].polygons[j]; 
                const M0 = poly.center; 
                if (M1.x === M0.x && 
                    M1.y === M0.y && 
                    M1.z === M0.z 
                ) { 
                    continue; 
                } 
                if (poly.lumen > polygon.lumen) { 
                    continue; 
                } 
                const dark = this.calcVectorModule(this.vectorProd(this.calcVector(M0, M1), s)) / this.calcVectorModule(s); 
                if (dark < 0.1) { 
                    return { 
                        isShadow: true, 
                        dark: dark / 10 
                    }; 
                } 
            } 
        } 
        return { 
            isShadow: false, 
            dark: 0.1 
        }; 
    } 
    
    //вычисляет вектор 
    calcVector(a: Point3D, b: Point3D): Point3D { 
        return { 
            x: b.x - a.x, 
            y: b.y - a.y, 
            z: b.z - a.z 
        }; 
    } 

    //вычисляет векторное произведение 
    vectorProd(a: Point3D, b: Point3D): Point3D { 
        return { 
            x: a.y * b.z - a.z * b.y, 
            y: a.z * b.x - a.x * b.z, 
            z: a.x * b.y - a.y * b.x 
        }; 
    } 

    //вычисляет модуль 
    calcVectorModule(a: Point3D): number { 
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)); 
    } 

    /**********************************************/

    //подсветка и тени 
    calcIllumination(distance: number, lumen: number): number { 
        const res = distance ? lumen / Math.pow(distance, 3) : 1; 
        return res > 1 ? 1 : res; 
    } 

    /**************отсечение невидимых граней**************/ 
    //скалярное произведение векторов 
    scalProd(a: Point3D, b: Point3D): number { 
        return a.x * b.x + a.y * b.y + a.z * b.z; 
    }  
/**************вычисление вектора**************/ 
calcVector(a: Point3D, b: Point3D): Point3D { 
    return { 
        x: b.x - a.x, 
        y: b.y - a.y, 
        z: b.z - a.z 
    }; 
} 

//векторное произведение 
vectorProd(a: Point3D, b: Point3D): Point3D { 
    return { 
        x: a.y * b.z - a.z * b.y, 
        y: -a.x * b.z + a.z * b.x, 
        z: a.x * b.y - a.y * b.x 
    }; 
} 

/**********************************************/ 

//проверка на нулевой вектор 
isVectorZero(vector: Point3D): boolean { 
    return !vector.x && !vector.y && !vector.z; 
} 

//угол между 2 векторами 
calcCorner(a: Point3D, b: Point3D): number { 
    return this.scalProd(a, b) / 
        (Math.sqrt(this.calcVectorModule(a)) * (Math.sqrt(this.calcVectorModule(b)))); 
} 

//отсечение невидимых граней 
calcVisibility(figure: Figure, camera: Point3D): void { 
    const vec = this.calcVector(camera, new Point3D(0, 0, 0)); 
    figure.polygons.forEach((polygon: Polygon) => { 
        const points = polygon.points; 
        let vector1 = this.calcVector( 
            figure.points[points[0]], 
            figure.points[points[1]] 
        ); 
        if (this.isVectorZero(vector1)) { 
            vector1 = this.calcVector( 
                figure.points[points[3]], 
                figure.points[points[2]] 
            ); 
        } 
        let vector2 = this.calcVector( 
            figure.points[points[0]], 
            figure.points[points[2]] 
        ); 
        if (this.isVectorZero(vector2)) { 
            vector2 = this.calcVector( 
                figure.points[points[3]], 
                figure.points[points[2]] 
            ); 
        } 
        const vector = this.vectorProd(vector1, vector2); 
        const c = this.calcCorner(vec, vector); 
        polygon.visibility = c > Math.cos(Math.PI / 2.4); 
    }); 
} 


/******************************************************/ 
} 
/* render() { 
return ( 
  <div> 
    <h1>График3D</h1> 
  </div> 
) 
} 
}*/ 
//export default Math3D;    