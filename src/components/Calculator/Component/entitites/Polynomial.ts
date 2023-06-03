import Complex from "./Complex";
import UniversalCalculator from "../UniversalCalculator";

export default class Polynomial {
    poly: { value: number; power: number }[];

    constructor(poly: { value: number; power: number }[] = []) {
        this.poly = poly.filter((elem) => elem.value);
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x: number) {
        const calc = new UniversalCalculator();
        return this.poly.reduce((s, elem) => calc.add(s, calc.prod(new Complex(elem.value), calc.pow(x, new Complex(elem.power)))), calc.zero(x));
    }

    toString(): string {
        if (this.poly.length === 0) return "0";
        if (this.poly.length === 1) return this.poly[0].toString();
        return this.poly.map((elem, index) => `${elem.value > 0 && index ? "+" : ""}${elem.toString()}`).join("");
    }
}
