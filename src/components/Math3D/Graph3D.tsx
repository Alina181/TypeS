import { useEffect } from "react";
import Math3D, { Point, Light, Figure } from ".";
import Canvas from "../modules/Canvas";
import ".././../index.css";
import Cone from "./figures/Cone";
import Cube from "./figures/Cube";
import TwoSheetedHyperboloid from "./figures/TwoSheetedHyperboloid";
import OneSheetedHyperboloid from "./figures/OneSheetedHyperboloid";
import Ellipsiloid from "./figures/Ellipsoid";
import Sphere from "./figures/Sphere";
import Cylinder from "./figures/Cylinder";
import ParabolicCylinder from "./figures/ParabolicCylinder";
import HyperbolicCylinder from "./figures/HyperbolicCylinder";
import HyperbolicParaboloid from "./figures/HyperbolicParaboloid";
import EllipticalParaboloid from "./figures/EllipticalParaboloid";
import EllipticalCylinder from "./figures/EllipticalCylinder";
import Tor from "./figures/Tor";

interface WindowProps {
    LEFT: number;
    BOTTOM: number;
    WIDTH: number;
    HEIGHT: number;
    CAMERA: Point;
    DISPLAY: Point;
}

window.requestAnimFrame = (() => {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

function Math3DComponent() {
    let canvas: Canvas | null = null;
    const WIN: WindowProps = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        CAMERA: new Point(0, 0, -50),
        DISPLAY: new Point(0, 0, -30),
    };

    //флажки
    let canMove = false;
    let drawPoints = false;
    let drawEdges = false;
    let drawPolygons = true;
    let animation = false;
    let dark = false;
    let light = false;

    //источник света
    let LIGHT = new Light(-40, -2, 0, 25000);
    let figures: Figure[] = [new Cone()];
    let R = 20;
    let count = 3;
    let dt = (Math.PI * 2) / count;
    let t = 0;
    let k = 0;
    let dx = 0;
    let dy = 0;

    const math3D = new Math3D({ WIN: WIN });

    useEffect(() => {
        canvas = new Canvas({
            WIN: WIN,
            id: "canvas3D",
            callbacks: {
                wheel: (event: WheelEvent) => wheel(event),
                mouseMove: (event: MouseEvent) => mouseMove(event),
                mouseUp: () => mouseUp(),
                mouseDown: () => mouseDown(),
            },
        });

        let FPS = 0;
        var outFPS = 0;
        let lastTimestamp = Date.now();

        const animLoop = () => {
            //calc fps
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                outFPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            //print scene
            window.requestAnimationFrame(animLoop);
            goAnimation();
            renderScene(outFPS);
        };

        let request = window.requestAnimFrame(animLoop);
        return () => {
            window.cancelAnimationFrame(request);
        };
    }, [canvas]);

    /* _addEventListeners() { 
     document.addEventListener('keydown', (event) => this.keyDownHandler(event)); 
     document.getElementById('figures').addEventListener('change', () => { 
       let value = document.getElementById('figures').value;
this.changeFigures(value); 
     }); 
     const powerLight = document.getElementById('powerlight'); 
     powerLight.addEventListener('click', () => { 
       this.LIGHT.lumen = powerLight.value - 0; 
     }); 
     document.getElementById('color').addEventListener('change', () => { 
       const color = document.getElementById('color').value; 
       for (let i = 0; i < this.figures.length; i++) { 
         this.figures[i].polygons.forEach((poly) => { 
           poly.color = poly.hexToRgb(color); 
         }); 
       } 
     }); 
     document.getElementById('delete').addEventListener('click', () => this.figures.pop()); 
     document*/

    const wheel = (event: WheelEvent) => {
        event.preventDefault();
        if (event.deltaY < 0) math3D.zoomIn();
        else if (event.deltaY > 0) math3D.zoomOut();
        if (animation) {
            light = true;
            dark = false;
            animation = false;
            setTimeout(() => {
                light = false;
                dark = true;
                goAnimation();
                animation = true;
            }, 4000);
        }
    };

    const mouseMove = (event: MouseEvent) => {
        if (!canMove) return;
        dx = event.movementX * 4;
        dy = event.movementY * 4;
    };

    const mouseUp = () => {
        canMove = false;
    };

    const mouseDown = () => {
        canMove = true;
    };

    const goAnimation = () => {
        if (!animation) return;
        let x = R * Math.sin(t);
        let y = R * Math.cos(t) + 1;
        let z = 0;
        figures[k].moveTo(5, new Point(x, y, z));
        t += dt;
        if (t > Math.PI * 2) {
            t -= Math.PI * 2;
            k++;
            if (k >= figures.length) k = 0;
        }
        if (light) LIGHT.x += 1;
        if (dark) LIGHT.x -= 1;
    };

    const renderScene = (fps: number) => {
        canvas.clear();

        if (drawPolygons) {
            figures.forEach((figure) => {
                figure.polygons.forEach((polygon) => {
                    if (math3D.calcNormal(polygon.points) < 0) return;
                    const points = polygon.points.map((point) => {
                        return math3D.calcCorner(point);
                    });

                    let lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                    let r = Math.round(polygon.color.r * lumen);
                    let g = Math.round(polygon.color.g * lumen);
                    let b = Math.round(polygon.color.b * lumen);

                    canvas.polygon(points, polygon.rgbToHex(r, g, b));
                });
            });
        }
        //print edges
        if (drawEdges) {
            figures.forEach((figure) => {
                figure.edges.forEach((edge) => {
                    const point1 = figure.points[edge.p1];
                    const point2 = figure.points[edge.p2];
                    canvas.line(math3D.xs(point1), math3D.ys(point1), math3D.xs(point2), math3D.ys(point2));
                });
            });
        }

        //print points
        if (drawPoints) {
            figures.forEach((figure) => {
                figure.points.forEach((point) => {
                    canvas.arc(math3D.xs(point), math3D.ys(point));
                });
            });
        }

        //вывод FPS
        canvas.printText(FPS: ${fps}, -9.6, 9, "#50fc01");
    };

    const changeFigures = (value: string) => {
        switch (value) {
            case "Cube":
figures = [new Cube()];
                break;
            case "Cone":
                figures = [new Cone()];
                break;
            case "Tor":
                figures = [new Tor()];
                break;
            case "Cylinder":
                figures = [new Cylinder()];
                break;
            case "Sphere":
                figures = [new Sphere()];
                break;
            case "Ellipsoid":
                figures = [new Ellipsiloid()];
                break;
            case "OneSheetedHyperboloid":
                figures = [new OneSheetedHyperboloid()];
                break;
            case "TwoSheetedHyperboloid":
                figures = [new TwoSheetedHyperboloid()];
                break;
            case "HyperbolicParaboloid":
                figures = [new HyperbolicParaboloid()];
                break;
            case "EllipticalParaboloid":
                figures = [new EllipticalParaboloid()];
                break;
            case "EllipticalCylinder":
                figures = [new EllipticalCylinder()];
                break;
            case "HyperbolicCylinder":
                figures = [new HyperbolicCylinder()];
                break;
            case "ParabolicCylinder":
                figures = [new ParabolicCylinder()];
                break;
            default:
                figures = [];
                break;
        }
    };

    return (
        <>
            <canvas id="canvas3D" className="canvas3D"></canvas>
            <div>
                <select id="figures" className="figures" onChange={(event) => changeFigures(event.target.value)}>
                    <option value="nothing">Фигуры</option>
                    <option value="Cube">Куб</option>
                    <option value="Cone">Конус</option>
                    <option value="Tor">Тор</option>
                    <option value="Cylinder">Цилиндр</option>
                    <option value="Sphere">Сфера</option>
                    <option value="Ellipsoid">Эллипсоид</option>
                    <option value="OneSheetedHyperboloid">Однополостный гиперболоид</option>
                    <option value="TwoSheetedHyperboloid">Двухполостный гиперболоид</option>
                    <option value="HyperbolicParaboloid">Гиперболический параболоид</option>
                    <option value="ParabolicCylinder">Параболический цилиндр</option>

                    </select>
                <div>
                    <button id="delete" className="del">
                        удалить
                    </button>
                </div>
                <div>
                    <input className="powerlight" type="range" min="25000" max="50000" value="powerlight" id="powerlight" />
                </div>
                <div>
                    <input type="color" id="color" placeholder="color" className="color" />
                </div>
            </div>
        </>
    );
}