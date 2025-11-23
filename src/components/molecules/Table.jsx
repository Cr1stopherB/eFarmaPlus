// components/molecules/Table.jsx
// Componente de tabla dinámica reutilizable
import React from 'react';
import '../../styles/molecules/Table.css';

/**
 * Componente de tabla dinámica
 * 
 * @param {Array} columns - Array de nombres de columnas
 * @param {Array} data - Array de arrays con los datos
 * @param {Function} onRowClick - Función callback al hacer click en una fila
 * @param {Object} actions - Objeto con acciones para cada fila
 * 
 * Ejemplo de uso:
 * <Table 
 *   columns={["ID", "Nombre", "Edad"]}
 *   data={[[1, "Juan", 28], [2, "Ana", 34]]}
 *   onRowClick={(row) => console.log(row)}
 *   actions={{
 *     edit: (row) => handleEdit(row),
 *     delete: (row) => handleDelete(row)
 *   }}
 * />
 */
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
