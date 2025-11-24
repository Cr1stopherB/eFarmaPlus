import React from 'react';
import '../../styles/molecules/Table.css';


const Table = ({ columns, data, onRowClick, actions }) => {
    if (!data || data.length === 0) {
        return (
            <div className="table-container">
                <div className="table-empty">
                    <p>No hay datos para mostrar</p>
                </div>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="dynamic-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                        {actions && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={onRowClick ? 'clickable' : ''}
                        >
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                            {actions && (
                                <td className="table-actions">
                                    {actions.edit && (
                                        <button
                                            className="btn-action btn-edit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                actions.edit(row);
                                            }}
                                        >
                                            ✏️
                                        </button>
                                    )}
                                    {actions.delete && (
                                        <button
                                            className="btn-action btn-delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                actions.delete(row);
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
