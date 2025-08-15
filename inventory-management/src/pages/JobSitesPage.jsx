import React, { useEffect, useState } from 'react';
import { getJobSites, addJobSite } from '../services/api';
import SearchBar from '../components/SearchBar';
import JobSitesList from '../components/JobSitesList';
import JobSiteForm from '../components/JobSiteForm';

export default function JobSitesPage() {
  const [sites, setSites] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getJobSites().then(setSites);
  }, []);

  const counts = sites.reduce((acc, s) => {
    const key = s.status || 'Other';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  function handleCreate(site) {
    addJobSite(site).then(newSite => setSites(prev => [newSite, ...prev]));
  }

  const filtered = sites.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="App">
      <div className="summary">
        <div className="badge yellow">{(counts['On Road']||0)} On Road</div>
        <div className="badge green">{(counts['Completed']||0)} Completed</div>
        <div className="badge red">{(counts['On Hold']||0)} On Hold</div>
      </div>

      <div className="panel">
        <div className="toolbar">
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <strong>Job Sites</strong>
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <SearchBar value={query} onChange={setQuery} placeholder="Search job sites..." />
            <button className="create-btn" onClick={() => setShowModal(true)}>Create</button>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowModal(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">Title</div>
                <button className="modal-close" aria-label="Close" onClick={() => setShowModal(false)}>✕</button>
              </div>

              <div className="modal-info">
                <div className="info-icon">i</div>
                <div className="info-text">Informative piece of text that can be used regarding this modal.</div>
              </div>

              <div className="modal-body">
                <JobSiteForm
                  onSave={data => {
                    handleCreate(data);
                    setShowModal(false);
                  }}
                  onCancel={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        )}

        <JobSitesList sites={filtered} onOpen={id => alert('Open inventory for id: ' + id)} />
      </div>
    </div>
  );
}