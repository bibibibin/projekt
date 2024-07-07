import React, { useState } from 'react';
import axios from 'axios';

const SubmitProofScreen = ({ history }) => {
  const [taskId, setTaskId] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post('/api/submissions', { task: taskId, proofUrl }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    history.push('/');
  };

  return (
    <div>
      <h1>Submit Proof</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Task ID</label>
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </div>
        <div>
          <label>Proof URL</label>
          <input
            type="text"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
          />
        </div>
        <button type="submit">Submit Proof</button>
      </form>
    </div>
  );
};

export default SubmitProofScreen;
