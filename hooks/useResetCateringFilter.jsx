import { resetFilters } from '@/app/features/user/cateringFilterSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const useResetCateringFilter = () => {
    const dispatch = useDispatch()

    const clearCateringFilter = () => {
        dispatch(resetFilters())
        toast.success("Success")
    }

    return clearCateringFilter;
}

export default useResetCateringFilter