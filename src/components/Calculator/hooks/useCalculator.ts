import UniversalCalculator from "../Calculator";
import { EOperand } from "../Component/UniversalCalculator";

export default function useCalculator(
    refA: React.RefObject<HTMLTextAreaElement>,
    refB: React.RefObject<HTMLTextAreaElement>,
    refC: React.RefObject<HTMLTextAreaElement>
) {
    const calc = new UniversalCalculator();

    return (operand: EOperand) => {
        if (refA && refB && refC) {
            const A = refA.current?.value || "";
            const B = refB.current?.value || "";
            if (refC.current) {
                if (operand === EOperand.add) {
                    refC.current.value = calc[operand](calc.getEntity(A), calc.getEntity(B))?.toString() || "";
                }
                if (operand === EOperand.sub) {
                    refC.current.value = calc[operand](calc.getEntity(A), calc.getEntity(B))?.toString() || "";
                }
                if (operand === EOperand.mult) {
                    refC.current.value = calc[operand](calc.getEntity(A), calc.getEntity(B))?.toString() || "";
                }
                if (operand === EOperand.div) {
                    refC.current.value = calc[operand](calc.getEntity(A), calc.getEntity(B))?.toString() || "";
                }
                if (operand === EOperand.prod) {
                    refC.current.value = calc[operand](parseFloat(A), calc.getEntity(B))?.toString() || "";
                } else if (operand === EOperand.pow) {
                    refC.current.value = calc[operand](calc.getEntity(A), parseFloat(B))?.toString() || "";
                } else if (operand === EOperand.one) {
                    refC.current.value = calc[operand](calc.getEntity(A))?.toString() || "";
                } else if (operand === EOperand.zero) {
                    refC.current.value = calc[operand](calc.getEntity(A))?.toString() || "";
                }
            }
        }
    };
}
