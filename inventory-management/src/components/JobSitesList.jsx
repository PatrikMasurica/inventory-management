import React from 'react';
import { Link } from 'react-router-dom';

function statusClass(status) {
  if (!status) return '';
  if (status.toLowerCase().includes('completed')) return 'status-pill status-completed';
  if (status.toLowerCase().includes('hold')) return 'status-pill status-onhold';
  return 'status-pill status-onroad';
}

export default function JobSitesList({ sites, onOpen }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Jobsite Name</th>
          <th style={{width:160}}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sites.map(s => (
          <tr key={s.id}>
            <td>
              <Link to={`/inventory/${s.id}`}>{s.name}</Link>
            </td>
            <td><span className={statusClass(s.status)}>{s.status}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}