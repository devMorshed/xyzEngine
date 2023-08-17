import { useState } from "react";

export function useStepForm(steps) {
  const [currentStep, setCurrentStep] = useState(0);

  function goNext() {
    setCurrentStep((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function goPrev() {
    setCurrentStep((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTO(i) {
    setCurrentStep(i);
  }

  return {
    currentStep,
    goNext,
    goPrev,
    goTO,
    step: steps[currentStep],
    steps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
}
