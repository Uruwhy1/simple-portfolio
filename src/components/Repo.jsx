import PropTypes from "prop-types";

const Repo = ({ repo }) => {
  const isLive = repo.name.startsWith("pfml");

  console.log(repo.name);

  const cleanName = (name) => {
    let newName = name
      .split("-")
      .slice(1, 2)
      .join(" ")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/\s+/g, " ");

    return newName;
  };

  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`card repo-card ${isLive && "live"}`}
    >
      <h3>{cleanName(repo.name)}</h3>
      <p>{repo.description || "No description"}</p>
    </a>
  );
};

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default Repo;
