import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"
import BlogForm from "./BlogForm"

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

  test("if the like button is clicked twice, the event handler received as props is called twice", () => {
    const mockHandler = jest.fn()
    const blogToUpdate = render(<Blog blog={blog} addLike={mockHandler} />)

    const button = blogToUpdate.container.querySelector(".addLike")
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  describe("<BlogForm />", () => {
    test("the form calls the event handlers it received as props ", () => {
      const addBlog = jest.fn()
      const handleTitleChange = jest.fn()
      const handleAuthorChange = jest.fn()
      const handleUrlChange = jest.fn()

      const newBlogForm = render(
        <BlogForm
          addBlog={addBlog}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
        />
      )

      const author = newBlogForm.container.querySelector("#author")
      const title = newBlogForm.container.querySelector("#title")
      const url = newBlogForm.container.querySelector("#url")

      const form = newBlogForm.container.querySelector("form")

      fireEvent.change(title, {
        target: { value: "testing of blogForm could be easier" }
      })

      fireEvent.change(author, {
        target: { value: "Yun Li" }
      })

      fireEvent.change(url, {
        target: { value: "http://hsaixoh.com" }
      })

      fireEvent.submit(form)

      expect(addBlog.mock.calls).toHaveLength(1)
      expect(handleTitleChange.mock.calls).toHaveLength(1)
      expect(handleAuthorChange.mock.calls).toHaveLength(1)
      expect(handleUrlChange.mock.calls).toHaveLength(1)
    })
  })
})
