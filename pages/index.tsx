import { useToast } from "@chakra-ui/react";
import IssuesTableTemplate from "@components/IssuesTableTemplate";
import Layout from "@components/Layout";
import RepositoriesCards from "@components/RepositoriesCards";
import RepositoriesSearchBar from "@components/RepositoriesSearchBar";
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
  const toast = useToast();
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
      toast({
        title: "최대 레포지토리 갯수는 4개입니다.",
        description: "레포지토리를 지우고 추가해주세요",
        status: "info",
        duration: 2000,
      });
      return;
    }
    if (repositories.find(({ node_id }) => node_id === repository.node_id)) {
      toast({
        title: "이미 존재하는 레포지토리입니다.",
        status: "info",
        duration: 2000,
      });
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
      <RepositoriesSearchBar
        repositories={repositories}
        onClickAddRepository={handleClickAddRepository}
      />
      <IssuesTableTemplate repositories={repositories} />
    </Layout>
  );
}
