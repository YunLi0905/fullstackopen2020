import React, { useState } from "react"

const Blog = ({ blog, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleAddLike = event => {
    event.preventDefault()
    addLike(blog)
  }

  const handleDeleteBlog = event => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div className="blogEntry">
      <div className="visiblePart" style={{ ...blogStyle, ...hideWhenVisible }}>
        <p>
          {blog.title}
          {" by "} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </p>
      </div>

      <div
        className="togglablePart"
        style={{ ...blogStyle, ...showWhenVisible }}
      >
        <p>
          {blog.title} <button onClick={toggleVisibility}>hide</button>{" "}
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button className="addLike" onClick={handleAddLike}>
            give a like
          </button>
        </p>
        <p>{blog.author}</p>
        <button onClick={handleDeleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
