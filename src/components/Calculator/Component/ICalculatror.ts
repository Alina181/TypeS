export default interface ICalculator<T> {
    add(a: T, b: T): T;
    sub(a: T, b: T): T;
    mult(a: T, b: T): T;
    div(a?: T, b?: T): T | null;
    prod(a: number, b: T): T;
    pow(a: T, b: number): T;
    zero(a?: T | number): T;
    one(a?: T | number): T;
}
