import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';

const Protected = ({ cmp }) => {
    const { user } = useAuthStore();
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (!user) {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    if (user) return cmp
    else navigate('/login')

}

export default Protected