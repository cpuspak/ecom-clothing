
import './App.css';
import {Switch, Route} from 'react-router-dom';


import HomePage from './pages/HomePage';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import React from 'react';



class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser : null
    }
  }
  unsubscribeFromAuth = null;

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser : {
              id: snapShot.id,
              ...snapShot.data()
            }
          })

          console.log(this.state)
        });
        
      } else {
        this.setState({
          currentUser: userAuth
        });
      }
      //this.setState({currentUser : user});
      //createUserProfileDocument(user);
      //console.log(user);
    });


  }
  
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signIn' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}
  

export default App;
