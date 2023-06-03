export default class Complex {
    re: number;
    im: number;
    constructor(re: number = 0, im: number = 0) {
        this.re = re;
        this.im = im;
    }

    toString(): string {
        if (this.re === 0 && this.im === 0) return "0";
        if (this.im === 0) return this.re.toString();
        if (this.re === 0) {
            return this.im > 0 ? `i${this.im}` : `-i${-this.im}`;
        }
        return `${this.re}${this.im > 0 ? `+i${this.im}` : `-i${-this.im}`}`;
    }
}
