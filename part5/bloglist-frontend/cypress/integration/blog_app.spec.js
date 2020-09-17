const { func } = require("prop-types")

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      username: "ainoL",
      password: "12345",
    }
    cy.request("POST", "http://localhost:3001/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function () {
    cy.contains("blogs")
    cy.contains("Log in to application")
    cy.contains("Login")
  })

  it("Login form is shown", function () {
    cy.contains("Login")
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })
  it("login form can be opened", function () {
    cy.contains("login").click()
  })

  describe("when logged in", function () {
    it.only("login fails with wrong username or password", function () {
      cy.contains("login").click()
      cy.get("#username").type("ainoL")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()
      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
    })

    it("suceeds with correct credentials", function () {
      cy.contains("login").click()
      cy.get("#username").type("ainoL")
      cy.get("#password").type("12345")
      cy.get("#login-button").click()

      cy.contains("ainoL logged-in")
    })
  })
})
