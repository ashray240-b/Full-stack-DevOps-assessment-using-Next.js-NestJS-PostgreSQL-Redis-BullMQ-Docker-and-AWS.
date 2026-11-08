

'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function Home() {
  const [task, setTask] = useState('');
  const [jobId, setJobId] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitJob = async () => {
    if (!task.trim()) {
      setError('Please enter a task.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    setStatus('');

    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) throw new Error('Could not submit job.');

      const data = await response.json();
      setJobId(String(data.jobId));
      setStatus(data.status);
      setTask('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    if (!jobId) return;

    setError('');

    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}`);

      if (!response.ok) {
        throw new Error('Could not fetch job status.');
      }

      const data = await response.json();

      setStatus(data.status);
      setResult(data.result?.message || '');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    }
  };

  return (
    <main style={{
      maxWidth: 650,
      margin: '60px auto',
      padding: 24,
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Job Dashboard</h1>
      <p>Submit a task and track its background processing.</p>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
        style={{ width: '100%', padding: 12, marginBottom: 12 }}
      />

      <button onClick={submitJob} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Job'}
      </button>

      {jobId && (
        <section style={{ marginTop: 24 }}>
          <h2>Job Details</h2>
          <p><strong>Job ID:</strong> {jobId}</p>
          <p><strong>Status:</strong> {status}</p>

          <button
            type="button"
            onClick={checkStatus}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            Refresh Status
          </button>

          {result && <p><strong>Result:</strong> {result}</p>}
        </section>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}
