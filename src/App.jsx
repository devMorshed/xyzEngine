/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useStepForm } from "./utils/useStepForm";
import ProjectDetails from "./components/ProjectDetails";
import ProjectData from "./components/ProjectData";

const App = () => {
  const initialFormData = {
    projectName: "",
    projectDescription: "",
    client: "",
    contractor: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  function updateForm(inputs) {
    setFormData((prev) => {
      return { ...prev, ...inputs };
    });
  }

  const { step, steps, goNext, currentStep, goPrev, isLastStep, isFirstStep } =
    useStepForm([
      <ProjectDetails {...formData} updateForm={updateForm} />,
      <ProjectData {...formData} updateForm={updateForm} />,
    ]);

  function onSubmit(e) {
    e.preventDefault();
    goNext();
  }

  return (
    <main className="my-10 px-10">
      <section>
        <h1 className="text-5xl text-center uppercase font-bold tracking-wide">
          Welcome to XYZ Engine
        </h1>
        <div className="relative border  w-2/3 my-10 mx-auto rounded bg-slate-200 p-4">
          <div className="absolute top-5 right-5">
            <p>
              {currentStep + 1} / {steps.length}
            </p>
          </div>
          <form onSubmit={onSubmit} className="p-8 my-8">
            {step}
            <div className="flex justify-end gap-2 mt-8">
              {!isFirstStep && <button onClick={goPrev}>Prev</button>}
              <button>{isLastStep ? "Submit" : "Next"}</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default App;
