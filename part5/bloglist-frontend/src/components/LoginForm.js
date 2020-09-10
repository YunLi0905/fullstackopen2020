import React from "react"

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChang,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input value={password} onChange={handlePasswordChang} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
