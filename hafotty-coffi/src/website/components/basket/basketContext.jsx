import { createContext, useState } from 'react'

const BasketContext = createContext(null)

const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([])
  const [milkChoice, setMilkChoice] = useState(null)

  const addToBasket = (item) => {
    setBasket(prev => {
      const existing = prev.find(b => b.id === item.id)
      if (existing) {
        return prev.map(b =>
          b.id === item.id ? { ...b, quantity: b.quantity + 1 } : b
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromBasket = (id) => {
    setBasket(prev => prev.filter(b => b.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(id)
      return
    }
    setBasket(prev =>
      prev.map(b => b.id === id ? { ...b, quantity } : b)
    )
  }

  const clearBasket = () => {
    setBasket([])
  }

  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, updateQuantity, clearBasket, basketCount, milkChoice, setMilkChoice }}>
      {children}
    </BasketContext.Provider>
  )
}

export { BasketContext }
export default BasketProvider
