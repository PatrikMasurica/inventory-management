import React, { useState } from 'react';

export default function JobSiteForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('On Road');

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return alert('Name required');
    onSave({ name: name.trim(), category: category.trim(), status });
    // reset fields (optional)
    setName('');
    setCategory('');
    setStatus('On Road');
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label className="form-label">Name</label>
        <input
          className="form-input"
          placeholder="Type the jobsite's name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label className="form-label">Category Included</label>
          <select className="form-input select-input" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select</option>
            <option>Sidewalk Shed</option>
            <option>Scaffold</option>
            <option>Materials</option>
          </select>
        </div>

        <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label className="form-label">Status</label>
          <select className="form-input select-input" value={status} onChange={e => setStatus(e.target.value)}>
            <option>On Road</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#ff5b5b',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Cancel Changes ✖
        </button>

        <button type="submit" className="save-btn">
          Save Changes <span className="save-check">✔︎</span>
        </button>
      </div>
    </form>
  );
}