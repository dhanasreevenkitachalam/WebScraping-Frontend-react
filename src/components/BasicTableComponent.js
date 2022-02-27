// src/components/basic.table.js
import React from "react";
import {COLUMNS} from './Columns'
import { useTable,useFilters, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';


function BasicTableComponent({events}) {

  const data=events[0]
  return (
    <Table columns={COLUMNS} data={data} />
)
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search  records...`}
        />
    )
}
function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    
     
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
      useSortBy
       
    )

    return (
        <div className="container">
         
            <table className="table" {...getTableProps()} id="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} id="table tr">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} id="table th">
                                    {column.render('Header')}
                                     {/* Add a sort direction indicator */}
                                     <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} id="table tr ">
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} id="table td">{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
          
        </div>
    )
}




export default BasicTableComponent;