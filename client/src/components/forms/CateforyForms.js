import React from 'react'

function CateforyForms({name,handleSubmit,setName}) {
    return (
        <form onSubmit={handleSubmit}>
      <div className="form=group">
        <label>Name</label>
        <input
        value={name}
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
      </div>
      <br/>
      <button className='btn btn-primary'>Save</button>
    </form>
    )
}

export default CateforyForms
