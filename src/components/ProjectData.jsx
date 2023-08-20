/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Pdf from "react-to-pdf";
const ref = React.createRef();
const ProjectData = ({
  projectName,
  projectDescription,
  client,
  contractor,
}) => {
  const [csvData, setCsvData] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    max_X: "",
    min_X: "",
    max_Y: "",
    min_Y: "",
    max_Z: "",
    min_Z: "",
  });
  const [fileUploaded, setFileUploaded] = useState(false);

  console.log(csvData);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;
        parseCSV(csvText);
      };
      reader.readAsText(file);
      setFileUploaded(true);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    // const headers = lines[0].split(",");
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      if (currentLine.length >= 4) {
        const [KP, X, Y, Z] = currentLine.map((value) => value.trim());
        parsedData.push({ KP, X, Y, Z });
      }
    }
    setCsvData(parsedData);

    const calculateMinMax = (data, key) => {
      return data.reduce(
        (result, obj) => {
          const value = parseFloat(obj[key]);
          return {
            min: Math.min(result.min, value),
            max: Math.max(result.max, value),
          };
        },
        { min: Infinity, max: -Infinity }
      );
    };

    // Inside parseCSV function
    const xMinMax = calculateMinMax(parsedData, "X");
    const yMinMax = calculateMinMax(parsedData, "Y");
    const zMinMax = calculateMinMax(parsedData, "Z");

    setMinMaxValues({
      max_X: xMinMax.max,
      min_X: xMinMax.min,
      max_Y: yMinMax.max,
      min_Y: yMinMax.min,
      max_Z: zMinMax.max,
      min_Z: zMinMax.min,
    });
  };

  console.log(minMaxValues);

  return (
    <>
      <div
        ref={ref}
        className="flex items-center flex-col gap-10 md:flex-row justify-center"
      >
        <div>
          <label htmlFor="projectName" className=" flex items-center">
            Name:
            <input
              disabled
              autoFocus
              id="projectName"
              className="px-2 py-1 rounded"
              type="text"
              placeholder="Project Name"
              value={projectName}
            />
          </label>

          <label htmlFor="projectDescription" className=" flex items-center">
            Description:
            <input
              disabled
              id="projectDescription"
              className="px-2 py-1"
              type="text"
              placeholder="Project Description"
              value={projectDescription}
            />
          </label>

          <label htmlFor="client" className=" flex items-center gap-10">
            Client:
            <input
              disabled
              id="client"
              className="px-2 py-1"
              type="text"
              placeholder="Client"
              value={client}
            />
          </label>

          <label htmlFor="contractor" className=" flex items-center gap-10">
            Contractor:
            <input
              disabled
              id="contractor"
              className="px-2 py-1"
              type="text"
              placeholder="Contractor"
              value={contractor}
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 border">
          <input
            className="px-2 py-1"
            type="file"
            onChange={handleFileChange}
            accept=".csv"
          />
          <label htmlFor="max_X">
            Max X:
            <input
              required
              className="px-2 py-1 rounded ms-2"
              type="number"
              name="max_X"
              id="max_X"
              placeholder="max_X"
              value={minMaxValues.max_X}
              disabled={fileUploaded}
              onChange={(e) =>
                setMinMaxValues({ ...minMaxValues, max_X: e.target.value })
              }
            />
          </label>
          <label htmlFor="min_X">
            Min X:
            <input
              className="px-2 py-1 rounded ms-2"
              type="number"
              name="min_X"
              id="min_X"
              placeholder="min_X"
              value={minMaxValues.min_X}
              disabled={fileUploaded}
              onChange={(e) =>
                setMinMaxValues({ ...minMaxValues, min_X: e.target.value })
              }
              required
            />
          </label>

          <label htmlFor="max_Y">
            Max Y:
            <input
              className="px-2 py-1 rounded ms-2"
              type="number"
              name="max_Y"
              id="max_Y"
              placeholder="max_Y"
              value={minMaxValues.max_Y}
              disabled={fileUploaded}
              onChange={(e) =>
                setMinMaxValues({ ...minMaxValues, max_Y: e.target.value })
              }
              required
            />
          </label>

          <label htmlFor="min_Y">
            Min Y:
            <input
              className="px-2 py-1 rounded ms-2"
              type="number"
              name="min_Y"
              id="min_Y"
              placeholder="min_Y"
              disabled={fileUploaded}
              value={minMaxValues?.min_Y}
              onChange={(e) =>
                setMinMaxValues({ ...minMaxValues, min_Y: e.target.value })
              }
              required
            />
          </label>

          <label htmlFor="max_Z">
            Maz Z:
            <input
              className="px-2 py-1 rounded ms-2"
              type="number"
              name="max_Z"
              id="max_Z"
              placeholder="max_Z"
              value={minMaxValues?.max_Z}
              disabled={fileUploaded}
              onChange={(e) =>
                setMinMaxValues({ ...minMaxValues, max_Z: e.target.value })
              }
              required
            />
          </label>

          <label htmlFor="min_Z">
            Min Z:
            <input
              className="px-2 py-1 rounded ms-2"
              type="number"
              name="min_Z"
              id="min_Z"
              placeholder="min_Z"
              value={minMaxValues?.min_Z}
              disabled={fileUploaded}
              onChange={(e) =>
                setMinMaxValues({ ...minMaxValues, min_Z: e.target.value })
              }
              required
            />
          </label>
        </div>
      </div>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => (
          <button
            className="mx-auto block mt-10 bg-red-500 px-4 py-2 rounded text-gray-200 font-semibold"
            onClick={toPdf}
          >
            Download PDF
          </button>
        )}
      </Pdf>
    </>
  );
};

export default ProjectData;
