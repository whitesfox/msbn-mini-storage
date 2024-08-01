import React, { useState, useRef, useEffect } from "react";
import "./TermsField.css";

const TermsField = ({
  options,
  termsHandler,
}: {
  options: any;
  termsHandler: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref for the wrapper component

  const toggling = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (option: any) => () => {
    setSelectedOption(option);
    termsHandler(option.value);
    setIsOpen(false);
  };

  // Handle clicking outside the component to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Only re-run the effect if isOpen changes

  return (
    <div
      className="custom-select-wrapper"
      ref={wrapperRef}
    >
      <div
        className="custom-select"
        onClick={toggling}
      >
        <div className="custom-select__trigger">
          <span>{selectedOption.label}</span>
          <div className={`arrow ${isOpen ? "open" : null}`}></div>
        </div>
        {isOpen && (
          <div className="custom-options">
            {options.map((option: any) => (
              <span
                key={option.label ? option.value : option}
                className={`custom-option ${selectedOption.label === option.label ? "selected" : ""}`}
                onClick={onOptionClicked(option)}
              >
                {option.label}{" "}
                <span
                  className="custom-options-colorShow"
                  style={{ background: `${option.value}` }}
                ></span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsField;
