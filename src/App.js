import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = await api.post("repositories", {
      title: `${Math.random().toString(36).substring(7)}`,
      url: `www.${Math.random().toString(36).substring(7)}.com`,
      techs: [`${Math.random().toString(36).substring(7)}`],
      likes: 0,
    });

    console.log("repo", newRepo);
    console.log("repositories", repositories);

    setRepositories([...repositories, newRepo.data]);

    console.log("repositories after setRepositories", repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repos = repositories.filter((repo) => repo.id !== id);
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
