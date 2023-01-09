describe("search repository and add it", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("http://localhost:3000");
    cy.intercept("/search/issues*", []);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  const targetRepositories = ["cypress", "react", "TypeScript", "jest"];
  it("test user can search repositories and saves", () => {
    targetRepositories.forEach((repo) => {
      cy.dataCy("input").type(repo);
      cy.intercept(`/search/repositories?q=${repo}*`, {
        fixture: `searchRepositoriesResponses/${repo}.json`,
      });
      cy.dataCy("autocomplete-0").contains(repo).click();
      cy.intercept("/search/issues*", []);
    });
    cy.dataCy("repositoryCard").then(($cards) => {
      expect($cards).to.have.length(4);
    });
  });

  it("test user can't save more than four", () => {
    const repo = targetRepositories[3];
    cy.dataCy("input").type(repo);
    cy.intercept(`/search/repositories?q=${repo}*`, {
      fixture: `searchRepositoriesResponses/${repo}.json`,
    });

    cy.dataCy("autocomplete-0").contains(repo).click();
    cy.intercept("/search/issues*", []);

    cy.contains("최대 레포지토리 갯수는 4개입니다.");
    cy.dataCy(`delete${repo}`).click();
  });

  it("test user can't save duplicated repository", () => {
    const repo = targetRepositories[2];

    cy.dataCy("input").type(repo);
    cy.intercept(`/search/repositories?q=${repo}*`, {
      fixture: `searchRepositoriesResponses/${repo}.json`,
    });

    cy.dataCy("autocomplete-0").contains(repo).click();
    cy.intercept("/search/issues*", []);
    cy.contains("이미 존재하는 레포지토리입니다.");
    cy.dataCy(`delete${repo}`).click();
  });
});
