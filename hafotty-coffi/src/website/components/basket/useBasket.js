import { useContext } from 'react'
import { BasketContext } from './basketContext'

const useBasket = () => useContext(BasketContext)

export default useBasket
