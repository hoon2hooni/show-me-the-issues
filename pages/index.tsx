import IssuesTable from "@components/IssuesTable";
import Layout from "@components/Layout";
import RepositoriesCards from "@components/RepositoriesCards";
import SearchRepositories from "@components/SearchRepositories";
import { RepositoryState } from "@customTypes/repository";
import { useReducer } from "react";

type Action =
  | {
      type: "ADD_REPOSITORY";
      payload: RepositoryState;
    }
  | {
      type: "DELETE_REPOSITORY";
      payload: string;
    };

const repositoryReducer = (state: RepositoryState[], action: Action) => {
  switch (action.type) {
    case "ADD_REPOSITORY":
      return [...state, action.payload];
    case "DELETE_REPOSITORY":
      return state.filter(({ node_id }) => node_id !== action.payload);
    default:
      throw new Error("this is not right");
  }
};


export default function Home() {
  const [repositories, dispatch] = useReducer(
    repositoryReducer,
    []
  );
  const handleClickDeleteRepository = (id: string) => () => {
    dispatch({ type: "DELETE_REPOSITORY", payload: id });
  };
  const handleClickAddRepository = (repository: RepositoryState) => {
    if (repositories.length >= 4) {
      return;
    }
    if (repositories.find(({ node_id }) => node_id === repository.node_id)) {
      return;
    }
    dispatch({ type: "ADD_REPOSITORY", payload: repository });
  };
  return (
    <Layout>
      <RepositoriesCards
        repositories={repositories}
        onClickDeleteRepository={handleClickDeleteRepository}
      />
      <SearchRepositories
        repositories={repositories}
        onClickAddRepository={handleClickAddRepository}
      />
      <IssuesTable />
    </Layout>
  );
}
