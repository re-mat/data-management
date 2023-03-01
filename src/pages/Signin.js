import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router'
import {GlobalContext} from './App'
import {signInWithCredentials} from '../utils/auth'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const g = useContext(GlobalContext)

  const onClickSignInBtn = async (e) => {
    e.preventDefault()
    try {
      const data = await signInWithCredentials(email, password)
      // window.localStorage.setItem('token', data.token)
      const payload = {
        authorId: data.id
      }
      g.userDispatch({type: 'SIGN_IN', payload})
    } catch (err) {
      alert('Incorrect email or password.')
    }
  }

  if (g.userState.signedIn) {
    return <Redirect to='/'/>
  }
  return (<form className='md:w-1/2 flex flex-col md:items-center mx-auto border rounded my-6 py-6'
                onSubmit={onClickSignInBtn}>
    <h2 className='text-center text-3xl font-bold mb-6'>Sign In</h2>
    <div className="md:w-full md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
               htmlFor="email">
          Email
        </label>
      </div>
      <div className="md:w-1/3">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="email" type="email" placeholder="Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
      </div>
    </div>
    <div className="md:w-full md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
               htmlFor="password">
          password
        </label>
      </div>
      <div className="md:w-1/3">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="password" type="password" placeholder="********"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
      </div>
    </div>
    <button
      className='self-center w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5'
      type='submit'>
      Sign In
    </button>
  </form>)
}

export default Signin
