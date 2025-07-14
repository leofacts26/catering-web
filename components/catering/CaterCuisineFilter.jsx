import React, { memo, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterSkeleton from '../FilterSkeleton';
import Divider from '@mui/material/Divider';
import {
  fetchCateringCuisines,
  fetchCateringMapviewSearchCards,
  fetchCateringSearchCards,
  setCuisineTypeFilter,
} from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #e0e3e7',
    },
    '&:hover fieldset': {
      border: '2px solid #e0e3e7',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #C33332',
    },
  },
  '& input': {
    border: 'none',
    fontSize: '16px',
    padding: '10px 20px',
  },
}));

const CaterCuisineFilter = () => {
  const { getCateringCuisines, isLoading } = useSelector((state) => state.cateringFilter);
  const dispatch = useDispatch();

  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // if (!getCateringCuisines.length) {
      dispatch(fetchCateringCuisines());
    // }
  }, [dispatch, getCateringCuisines.length]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onHandleCuisineFilter = (cuisineId, isParent) => {
    dispatch(setCuisineTypeFilter({ cuisineId, getCateringCuisines }));
    dispatch(fetchCateringSearchCards());
    dispatch(fetchCateringMapviewSearchCards());
  };

  const filteredCuisines = getCateringCuisines?.filter((cuisine) =>
    cuisine?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cuisine?.children?.some((child) =>
      child?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <CssTextField
        id="outlined-search"
        variant="outlined"
        label="Search here..."
        className="mt-0"
        style={{ width: '100%', marginTop: '10px' }}
        InputLabelProps={{
          style: { color: '#777777', fontSize: '12px' },
        }}
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          style: {
            borderRadius: '8px',
            backgroundColor: '#f4f4fc6b',
          },
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon style={{ fontSize: '14px' }} />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ marginTop: '0px' }}>
        {filteredCuisines?.length > 0 ? (
          <List className="filter-list">
            {filteredCuisines.map((cuisine) => (
              <div key={cuisine.id}>
                <ListItemButton
                  className="m-0 p-0 shadow-none"
                  onClick={() => toggleOpen(cuisine.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      {...label}
                      size="small"
                      className="checkbox-color"
                      checked={cuisine.selectedweb === 1}
                      style={{ color: cuisine.selectedweb === 1 && '#c33332' }}
                      onChange={() => onHandleCuisineFilter(cuisine.id, true)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={cuisine.name} className="checkbox-text text-muted" />
                  {openItems[cuisine.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openItems[cuisine.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {cuisine.children?.map((child) => (
                      <ListItemButton
                        className="nested-item text-muted"
                        sx={{ pl: 4 }}
                        key={child.id}
                        onClick={() => onHandleCuisineFilter(child.id, false)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            {...label}
                            size="small"
                            className="checkbox-color"
                            checked={child.selectedweb === 1}
                            style={{ color: child.selectedweb === 1 && '#c33332' }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={child.name} className="checkbox-text text-muted" />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
                <Divider className="custom-hr-cuisine my-2" />
              </div>
            ))}
          </List>
        ) : (
          <FilterSkeleton />
        )}
      </Box>
    </>
  );
};

export default memo(CaterCuisineFilter);
