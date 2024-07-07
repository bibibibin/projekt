import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreferencesScreen = ({ history }) => {
  const [preferenceData, setPreferenceData] = useState({});

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data } = await axios.get('/api/preferences', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPreferenceData(data.preferenceData || {});
    };

    fetchPreferences();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post('/api/preferences', { preferenceData }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    history.push('/');
  };

  return (
    <div>
      <h1>Preferences</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Preference Data</label>
          <input
            type="text"
            value={JSON.stringify(preferenceData)}
            onChange={(e) => setPreferenceData(JSON.parse(e.target.value))}
          />
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default PreferencesScreen;
