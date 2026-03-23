import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './website/pages/home/home'
import CoffeeType from './website/pages/coffeeType/coffeeType'
import Vessel from './website/pages/vessel/vessel'
import Basket from './website/pages/basket/basket'

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee-type" element={<CoffeeType />} />
          <Route path="/vessel" element={<Vessel />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
