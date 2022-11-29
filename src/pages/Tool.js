import axios from 'axios'
import React, {useState, useEffect, useContext, useRef, useReducer} from 'react'
import {Redirect} from "react-router-dom";
import {host} from '../settings'
import Recipes from '../containers/Recipes'
import {GlobalContext} from "./App";
import ToolSubmit from "../containers/ToolSubmit";
import Sidebar from "../components/Sidebar";
import LoadingPage from "../components/LoadingPage";
import SearchByEnvironmentCondition from "../components/GrresqQueryBox/SearchByEnvironmentCondition";
import SearchFilters from "../containers/SearchFilters";
import SearchByFurnace from "../components/GrresqQueryBox/SearchByFurnace";
import SearchBySubstrate from "../components/GrresqQueryBox/SearchBySubstrate";
import SearchByCharacterization from "../components/GrresqQueryBox/SearchByCharacterization";
import SearchByAuthor from "../components/GrresqQueryBox/SearchByAuthor";
import SearchByRecipe from "../components/GrresqQueryBox/SearchByRecipe"; 
import QueryResultTable from "../containers/QueryResultTable";

const Tool = () => {
  const {userState, toolState, toolDispatch, flashError, flashSuccess} = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [showEnvironmentConditions, setShowEnvironmentConditions] = useState(false)
  const [showFurnaces, setShowFurnaces] = useState(false)
  const [showSubstrates, setShowSubstrates] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [showProperties, setShowProperties] = useState(false)
  const [showAuthors, setShowAuthors] = useState(false)

  const [mouseOverEnvironmentConditions, setMouseOverEnvironmentConditions] = useState(false)
  const [mouseOverFurnaces, setMouseOverFurnaces] = useState(false)
  const [mouseOverSubstrates, setMouseOverSubstrates] = useState(false)
  const [mouseOverRecipes, setMouseOverRecipes] = useState(false)
  const [mouseOverProperties, setMouseOverProperties] = useState(false)
  const [mouseOverAuthors, setMouseOverAuthors] = useState(false)

  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [ambientTemperatureAddedToCurrentFilter, setAmbientTemperatureAddedToCurrentFilter] = useState(false)
  // const [tubeDiameterAddedToCurrentFilter, setTubeDiameterAddedToCurrentFilter] = useState(false)
  // const [crossSectionalAreaAddedToCurrentFilter, crossSectionalAreaToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)
  // const [dewPointAddedToCurrentFilter, setDewPointAddedToCurrentFilter] = useState(false)

  const queryRef = useRef(null)
  const resultRef = useRef(null)
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
  }, [])
  useEffect(() => {
    document.getElementById('environment-conditions-btn').innerHTML = showEnvironmentConditions ? '&#8211;' : '+'
  }, [showEnvironmentConditions])
  useEffect(() => {
    document.getElementById('furnace-btn').innerHTML = showFurnaces ? '&#8211;' : '+'
  }, [showFurnaces])
  useEffect(() => {
    document.getElementById('substrate-btn').innerHTML = showSubstrates ? '&#8211;' : '+'
  }, [showSubstrates])
  useEffect(() => {
    document.getElementById('recipe-btn').innerHTML = showRecipes ? '&#8211;' : '+'
  }, [showRecipes])
  useEffect(() => {
    document.getElementById('author-btn').innerHTML = showAuthors ? '&#8211;' : '+'
  }, [showAuthors])
  useEffect(() => {
    document.getElementById('property-btn').innerHTML = showProperties ? '&#8211;' : '+'
  }, [showProperties])

  const fetchExperiments = async () => {
    if (toolState.filters.length === 0) {
      alert("There is no selected filter.")
      return
    }
    setLoading(true)
    try {
      const response = await axios.post(host + '/experiments/query', toolState.filters)
      const data = response.data
      toolDispatch({type: 'SET_QUERY_RESULT', payload: data})
      toolDispatch({type: 'SAVE_FILTERS'})
    } catch (e) {
      flashError('Oops. Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingPage/>
  }
  if (error) {
    return <Redirect to='/tool'/>
  }
  return (<>
    <Sidebar
      texts={['Query', 'Result', 'Submission']}
      refs={[queryRef, resultRef, submitRef]}
    />
    <div className='w-full md:flex flex-col md:container md:mx-auto mt-5 border rounded p-5'
         ref={queryRef}>
      <h2 className='text-center text-4xl font-bold mr-2 md:mb-4'>Query</h2>
      <hr/>
      <div className='w-full md:flex flex-row mt-5 '>
        <div className='md:w-1/2 px-10'>
          <h2 className='text-center text-4xl font-bold mr-2 md:mb-4'>Search By</h2>
          <div className='h-screen-3/4 overflow-y-scroll border p-3'>
            <section className='w-full flex flex-col mb-5'>
              <div className='flex justify-center align-middle mb-4'>
                <h2 className='text-center text-3xl font-bold mr-2'>Environment Conditions</h2>
                <div className='flex flex-col justify-center'>
                  <img className='w-6 h-6 mr-2' src="https://img.icons8.com/material-two-tone/24/000000/help.png"
                       alt='?'
                       onMouseOver={() => setMouseOverEnvironmentConditions(true)}
                       onMouseLeave={() => setMouseOverEnvironmentConditions(false)}/>
                </div>
                <button
                  className='w-9 h-9 self-center text-center bg-gray-400 hover:bg-blue-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                  type='button' id='environment-conditions-btn'
                  onClick={() => setShowEnvironmentConditions(!showEnvironmentConditions)}
                >
                  +
                </button>
              </div>
              {mouseOverEnvironmentConditions &&
                <div className='mx-auto my-2 p-2 bg-gray-200'>
                  Ambient temperature and dew point
                </div>
              }
              {showEnvironmentConditions || <hr/>}
              {showEnvironmentConditions && <SearchByEnvironmentCondition/>}
            </section>
            <section className='w-full flex flex-col mb-5'>
              <div className='flex justify-center align-middle mb-4'>
                <h2 className='text-center text-3xl font-bold mr-2'>Furnace</h2>
                <div className='flex flex-col justify-center'>
                  <img className='w-6 h-6 mr-2' src="https://img.icons8.com/material-two-tone/24/000000/help.png"
                       alt='?'
                       onMouseOver={() => setMouseOverFurnaces(true)}
                       onMouseLeave={() => setMouseOverFurnaces(false)}/>
                </div>
                <button
                  className='w-9 h-9 self-center text-center bg-gray-400 hover:bg-blue-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                  type='button' id='furnace-btn' onClick={() => setShowFurnaces(!showFurnaces)}
                >
                  +
                </button>
              </div>
              {mouseOverFurnaces && <div className='mx-auto my-2 p-2 bg-gray-200'>
                Static parameters of the furnace such as tube diameter
              </div>}
              {showFurnaces || <hr/>}
              {showFurnaces && <SearchByFurnace/>}
            </section>
            <section className='w-full flex flex-col mb-5'>
              <div className='flex justify-center align-middle mb-4'>
                <h2 className='text-center text-3xl font-bold mr-2'>Substrate</h2>
                <div className='flex flex-col justify-center'>
                  <img className='w-6 h-6 mr-2' src="https://img.icons8.com/material-two-tone/24/000000/help.png"
                       alt='?'
                       onMouseOver={() => setMouseOverSubstrates(true)}
                       onMouseLeave={() => setMouseOverSubstrates(false)}/>
                </div>
                <button
                  className='w-9 h-9 self-center text-center bg-gray-400 hover:bg-blue-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                  type='button' id='substrate-btn' onClick={() => setShowSubstrates(!showSubstrates)}
                >
                  +
                </button>
              </div>
              {mouseOverSubstrates && <div className='mx-auto my-2 p-2 bg-gray-200'>
                Static parameters of the substrate such as catalyst and diameter
              </div>}
              {showSubstrates || <hr/>}
              {showSubstrates && <SearchBySubstrate/>}
            </section>
            <section className='w-full flex flex-col mb-5'>
              <div className='flex justify-center align-middle mb-4'>
                <h2 className='text-center text-3xl font-bold mr-2'>Recipe</h2>
                <div className='flex flex-col justify-center'>
                  <img className='w-6 h-6 mr-2' src="https://img.icons8.com/material-two-tone/24/000000/help.png"
                       alt='?'
                       onMouseOver={() => setMouseOverRecipes(true)}
                       onMouseLeave={() => setMouseOverRecipes(false)}
                  />
                </div>
                <hr/>
                <button
                  className='w-9 h-9 self-center text-center bg-gray-400 hover:bg-blue-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                  type='button' id='recipe-btn'
                  onClick={() => setShowRecipes(!showRecipes) /* alert('temporarily disabled (under maintenance)'*/}
                >
                  +
                </button>
              </div>
              {mouseOverRecipes && <div className='mx-auto my-2 p-2 bg-gray-200'>
                Parameters describing the annealing, growing and cooling steps
              </div>}
              {showRecipes || <hr/>}
              {showRecipes && <SearchByRecipe/>}
              {/* {showRecipes && <Recipes
                recipes={toolState.recipes}
              />} */}
            </section>
            <section className='w-full flex flex-col mb-5'>
              <div className='flex justify-center align-middle mb-4'>
                <h2 className='text-center text-3xl font-bold mr-2'>Characterization</h2>
                <div className='flex flex-col justify-center'>
                  <img className='w-6 h-6 mr-2' src="https://img.icons8.com/material-two-tone/24/000000/help.png"
                       alt='?'
                       onMouseOver={() => setMouseOverProperties(true)}
                       onMouseLeave={() => setMouseOverProperties(false)}/>
                </div>
                <button
                  className='w-9 h-9 self-center text-center bg-gray-400 hover:bg-blue-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                  type='button' id='property-btn' onClick={() => setShowProperties(!showProperties)}
                >
                  +
                </button>
              </div>
              {mouseOverProperties && <div className='mx-auto my-2 p-2 bg-gray-200'>
                Properties output from characterization techniques
              </div>}
              {showProperties || <hr/>}
              {showProperties && <SearchByCharacterization/>}
            </section>
            <section className='w-full flex flex-col mb-5'>
              <div className='flex justify-center align-middle mb-4'>
                <h2 className='text-center text-3xl font-bold mr-2'>Authors</h2>
                <div className='flex flex-col justify-center'>
                  <img className='w-6 h-6 mr-2' src="https://img.icons8.com/material-two-tone/24/000000/help.png"
                       alt='?'
                       onMouseOver={() => setMouseOverAuthors(true)}
                       onMouseLeave={() => setMouseOverAuthors(false)}/>
                </div>
                <button
                  className='w-9 h-9 self-center text-center bg-gray-400 hover:bg-blue-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                  type='button' id='author-btn' onClick={() => setShowAuthors(!showAuthors)}
                >
                  +
                </button>
              </div>
              {mouseOverAuthors &&
                <div className='mx-auto my-2 p-2 bg-gray-200'>
                  Authors names and affiliations
                </div>
              }
              {showAuthors || <hr/>}
              {showAuthors && <SearchByAuthor/>}
            </section>
          </div>
        </div>

        <div className='md:w-1/2 px-10'>
          <div className='md:w-full flex flex-col'>
            <h2 className='text-center text-4xl font-bold mr-2 md:mb-4'>Current Search Filters</h2>
            <div className='h-screen-3/4 overflow-y-scroll border p-3'>
              <SearchFilters filters={toolState.filters}/>
            </div>
            <div className='md:w-full md:flex md:flex-row md:justify-evenly'>
              <button
                className='self-center w-1/3 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5'
                type='button' onClick={() => {
                fetchExperiments()
              }}
              >
                Search Experiments
              </button>
              {toolState.queryResults.length > 0 && <button
                className='self-center w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5'
                type='button' onClick={() => {
                resultRef.current.scrollIntoView({behavior: "smooth"})
              }}
              >
                Go to Results
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref={resultRef} className='w-full md:flex flex-col md:container md:mx-auto mt-10 border rounded p-5'>
      <h2 className='text-center text-4xl font-bold mb-4'>Query Result</h2>
      <hr className='mb-5'/>
      {toolState.queryResults.length === 0 &&
        <h4 className='text-center text-3xl font-bold'>No experiment was found.</h4>}
      {<QueryResultTable/>}
    </div>
    <div className='w-full md:flex flex-col md:container md:mx-auto mt-10 border rounded p-5'
         ref={submitRef}>
      {userState.signedIn &&
        <ToolSubmit/>}
    </div>
  </>)
}

export default Tool
