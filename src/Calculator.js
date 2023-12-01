import React, { useState } from 'react';
import './Calculator.css';
import {evaluate} from 'mathjs';
import { calculatorButtons } from './calculator-bonus-03-button-data';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [memory, setMemory] = useState(0);
  const [memorize, setMemorize] = useState(0);

  const handleButtonClick = (button) => {
    const { type, value } = button;

    switch (type) {
      case 'clear':
        setDisplay('');
        if (value === 'All Clear') {
          setMemory(0);
        }
        break;
      case 'memory':
        switch (value) {
          case 'Memory Save':
            setMemory(parseFloat(display) || 0);
            break;
          case 'Memory Clear':
            setMemory(0);
            break;
            case 'Memory Recall':
              // Assuming you want to append the memory value to the existing display
              setDisplay((prevDisplay) => prevDisplay + memory.toString());
              break;
          case 'Memory Subtract':
            setMemory(memory - (parseFloat(display) || 0));
            break;
          case 'Memory Addition':
            setMemory(memory + (parseFloat(display) || 0));
            break;
          default:
            break;
        }
        break;
      case 'number':
      case 'operator':
        setDisplay((prevDisplay) => prevDisplay + value);
        break;
      case 'sign':
        setDisplay((prevDisplay) => (-1 * (parseFloat(prevDisplay) || 0)).toString());
        break;
      case 'percent':
        setDisplay(display + '%');
        break;
        
      case 'sqrt':
        setDisplay(Math.sqrt(parseFloat(display) || 0).toString());
        break;
      case 'enter':
        calculateResult();
        break;
      default:
        break;
    }
  };

  const calculateResult = () => {
    try {
      let finalExpression = display;
    
      finalExpression = finalExpression.replace(/(\d+)-(\d+)%/g, (match, num1, num2) => {
        
        return `${num1}-${num1}*${num2}/100`;
      });
  
     
      const result = evaluate(finalExpression);
      const roundedResult = Math.round(result * 100000) / 100000;
      setDisplay(roundedResult.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display || '0'}</div>
      <div className="buttons">
        {calculatorButtons.map((button, index) => (
          <button
            key={index}
            className={`button ${button.className}`}
            onClick={() => handleButtonClick(button)}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;