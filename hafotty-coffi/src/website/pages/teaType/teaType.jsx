import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useBasket from '../../components/basket/useBasket'
import mintTeaImg from '../../../assets/scss/images/teaDrink/mint-tea.png'
import englishBreakfastImg from '../../../assets/scss/images/teaDrink/english-breakfast-tea.png'
import earlGreyImg from '../../../assets/scss/images/teaDrink/earl-grey-tea.png'
import matchaImg from '../../../assets/scss/images/teaDrink/matcha.png'
import chaiLatteImg from '../../../assets/scss/images/teaDrink/chai-latte.png'
import peachIcedTeaImg from '../../../assets/scss/images/teaDrink/peach-iced-tea.png'
import icedChaiLatteImg from '../../../assets/scss/images/teaDrink/iced-chai-latte.png'
import './teaType.scss'

const TEAS = [
  { id: 'decaf', name: 'Decaf', description: 'A smooth, caffeine-free version of our classic English Breakfast tea.', image: englishBreakfastImg },
  { id: 'english-breakfast', name: 'English Breakfast', description: 'A classic full-bodied black tea, perfect with a splash of milk.', image: englishBreakfastImg },
  { id: 'earl-grey',  name: 'Earl Grey', description: 'Bright black tea delicately scented with bergamot orange.', image: earlGreyImg },
  { id: 'matcha', name: 'Matcha', description: 'Ceremonial-grade green tea whisked to a smooth, vibrant froth.', image: matchaImg },
  { id: 'chai-latte', name: 'Chai Latte', description: 'Warming spiced tea blended with steamed frothy milk.', image: chaiLatteImg },
  { id: 'mint-tea', name: 'Mint Tea', description: 'Fresh and cooling — pure peppermint leaves steeped to perfection.', image: mintTeaImg },
  { id: 'peach-iced-tea', name: 'Peach Iced Tea', description: 'Chilled black tea infused with sweet ripe peach — refreshingly fruity.', image: peachIcedTeaImg },
  { id: 'iced-chai-latte', name: 'Iced Chai Latte', description: 'Spiced chai poured over ice with cold frothy milk.', image: icedChaiLatteImg },
]

const MILKS = ['Semi-Skimmed', 'Full Fat', 'Plant-Based', 'None']

function TeaCard({ tea }) {
  const { basket, addItem, updateQuantity } = useBasket()
  const [localMilk, setLocalMilk] = useState('Semi-Skimmed')

  const basketId = `${tea.id}-${localMilk}`
  const qty = basket.find(i => i.basketId === basketId)?.quantity ?? 0
  const totalQty = basket.filter(i => i.id === tea.id).reduce((sum, i) => sum + i.quantity, 0)

  const handleMilkSelect = (milk) => setLocalMilk(milk)

  return (
    <div className="tea-card">
      <div className="tea-card__img-wrap">
        <img className="tea-card__img" src={tea.image} alt={tea.name} />
        {totalQty > 0 && (
          <span className="tea-card__badge">{totalQty}</span>
        )}
      </div>
      <div className="tea-card__body">
        <h3 className="tea-card__name">{tea.name}</h3>
        <p className="tea-card__desc">{tea.description}</p>
        <div className="tea-card__milk-pills">
          {MILKS.map(milk => (
            <button
              key={milk}
              className={`tea-card__milk-pill${localMilk === milk ? ' tea-card__milk-pill--active' : ''}`}
              onClick={() => handleMilkSelect(milk)}
            >
              {milk}
            </button>
          ))}
        </div>
        <div className="tea-card__controls">
          <button
            className="tea-card__btn"
            onClick={() => updateQuantity(basketId, qty - 1)}
            disabled={qty === 0}
            aria-label={`Remove one ${tea.name}`}
          >−</button>
          <span className="tea-card__qty">{qty}</span>
          <button
            className="tea-card__btn"
            onClick={() => addItem(tea, localMilk)}
            aria-label={`Add one ${tea.name}`}
          >+</button>
        </div>
      </div>
    </div>
  )
}

const TeaType = () => {
  const navigate = useNavigate()
  const { basketCount } = useBasket()

  return (
    <div className="tea-type">
      <div className="tea-type__header">
        <button className="tea-type__back" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="tea-type__title">Teas</h1>
        <div className="tea-type__nav">
          <Link className="tea-type__nav-btn tea-type__nav-btn--coffee" to="/coffee">Coffee</Link>
          <Link className="tea-type__nav-btn tea-type__nav-btn--basket" to="/basket">
            Basket
            {basketCount > 0 && (
              <span className="tea-type__basket-badge">{basketCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className="tea-type__grid">
        {TEAS.map(tea => (
          <TeaCard key={tea.id} tea={tea} />
        ))}
      </div>
    </div>
  )
}

export default TeaType
