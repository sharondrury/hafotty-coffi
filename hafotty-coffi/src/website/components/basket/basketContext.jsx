import { createContext, useState } from 'react'

const BasketContext = createContext(null)

const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([])

  const addItem = (item, milkChoice = 'Full Fat') => {
    const basketId = `${item.id}-${milkChoice}`
    setBasket(prev => {
      const existing = prev.find(b => b.basketId === basketId)
      if (existing) {
        return prev.map(b =>
          b.basketId === basketId ? { ...b, quantity: b.quantity + 1 } : b
        )
      }
      return [...prev, { ...item, quantity: 1, milkChoice, basketId }]
    })
  }

  const removeFromBasket = (basketId) => {
    setBasket(prev => prev.filter(b => b.basketId !== basketId))
  }

  const updateQuantity = (basketId, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(basketId)
      return
    }
    setBasket(prev =>
      prev.map(b => b.basketId === basketId ? { ...b, quantity } : b)
    )
  }

  // When milk changes on an item already in the basket, move its quantity to
  // the new milk entry (merging if that entry already exists).
  const updateMilkChoice = (oldBasketId, newMilk) => {
    setBasket(prev => {
      const oldItem = prev.find(b => b.basketId === oldBasketId)
      if (!oldItem) return prev
      const newBasketId = `${oldItem.id}-${newMilk}`
      const existingNew = prev.find(b => b.basketId === newBasketId)
      if (existingNew) {
        return prev
          .filter(b => b.basketId !== oldBasketId)
          .map(b =>
            b.basketId === newBasketId
              ? { ...b, quantity: b.quantity + oldItem.quantity }
              : b
          )
      }
      return prev.map(b =>
        b.basketId === oldBasketId
          ? { ...b, milkChoice: newMilk, basketId: newBasketId }
          : b
      )
    })
  }

  const clearBasket = () => {
    setBasket([])
  }

  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BasketContext.Provider value={{ basket, addItem, removeFromBasket, updateQuantity, updateMilkChoice, clearBasket, basketCount }}>
      {children}
    </BasketContext.Provider>
  )
}

export { BasketContext }
export default BasketProvider
