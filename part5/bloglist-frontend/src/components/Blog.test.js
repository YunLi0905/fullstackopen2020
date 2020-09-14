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

  test("at start likes and url of the blog are not displayed", () => {
    const div = component.container.querySelector(".togglablePart")
    expect(div).toHaveStyle("display:none")
  })

  test("url and likes are shown when the view button is clicked", () => {
    const button = component.getByText("view")
    fireEvent.click(button)

    const div = component.container.querySelector(".togglablePart")
    expect(div).not.toHaveStyle("display:none")
  })
})
