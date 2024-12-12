import { useState, useEffect } from "react";
import { fetchGitHubRepos } from "../helpers/fetchProjects";
import Repo from "./Repo";

const GitHubPortfolio = () => {
  const [mainRepos, setMainRepos] = useState([]);
  const [otherRepos, setOtherRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setLoading(true);
        const fetchedRepos = await fetchGitHubRepos();

        const mainReposList = fetchedRepos.filter((repo) =>
          repo.name.startsWith("pfm")
        );

        const otherReposList = fetchedRepos.filter(
          (repo) => repo.name.startsWith("pf") && !repo.name.startsWith("pfm")
        );

        setMainRepos(mainReposList);
        setOtherRepos(otherReposList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="portfolio-container">
      {mainRepos.length > 0 && (
        <section>
          <h2>Featured Projects</h2>
          <div className="repos-grid">
            {mainRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} featured={true} />
            ))}
          </div>
        </section>
      )}

      {otherRepos.length > 0 && (
        <section className="other-repos">
          <h2>Other Projects</h2>
          <div className="repos-grid">
            {otherRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default GitHubPortfolio;
