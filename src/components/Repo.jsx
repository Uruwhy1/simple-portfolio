const Repo = ({ repo }) => {
  const cleanName = (name) => {
    let newName = name.split("-").slice(1);
    return newName.join(" ");
  };

  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card repo-card"
    >
      <h3>{cleanName(repo.name)}</h3>
      <p>{repo.description || "No description"}</p>
    </a>
  );
};

export default Repo;
