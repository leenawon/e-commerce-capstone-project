import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  }

  return (
    <div>
      {/* Search Form */}
      <form className="search" onSubmit={submitHandler}>
        <div className="row-sorting">
          <input type="text" onChange={(e) => setName(e.target.value)}></input>
          <button type="submit" className="primary">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  )
}
