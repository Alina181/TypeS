import { ComplexCalculator, MatrixCalculator, VectorCalculator } from ".";
import PolynomialCalculator from "../PolynomialCalculator";

type AnyCalculator = ComplexCalculator | VectorCalculator | MatrixCalculator | PolynomialCalculator;

export default AnyCalculator;
