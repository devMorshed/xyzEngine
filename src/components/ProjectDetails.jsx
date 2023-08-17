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
      <input
        autoFocus
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Project Name"
        required
        value={projectName}
        onChange={(e) => updateForm({ projectName: e.target.value })}
      />
      <input
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Project Description"
        required
        value={projectDescription}
        onChange={(e) => updateForm({ projectDescription: e.target.value })}
      />
      <input
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Client"
        required
        value={client}
        onChange={(e) => updateForm({ client: e.target.value })}
      />
      <input
        className="px-2 py-1 rounded"
        type="text"
        placeholder="Contractor"
        required
        value={contractor}
        onChange={(e) => updateForm({ contractor: e.target.value })}
      />
    </div>
  );
};

export default ProjectDetails;
