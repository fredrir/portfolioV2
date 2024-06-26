import React, { useEffect, useState } from "react";
import axios from "axios";

interface LanguageCount {
  [key: string]: number;
}

const fetchGitHubStats = async () => {
  const username = "fredrir";
  try {
    const commitResponse = await axios.get(
      `https://api.github.com/search/commits?q=author:${username}+author-date:>${new Date().getFullYear()}-01-01`,
      {
        headers: {
          Accept: "application/vnd.github.cloak-preview",
        },
      }
    );

    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const languages: LanguageCount = {};
    const repoNames = reposResponse.data.map((repo: any) => repo.name);

    for (const repo of reposResponse.data) {
      const languageResponse = await axios.get(repo.languages_url);
      for (const [language, count] of Object.entries(languageResponse.data)) {
        if (!languages[language]) {
          languages[language] = 0;
        }
        languages[language] += count as number;
      }
    }

    const mostUsedLanguage = Object.keys(languages).reduce((a, b) =>
      languages[a] > languages[b] ? a : b
    );

    return {
      commitCount: commitResponse.data.total_count,
      repoCount: reposResponse.data.length,
      mostUsedLanguage,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
};

export const GithubStats: React.FC = () => {
  const [stats, setStats] = useState<{
    commitCount: number | null;
    repoCount: number | null;
    mostUsedLanguage: string | null;
  }>({
    commitCount: null,
    repoCount: null,
    mostUsedLanguage: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const stats = await fetchGitHubStats();
      if (stats !== null) {
        setStats(stats);
      } else {
        setError(
          "Failed to fetch GitHub stats. Please check your token and network connection."
        );
      }
    };

    getData();
  }, []);

  return (
    <div className="my-4 rounded border-2 p-4 dark:text-white  shadow-lg dark:bg-gradient-to-r dark:from-indigo-800 dark:via-pink-900 dark:to-purple-800 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <p className="text-shadow text-3xl font-semibold text-black dark:text-white">
        Public GitHub Stats
      </p>
      {error ? (
        <p className="text-2xl mt-2 text-black dark:text-black">{error}</p>
      ) : stats.commitCount !== null && stats.repoCount !== null ? (
        <>
          <p className="text-2xl mt-2 text-black dark:text-white">
            Commits this year: {stats.commitCount}
          </p>
          <p className="text-2xl mt-2 text-black dark:text-white">
            Repositories worked on: {stats.repoCount}
          </p>
          <p className="text-2xl mt-2 text-black dark:text-white">
            Most used language: {stats.mostUsedLanguage}
          </p>
        </>
      ) : (
        <p className="text-2xl mt-2 text-black dark:text-white">Loading...</p>
      )}
    </div>
  );
};
