import React, { useState } from 'react';
import Header from './components/Header/Header';
import CalculatorComponent from './components/Calculator/CalculatorComponent';
import Math2DComponent from './components/Math2D/Graph2D';
import Math3DComponent from './components/Math3D/Graph3D';
import './App.css'

const App = () => {
  const [showComponent, setShowComponent] = useState('Math3D');

  const displayComponent = () => {
    switch (showComponent) {
      case 'Calculator':
        return <CalculatorComponent />;
      case 'Math2D':
        return <Math2DComponent />;
      case 'Math3D':
        return <Math3DComponent />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Header showComponent={(name) => setShowComponent(name)} />
      {displayComponent()}
    </>
  );
};

export default App;