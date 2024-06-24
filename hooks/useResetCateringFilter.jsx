import { clearTiffinSlice } from '@/app/features/tiffin/tiffinFilterSlice'
import { clearFilters, resetFilters } from '@/app/features/user/cateringFilterSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const useResetCateringFilter = () => {
    const dispatch = useDispatch()

    const clearCateringFilter = () => {
        dispatch(resetFilters())
        dispatch(clearTiffinSlice())
        dispatch(clearFilters())
    }

    return clearCateringFilter;
}

export default useResetCateringFilter