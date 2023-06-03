import React from "react";
interface Props {
  showComponent: (componentName: string) => void;
}

const Header: React.FC<Props> = ({ showComponent }) => {
  return (
    <div className="Zalupa">
      <button
        className="headerButton"
        data-component
        onClick={() => showComponent("Calculator")}
      >
        Калькулятор
      </button>
      <button
        className="headerButton"
        data-component
        onClick={() => showComponent("Math2D")}
      >
        График2D
      </button>
      <button
        className="headerButton"
        data-component
        onClick={() => showComponent("Math3D")}
      >
        Графика3D
      </button>
    </div>
  );
};

export default Header;

