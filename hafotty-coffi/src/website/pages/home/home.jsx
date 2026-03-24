import { useState } from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

const MOCK_ORDERS = [
  { id: 1, drink: 'Flat White',  size: 'Medium', date: '22 Mar 2026' },
  { id: 2, drink: 'Earl Grey',   size: 'Large',  date: '21 Mar 2026' },
  { id: 3, drink: 'Espresso',    size: 'Small',  date: '20 Mar 2026' },
  { id: 4, drink: 'Green Tea',   size: 'Medium', date: '19 Mar 2026' },
  { id: 5, drink: 'Cappuccino',  size: 'Large',  date: '18 Mar 2026' },
]

const Home = () => {
  const [ordersOpen, setOrdersOpen] = useState(false)

  return (
    <div className="home">
      <div className="home__inner">
        <h1 className="home__title">Hafotty Coffi</h1>
        <p className="home__sub">What will it be today?</p>

        <div className="home__actions">
          <Link className="home__btn home__btn--coffee" to="/coffee">Coffee</Link>
          <Link className="home__btn home__btn--tea" to="/tea">Tea</Link>
        </div>

        <button className="home__orders-btn" onClick={() => setOrdersOpen(true)}>
          Previous Orders
        </button>
      </div>

      {ordersOpen && (
        <div className="orders-backdrop" onClick={() => setOrdersOpen(false)}>
          <div className="orders-modal" onClick={e => e.stopPropagation()}>
            <button className="orders-modal__close" onClick={() => setOrdersOpen(false)}>×</button>
            <h2 className="orders-modal__heading">Your Last Orders</h2>
            {MOCK_ORDERS.length === 0 ? (
              <p className="orders-modal__empty">No orders yet — try something!</p>
            ) : (
              <ul className="orders-modal__list">
                {MOCK_ORDERS.map(order => (
                  <li key={order.id} className="orders-modal__item">
                    <span className="orders-modal__drink">{order.drink} — {order.size}</span>
                    <span className="orders-modal__date">{order.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
