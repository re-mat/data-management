import axios from 'axios'
import React, {useState, useEffect, useContext, useRef} from 'react'
import {Redirect} from "react-router-dom";
import {host} from '../settings'
import {GlobalContext} from "./App";
import ToolSubmit from "../containers/ToolSubmit";
import LoadingPage from "../components/LoadingPage";

const Tool = () => {
  const {userState, toolDispatch, flashError} = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const submitRef = useRef(null)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      try {
        const response = await axios.get(host + '/experiments/init')
        const data = response.data
        if (response.status === 200) {
          toolDispatch({type: 'INIT', payload: data})
        }
      } catch (e) {
        flashError('Oops. Something went wrong. Retrying...')
        setError(true)
      }
      setLoading(false)
    }
    init()
  })
 

  if (loading) {
    return <LoadingPage/>
  }
  if (error) {
    return <Redirect to='/tool'/>
  }
  return (<>

    <div className='w-full md:flex flex-col md:container md:mx-auto mt-10 border rounded p-5'
         ref={submitRef}>
         {userState.signedIn &&
        <ToolSubmit/>}
    </div>
  </>)
}

export default Tool
