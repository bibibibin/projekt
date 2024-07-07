import React, { useState } from 'react';
import axios from 'axios';

const RandomTaskScreen = () => {
  const [task, setTask] = useState(null);

  const getRandomTask = async () => {
    const { data } = await axios.get('/api/preferences/random', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setTask(data);
  };

  return (
    <div>
      <h1>Random Task</h1>
      <button onClick={getRandomTask}>Get Random Task</button>
      {task && (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
};

export default RandomTaskScreen;
