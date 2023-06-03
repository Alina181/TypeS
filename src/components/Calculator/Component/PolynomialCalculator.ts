import { Polynomial, Member, Complex } from "./entitites";
import UniversalCalculator from "./UniversalCalculator";

export enum EPolyOperand {
    add = "add",
    sub = "sub",
    mult = "mult",
    point = "point",
}

export default class PolynomialCalculator {
    members: { value: number; power: number }[];

    constructor() {
        this.members = [];
    }

    polynomial(members: { value: number; power: number }[]) {
        return new Polynomial(members);
    }

    getPolynomial(str: string) {
        str = str.replaceAll(" ", "").replaceAll("\n", "");
        if (str) {
            const arr = str.split("+");
            const arr2 = arr.map((elem) => elem.split("-"));
            for (let i = 0; i < arr2.length; i++) {
                arr2[i] = arr2[i].map((elem, index) => (elem && index ? `-${elem}` : elem));
            }
            const arr3 = arr2.reduce((S, arr) => S.concat(arr), []);
            return new Polynomial(arr3.map((elem) => this.getMember(elem)));
        }
        return new Polynomial();
    }

    getMember(str: string): Member {
        if (str) {
            const arr = str.split("x");
            if (arr.length === 1) return new Member(Number(arr[0]));
            arr[0] = arr[0].replaceAll("*", "");
            arr[1] = arr[1].replaceAll("^", "");
            if (arr[0] === "-") arr[0] = "-1";
            if (arr[0] === "") arr[0] = "1";
            if (arr[1] === "") arr[1] = "1";
            return new Member(Number(arr[0]), Number(arr[1]));
        }
        return new Member();
    }

    [EPolyOperand.add](a: Polynomial, b: Polynomial): Polynomial {
        const calc = new UniversalCalculator();
        const members: Member[] = [];
        a.poly.forEach((elemA) => {
            const member = b.poly.find((elemB) => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.add(new Complex(elemA.value), new Complex(member.value)), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach((elemB) => {
            if (!members.find((elem) => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return this.polynomial(members);
    }

    [EPolyOperand.sub](a: Polynomial, b: Polynomial) {
        const calc = new UniversalCalculator();
        const members: Member[] = [];
        a.poly.forEach((elemA) => {
            const member = b.poly.find((elemB) => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.sub(new Complex(elemA.value), new Complex(member.value)), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });

        b.poly.forEach((elemB) => {
            if (!members.find((elem) => elem.power === elemB.power)) {
                members.push(new Member(calc.prod(elemB.value, -1), elemB.power));
            }
        });
        return this.polynomial(members);
    }

    [EPolyOperand.mult](a: Polynomial, b: Polynomial): Polynomial {
        const calc = new UniversalCalculator();
        let polynomial = this.polynomial([]);
        a.poly.forEach((elemA) => {
            const members: Member[] = [];
            b.poly.forEach((elemB) => {
                members.push(new Member(calc.mult(new Complex(elemA.value), new Complex(elemB.value)), elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, this.polynomial(members));
        });
        return polynomial;
    }
}
