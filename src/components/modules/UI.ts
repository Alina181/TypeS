import React from 'react'; 
import "../../index.css"; 
import "../modules/Canvas"; 
 
interface Props { 
  callbacks: { 
    delFunction: (num: string) => void; 
    addFunction: (fn: (x: number) => number, num: string) => void; 
    setDerivative: (checked: boolean, num: string) => void; 
    setA: (value: number, num: string) => void; 
    setB: (value: number, num: string) => void; 
    setWidth: (value: number, num: string) => void; 
    setColor: (value: string, num: string) => void; 
  } 
} 
 
interface State { 
  num: number; 
} 
 
export default class UI extends React.Component<Props, State> { 
  constructor(props: Props) { 
    super(props); 
    this.state = { 
      num: 0 
    } 
  } 
 
  addFunction = () => { 
    const input = document.createElement("input"); 
    input.setAttribute("placeholder", function №${this.state.num}); 
    input.dataset.num = String(this.state.num); 
    input.setAttribute("id", "input" + this.state.num); 
    input.addEventListener("keyup", () => this.keyup(input)); 
 
    const button = document.createElement("button"); 
    button.innerHTML = "Удалить"; 
    button.setAttribute("id", "button" + this.state.num); 
    button.addEventListener("click", () => { 
      this.props.callbacks.delFunction(input.dataset.num); 
      funcInputs.removeChild(input); 
      funcInputs.removeChild(checkbox); 
      funcInputs.removeChild(button); 
      funcInputs.removeChild(a); 
      funcInputs.removeChild(b); 
      funcInputs.removeChild(width); 
      funcInputs.removeChild(color); 
      /*funcInputs.removeChild(x); 
      funcInputs.removeChild(y);*/ 
    }); 
 
    const a = document.createElement("input"); 
    a.setAttribute("placeholder", "a ="); 
    a.dataset.num = String(this.state.num); 
    a.setAttribute("id", "a" + this.state.num); 
    a.addEventListener("keyup", () => this.clickAInput(a)); 
 
    const b = document.createElement("input"); 
    b.setAttribute("placeholder", "b ="); 
    b.dataset.num = String(this.state.num); 
    b.setAttribute("id", "b" + this.state.num); 
    b.addEventListener("keyup", () => this.clickBInput(b)); 
 
    const width = document.createElement("input"); 
    width.setAttribute("placeholder", "width"); 
    width.dataset.num = String(this.state.num); 
    width.setAttribute("id", "width" + this.state.num); 
    width.addEventListener("keyup", () => this.clickWidthInput(width)); 
 
    const color = document.createElement("input"); 
    color.setAttribute("placeholder", "color"); 
    color.dataset.num = String(this.state.num); 
    color.setAttribute("id", "color" + this.state.num); 
    color.addEventListener("keyup", () => this.clickColorInput(color)); 
 
    const checkbox = document.createElement("input"); 
    checkbox.setAttribute("type", "checkbox"); 
    checkbox.dataset.num = String(this.state.num); 
    checkbox.addEventListener("click", () => this.clickCheckbox(checkbox)); 
 
    const funcInputs = document.getElementById("funcInputs"); 
    funcInputs.appendChild(input); 
    funcInputs.appendChild(checkbox); 
    funcInputs.appendChild(button); 
    funcInputs.appendChild(a);
funcInputs.appendChild(b); 
    funcInputs.appendChild(width); 
    funcInputs.appendChild(color); 
    /*funcInputs.appendChild(x); 
    funcInputs.appendChild(y);*/ 
    this.setState({num: this.state.num+1}); 
  } 
 
  keyup = (a: HTMLInputElement) => { 
    try { 
      let f; 
      eval(f = function(x){return ${a.value};}); 
      this.props.callbacks.addFunction(f, a.dataset.num); 
    } catch (e) { 
      console.log(this.props.callbacks); 
    } 
  }; 
 
  clickCheckbox = (a: HTMLInputElement) => { 
    this.props.callbacks.setDerivative(a.checked, a.dataset.num); 
  }; 
 
  clickAInput = (a: HTMLInputElement) => { 
    this.props.callbacks.setA(Number(a.value), a.dataset.num); 
  }; 
 
  clickBInput = (a: HTMLInputElement) => { 
    this.props.callbacks.setB(Number(a.value), a.dataset.num); 
  }; 

  clickWidthInput = (a: HTMLInputElement) => { 
    this.props.callbacks.setWidth(Number(a.value), a.dataset.num); 
  }; 
 
  clickColorInput = (a: HTMLInputElement) => { 
    this.props.callbacks.setColor(a.value, a.dataset.num); 
  }; 
}

  keyup = (a: HTMLInputElement) => {
    try {
      let f;
      eval(f = function(x){return ${a.value};});
      this.props.callbacks.addFunction(f, a.dataset.num);
    } catch (e) {
      console.log(this.props.callbacks);
    }
  };

  clickCheckbox = (a: HTMLInputElement) => {
    this.props.callbacks.setDerivative(a.checked, a.dataset.num);
  };

  clickAInput = (a: HTMLInputElement) => {
    this.props.callbacks.setA(Number(a.value), a.dataset.num);
  };

  clickBInput = (a: HTMLInputElement) => {
    this.props.callbacks.setB(Number(a.value), a.dataset.num);
  };

  clickWidthInput = (a: HTMLInputElement) => {
    this.props.callbacks.setWidth(Number(a.value), a.dataset.num);
  };

  clickColorInput = (a: HTMLInputElement) => {
    this.props.callbacks.setColor(a.value, a.dataset.num);
  };

}

function sin(x: number) {
  return Math.sin(x);
}

function cos(x: number) {
  return Math.cos(x);
}

function tg(x: number) {
  return Math.tan(x);
}

function ctg(x: number) {
  return 1 / Math.tan(x);
}

function pow(x: number, n: number) {
  return Math.pow(x, n);
}