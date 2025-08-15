import React from 'react';

export default function InventoryTable({ items, onCellDoubleClick }) {
  return (
    <div className="inventory-table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th style={{ width: 48 }}>Nr.</th>
            <th style={{ width: 160 }}>Item</th>
            <th style={{ width: 100 }}>Quantity</th>
            <th>Description</th>
            <th style={{ width: 300 }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={row.id} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td onDoubleClick={() => onCellDoubleClick(row)}>{idx + 1}</td>
              <td onDoubleClick={() => onCellDoubleClick(row)} style={{ cursor: 'pointer' }}>{row.name}</td>
              <td onDoubleClick={() => onCellDoubleClick(row)} style={{ cursor: 'pointer' }}>{row.qty}</td>
              <td onDoubleClick={() => onCellDoubleClick(row)} style={{ cursor: 'pointer', color:'#666' }}>
                {row.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              </td>
              <td onDoubleClick={() => onCellDoubleClick(row)} style={{ cursor: 'pointer', color:'#666' }}>
                {row.notes || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: 20, color: '#888' }}>No items</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}