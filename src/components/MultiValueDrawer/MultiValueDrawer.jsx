/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { Drawer, TextField, Button, Slider, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import style from '../../styles/tablefilters.module.scss'
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { formatDate } from '../../utils/utils';
const MultiValueDrawer = ({ setMultiValueFilter, multiValueFilter, categories,applyMultiFilters }) => {
  const handleApplyFilters = () => {
    setMultiValueFilter(multiValueFilter);
    applyMultiFilters();
    handleDrawerClose();
  };
  console.log(multiValueFilter)
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleDrawerOpen = ()=> {
    setDrawerOpen(true);
  }
  const handleDateChange = (key, newDate) => {
    setMultiValueFilter({
      ...multiValueFilter,
      [key]: newDate ? formatDate(newDate) : '',
    });
  };
  const handleResetFilters = () => {
    setMultiValueFilter({
      name: '',
      category: '',
      subCategory: [],
      createdAt: '',
      updatedAt: '',
      price: [0, 1000],
      salePrice: [0, 1000],
    });
    applyMultiFilters('reset');
  };

  const handleSubCategoryChange = (event) => {
    setMultiValueFilter({
      ...multiValueFilter,
      subCategory: event.target.value
    });
  };

  return (
    <>
    <Button onClick={handleDrawerOpen} style={{color:'black'}}><DynamicFeedIcon/></Button>
    <Drawer
      anchor='right'
      open={drawerOpen}
      onClose={handleDrawerClose}
      classes={{ paper: style.multivaluedrawer }}
    >
      <div>
        <TextField
          label="Name"
          fullWidth
          value={multiValueFilter.name}
          onChange={(e) => setMultiValueFilter({ ...multiValueFilter, name: e.target.value })}
        />
        </div>
        <div className={style.filterdatediv}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Created At From"
              value={multiValueFilter.createdAtFrom ? dayjs(multiValueFilter.createdAtFrom) : null}
              onChange={(newDate) => handleDateChange('createdAtFrom', newDate)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DatePicker
              label="Created At To"
              value={multiValueFilter.createdAtTo ? dayjs(multiValueFilter.createdAtTo) : null}
              onChange={(newDate) => handleDateChange('createdAtTo', newDate)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>
        </div>
        <div className={style.filterdatediv}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Updated At From"
              value={multiValueFilter.updatedAtFrom ? dayjs(multiValueFilter.updatedAtFrom) : null}
              onChange={(newDate) => handleDateChange('updatedAtFrom', newDate)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DatePicker
              label="Updated At To"
              value={multiValueFilter.updatedAtTo ? dayjs(multiValueFilter.updatedAtTo) : null}
              onChange={(newDate) => handleDateChange('updatedAtTo', newDate)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>
        </div>
         <Select
            value={multiValueFilter.category}
            onChange={(e) => setMultiValueFilter({ ...multiValueFilter, category: e.target.value })}
            label='Category'
          >
            {categories.map((cat, index) => (
              <MenuItem key={cat.category} value={cat.category}>{cat.category}</MenuItem>
            ))}
          </Select>
          {multiValueFilter.category && (
  <Select
    multiple
    value={multiValueFilter.subCategory}
    onChange={handleSubCategoryChange}
    label='Sub Category'
    renderValue={(selected) => selected.join(', ')}
  >
    {categories
      .find(cat => cat.category === multiValueFilter.category)
      ?.subcategories.map((subcat, index) => (
        <MenuItem key={index} value={subcat}>
          <Checkbox checked={multiValueFilter.subCategory.indexOf(subcat) > -1} />
          <ListItemText primary={subcat} />
        </MenuItem>
      ))}
  </Select>
)}
        <div>
          <label>Price Range</label>
          <Slider
            value={multiValueFilter.price}
            onChange={(e, newValue) => setMultiValueFilter({ ...multiValueFilter, price: newValue })}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </div>
        <div>
          <label>Sale Price Range</label>
          <Slider
            value={multiValueFilter.salePrice}
            onChange={(e, newValue) => setMultiValueFilter({ ...multiValueFilter, salePrice: newValue })}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
        </div>
        <Button onClick={handleApplyFilters} variant="outlined" color="primary">Apply</Button>
        <Button onClick={handleResetFilters} variant="contained" >Reset</Button>
    </Drawer>
    </>
  );
};

export default MultiValueDrawer;
