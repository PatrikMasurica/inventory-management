import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInventory, updateInventoryItem } from '../services/api';
import SearchBar from '../components/SearchBar';
import InventoryTable from './InventoryTable';
import EditModal from '../components/EditModal';

export default function InventoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getInventory(id).then(setItems);
  }, [id]);

  useEffect(() => {
    const cats = [...new Set(items.map(i => i.category))];
    setSelectedCategory(prev => prev ?? (cats.length ? cats[0] : null));
  }, [items]);

  function handleSave(updated) {
    updateInventoryItem(id, updated.id, updated).then(saved => {
      setItems(prev => prev.map(it => (it.id === saved.id ? saved : it)));
      setEditing(null);
    });
  }

  const filtered = items
    .filter(it => (selectedCategory ? it.category === selectedCategory : true))
    .filter(it =>
      it.name.toLowerCase().includes(q.toLowerCase()) ||
      (it.category && it.category.toLowerCase().includes(q.toLowerCase()))
    );

  const categories = [...new Set(items.map(i => i.category))];

  return (
    <div className="App" style={{ padding: 16 }}>
      <div className="inventory-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div style={{ fontWeight: 700 }}>Site {id}</div>
            <div style={{ fontSize: 12, color: '#666' }}>Inventory</div>
          </div>

          <div className="category-list">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-item ${cat === selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'auto', padding: 12 }}>
            <button className="go-back" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </aside>

        <main className="main">
          <div className="table-card">
            <div className="table-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontWeight: 700 }}>{selectedCategory || 'All Categories'}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <SearchBar value={q} onChange={setQ} placeholder="Search items..." />
                <button className="close-x" onClick={() => navigate('/')}>✕</button>
              </div>
            </div>

            <div className="table-container">
              {filtered.length === 0 ? (
                <div className="empty-state" role="status">
                  <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <g fill="none" fillRule="evenodd">
                      <rect x="12" y="50" width="176" height="70" rx="6" fill="#F6A623" opacity="0.08"/>
                      <path d="M20 40 L60 18 120 36 180 20 160 88 40 110 Z" fill="#E0B07A" stroke="#C18945" strokeWidth="1"/>
                      <path d="M40 110 L160 88" stroke="#C18945" strokeWidth="1"/>
                    </g>
                  </svg>

                  <div className="empty-state-title">No Service Selected</div>
                  <div className="empty-state-sub">Please select a service on your left to proceed.</div>
                </div>
              ) : (
                <InventoryTable items={filtered} onCellDoubleClick={row => setEditing(row)} />
              )}
            </div>
          </div>
        </main>
      </div>

      {editing && <EditModal item={editing} onClose={() => setEditing(null)} onSave={handleSave} />}
    </div>
  );
}