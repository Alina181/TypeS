import { useRef } from "react";

import useCalculator from "./hooks/useCalculator";
import usePolyCalculator from "./hooks/usePolyCalculator";

import "../../App.css";
import { EOperand } from './Component/UniversalCalculator';
import { EPolyOperand } from "./Component/PolynomialCalculator";

const Calculator: React.FC = () => {
    const refA = useRef<HTMLTextAreaElement>(null);
    const refB = useRef<HTMLTextAreaElement>(null);
    const refC = useRef<HTMLTextAreaElement>(null);
    const refPolyA = useRef<HTMLTextAreaElement>(null);
    const refPolyB = useRef<HTMLTextAreaElement>(null);
    const refPolyC = useRef<HTMLTextAreaElement>(null);
    const refPolyD = useRef<HTMLTextAreaElement>(null);
    const calc = useCalculator(refA, refB, refC);
    const calcPoly = usePolyCalculator(refPolyA, refPolyB, refPolyC, refPolyD);

    return (
        <div className="calc">
            <div className="Calculator">
                <h1>Калькулятор</h1>
                <div>
                    <textarea ref={refA} className="inputCalc" placeholder="Первое число" />
                    <textarea ref={refB} className="inputCalc" placeholder="Второе число" />
                </div>
                <div>
                    <button className="operand-calc" onClick={() => calc(EOperand.add)}>
                        add
                    </button>
                    <button className="operand-calc" onClick={() => calc(EOperand.sub)}>
                        sub
                    </button>
                    <button className="operand-calc" onClick={() => calc(EOperand.mult)}>
                        mult
                    </button>
                    <button className="operand-calc" onClick={() => calc(EOperand.div)}>
                        div
                    </button>
                    <button className="operand-calc" onClick={() => calc(EOperand.prod)}>
                        prod
                    </button>
                    <button className="operand-calc" onClick={() => calc(EOperand.pow)}>
                        pow
                    </button>
                    <button className="operand-calc" onClick={() => calc(EOperand.one)}>
                        one
                    </button>
                    <button className="operand-calc" onClick={() => calc(EOperand.zero)}>
                        zero
                    </button>
                </div>
                <textarea ref={refC} placeholder="Ответ" />
            </div>
            <div className="Polynomial">
                <h1>Полиномы</h1>
                <div>
                    <textarea ref={refPolyA} className="inputCalc" placeholder="Первый полином"></textarea>
                    <textarea ref={refPolyB} className="inputCalc" placeholder="Второй полином"></textarea>
                    <textarea ref={refPolyC} placeholder="Значение x"></textarea>
                </div>
                <div>
                    <button className="operand-poly" onClick={() => calcPoly(EPolyOperand.add)}>
                        +
                    </button>
                    <button className="operand-poly" onClick={() => calcPoly(EPolyOperand.sub)}>
                        -
                    </button>
                    <button className="operand-poly" onClick={() => calcPoly(EPolyOperand.mult)}>
                        *
                    </button>
                </div>
                <textarea ref={refPolyD} placeholder="Ответ" readOnly></textarea>
                <div>
                    <button className="operand-result" onClick={() => calcPoly(EPolyOperand.point)}>
                        Point
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
