import React from "react"

const Filter = props => {
  return (
    <form>
      <div>
        find countries{" "}
        <input value={props.searchTerm} onChange={props.handleSearch} />
      </div>
    </form>
  )
}

export default Filter
