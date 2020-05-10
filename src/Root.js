import React, { useEffect, useReducer } from 'react'

function Root() {
  // don't give initial value to state as it comes form 2nd arg of useReducer always. It can't be undefined.
  const reducer = (state, action) => {
    const {
      type,
      stories
    } = action

    switch (type) {
      case 'SET_STORIES':
        return [...state, ...stories]
      default:
        return state
    }
  }

  const [stories, dispatch] = useReducer(reducer, [{
    author: 'abc',
    title: 'This is my first story',
    objectID: '123',
    url: 'https://something.com'
  }])

  useEffect(() => {
    async function fetchData() {
      const { hits } = await fetch('http://hn.algolia.com/api/v1/search_by_date?tags=story').then(data => data.json())
      dispatch({
        type: 'SET_STORIES',
        stories: [hits[0]]
      })
    }
    fetchData();
  }, [])

  return (
    <div className="root-container">
      <h1>useReducer</h1>
      <div>
        {stories.map(({ objectID, title, author, url }) => (
          <div key={objectID}>
            <div>{title}</div>
            <div>{author}</div>
            <div>{url}</div>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Root
