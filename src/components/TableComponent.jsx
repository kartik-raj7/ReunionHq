/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { formatDate } from '../utils/utils';
import style from '../styles/tablestyle.module.scss';

const TableComponent = ({ tableData, columns, columnVisibility, sortColumn, sortOrder}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  console.log(sortColumn,sortOrder);
  useEffect(() => {
    setPage(1);
  }, [sortColumn, sortOrder]);

  const sortedData = [...tableData].sort((a, b) => {
    if (sortColumn) {
      if (sortOrder === 'asc') {
        return a[sortColumn] < b[sortColumn] ? -1 : 1;
      } else {
        return a[sortColumn] > b[sortColumn] ? -1 : 1;
      }
    }
    return 0;
  });

  const rows = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) =>
                columnVisibility[column.id] ? (
                  <TableCell key={column.id} align="right">
                    <TableSortLabel
                      active={sortColumn === column.id}
                      direction={sortColumn === column.id ? sortOrder : 'asc'}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ) : null
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {columns.map((column) =>
                  columnVisibility[column.id] ? (
                    <TableCell key={column.id} align="right">
                      {column.format ? column.format(row[column.id]) : row[column.id]}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(tableData.length / rowsPerPage)}
          page={page - 1}
          onChange={(event, newPage) => setPage(newPage + 1)}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default TableComponent;
