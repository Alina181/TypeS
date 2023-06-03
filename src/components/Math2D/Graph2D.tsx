import { useEffect, useState} from "react"; 
import Canvas from "../modules/Canvas"; 
import UI from "../modules/UI"; 
import "../../index.css"; 
interface Ifuncs  {
  f: Function;
  setDer: boolean;
  a: number;
  b: number;
  width: number;
  color: string;
}

const WIN: {LEFT: number, BOTTOM: number, WIDTH: number, HEIGHT: number} = {   
  LEFT: -10,   
  BOTTOM: -10,   
  WIDTH: 20,   
  HEIGHT: 20,   
};   

const Graph2D: React.FC = () => {   
  const [funcs, setFuncs] = useState<Ifuncs[]>([]);  
  let [canMove, setCanMove] = useState<boolean>(false);   
  let [derivativeX, setDerivativeX] = useState<number>(0);   
  let canvas: Canvas | null = null;   
  let ui: UI | null = null;  

  useEffect(() => { 
    canvas = new Canvas({ 
        WIN: WIN, 
        id: "canvas", 
        width: 600, 
        height: 600, 
        callbacks: { 
            wheel: (event) => wheel(event), 
            mouseMove: (event) => mouseMove(event), 
            mouseUp: () => mouseUp(), 
            mouseDown: () => mouseDown(), 
            mouseLeave: () => mouseLeave(), 
        }, 
    }) 

    ui = new UI({   
      callbacks: {   
          addFunction: (f: Function, num: number) => addFunction(f, num),   
          delFunction: (num: number) => delFunction(num),   
          setDerivative: (setDer: boolean, num: number) => setDerivative(setDer, num),   
          setA: (value: number, num: number) => setA(value, num),   
          setB: (value: number, num: number) => setB(value, num),   
          setWidth: (value: number, num: number) => setWidth(value, num),   
          setColor: (value: string, num: number) => setColor(value, num),   
      },   
    });   

    renderCanvas();   
  });

  function renderCanvas() {
    canvas?.clear();
    canvas?.renderGrid();
    funcs.forEach((func) => {
      if (func) {
        canvas?.renderFunction(func.f, func.color, func.width, WIN, func.setDer, derivativeX, func.a, func.b);
      }
    });
  }

  function addFunction(f: Function, num: number, a?: number, b?: number): void {   
    setFuncs((oldFuncs) => {
      const newFuncs = [...oldFuncs];
      newFuncs[num] = {   
          f,   
          setDer: false,   
          a: a ? a : 0,   
          b: b ? b : 0,   
          width: 3,   
          color: "#000",   
      }; 
      return newFuncs;
    });   
    renderCanvas();   
  }   
   
  function delFunction(num: number): void { 
    setFuncs((oldFuncs) => {
      const newFuncs = [...oldFuncs];
      newFuncs[num] = null;
      return newFuncs;
    });  
    renderCanvas();   
  }   
   
  function setDerivative(setDer: boolean, num: number): void {   
    setFuncs((oldFuncs) => {
      const newFuncs = [...oldFuncs];
      if (newFuncs[num]) {   
          newFuncs[num].setDer = setDer;   
      }
      return newFuncs;
    });   
    renderCanvas();   
  }   
   
  function setA(value: number, num: number): void {   
    setFuncs((oldFuncs) => {
      const newFuncs = [...oldFuncs];
      if (newFuncs[num]) {   
          newFuncs[num].a = value;   
      }
      return newFuncs;
    });   
    renderCanvas();   
  }   

  function setB(value: number, num: number): void {   
    setFuncs((oldFuncs) => {
      const newFuncs = [...oldFuncs];
      if (newFuncs[num]) {   
          newFuncs[num].b = value;   
      }
      return newFuncs;
    });   
    renderCanvas();   
  }
function setWidth(value: number, num: number): void {   
    setFuncs((oldFuncs) => {
      const newFuncs = [...oldFuncs];
      if (newFuncs[num]) {   
          newFuncs[num].width = value;   
      }
      return newFuncs;
    });   
    renderCanvas();   
  }   

  function setColor(value: string, num: number): void {   
    setFuncs((oldFuncs) => {
      const newFuncs = [...oldFuncs];
      if (newFuncs[num]) {   
          newFuncs[num].color = value;   
      }
      return newFuncs;
    });   
    renderCanvas();   
  }   
   
  //движения мышкой   
  function mouseMove(event: MouseEvent): void {   
    if (canMove) {   
        WIN.LEFT -= canvas?.sx(event.movementX) ?? 0;   
        WIN.BOTTOM += canvas?.sy(event.movementY) ?? 0;   
    }   
    setDerivativeX((oldValue) => (WIN.LEFT + canvas?.sx(event.offsetX)) ?? 0);   
    renderCanvas();   
  }   

  function mouseUp(): void {   
    setCanMove(false);   
  }   
   
  function mouseDown(): void {   
    setCanMove(true);   
  }   
   
  //зум   
   
  function wheel(event: WheelEvent): void {   
    let delta: number = event.wheelDelta > 0 ? -0.3 : +0.3;   
    if (WIN.BOTTOM + delta < -6) {   
        const newWIN = { 
          LEFT: WIN.LEFT + delta / 2, 
          BOTTOM: WIN.BOTTOM + delta / 2, 
          WIDTH: WIN.WIDTH - delta, 
          HEIGHT: WIN.HEIGHT - delta, 
        };
        WIN.LEFT = newWIN.LEFT;
        WIN.BOTTOM = newWIN.BOTTOM;
        WIN.WIDTH = newWIN.WIDTH;
        WIN.HEIGHT = newWIN.HEIGHT;
    }   
    renderCanvas();   
  }  

 
        const printOXY = () => { 
            const { LEFT, BOTTOM, HEIGHT, WIDTH } = WIN;  
            //разметка  
            for (let i = 0; i < LEFT + WIDTH; i += 1) { 
                canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, "#ddd"); 
                canvas.line(i, -0.1, i, 0.1, "black"); 
            } 
            for (let i = 0; i > LEFT; i -= 1) { 
                canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, "#ddd"); 
                canvas.line(i, -0.1, i, 0.1, "black"); 
            } 
            for (let i = 0; i < BOTTOM + HEIGHT; i += 1) { 
                canvas.line(LEFT, i, LEFT + WIDTH, i, "#ddd"); 
                canvas.line(-0.1, i, 0.1, i, "black"); 
            } 
            for (let i = 0; i > BOTTOM; i -= 1) { 
                canvas.line(LEFT, i, LEFT + WIDTH, i, "#ddd"); 
                canvas.line(-0.1, i, 0.1, i, "black"); 
            } 
            //стрелки 
            canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, 0.3, "black", 1); 
            canvas.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, -0.3, "black", 1); 
            canvas.line(0, BOTTOM + HEIGHT, 0.3, BOTTOM + HEIGHT - 0.7, "black", 1); 
            canvas.line(0, BOTTOM + HEIGHT, -0.3, BOTTOM + HEIGHT - 0.7, "black", 1); 
            // 0X 
            canvas.line(LEFT, 0, LEFT + WIDTH, 0, "black", 2); 
            // 0Y 
            canvas.line(0, BOTTOM, 0, BOTTOM + HEIGHT, "black", 2); 
            //точка 
            canvas.arc(0, 0, 3); 
            //текст 
            canvas.printText("0", 0.2, -0.8); 
            canvas.printText("1", 0.2, 0.8); 
            canvas.printText("-1", -0.9, -1.2); 
            canvas.printText("x", WIN.WIDTH + WIN.LEFT - 0.45, -0.8); 
            canvas.printText("y", 0.4, WIN.HEIGHT + WIN.BOTTOM - 0.5); 
             
        } 
         
        /* function renderCanvas() { 
            canvas.clear(); 
            printOXY(); 
            // рисование графиков 
            funcs.forEach((f) => { 
              if (!f) return; 
              const { a, b, f: func, width, color } = f; 
              canvas.lineGraph(func, { a, b }, { derivativeX }, width, color); 
            }); 
        } 
         
        return ( 
            <div> 
                <canvas id="canvas"></canvas> 
            </div> 
        ) */ 
         
        function printFunction(f: (x: number) => number, color: string, width: number): void {  
            let x: number = WIN.LEFT;  
            const dx: number = WIN.WIDTH / 1000;  
            while (x < WIN.WIDTH + WIN.LEFT) {  
                if (f(x) - f(x + dx) < WIN.HEIGHT && f(x + dx) - f(x) < WIN.HEIGHT) {  
                    canvas.line(x, f(x), x + dx, f(x + dx), color, width);  
                    //нули функции  
                    if (getZero(f, x, x + dx, 0.001) !== null) {  
                        canvas.arc(getZero(f, x, x + dx, 0.001), 0, 2, "red");  
                    }  
                }  
                x += dx;  
            }  
        }
        
    
        function printDerivative(f: (x: number) => number, x0: number): void {  
            const k: number = getDerivative(f, x0);  
            //пересечение касательной с функцией  
            canvas.arc(x0, f(x0), 2, "green");  
            //угол касательной к оси Ox  
            if (Math.atan(k) <= 0) {  
                canvas.line((k * x0 - f(x0)) / k, 0, 15, 0, Math.PI - Math.atan(k));  
            } else canvas.line((k * x0 - f(x0)) / k, 0, 15, 0, Math.PI * 2 - Math.atan(k));  
            const b: number = f(x0) - k * x0;  
            const x1: number = WIN.LEFT;  
            const x2: number = WIN.LEFT + WIN.WIDTH;  
            canvas.line(x1, k * x1 + b, x2, k * x2 + b, "blue", 1, true);  
        }  
         
        function printIntegral(f: (x: number) => number, a: number, b: number): void {  
            const dx: number = (b - a) / 100;  
            let x: number = a;  
            const points: { x: number, y: number }[] = [];  
            points.push({ x, y: 0 });  
            while (x <= b) {  
                points.push({ x, y: f(x) });  
                x += dx;  
            }  
            points.push({ x: b, y: 0 });  
            canvas.polygon(points);  
        }  
         
        //нули функций  
        function getZero(f: (x: number) => number, a: number, b: number, eps: number): number | null {  
            if (f(a) * f(b) > 0) {  
                return null;  
            }  
            if (Math.abs(f(a) - f(b)) <= eps) {  
                return (a + b) / 2;  
            }  
            const half: number = (a + b) / 2;  
            if (f(a) * f(half) <= 0) {  
                return getZero(f, a, half, eps);  
            }  
            if (f(b) * f(half) <= 0) {  
                return getZero(f, half, b, eps);  
            }  
        }  
         
        //производная  
        function getDerivative(f: (x: number) => number, x0: number, dx: number = 0.0001): number {  
            return (f(x0 + dx) - f(x0)) / dx;  
        }  
         
        //пересечения функций  
        function getCross(f: (x: number) => number, g: (x: number) => number, a: number, b: number, eps: number): number | null {  
            if ((f(a) - g(a)) * (f(b) - g(b)) > 0) {  
                return null;  
            }  
            if (Math.abs(f(a) - g(a)) <= eps) {  
                return (a + b) / 2;  
            }  
            const half: number = (a + b) / 2;  
            if ((f(a) - g(a)) * (f(half) - g(half)) <= 0) {  
                return getCross(f, g, a, half, eps);  
            }  
            if ((f(half) - g(half)) * (f(b) - g(b)) <= 0) {  
                return getCross(f, g, half, b, eps);  
            }  
        }  
         
        //интеграл  
        function getIntegral(f: (x: number) => number, a: number, b: number, n: number = 100): number {  
            const dx: number = (b - a) / n;  
            let x: number = a;  
            let s: number = 0;  
            while (x <= b) {  
                s += ((f(x) + f((x = dx))) / 2) * dx;  
            }  
            return s;  
        }  
         
        //вывод  
        function renderCanvas() {  
            canvas.clear();  
            printOXY();  
            for (let i = 0; i < funcs.length; i++) {  
                const func = funcs[i];  
         
                if (func) {  
                    printFunction(func.f, func.color, func.width);  
                    if (func.setDer) {  
                        printDerivative(func.f, derivativeX);  
                    }  
                    if (!isNaN(func.a) && !isNaN(func.b)) {  
                        printIntegral(func.f, func.a, func.b);  
                    }  
                }  
            }  
        }  
    return ( 
        
            <div>
              <canvas id="canvas"></canvas>
              {/* <div id="shadow"> */}
              <div id="window">
                <button id="addFunction" onClick={() => ui.addFunction()}>
                  Добавить
                </button>
                <a href="#" className="close">
                  Закрыть окно
                </a>
                <div id="func-list"></div>
                <div id="func-params"></div>
              </div>
            </div>
          );
        };
    
    export default Graph2D;








