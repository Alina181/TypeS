import { Complex, Vector, Matrix, Polynomial } from "./entitites";
import { ComplexCalculator, VectorCalculator, MatrixCalculator } from "./calculators";
import PolynomialCalculator from "./PolynomialCalculator";
import ICalculator from "./ICalculatror";
import AnyType from "./entitites/AnyType";

export enum EOperand {
    add = "add",
    sub = "sub",
    mult = "mult",
    div = "div",
    prod = "prod",
    pow = "pow",
    one = "one",
    zero = "zero",
}

export default class UniversalCalculator implements ICalculator<AnyType> {
    complex(re?: number, im?: number): AnyType {
        return new Complex(re, im);
    }
    vector(values?: AnyType[]): Vector {
        return new Vector(values);
    }
    matrix(values?: AnyType[][]): Matrix {
        return new Matrix(values);
    }

    getComplex(str: string): AnyType {
        const arr = str.split("i");
        if (arr.length === 2) {
            const ch = arr[0].substring(arr[0].length - 1);
            arr[0] = arr[0].slice(0, -1);
            arr[1] = arr[1] ? arr[1] : "1";

            if (ch === "-") {
                arr[1] = ch + arr[1];
            }
            if (arr[0]) {
                return new Complex(Number(arr[0]), Number(arr[1]));
            }
            return new Complex(0, Number(arr[1]));
        }
        return new Complex(Number(str));
    }

    getVector(str: string): AnyType {
        const arr = str.slice(1, str.length - 1).split(",");
        return new Vector(arr.map((elem: string) => this.getEntity(elem)));
    }

    getMatrix(str: string): AnyType {
        const arr: string[] = str.slice(1, str.length - 1).split("|");
        return new Matrix(arr.map((elems: string) => elems.split(";").map((elem) => this.getEntity(elem))));
    }

    getEntity(str: string): AnyType {
        str = str.replaceAll(" ", "").replaceAll("\n", "");
        if (str.includes("[")) {
            return this.getMatrix(str);
        }
        if (str.includes("(")) {
            return this.getVector(str);
        }
        if (str.includes("i")) {
            return this.getComplex(str);
        }
        return this.complex(Number(str), 0);
    }

    [EOperand.add](a: AnyType, b: AnyType): AnyType {
        return this.get(a).add(a, b);
    }

    [EOperand.sub](a: AnyType, b: AnyType): AnyType {
        return this.get(a).sub(a, b);
    }

    [EOperand.mult](a: AnyType, b: AnyType): AnyType {
        return this.get(a).mult(a, b);
    }

    [EOperand.div](a: AnyType, b: AnyType): AnyType | null {
        return this.get(a).div(a, b);
    }

    [EOperand.prod](p: number, a: AnyType): AnyType {
        return this.get(a).prod(p, a);
    }

    [EOperand.pow](a: AnyType, p: number): AnyType {
        return this.get(a).pow(a, p);
    }

    [EOperand.zero](elem: AnyType): AnyType {
        console.log(elem);
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case "Vector":
                return this.get(this.vector()).zero(elem.values.length);
            case "Matrix":
                return this.get(this.matrix()).zero(elem.values.length);
            default:
                return this.get(this.complex()).zero();
        }
    }

    [EOperand.one](elem: AnyType): AnyType {
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case "Vector":
                return this.get(this.vector()).one(elem.values.length);
            case "Matrix":
                return this.get(this.matrix()).one(elem.values.length);
            default:
                return this.get(this.complex()).one();
        }
    }

    get(elem?: AnyType): ICalculator<AnyType> {
        if (elem instanceof Matrix) return new MatrixCalculator(this.get(elem.values[0][0]));
        if (elem instanceof Vector) return new VectorCalculator(this.get(elem.values[0]));
        if (elem instanceof Polynomial) return new PolynomialCalculator(this.get(elem.values[0]));
        return new ComplexCalculator();
    }
}
