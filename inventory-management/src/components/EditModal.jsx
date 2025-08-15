import React, { useState, useEffect } from 'react';

export default function EditModal({ item, onClose, onSave }) {
  const [name, setName] = useState(item?.name || '');
  const [qty, setQty] = useState(item?.qty ?? 0);
  const [description, setDescription] = useState(item?.description || '');
  const [notes, setNotes] = useState(item?.notes || '');

  useEffect(() => {
    setName(item?.name || '');
    setQty(item?.qty ?? 0);
    setDescription(item?.description || '');
    setNotes(item?.notes || '');
  }, [item]);

  function save() {
    if (!name.trim()) return alert('Item name required');
    onSave({ ...item, name: name.trim(), qty: Number(qty), description, notes });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Title</div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-info">
          <div className="info-icon">i</div>
          <div className="info-text">Informative piece of text that can be used regarding this modal.</div>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <label className="form-label">Item</label>
            <label className="form-label">Quantity</label>
          </div>

          <div className="form-row">
            <select className="form-input select-input" value={name} onChange={e => setName(e.target.value)}>
              <option value={name}>{name}</option>
            </select>

            <input
              className="form-input"
              type="number"
              value={qty}
              onChange={e => setQty(e.target.value)}
            />
          </div>

          <div className="form-block">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div className="form-block">
            <label className="form-label">Notes</label>
            <textarea className="form-textarea" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
        </div>

        <div className="modal-actions">
          <button className="save-btn" onClick={save}>
            Save Changes <span className="save-check">✔︎</span>
          </button>
        </div>
      </div>
    </div>
  );
}