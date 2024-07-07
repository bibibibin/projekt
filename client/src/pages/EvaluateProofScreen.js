import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvaluateProofScreen = ({ match }) => {
  const [submission, setSubmission] = useState(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      const { data } = await axios.get(`/api/submissions/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSubmission(data);
    };

    fetchSubmission();
  }, [match.params.id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post(`/api/submissions/${match.params.id}`, { rating, comments }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setRating(0);
    setComments('');
  };

  return (
    <div>
      <h1>Evaluate Proof</h1>
      {submission && (
        <div>
          <h2>{submission.task.title}</h2>
          <p>{submission.proofUrl}</p>
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div>
          <label>Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label>Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit">Submit Evaluation</button>
      </form>
    </div>
  );
};

export default EvaluateProofScreen;
