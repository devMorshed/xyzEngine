/* eslint-disable react/prop-types */
const ProjectDetails = ({
  projectName,
  projectDescription,
  client,
  contractor,
  updateForm,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="projectName"
        className=" font-medium flex items-center gap-10"
      >
        Project Name:
        <input
          autoFocus
          id="projectName"
          className="px-2 py-1 rounded mt-1 flex-1 "
          type="text"
          placeholder="Project Name"
          required
          value={projectName}
          onChange={(e) => updateForm({ projectName: e.target.value })}
        />
      </label>

      <label
        htmlFor="projectDescription"
        className="font-medium flex items-center gap-10"
      >
        Project Description:
        <input
          id="projectDescription"
          className="px-2 py-1 rounded mt-1 flex-1"
          type="text"
          placeholder="Project Description"
          required
          value={projectDescription}
          onChange={(e) => updateForm({ projectDescription: e.target.value })}
        />
      </label>

      <label htmlFor="client" className="font-medium flex items-center gap-10">
        Client:
        <input
          id="client"
          className="px-2 py-1 rounded mt-1 flex-1"
          type="text"
          placeholder="Client"
          required
          value={client}
          onChange={(e) => updateForm({ client: e.target.value })}
        />
      </label>

      <label
        htmlFor="contractor"
        className="font-medium flex items-center gap-10"
      >
        Contractor:
        <input
          id="contractor"
          className="px-2 py-1 rounded mt-1 flex-1"
          type="text"
          placeholder="Contractor"
          required
          value={contractor}
          onChange={(e) => updateForm({ contractor: e.target.value })}
        />
      </label>
    </div>
  );
};

export default ProjectDetails;
