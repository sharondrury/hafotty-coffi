import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useBasket from '../../components/basket/useBasket'
import SendOrder from '../../components/sendOrder/sendOrder'
import './basket.scss'

const Basket = () => {
  const { basket, removeFromBasket, updateQuantity, clearBasket, basketCount, milkChoice } = useBasket()
  const [orderStatus, setOrderStatus] = useState('idle')

  useEffect(() => {
    if (orderStatus === 'success') {
      clearBasket()
    }
    // clearBasket is intentionally excluded — it is a stable setter and
    // this effect must only fire when orderStatus changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStatus])

  if (orderStatus === 'success') {
    return (
      <div className="basket-page">
        <div className="basket-page__inner">
          <h1 className="basket-page__title">Your Basket</h1>
          <div className="basket-page__success">
            <p className="basket-page__status-success">
              Order sent! We&#39;ll get started on that for you.
            </p>
            <Link to="/" className="basket-page__home-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="basket-page">
      <div className="basket-page__inner">
        <h1 className="basket-page__title">Your Basket</h1>

        {basket.length === 0 ? (
          <div className="basket-page__empty">
            <p>Your basket is empty — head back and choose a drink!</p>
            <Link className="basket-page__back" to="/">Back to Home</Link>
          </div>
        ) : (
          <>
            <ul className="basket-page__list">
              {basket.map(item => (
                <li key={item.id} className="basket-page__item">
                  <div className="basket-page__item-info">
                    <span className="basket-page__item-name">{item.name}</span>
                    {item.size && <span className="basket-page__item-size">{item.size}</span>}
                  </div>
                  <div className="basket-page__item-controls">
                    <button
                      className="basket-page__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="basket-page__qty">{item.quantity}</span>
                    <button
                      className="basket-page__qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                    <button
                      className="basket-page__remove"
                      onClick={() => removeFromBasket(item.id)}
                    >Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            {milkChoice && (
              <div className="basket-page__milk">
                <span className="basket-page__milk-label">Milk:</span>
                <span className="basket-page__milk-value">
                  {milkChoice.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              </div>
            )}

            <div className="basket-page__footer">
              <p className="basket-page__total">Total items: <strong>{basketCount}</strong></p>
              <Link className="basket-page__back" to="/">Continue Shopping</Link>
            </div>

            {orderStatus === 'error' && (
              <p className="basket-page__status-error">
                Something went wrong — please check your details and try again.
              </p>
            )}

            <SendOrder
              items={basket}
              onSuccess={() => setOrderStatus('success')}
              onError={() => setOrderStatus('error')}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Basket
