import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState("")
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [result, setResult] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      blogService.create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //setNewBlog("")
        setMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setResult(true)
        setTimeout(() => {
          setMessage(null)
          setResult("")
        }, 5000)
      })
    } catch (exception) {
      setMessage("cannot be added")
      setResult(false)
      setTimeout(() => {
        setMessage(null)
        setResult("")
      }, 5000)
    }
  }

  const deleteBlog = blog => {
    console.log("delete blog: ", blog)
    const resultConfirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (resultConfirmed) {
      blogService.deleteBlog(blog.id, blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const addLike = blog => {
    try {
      const blogObject = {
        likes: blog.likes + 1
      }

      blogService.update(blog.id, blogObject)

      setBlogs(
        blogs.map(b => {
          if (b.id !== blog.id) {
            return b
          }
          return { ...b, likes: blogObject.likes }
        })
      )
    } catch (exception) {
      setMessage("cannot be updated")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async event => {
    event.preventDefault()
    console.log("log out account: ", username)
    try {
      window.localStorage.clear("loggedBlogappUser")

      setUser(null)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log("logging in with ,", username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setMessage("Wrong username or password")
      setResult(false)
      setTimeout(() => {
        setMessage(null)
        setResult("")
      }, 5000)
    }
  }

  const sortByLike = (blog1, blog2) => {
    return blog2.likes - blog1.likes
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} result={result} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChang={({ target }) => setPassword(target.value)}
          />
        </div>
      ) : (
        <div>
          {user.username} logged-in{" "}
          <button onClick={handleLogout}>logout</button>
          <br />
          <br />
          <Togglable buttonLable="create a new blog" hide="cancel">
            <BlogForm
              addBlog={addBlog}
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
            />
          </Togglable>
          <br />
          {blogs.sort(sortByLike).map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
