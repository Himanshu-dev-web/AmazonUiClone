import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Productdetails from './components/Productdetails';
import { store } from '../src/app/store'
import Header from '../src/components/Header';
import Home from './components/Home';
import Checkout from './pages/checkout';
import { Provider } from 'react-redux';
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  console.log(search);
  return (
    <div>
    <Provider store={store}>
      <BrowserRouter>
        <Header setSearch={setSearch}/>
          <Routes>
              <Route path='/'   element={<Home  search={search}/>}/>
              <Route path='/details/:id'  search={search} element={<Productdetails/>}/>
              <Route path='/checkout'  element={<Checkout/>}/>
          </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
