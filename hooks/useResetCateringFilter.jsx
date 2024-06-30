import { clearFiltersGlobal } from '@/app/features/tiffin/tiffinFilterSlice'
import { useDispatch } from 'react-redux'

const useResetCateringFilter = () => {
    const dispatch = useDispatch()

    const clearCateringFilter = () => {
        dispatch(clearFiltersGlobal())
    }

    return clearCateringFilter;
}

export default useResetCateringFilter