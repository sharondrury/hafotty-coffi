import { Link } from 'react-router-dom'
import useBasket from './useBasket'
import './basket.scss'

const Basket = () => {
  const { basketCount } = useBasket()

  return (
    <div className="basket-nav">
      <Link className="basket-nav__btn" to="/basket" aria-label="View basket">
        <i className="pi pi-shopping-cart basket-nav__icon" />
        {basketCount > 0 && (
          <span className="basket-nav__count">{basketCount}</span>
        )}
      </Link>
    </div>
  )
}

export default Basket
