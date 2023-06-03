import ICalculator from '../ICalculatror';
import { Complex, Vector } from '../entitites';
import AnyType from '../entitites/AnyType';
import ComplexCalculator from './ComplexCalculator';

export default class VectorCalculator implements ICalculator<Vector> {

  calc: ICalculator<AnyType>

  constructor(calc: ICalculator<AnyType> = new ComplexCalculator()) {
    this.calc = calc;
  }

  div() {
    return null;
  }
  add(a: Vector, b: Vector): Vector {
    return new Vector(
      a.values.map((elem, i) => this.calc.add(elem, b.values[i]))
    );
  }

  sub(a: Vector, b: Vector): Vector {
    return new Vector(
      a.values.map((elem, i) => this.calc.sub(elem, b.values[i]))
    );
  }

  mult(a: Vector, b: Vector): Vector {
    return new Vector([
      this.calc.sub(
        this.calc.mult(a.values[1], b.values[2]),
        this.calc.mult(a.values[2], b.values[1])
      ),
      this.calc.sub(
        this.calc.mult(a.values[2], b.values[0]),
        this.calc.mult(a.values[0], b.values[2])
      ),
      this.calc.sub(
        this.calc.mult(a.values[0], b.values[1]),
        this.calc.mult(a.values[1], b.values[0])
      ),
    ]);
  }
  prod(p: number, a: Vector): Vector {
    return new Vector(a.values.map((elem) => this.calc.mult(elem, p)));
  }

  pow(a: Vector, p: number): Vector {
    let c = this.one(a.values.length);
    for (let i = 0; i < p; i++) {
      c = this.mult(a, c);
    }
    return c;
  }

  one(length: number): Vector {
    const values: Vector[] = [];
    for (let i = 0; i < length; i++) {
      values.push(this.calc.one());
    }
    return new Vector(values);
  }

  zero(length: number): Vector {
    const values: Vector[] = [];
    for (let i = 0; i < length; i++) {
      values.push(this.calc.zero());
    }
    return new Vector(values);
  }
}
