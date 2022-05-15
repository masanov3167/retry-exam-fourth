import React, {useState, useEffect} from "react";

import './app.css'

function App() {
const [value , setValue] = useState({
  user:false,
  post:false,
  comment:false,
  data: {},
  posts:{},
  comments: {}
});

useEffect(() =>{
  {document.title = 'Retry exam fourth'}
  fetch(`https://jsonplaceholder.typicode.com/users/`)
    .then((res) => res.json())
    .then((data) =>
      setValue({
        user:true,
        post:false,
        comment:false,
        data: data
      }),
    );
},[])

const goPosts = (evt) =>{
  {document.title = 'Posts of users'}
const btnId = evt.target.dataset.userId - 0;

const find = value.data.find(a => a.id === btnId);

fetch(`https://jsonplaceholder.typicode.com/posts?userId=${find.id}`)
    .then((res) => res.json())
    .then((data) =>
      setValue({
        user:true,
        post:true,
        comment:false,
        data: value.data,
        posts: data
      }),
    );
}
const goComments = (evt) =>{
  {document.title = 'Comments of posts'}
  const btnId = evt.target.dataset.postId - 0;

const find = value.posts.find(a => a.id === btnId);

fetch(`https://jsonplaceholder.typicode.com/comments?postId=${find.id}`)
    .then((res) => res.json())
    .then((data) =>
      setValue({
        user:true,
        post:true,
        comment:true,
        data: value.data,
        posts: value.posts,
        comments: data
      }),
    );
}  
  return (
    <div className="App">
      <ol className="list">
      {value.user  ? (
        
				value.data.map((e) => (
					<>
						<li  id={e.id} className="user-list-item">
							<h2>{e.name}</h2>
              <p>{e.username}</p>
              <a href={`mailto:${e.email}`} >{e.email}</a>
              <button onClick={goPosts} data-user-id={e.id} >Go posts</button>
						</li>
					</>                  
					))
			):(
				<></>
			)}
      </ol>

      <ol className="list">
      {value.post  ? (
				value.posts.map((e) => (
					<>
						<li id={e.id}  className="posts-list-item">
							<strong>{e.title}</strong>
              <p>{e.body}</p>
              <button onClick={goComments} data-post-id={e.id} >Go comments</button>
						</li>
					</>                  
					))
			):(
				<></>
			)}
      </ol>

      <ol className="list">
      {value.comment  ? (
				value.comments.map((e) => (
					<>
						<li  className="comments-list-item">
							<strong>{e.name}</strong>
              <a href={`mailto:${e.email}`} >{e.email}</a>
              <p>{e.body}</p>
						</li>
					</>                  
					))
			):(
				<></>
			)}
      </ol>
      
    </div>
  );
}

export default App;