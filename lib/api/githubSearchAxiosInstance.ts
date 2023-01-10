import axios from "axios";

const githubSearchAxiosInstance = axios.create({
  baseURL: "https://api.github.com/search/",
});

export default githubSearchAxiosInstance;
