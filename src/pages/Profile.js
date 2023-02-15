import React, {useContext, useState, useEffect} from 'react'
import {GlobalContext} from "./App";
import axios from "axios";
import {host} from "../settings";

const Profile = () => {  
  const {userState} = useContext(GlobalContext)
  const id = userState.authorId;
  const [author, setAuthor] = useState('')
  useEffect(() => {
    const init = async (id) => {
      try {
        const response = await axios.get(host + '/auth/profile/'+id)
        const data = response.data
        if (response.status === 200) {
          setAuthor(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    init(id)
  }, [])
 
  return (
    <div className='md:w-1/2 flex flex-col md:items-center mx-auto border rounded my-6 py-6'>
      <h2 className='text-center text-3xl font-bold mb-6'>User Profile</h2>
      <hr className='my-1'/>
      <div className='w-full md:flex md:items-center mb-1'>
        <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>Author Id :</span>
        {id}
      </div>
      <div className='w-full md:flex md:items-center mb-1'>
        <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>First Name :</span>
        {author.first_name}
      </div>
      <div className='w-full md:flex md:items-center mb-1'>
        <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>Last Name :</span>
        {author.last_name}
      </div>
      <div className='w-full md:flex md:items-center mb-1'>
        <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>Institution :</span>
        {author.institution}
      </div>
    </div>
  )
}

export default Profile
