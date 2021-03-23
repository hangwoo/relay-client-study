import { Suspense } from 'react';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "hangwoo" name: "rust-immgration") {
        name
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {});

function App(props: { preloadedQuery: typeof preloadedQuery }) {
  const data = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery) as { repository: { name?: string }};

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.repository.name}</p>
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
