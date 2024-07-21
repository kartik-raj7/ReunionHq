/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Drawer, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
const GroupByDrawer = ({ categories, groupBy, setGroupBy }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };
  const resetGrouping=()=>{
     setSelectedCategory('');
     setSelectedSubcategory('');
  }
  const handleApply = () => {
    setGroupBy({ category: selectedCategory, subcategory: selectedSubcategory });
  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
<Button onClick={handleDrawerOpen} style={{ color: 'black' }}><FilterListIcon /></Button>
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
      <div style={{ width: 250, padding: 16 }}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat.category}>{cat.category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedCategory && (
          <FormControl fullWidth style={{ marginTop: 16 }}>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
            >
              {categories.find(cat => cat.category === selectedCategory)?.subcategories.map((subcat, index) => (
                <MenuItem key={index} value={subcat}>{subcat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button onClick={handleApply} style={{ marginTop: 16 }} variant="outlined">Apply Grouping</Button>
        <Button onClick={resetGrouping} style={{ marginTop: 16 }} variant="contained">Reset Grouping</Button>
      </div>
    </Drawer>
    </>
  );
};

export default GroupByDrawer;
