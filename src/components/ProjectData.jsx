import React, { useState } from "react";

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
    <div className="flex flex-col gap-4">
      <input
        disabled
        autoFocus
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Project Name"
        value={projectName}
      />
      <input
        disabled
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Project Description"
        value={projectDescription}
      />
      <input
        disabled
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Client"
        value={client}
      />
      <input
        disabled
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Contractor"
        value={contractor}
      />
      <input
        className="px-2 py-1 rounded"
        type="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      <input
        required
        className="px-2 py-1 rounded"
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
      <input
        className="px-2 py-1 rounded"
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
      <input
        className="px-2 py-1 rounded"
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

      <input
        className="px-2 py-1 rounded"
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
      <input
        className="px-2 py-1 rounded"
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
      <input
        className="px-2 py-1 rounded"
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
    </div>
  );
};

export default ProjectData;
