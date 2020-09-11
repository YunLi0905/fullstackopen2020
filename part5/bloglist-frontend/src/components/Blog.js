import React, { useState } from "react"
import Togglable from "./Togglable"
const Blog = ({ blog }) => {
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

  return (
    <div>
      <div style={{ ...blogStyle, ...hideWhenVisible }}>
        <p>
          {blog.title} <button onClick={toggleVisibility}>view</button>
        </p>
      </div>

      <div style={{ ...blogStyle, ...showWhenVisible }}>
        <p>
          {blog.title} <button onClick={toggleVisibility}>hide</button>{" "}
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog
