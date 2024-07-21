/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import style from '../styles/tablefilters.module.scss';
import HideColumns from './HideColumnDrawer/HideColumnDrawer';
import GroupByDrawer from './GroupbyDrawer/GroupByDrawer';
import { extractCategoriesAndSubcategories, fuzzySearch } from '../utils/utils';
import Sortbydrawer from './SortByDrawer/Sortbydrawer';
import MultiValueDrawer from './MultiValueDrawer/MultiValueDrawer';
const TableFilters = ({ setTableData, tableData, resetTableData, columns, columnVisibility, toggleColumnVisibility, groupBy, setGroupBy,handleSortingChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [multiValueFilter, setMultiValueFilter] = useState({
    name: '',
    category: '',
    subCategory: [],
    createdAtFrom: '',
    updatedAtFrom: '',
    createdAtTo:'',
    updatedAtTo:'',
    price: [0, 1000],
    salePrice: [0, 1000],
  });
  const categoriesData = extractCategoriesAndSubcategories(tableData);

  const handleSearchChange = (event) => {
    const filteredData = fuzzySearch(tableData, ['name', 'category', 'subcategory'], event.target.value);
    if(event.target.value==""){
      setTableData(resetTableData)
    }
    else setTableData(filteredData);
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setTableData(resetTableData);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleSortDrawerOpen = ()=> {
    setDrawerOpen(true);
  }

  const handleSortChange = (event) => {
    setSortColumn(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  const applyMultiFilters = (reset) => {
    if(reset){
      setTableData(resetTableData);
    }
    else{
    console.log(multiValueFilter)
    let filteredData = tableData;
    if (multiValueFilter.name) {
      filteredData = fuzzySearch(filteredData, ['name'], multiValueFilter.name);
    }
    if (multiValueFilter.category) {
      filteredData = fuzzySearch(filteredData, ['category'], multiValueFilter.category);
    }
    if (multiValueFilter.subCategory.length > 0) {
      let filteredSubCategoryData = [];
      
      multiValueFilter.subCategory.forEach(subCat => {
        filteredSubCategoryData = [
          ...filteredSubCategoryData,
          ...fuzzySearch(filteredData, ['subcategory'], subCat)
        ];
      });
    
      // Remove duplicates
      filteredData = Array.from(new Set(filteredSubCategoryData));
    }
    if (multiValueFilter.createdAtFrom || multiValueFilter.createdAtTo || multiValueFilter.updatedAtFrom || multiValueFilter.updatedAtTo) {
      filteredData = filteredData.filter(item => {
        const itemCreatedAt = new Date(item.createdAt);
        const itemUpdatedAt = new Date(item.updatedAt);
    
        const createdAtFrom = multiValueFilter.createdAtFrom ? new Date(multiValueFilter.createdAtFrom) : null;
        const createdAtTo = multiValueFilter.createdAtTo ? new Date(multiValueFilter.createdAtTo) : null;
        const updatedAtFrom = multiValueFilter.updatedAtFrom ? new Date(multiValueFilter.updatedAtFrom) : null;
        const updatedAtTo = multiValueFilter.updatedAtTo ? new Date(multiValueFilter.updatedAtTo) : null;
    
        const createdAtMatches = (!createdAtFrom || itemCreatedAt >= createdAtFrom) && (!createdAtTo || itemCreatedAt <= createdAtTo);
        const updatedAtMatches = (!updatedAtFrom || itemUpdatedAt >= updatedAtFrom) && (!updatedAtTo || itemUpdatedAt <= updatedAtTo);
    
        return createdAtMatches && updatedAtMatches;
      });
    }
    filteredData = filteredData.filter(item =>
      item.price >= multiValueFilter.price[0] &&
      item.price <= multiValueFilter.price[1]
    );
    filteredData = filteredData.filter(item =>
      item.sale_price >= multiValueFilter.salePrice[0] &&
      item.sale_price <= multiValueFilter.salePrice[1]
    );
    console.log(filteredData)
    setTableData(filteredData);}
  };
  const applySort = () => {
    handleSortingChange(sortColumn,sortOrder)
    handleDrawerClose();
  };

  return (
    <div className={style.tablefilters}>
      <div className={style.tablefilterdiv}>
        <OutlinedInput
          id="outlined-adornment-search"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle search visibility" onClick={searchValue ? handleClearSearch : null} edge="end">
                {searchValue ? <CloseIcon /> : <SearchIcon />}
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
        <div className={style.tablefiltericon}>
          <HideColumns columns={columns} columnVisibility={columnVisibility} toggleColumnVisibility={toggleColumnVisibility} />
        </div>
        <div className={style.tablefiltericon}>
          <GroupByDrawer 
            categories={categoriesData}
            groupBy={groupBy} 
            setGroupBy={setGroupBy} 
          />
        </div>
        <div>
          <Sortbydrawer 
          drawerOpen={drawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleSortDrawerOpen}
          sortColumn={sortColumn}
          handleSortChange={handleSortChange}
          columns={columns}
          sortOrder={sortOrder}
          handleSortOrderChange={handleSortOrderChange}
          applySort={applySort}
          />
        </div>
        <div className={style.tablefiltericon}>
        <MultiValueDrawer
        setMultiValueFilter={setMultiValueFilter}
        multiValueFilter={multiValueFilter}
        categories={categoriesData}
        applyMultiFilters={applyMultiFilters}
      />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
