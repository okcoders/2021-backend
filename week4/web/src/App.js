import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [postList, setPostList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/posts').then((response) => {
      setPostList([...response.data.posts]);
    });
  }, []);

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8082/posts', { title, content });
      alert('Success!');
    } catch (e) {
      alert('something went wrong');
      console.log(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create New Post!</h1>
        <form>
          <input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Blog content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <button onClick={submitPost}>Submit Post</button>
        </form>
      </header>
    </div>
  );
}

export default App;
