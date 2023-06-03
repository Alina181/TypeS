import ICalculator from "../ICalculatror";
import { Matrix, Complex, Vector, Polynomial } from "../entitites";
import AnyType from "../entitites/AnyType";
import ComplexCalculator from "./ComplexCalculator";

export default class MatrixCalculator implements ICalculator<Matrix> {
    calc: ICalculator<AnyType>;

    constructor(calc: ICalculator<AnyType> = new ComplexCalculator()) {
        this.calc = calc;
    }

    add(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => this.calc.add(elem, b.values[i][j]))));
    }

    sub(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => this.calc.sub(elem, b.values[i][j]))));
    }

    mult(a: Matrix, b: Matrix): Matrix {
        let values: Complex[][] = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let s: Complex = new Complex(0, 0);
                for (let k = 0; k < a.values[i].length; k++) {
                    s = this.calc.add(s, this.calc.mult(a.values[i][k], b.values[k][j]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }

    prod(p: number, a: Matrix): Matrix {
        return new Matrix(a.values.map((arr) => arr.map((elem) => this.calc.mult(elem, p))));
    }

    pow(a: Matrix, p: number): Matrix {
        let c = this.one(a.values.length);
        for (let i = 0; i < p; i++) {
            c = this.mult(c, a);
        }

        return c;
    }

    one(length: number): Matrix {
        const values: Complex[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.calc.one() : this.calc.zero();
            }
        }
        return new Matrix(values);
    }

    zero(length: number): Matrix {
        const values: Complex[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero();
            }
        }
        return new Matrix(values);
    }
}
