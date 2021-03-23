import { Suspense } from 'react';
import type { AppRepositoryNameQuery } from 'AppRepositoryNameQuery.graphql';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery, PreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "hangwoo" name: "rust-immgration") {
        name
    }
  }
`;

const preloadedQuery = loadQuery<AppRepositoryNameQuery>(RelayEnvironment, RepositoryNameQuery, {});

interface AppProps {
  preloadedQuery: PreloadedQuery<AppRepositoryNameQuery>;
}

function App(props: AppProps) {
  const data = usePreloadedQuery<AppRepositoryNameQuery>(RepositoryNameQuery, props.preloadedQuery);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.repository && data.repository.name}</p>
      </header>
    </div>
  )
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
