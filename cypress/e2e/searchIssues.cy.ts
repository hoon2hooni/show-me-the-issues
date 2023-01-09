describe("search repository and add it", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("http://localhost:3000");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("test initial page", () => {
    cy.contains("레포지토리를 입력해주세요");
  });

  it("test search cypress issues", () => {
    const targetRepo = "cypress";
    cy.dataCy("input").type(targetRepo);
    cy.intercept(`/search/repositories?q=${targetRepo}*`, {
      fixture: `searchRepositoriesResponses/${targetRepo}.json`,
    });
    cy.dataCy("autocomplete-0")
      .contains(targetRepo)
      .click()
      .intercept(
        `https://api.github.com/search/issues?q=repo%3Acypress-io%2Fcypress+is%3Aissue&per_page=5&page=1&sort=created`,
        {
          fixture: `searchIssuesResponses/cypress.json`,
        }
      );
  });
  context("test exceptions", () => {
    it("test when issues empty", () => {
      cy.intercept(
        `https://api.github.com/search/issues?q=repo%3Acypress-io%2Fcypress+is%3Aissue&per_page=5&page=1&sort=created`,
        { fixture: `searchIssuesResponses/empty.json` }
      );
      cy.contains("이슈가 존재하지 않습니다.");
    });
    it("test when server has error", () => {
      cy.intercept(
        `https://api.github.com/search/issues?q=repo%3Acypress-io%2Fcypress+is%3Aissue&per_page=5&page=1&sort=created`,
        { fixture: `searchIssuesResponses/500Error.json`, statusCode: 500 }
      );
      cy.contains("github 서버에 문제가 있습니다. 잠시후에 다시 시도해주세요!");
    });
    it("test when exceed limit rate", () => {
      const resetSeconds = 3;
      cy.intercept(
        `https://api.github.com/search/issues?q=repo%3Acypress-io%2Fcypress+is%3Aissue&per_page=5&page=1&sort=created`,
        {
          fixture: `searchIssuesResponses/403Error.json`,
          statusCode: 403,
          headers: {
            "x-ratelimit-limit": "10",
            "x-ratelimit-reset": `${
              (new Date().getTime() + resetSeconds * 1000) / 1000
            }`,
          },
        }
      );
      cy.contains(
        `데이터 요청량이 많습니다. ${resetSeconds}초 뒤에 다시 시도해주세요`
      );
    });
    it("test when user error", () => {
      cy.intercept(
        `https://api.github.com/search/issues?q=repo%3Acypress-io%2Fcypress+is%3Aissue&per_page=5&page=1&sort=created`,
        {
          statusCode: 400,
        }
      );
      cy.contains("잘못된 시도를 하시는 군요. 다시 시도해주세요");
    });
  });
  context("test pagination", () => {
    it("test paginate Last Page", () => {
      cy.intercept(`https://api.github.com/search/issues*`, {
        fixture: `searchIssuesResponses/cypress.json`,
      }).as("getCypress");

      cy.dataCy("paginateLast").click().wait("@getCypress");
      cy.contains("200");
      cy.dataCy("paginateLast").should("be.disabled");
      cy.dataCy("paginateNext").should("be.disabled");
    });

    it("test paginate First Page", () => {
      cy.intercept(`https://api.github.com/search/issues*`, {
        fixture: `searchIssuesResponses/cypress.json`,
      }).as("getCypress");
      cy.dataCy("paginateFirst").should("be.disabled");
      cy.dataCy("paginatePrev").should("be.disabled");
    });

    it("test paginate next and prev page", () => {
      cy.intercept(`https://api.github.com/search/issues*`, {
        fixture: `searchIssuesResponses/cypress.json`,
      }).as("getCypress");
      cy.dataCy("paginateNext").click().wait("@getCypress");
      cy.contains("6");
      cy.dataCy("paginatePrev").click().wait("@getCypress");
      cy.contains("5");
    });
  });

  context("test link is able", () => {
    it("test link is ok", () => {
      cy.intercept(`https://api.github.com/search/issues*`, {
        fixture: `searchIssuesResponses/cypress.json`,
      }).as("getCypress");
      cy.dataCy("link0")
        .should(
          "have.attr",
          "href",
          "https://github.com/cypress-io/cypress/issues/25394"
        )
        .should("have.attr", "target", "_blank");
    });
  });
});
