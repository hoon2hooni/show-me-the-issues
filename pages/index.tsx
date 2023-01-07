import IssuesTable from "@components/IssuesTable";
import Layout from "@components/Layout";
import RepositoriesCards from "@components/RepositoriesCards";
import SearchRepositories from "@components/SearchRepositories";
import { RepositoryState } from "@customTypes/repository";
import { useEffect, useReducer } from "react";

type Action =
  | {
      type: "ADD_REPOSITORY";
      payload: RepositoryState;
    }
  | {
      type: "DELETE_REPOSITORY";
      payload: string;
    }
  | {
      type: "SET_REPOSITORIES";
      payload: RepositoryState[];
    };

const repositoryReducer = (state: RepositoryState[], action: Action) => {
  switch (action.type) {
    case "ADD_REPOSITORY": {
      const result = [...state, action.payload];
      localStorage.setItem("github-issues", JSON.stringify(result));
      return result;
    }
    case "DELETE_REPOSITORY": {
      const result = state.filter(({ node_id }) => node_id !== action.payload);
      localStorage.setItem("github-issues", JSON.stringify(result));
      return result;
    }
    case "SET_REPOSITORIES": {
      return action.payload;
    }
    default:
      throw new Error("this is not right action");
  }
};

export default function Home() {
  const [repositories, dispatch] = useReducer(repositoryReducer, []);
  useEffect(() => {
    if (window) {
      const result = window.localStorage.getItem("github-issues");
      if (!result) {
        return;
      }
      dispatch({
        type: "SET_REPOSITORIES",
        payload: JSON.parse(result) as RepositoryState[],
      });
    }
  }, []);
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
      <IssuesTable repositories={repositories} />
    </Layout>
  );
}
