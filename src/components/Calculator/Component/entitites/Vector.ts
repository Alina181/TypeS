import AnyType from "./AnyType";

export default class Vector {
    values: AnyType[];
    constructor(values: AnyType[] = []) {
        this.values = [];
        values.forEach((elem) => this.values.push(elem));
    }

    toString(): string {
        return `(${this.values.map((elem) => elem.toString()).join(",")})`;
    }
}
