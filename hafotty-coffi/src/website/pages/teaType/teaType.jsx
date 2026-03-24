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
  { id: 'english-breakfast', name: 'English Breakfast', description: 'A classic full-bodied black tea, perfect with a splash of milk.',     image: englishBreakfastImg },
  { id: 'earl-grey',         name: 'Earl Grey',         description: 'Bright black tea delicately scented with bergamot orange.',           image: earlGreyImg },
  { id: 'matcha',            name: 'Matcha',            description: 'Ceremonial-grade green tea whisked to a smooth, vibrant froth.',      image: matchaImg },
  { id: 'chai-latte',        name: 'Chai Latte',        description: 'Warming spiced tea blended with steamed frothy milk.',                image: chaiLatteImg },
  { id: 'mint-tea',          name: 'Mint Tea',          description: 'Fresh and cooling — pure peppermint leaves steeped to perfection.',   image: mintTeaImg },
  { id: 'peach-iced-tea',    name: 'Peach Iced Tea',    description: 'Chilled black tea infused with sweet ripe peach — refreshingly fruity.', image: peachIcedTeaImg },
  { id: 'iced-chai-latte',   name: 'Iced Chai Latte',   description: 'Spiced chai poured over ice with cold frothy milk.',                 image: icedChaiLatteImg },
]

const MILKS = [
  { id: 'semi-skimmed', label: 'Semi-Skimmed' },
  { id: 'full-fat',     label: 'Full Fat' },
  { id: 'plant-based',  label: 'Plant-Based' },
]

const TeaType = () => {
  const navigate = useNavigate()
  const { basket, addToBasket, updateQuantity, basketCount, milkChoice, setMilkChoice } = useBasket()

  const getQty = (id) => basket.find(i => i.id === id)?.quantity ?? 0

  const handleMilkSelect = (id) => {
    setMilkChoice(milkChoice === id ? null : id)
  }

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
        {TEAS.map(tea => {
          const qty = getQty(tea.id)
          return (
            <div key={tea.id} className="tea-card">
              <div className="tea-card__img-wrap">
                <img className="tea-card__img" src={tea.image} alt={tea.name} />
                {qty > 0 && (
                  <span className="tea-card__badge">{qty}</span>
                )}
              </div>
              <div className="tea-card__body">
                <h3 className="tea-card__name">{tea.name}</h3>
                <p className="tea-card__desc">{tea.description}</p>
                <div className="tea-card__controls">
                  <button
                    className="tea-card__btn"
                    onClick={() => updateQuantity(tea.id, qty - 1)}
                    disabled={qty === 0}
                    aria-label={`Remove one ${tea.name}`}
                  >−</button>
                  <span className="tea-card__qty">{qty}</span>
                  <button
                    className="tea-card__btn"
                    onClick={() => addToBasket(tea)}
                    aria-label={`Add one ${tea.name}`}
                  >+</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="tea-type__milk">
        <h2 className="tea-type__milk-heading">Choose your milk</h2>
        <div className="tea-type__milk-options">
          {MILKS.map(milk => (
            <button
              key={milk.id}
              className={`tea-type__milk-btn${milkChoice === milk.id ? ' tea-type__milk-btn--active' : ''}`}
              onClick={() => handleMilkSelect(milk.id)}
            >
              {milk.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeaType
