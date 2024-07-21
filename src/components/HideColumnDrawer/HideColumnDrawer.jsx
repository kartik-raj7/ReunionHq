/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Drawer, FormControlLabel, Checkbox, Button, Switch } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import style from '../../styles/tablefilters.module.scss';

const HideColumns = ({ columns, columnVisibility, toggleColumnVisibility }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localColumnVisibility, setLocalColumnVisibility] = useState({});

  useEffect(() => {
    setLocalColumnVisibility(columnVisibility);
  }, [columnVisibility]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleLocalColumnVisibility = (columnId) => {
    setLocalColumnVisibility((prev) => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const handleShowAllColumns = () => {
    const allVisible = {};
    columns.forEach(column => {
      allVisible[column.id] = true;
      if (columnVisibility[column.id]==false) {
        toggleColumnVisibility(column.id);
      }
    });
    setLocalColumnVisibility(allVisible);
  };
  const handleApply = () => {
    Object.keys(localColumnVisibility).forEach(columnId => {
      if (localColumnVisibility[columnId] !== columnVisibility[columnId]) {
        toggleColumnVisibility(columnId);
      }
    });
    setDrawerOpen(false);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)} style={{ color: 'black' }}><RemoveRedEyeIcon /></Button>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} classes={{ paper: style.columndrawer }}>
        <div className={style.columntoggle}>
          {columns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Switch
                  checked={localColumnVisibility[column.id]}
                  onChange={() => toggleLocalColumnVisibility(column.id)}
                  name={column.label}
                />
              }
              label={column.label}
            />
          ))}
        </div>
        <div className={style.hideunhidebuttonsdiv}>
        <Button onClick={handleApply} variant="outlined" className={style.applybutton}>Apply</Button>
        <Button onClick={handleShowAllColumns} variant="contained">Show All Columns</Button>
        </div>
      </Drawer>
    </div>
  );
};

export default HideColumns;
