import React from 'react'
import Stack from '@mui/material/Stack';

const FoodType = ({ data }) => {
    const filterFoodTypes = data?.filter((item)=> item?.id > '1')
    return (
        <>
            {
                filterFoodTypes?.map((food_type, index) => {
                    let iconSrc = '';
                    let foodClassName = '';
                    if (food_type.food_type_name === 'Veg') {
                        iconSrc = '/img/icons/list-card-veg.png';
                        foodClassName = 'food-veg-color';
                    } else if (food_type.food_type_name === 'Non Veg') {
                        iconSrc = '/img/icons/list-card-non-veg.png';
                        foodClassName = 'food-nonveg-color';
                    } else {
                        iconSrc = '/img/icons/list-card-veg.png';
                        foodClassName = 'food-veg-color';
                    }
                    return (
                        <Stack direction="row" alignItems="center" spacing={0} key={index}>
                            <img src={iconSrc} className='list-card-veg' alt="" />
                            <p className={`list-card-veg-font ${foodClassName}`}> {food_type?.food_type_name} </p>
                        </Stack>
                    )
                })
            }
        </>
    )
}

export default FoodType