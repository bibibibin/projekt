import React, { useState } from 'react';
import axios from 'axios';

const AddTaskScreen = ({ history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post('/api/tasks', { title, description }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (data) {
      history.push('/');
    }
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskScreen;
