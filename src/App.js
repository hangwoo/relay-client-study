import { useState, useEffect } from 'react';
import './App.css';
import fetchGraphQL from "./fetchGraphQL";

function App() {
  const [name, setName] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query RepositoryNameQuery {
        repository(owner: "hangwoo" name: "rust-immgration") {
          name
        }
      }
    `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      setName(data.repository.name);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, [fetchGraphQL]);

  // Render "Loading" until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {name != null ? name : "Loading"}
        </p>
      </header>
    </div>
  );
}

export default App;
