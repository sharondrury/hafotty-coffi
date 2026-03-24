import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useBasket from '../../components/basket/useBasket'
import caffeMochaImg from '../../../assets/scss/images/coffeeDrink/caffe-mocha.png'
import icedCoffeeImg from '../../../assets/scss/images/coffeeDrink/iced-coffee.png'
import latteImg from '../../../assets/scss/images/coffeeDrink/latte.png'
import icedMochaImg from '../../../assets/scss/images/coffeeDrink/iced-mocha.png'
import latteMacciatoImg from '../../../assets/scss/images/coffeeDrink/latte-macciato.png'
import cappuccinoImg from '../../../assets/scss/images/coffeeDrink/cappuccino.png'
import americanoImg from '../../../assets/scss/images/coffeeDrink/americano.png'
import espressoImg from '../../../assets/scss/images/coffeeDrink/espresso.png'
import flatWhiteImg from '../../../assets/scss/images/coffeeDrink/flat-white.png'
import cortadoImg from '../../../assets/scss/images/coffeeDrink/cortado.png'
import './coffeeType.scss'

const COFFEES = [
  { id: 'flat-white',     name: 'Flat White',       description: 'Smooth espresso with velvety steamed milk.',        image: flatWhiteImg },
  { id: 'latte',          name: 'Latte',             description: 'Mild espresso topped with a generous pour of milk.',image: latteImg },
  { id: 'cappuccino',     name: 'Cappuccino',        description: 'Equal parts espresso, steamed milk, and foam.',     image: cappuccinoImg },
  { id: 'americano',      name: 'Americano',         description: 'Espresso diluted with hot water for a long drink.', image: americanoImg },
  { id: 'espresso',       name: 'Espresso',          description: 'Intense, concentrated shot of pure coffee.',        image: espressoImg },
  { id: 'cortado',        name: 'Cortado',           description: 'Espresso cut with a small splash of warm milk.',    image: cortadoImg },
  { id: 'caffe-mocha',    name: 'Caffè Mocha',       description: 'Espresso, chocolate, and steamed milk combined.',   image: caffeMochaImg },
  { id: 'latte-macciato', name: 'Latte Macchiato',   description: 'Layers of milk, foam, and a shot of espresso.',    image: latteMacciatoImg },
  { id: 'iced-coffee',    name: 'Iced Coffee',       description: 'Chilled coffee served over ice — cool and crisp.',  image: icedCoffeeImg },
  { id: 'iced-mocha',     name: 'Iced Mocha',        description: 'Cold espresso, chocolate, and milk over ice.',      image: icedMochaImg },
]

const MILKS = ['Full Fat', 'Skimmed', 'Oat', 'Soy']

function CoffeeCard({ coffee }) {
  const { basket, addItem, updateQuantity } = useBasket()
  const [localMilk, setLocalMilk] = useState('Full Fat')

  const basketId = `${coffee.id}-${localMilk}`
  const qty = basket.find(i => i.basketId === basketId)?.quantity ?? 0
  const totalQty = basket.filter(i => i.id === coffee.id).reduce((sum, i) => sum + i.quantity, 0)

  const handleMilkSelect = (milk) => setLocalMilk(milk)

  return (
    <div className="coffee-card">
      <div className="coffee-card__img-wrap">
        <img className="coffee-card__img" src={coffee.image} alt={coffee.name} />
        {totalQty > 0 && (
          <span className="coffee-card__badge">{totalQty}</span>
        )}
      </div>
      <div className="coffee-card__body">
        <h3 className="coffee-card__name">{coffee.name}</h3>
        <p className="coffee-card__desc">{coffee.description}</p>
        <div className="coffee-card__milk-pills">
          {MILKS.map(milk => (
            <button
              key={milk}
              className={`coffee-card__milk-pill${localMilk === milk ? ' coffee-card__milk-pill--active' : ''}`}
              onClick={() => handleMilkSelect(milk)}
            >
              {milk}
            </button>
          ))}
        </div>
        <div className="coffee-card__controls">
          <button
            className="coffee-card__btn"
            onClick={() => updateQuantity(basketId, qty - 1)}
            disabled={qty === 0}
            aria-label={`Remove one ${coffee.name}`}
          >−</button>
          <span className="coffee-card__qty">{qty}</span>
          <button
            className="coffee-card__btn"
            onClick={() => addItem(coffee, localMilk)}
            aria-label={`Add one ${coffee.name}`}
          >+</button>
        </div>
      </div>
    </div>
  )
}

const CoffeeType = () => {
  const navigate = useNavigate()
  const { basketCount } = useBasket()

  return (
    <div className="coffee-type">
      <div className="coffee-type__header">
        <button className="coffee-type__back" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="coffee-type__title">Coffees</h1>
        <div className="coffee-type__nav">
          <Link className="coffee-type__nav-btn coffee-type__nav-btn--tea" to="/tea">Tea</Link>
          <Link className="coffee-type__nav-btn coffee-type__nav-btn--basket" to="/basket">
            Basket
            {basketCount > 0 && (
              <span className="coffee-type__basket-badge">{basketCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className="coffee-type__grid">
        {COFFEES.map(coffee => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </div>
  )
}

export default CoffeeType
