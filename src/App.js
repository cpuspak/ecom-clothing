
import './App.css';
import {Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import HomePage from './pages/HomePage';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import React from 'react';
import { setCurrentUser} from './redux/user/user.actions';



class App extends React.Component{
  
  unsubscribeFromAuth = null;

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })

          console.log(this.state)
        });
        
      } else {
        setCurrentUser(userAuth);
      }
      //this.setState({currentUser : user});
      //createUserProfileDocument(user);
      //console.log(user);
    });


  }
  
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signIn' render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}
  
const mapStateToProps = ({user}) => ({  //destructuring the user reducer from the state in argument
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
