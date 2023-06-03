import UniversalCalculator, { PolynomialCalculator } from "../Calculator";
import { EPolyOperand } from "../Component/PolynomialCalculator";

export default function usePolyCalculator(
    refA: React.RefObject<HTMLTextAreaElement>,
    refB: React.RefObject<HTMLTextAreaElement>,
    refX: React.RefObject<HTMLTextAreaElement>,
    refC: React.RefObject<HTMLTextAreaElement>
) {
    const calc: UniversalCalculator = new UniversalCalculator();
    const calcPoly: PolynomialCalculator = new PolynomialCalculator();

    return (operand: EPolyOperand) => {
        if (refA && refB && refX && refC) {
            if (operand === "point") {
                const A = `${refA.current?.value}`;
                const C = `${refX.current?.value}`;
                if (refC.current) {
                    refC.current.value = calcPoly.getPolynomial(A).getValue(calc.getEntity(C)).toString();
                }
            } else {
                if (refC.current) {
                    const A = `${refA.current?.value}`;
                    const B = `${refB.current?.value}`;
                    refC.current.value = calcPoly[operand](calcPoly.getPolynomial(A), calcPoly.getPolynomial(B)).toString();
                }
            }
        }
    };
}
