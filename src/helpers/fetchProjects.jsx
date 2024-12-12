export async function fetchGitHubRepos() {
  try {
    const url = new URL(`https://api.github.com/users/Uruwhy1/repos`);
    url.searchParams.set("page", "1");
    url.searchParams.set("per_page", "100");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      language: repo.language,
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw new Error("Failed to fetch repositories");
  }
}
