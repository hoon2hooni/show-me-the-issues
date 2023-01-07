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

const initialRepositories: RepositoryState[] = [
  { node_id: "a", owner: "muyaho", name: "facebook", stargazers_count: 1234 },
  { node_id: "b", owner: "muya", name: "facok", stargazers_count: 1234 },
  { node_id: "c", owner: "muho", name: "facek", stargazers_count: 1234 },
  { node_id: "d", owner: "maho", name: "facebk", stargazers_count: 1234 },
];

export default function Home() {
  const [repositories, dispatch] = useReducer(repositoryReducer, initialRepositories);
  const handleClickDeleteRepository = (id: string) => () => {
    dispatch({ type: "DELETE_REPOSITORY", payload: id });
  };
  return (
    <Layout>
      <RepositoriesCards
        repositories={repositories}
        onClickDeleteRepository={handleClickDeleteRepository}
      />
      <SearchRepositories />
      <IssuesTable />
    </Layout>
  );
}
