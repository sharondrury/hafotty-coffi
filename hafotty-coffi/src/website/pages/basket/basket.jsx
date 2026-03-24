import { Link } from 'react-router-dom'
import useBasket from '../../components/basket/useBasket'
import './basket.scss'

const Basket = () => {
  const { basket, removeFromBasket, updateQuantity, basketCount } = useBasket()

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
                    <span className="basket-page__item-size">{item.size}</span>
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

            <div className="basket-page__footer">
              <p className="basket-page__total">Total items: <strong>{basketCount}</strong></p>
              <Link className="basket-page__back" to="/">Continue Shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Basket
