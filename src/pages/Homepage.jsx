import { useState } from 'react';
import TableComponent from '../components/TableComponent';
import TableFilters from '../components/TableFilters';
import data from '../data/data';
import { formatDate } from '../utils/utils';
import { DateRangePicker } from 'rsuite';

const columns = [
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'category', label: 'Category' },
  { id: 'subcategory', label: 'Subcategory' },
  { id: 'createdAt', label: 'Created At', format: formatDate },
  { id: 'updatedAt', label: 'Updated At', format: formatDate },
  { id: 'price', label: 'Price' },
  { id: 'sale_price', label: 'Sale Price' },
];

const initialColumnVisibility = columns.reduce((acc, column) => {
  acc[column.id] = true;
  return acc;
}, {});

const Homepage = () => {
  const [tableData, setTableData] = useState(data);
  const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleColumnVisibility = (columnId) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnId]: !prevVisibility[columnId],
    }));
  };

  const handleSortChange = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <TableFilters
        setTableData={setTableData}
        tableData={tableData}
        resetTableData={data}
        columns={columns}
        columnVisibility={columnVisibility}
        toggleColumnVisibility={toggleColumnVisibility}
        groupBy={{}}
        setGroupBy={() => {}}
        handleSortingChange={handleSortChange}
      />
      <div style={{ width: '80%', margin: '20px' }}>
        <TableComponent
          tableData={tableData}
          columns={columns}
          columnVisibility={columnVisibility}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  );
};

export default Homepage;
