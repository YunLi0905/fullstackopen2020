import React from "react"

const BlogForm = ({
  addBlog,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <h2>create new</h2>
          <div>
            title:{"   "}
            <input
              type="text"
              value={title}
              name="title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author:{" "}
            <input
              type="text"
              value={author}
              name="author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url:{"   "}
            <input
              type="text"
              value={url}
              name="url"
              onChange={handleUrlChange}
            />
          </div>

          <button type="submit">create</button>
          <br />
        </div>
      </form>
    </div>
  )
}

export default BlogForm
