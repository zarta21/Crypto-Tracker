import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Coin from './components/Coin';
import Header from './components/Header';
import DetailPage from './pages/DetailPage';

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [mainPage, setMainPage] = useState(true);

  useEffect(() => {
    setSearchWord("");
  }, [mainPage])

  return (
    <div className="App">
      <BrowserRouter>
        <Header setSearchWord={setSearchWord} mainPage={mainPage} />     
          <Routes>
            <Route index element={<Coin searchWord={searchWord} setSearchWord={setSearchWord} setMainPage={setMainPage} />} />
              <Route path='/coins/:id' element={<DetailPage setMainPage={setMainPage} />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
