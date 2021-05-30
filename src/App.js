
import './App.css';
import {Switch, Route} from 'react-router-dom';


import HomePage from './pages/HomePage';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signIn' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
