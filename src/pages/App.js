import React, {useState, useEffect, useReducer} from "react";
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import './App.css';

import {signInWithToken} from "../utils/auth";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";
import Profile from "./Profile";
import Navbar from "../components/Navbar";
import Tool from "./Tool";
import ExperimentView from "./ExperimentView";
import toolReducer, {toolDefaultState} from "../reducers/toolReducer";
import userReducer, {userDefaultState} from "../reducers/userReducer";
export const GlobalContext = React.createContext();

const App = () => {
  const [toolState, toolDispatch] = useReducer(toolReducer, toolDefaultState)
  const [userState, userDispatch] = useReducer(userReducer, userDefaultState)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const flashSuccess = (text) => {
    let msg =
      <div
        className='w-full bg-green-400 rounded text-center text-green-100 font-bold text-2xl py-2 mb-4'>
        {text}
      </div>
    setSuccessMsg(msg)
    setTimeout(() => {
      setSuccessMsg(null)
    }, 5000)
  }
  const flashError = (text) => {
    let msg =
      <div
        className='w-full bg-red-600 rounded text-center text-green-100 font-bold text-2xl py-2 mb-4'>
        {text}
      </div>
    setErrorMsg(msg)
    setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
  }
  useEffect(() => {
      const trySignIn = async () => {
        const token = window.localStorage.getItem('token');
        if (token) {
          try {
            const response = await signInWithToken(token);
            window.localStorage.setItem('token', response.token)
            const payload = {
              authorId: response.author_id
            }
            userDispatch({type: 'SIGN_IN', payload})
          } catch (e) {
            if (e.response && e.response.status === 401)
              alert('Email or password is incorrect.')
            window.localStorage.removeItem('token')
          }
        } else {
          userDispatch({type: 'SIGN_OUT'})
        }
      }
      trySignIn();
    }, []
  )

  return (
    <GlobalContext.Provider
      value={{userState, userDispatch, flashSuccess, flashError, toolState, toolDispatch}}
    >
      <Router>
        <Navbar/>
        {successMsg}
        {errorMsg}
        <Switch>
          <Route exact path='/'>
            <Tool/>
          </Route>
          <Route exact path='/tool'>
            <Tool/>
          </Route>
          <Route path='/tool/experiments'>
            <ExperimentView/>
          </Route>
          <Route path='/profile'>
            <Profile/>
          </Route>
          <Route path='/signin'>
            <Signin/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
        </Switch>
        <div className='h-96'/>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
