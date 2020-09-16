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

  it("Login form can be shown", function () {
    cy.contains("Login")
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })
  it("login form can be opened", function () {
    cy.contains("login").click()
  })

  it("user can login", function () {
    cy.contains("login").click()
    cy.get("#username").type("ainoL")
    cy.get("#password").type("12345")
    cy.get("#login-button").click()

    cy.contains("ainoL logged-in")
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click()
      cy.get("#username").type("ainoL")
      cy.get("#password").type("12345")
      cy.get("#login-button").click()
    })
  })
})
