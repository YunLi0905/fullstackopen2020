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
    <div className="formDiv">
      <form className="blogForm" onSubmit={addBlog}>
        <div>
          <h2>create new</h2>
          <div>
            title:{"   "}
            <input
              id="title"
              type="text"
              value={title}
              name="title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author:{" "}
            <input
              id="author"
              type="text"
              value={author}
              name="author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url:{"   "}
            <input
              id="url"
              type="text"
              value={url}
              name="url"
              onChange={handleUrlChange}
            />
          </div>

          <button className="submitButton" type="submit">
            create
          </button>
          <br />
        </div>
      </form>
    </div>
  )
}

export default BlogForm
