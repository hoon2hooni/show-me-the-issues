import { Heading, VStack } from "@chakra-ui/react";
import IssuesTable from "@components/IssuesTable";
import Layout from "@components/Layout";
import RepositoriesCards from "@components/RepositoriesCards";
import SearchRepositories from "@components/SearchRepositories";
import Head from "next/head";
export default function Home() {
  return (
    <Layout>
      <RepositoriesCards />
      <SearchRepositories />
      <IssuesTable />
    </Layout>
  );
}
