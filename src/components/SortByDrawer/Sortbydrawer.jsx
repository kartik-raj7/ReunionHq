/* eslint-disable react/prop-types */
import { Button, Drawer, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import style from '../../styles/tablefilters.module.scss';
import SwapVertIcon from '@mui/icons-material/SwapVert';
const Sortbydrawer = ({drawerOpen,handleDrawerClose,handleDrawerOpen,sortColumn,handleSortChange,columns,sortOrder,handleSortOrderChange,applySort}) => {
  return (
    <>
    <Button className={style.tablefiltericon} onClick={handleDrawerOpen} style={{color:'black'}}><SwapVertIcon /></Button>
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={handleDrawerClose}
        classes={{paper:style.sortbydrawer}}
      >
        <div style={{ width: 250, padding: 16 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort By</FormLabel>
            <RadioGroup
              aria-label="sort-by"
              name="sort-by"
              value={sortColumn}
              onChange={handleSortChange}
            >
              {columns.map((column) => (
                <FormControlLabel
                  key={column.id}
                  value={column.id}
                  control={<Radio />}
                  label={column.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {sortColumn && (
            <FormControl component="fieldset" style={{ marginTop: 16 }}>
              <FormLabel component="legend">Sort Order</FormLabel>
              <RadioGroup
                aria-label="sort-order"
                name="sort-order"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                <FormControlLabel value="desc" control={<Radio />} label="Descending" />
              </RadioGroup>
            </FormControl>
          )}
        </div>
        <Button onClick={applySort} variant="outlined">Apply</Button>
      </Drawer>
      </>
  )
}

export default Sortbydrawer