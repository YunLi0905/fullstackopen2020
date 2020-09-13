import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
  let component

  const blog = {
    title: "paska blog",
    author: "shabi",
    likes: 9,
    url: "klsajxkajskx.com"
  }
  beforeEach(() => {
    component = render(<Blog blog={blog} />)
    component.debug()
  })

  test("at start the togglable part is not displayed", () => {
    const div = component.container.querySelector(".togglablePart")
    expect(div).toHaveStyle("display:none")
  })
})
