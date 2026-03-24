import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './website/pages/home/home'
import CoffeeType from './website/pages/coffeeType/coffeeType'
import TeaType from './website/pages/teaType/teaType'
import Vessel from './website/pages/vessel/vessel'
import BasketPage from './website/pages/basket/basket'
import BasketNav from './website/components/basket/basket'

const AppRoutes = () => {
  return (
    <>
      <HashRouter>
        <BasketNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee" element={<CoffeeType />} />
          <Route path="/tea" element={<TeaType />} />
          <Route path="/vessel" element={<Vessel />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default AppRoutes
