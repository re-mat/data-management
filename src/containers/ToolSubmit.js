import React, {useContext, useEffect, useReducer, useState} from "react";
import {GlobalContext} from "../pages/App";
import {
  defaultPrecision,
  materialNameOptions,
  catalystOptions,
  carbonSourceOptions,
  prepNameOptions,
  shapeOptions,
  host
} from "../settings";
import submissionReducer, {submissionDefaultState} from "../reducers/submissionReducer";
import axios from "axios";

const ToolSubmit = () => {
  const {userState, toolState} = useContext(GlobalContext)
  const [submissionState, submissionDispatch] = useReducer(submissionReducer, submissionDefaultState)
  const [authorIdToAdd, setAuthorIdToAdd] = useState(1)

  useEffect(() => {
    for (const author of toolState.authors) {
      if (author.id === userState.authorId) {
        submissionDispatch({type: 'INIT_SUBMISSION', payload: author})
        return
      }
    }
  }, [])

  const addAuthor = () => {
    for (const author of submissionState.authors) {
      if (author.id === authorIdToAdd) {
        return
      }
    }
    for (const author of toolState.authors) {
      if (author.id === authorIdToAdd) {
        const payload = author
        submissionDispatch({type: 'ADD_AUTHOR', payload})
      }
    }
  }
  const addPrepStep = () => {
    submissionDispatch({type: 'ADD_PREPARATION_STEP'})
  }
  const onSubmitExperiment = () => {
    if (!userState.signedIn) {
      alert("Please log in before making a new submission.")
      return
    }

    let formData = new FormData()
    for (const file of submissionState.semFiles) {
      formData.append(`sem_${file.name}`, file)
    }
    for (const file of submissionState.ramanFiles) {
      formData.append(`raman_${file.name}`, file)
    }

    let experimentData = {...submissionState}
    delete experimentData.semFiles
    delete experimentData.ramanFiles

    const stringifiedExperimentData = JSON.stringify(experimentData)
    formData.append('experimentData', stringifiedExperimentData)
    axios.post(host + '/experiments/submit', formData).then(function (response) {
      alert(response.data);
    })
    .catch(function (error) {
      alert(error);
    });
  }
  const environmentConditionsForm =
    submissionState.useCustomEnvironmentConditions
      ?
      <div className='md:w-3/4 flex flex-col md:items-center'>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-ambient-temperature">
              Ambient Temperature
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-ambient-temperature" type="number" step={defaultPrecision}
              value={submissionState.ambientTemperature}
              onChange={e => submissionDispatch({
                type: 'AMBIENT_TEMPERATURE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>&deg;C</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-dew-point">
              Dew Point
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-dew-point" type="number" step={defaultPrecision} value={submissionState.dewPoint}
              onChange={e => submissionDispatch({
                type: 'DEW_POINT_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>&deg;C</span>
        </div>
      </div>
      :
      <>
        <div>
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                 htmlFor="env-con-submit">
            Environment Conditions Number
          </label>
        </div>
        <div className="md:w-1/4 relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="env-con-submit"
            onChange={e => submissionDispatch({
              type: 'ENVIRONMENT_CONDITIONS_NUMBER_CHANGE', payload: parseInt(e.target.value)
            })}
            value={submissionState.environmentConditionsNumber}
          >
            {toolState.environmentConditions.map((envCon) => {
              return <option key={envCon.id}>{envCon.id}</option>
            })}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </>

  const furnaceForm =
    submissionState.useCustomFurnace
      ?
      <div className='md:w-3/4 flex flex-col md:items-center'>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-tube-diameter">
              Tube Diameter
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-tube-diameter" type="number" step={defaultPrecision}
              value={submissionState.tubeDiameter}
              onChange={e => submissionDispatch({
                type: 'TUBE_DIAMETER_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-cross-sectional-area">
              Cross Sectional Area
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-cross-sectional-area" type="number" step={defaultPrecision}
              value={submissionState.crossSectionalArea}
              onChange={e => submissionDispatch({
                type: 'CROSS_SECTIONAL_AREA_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm&sup2;</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-tube-length">
              Tube Length
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-tube-length" type="number" step={defaultPrecision}
              value={submissionState.tubeLength}
              onChange={e => submissionDispatch({
                type: 'TUBE_LENGTH_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-lohr">
              Length of Heated Region
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-lohr" type="number" step={defaultPrecision}
              value={submissionState.lengthOfHeatedRegion}
              onChange={e => submissionDispatch({
                type: 'LENGTH_OF_HEATED_REGION_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm</span>
        </div>
      </div>
      :
      <>
        <div>
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                 htmlFor="furnace-submit">
            Furnace Number
          </label>
        </div>
        <div className="md:w-1/4 relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="furnace-submit"
            onChange={e => submissionDispatch({
              type: 'FURNACE_NUMBER_CHANGE',
              payload: parseInt(e.target.value)
            })}
            value={submissionState.furnaceNumber}
          >
            {toolState.furnaces.map((furnace) => {
              return <option key={furnace.id}>Furnace {furnace.id}</option>
            })}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </>

  const substrateForm =
    submissionState.useCustomSubstrate
      ?
      <div className='md:w-3/4 md:items-center flex flex-col'>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-catalyst">
              Catalyst
            </label>
          </div>
          <div className="md:w-1/3">
            <select
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-catalyst"
              value={submissionState.catalyst}
              onChange={e => {if(e.target.value=="Other") document.getElementById("form-catalyst-box").disabled=false;submissionDispatch({type: 'CATALYST_CHANGE', payload: e.target.value});}}
            >
              {toolState.catalysts.map((catalyst) => {
                return <option key={catalyst}>{catalyst}</option>
              })}
              <option key="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="md:w-2/3">
              <input
              disabled="disabled"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-catalyst-box" type="text" value={submissionState.catalyst} placeholder="Enter Other Catalyst"
              onChange={e => submissionDispatch({
                type: 'CATALYST_CHANGE',
                payload: e.target.value
              })}
              />
        </div>
        <br></br>

        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-thickness">
              Thickness
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-thickness" type="number" step={defaultPrecision} value={submissionState.thickness}
              onChange={e => submissionDispatch({
                type: 'THICKNESS_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-diameter">
              Diameter
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-diameter" type="number" step={defaultPrecision} value={submissionState.diameter}
              onChange={e => submissionDispatch({
                type: 'DIAMETER_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span
            className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm&sup2;</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-length">
              Length
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-length" type="number" step={defaultPrecision} value={submissionState.length}
              onChange={e => submissionDispatch({
                type: 'LENGTH_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-surface-area">
              Surface Area
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-surface-area" type="number" step={defaultPrecision}
              value={submissionState.surfaceArea}
              onChange={e => submissionDispatch({
                type: 'SURFACE_AREA_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>mm</span>
        </div>
      </div>
      :
      <>
        <div>
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                 htmlFor="substrate-submit">
            Substrate Number
          </label>
        </div>
        <div className="md:w-1/4 relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="substrate-submit"
            onChange={e => submissionDispatch({
              type: 'SUBSTRATE_NUMBER_CHANGE',
              payload: parseInt(e.target.value)
            })}
            value={submissionState.substrateNumber}
          >
            {toolState.substrates.map((substrate) => {
              return <option key={substrate.id}>{substrate.id}</option>
            })}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </>

  const prepStepForm =
    <div className='flex flex-col w-full'>
      <h5 className='text-center text-xl font-bold mb-4'>Preparation Steps</h5>
      {submissionState.preparationSteps.map((preparationStep, i) => {
        return (
          <div key={i} className='py-2 px-4 mb-2 border rounded'>
            <div className='flex justify-between'>
              <h6 className='font-bold ml-3'>Preparation Step #{i + 1}</h6>
              <button
                className='w-9 h-9 text-center bg-red-500 hover:bg-red-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={() => {
                  submissionDispatch({type: 'DEL_PREPARATION_STEP', payload: i})
                }}
              >
                X
              </button>
            </div>
            <hr className='my-1'/>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Name :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.name}
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Duration :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.duration} min
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Furnace Temperature :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.furnaceTemperature} &deg;C
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Furnace Pressure :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.furnacePressure} Torr
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Sample Location :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.sampleLocation} mm
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Sample Location :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.sampleLocation} mm
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Helium Flow Rate :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.heliumFlowRate} sccm
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Hydrogen Flow Rate :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.hydrogenFlowRate} sccm
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Carbon Source Flow Rate :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.carbonSourceFlowRate} sccm
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Argon Flow Rate :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.argonFlowRate} sccm
              </span>
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-2 pr-4'>
                Cooling Rate :
              </span>
              <span className='md:w-1/2'>
                {preparationStep.coolingRate} &deg;C / min
              </span>
            </div>
          </div>
        )
      })}
      <div className='md:w-3/4 md:flex md:flex-col items-center justify-center mx-auto'>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className='md:w-1/2'>
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-name">
              Name
            </label>
          </div>
          <div className="md:w-1/3 relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="form-name"
              onChange={e => submissionDispatch({type: 'NAME_CHANGE', payload: e.target.value})}
              value={submissionState.name}
            >
              {prepNameOptions.map((prepName) => {
                return <option key={prepName}>{prepName}</option>
              })}
            </select>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-duration">
              Duration
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-duration" type="number" step={defaultPrecision} value={submissionState.duration}
              onChange={e => submissionDispatch({
                type: 'DURATION_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            min
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-furnace-temperature">
              Furnace Temperature
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-furnace-temperature" type="number" step={defaultPrecision}
              value={submissionState.furnaceTemperature}
              onChange={e => submissionDispatch({
                type: 'FURNACE_TEMPERATURE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            &deg;C
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-furnace-pressure">
              Furnace Pressure
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-furnace-pressure" type="number" step={defaultPrecision}
              value={submissionState.furnacePressure}
              onChange={e => submissionDispatch({
                type: 'FURNACE_PRESSURE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            Torr
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-sample-location">
              Sample Location
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-sample-location" type="number" step={defaultPrecision}
              value={submissionState.sampleLocation}
              onChange={e => submissionDispatch({
                type: 'SAMPLE_LOCATION_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            mm
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-helium-flow-rate">
              Helium Flow Rate
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-helium-flow-rate" type="number" step={defaultPrecision}
              value={submissionState.heliumFlowRate}
              onChange={e => submissionDispatch({
                type: 'HELIUM_FLOW_RATE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            sccm
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-hydrogen-flow-rate">
              Hydrogen Flow Rate
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-hydrogen-flow-rate" type="number" step={defaultPrecision}
              value={submissionState.hydrogenFlowRate}
              onChange={e => submissionDispatch({
                type: 'HYDROGEN_FLOW_RATE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            sccm
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-carbon-source-flow-rate">
              Carbon Source Flow Rate
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-carbon-source-flow-rate" type="number" step={defaultPrecision}
              value={submissionState.carbonSourceFlowRate}
              onChange={e => submissionDispatch({
                type: 'CARBON_SOURCE_FLOW_RATE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            sccm
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-argon-flow-rate">
              Argon Flow Rate
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-argon-flow-rate" type="number" step={defaultPrecision}
              value={submissionState.argonFlowRate}
              onChange={e => submissionDispatch({
                type: 'ARGON_FLOW_RATE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='md:w-1/6 block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            sccm
          </span>
        </div>
        <div className="md:w-full md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-cooling-rate">
              Cooling Rate
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-cooling-rate" type="number" step={defaultPrecision}
              value={submissionState.coolingRate}
              onChange={e => submissionDispatch({
                type: 'COOLING_RATE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>
            &deg;C / min
          </span>
        </div>
        <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={addPrepStep}>
          Add Preparation Step
        </button>
      </div>
    </div>

  const recipeForm =
    submissionState.useCustomRecipe
      ?
      <div className='md:w-3/4 flex flex-col items-center'>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-carbon-source">
              Carbon Source
            </label>
          </div>
          <div className="md:w-1/3">
            <select
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-carbon-source"
              onChange={e => submissionDispatch({type: 'CARBON_SOURCE_CHANGE', payload: e.target.value})}
              value={submissionState.carbonSource}
            >
              {toolState.carbonSource.map((carbonSource) => {
                return <option key={carbonSource}>{carbonSource}</option>
              })}
            </select>
          </div>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-base-pressure">
              Base Pressure
            </label>
          </div>
          <div className="md:w-2/6">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-base-pressure" type="number" step={defaultPrecision}
              value={submissionState.basePressure}
              onChange={e => submissionDispatch({
                type: 'BASE_PRESSURE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>Torr</span>
        </div>
        <hr className='mb-2'/>
        {prepStepForm}
      </div>
      :
      <>
        <div>
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                 htmlFor="recipe-submit">
            Recipe Number
          </label>
        </div>
        <div className="md:w-1/4 relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="recipe-submit"
            onChange={e => submissionDispatch({
              type: 'RECIPE_NUMBER_CHANGE',
              payload: parseInt(e.target.value)
            })}
            value={submissionState.recipeNumber}
          >
            {toolState.recipes.map((recipe) => {
              return <option key={recipe.id}>{recipe.id}</option>
            })}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </>
  const propertiesForm =
    submissionState.useCustomProperties
      ?
      <div className='md:w-3/4 flex flex-col md:items-center'>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-avd-thickness-of-growth">
              Average Thickness of Growth
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-avd-thickness-of-growth" type="number" step={defaultPrecision}
              value={submissionState.avgThicknessOfGrowth}
              onChange={e => submissionDispatch({
                type: 'AVG_THICKNESS_OF_GROWTH_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>nm</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-std-dev-of-growth">
              Std. Dev. of Growth
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-std-dev-of-growth" type="number" step={defaultPrecision}
              value={submissionState.stdDevOfGrowth}
              onChange={e => submissionDispatch({
                type: 'STD_DEV_OF_GROWTH_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>nm</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-number-of-layers">
              Number of Layers
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-number-of-layers" type="number" step={1} value={submissionState.numberOfLayers}
              onChange={e => submissionDispatch({
                type: 'NUMBER_OF_LAYERS_CHANGE',
                payload: parseInt(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'/>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-growth-coverage">
              Growth Coverage
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-growth-coverage" type="number" step={0.01} value={submissionState.growthCoverage}
              onChange={e => submissionDispatch({
                type: 'GROWTH_COVERAGE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>%</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-domain-size">
              Domain Size
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-domain-size" type="number" step={defaultPrecision}
              value={submissionState.domainSize}
              onChange={e => submissionDispatch({
                type: 'DOMAIN_SIZE_CHANGE',
                payload: parseFloat(e.target.value)
              })}
            />
          </div>
          <span className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pl-2'>um&sup2;</span>
        </div>
        <div className="md:w-3/4 md:flex md:items-center mb-6">
          <div className="md:w-1/2">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="form-shape">
              Shape
            </label>
          </div>
          <div className="md:w-1/3">
            <select
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="form-shape"
              onChange={e => submissionDispatch({type: 'SHAPE_CHANGE', payload: e.target.value})}
              value={submissionState.shape}
            >
              {shapeOptions.map((shape) => {
                return <option key={shape}>{shape}</option>
              })}
            </select>
          </div>
        </div>
      </div>
      :
      <>
        <div>
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                 htmlFor="properties-submit">
            Properties Number
          </label>
        </div>
        <div className="md:w-1/4 relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="properties-submit"
            onChange={e => submissionDispatch({
              type: 'PROPERTIES_NUMBER_CHANGE',
              payload: parseInt(e.target.value)
            })}
            value={submissionState.propertiesNumber}
          >
            {toolState.properties.map((property) => {
              return <option key={property.id}>{property.id}</option>
            })}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </>

  const authorsForm =
    <div className='flex flex-col md:w-full'>
      {submissionState.authors.map((author, i) => {
        return (
          <div key={i} className='md:w-3/4 py-2 px-4 mb-2 border rounded mx-auto'>
            <div className='flex justify-between'>
              <h6 className='font-bold ml-3'>Author #{author.id}</h6>
              <button
                className='w-9 h-9 text-center bg-red-500 hover:bg-red-700 text-white text-3xl font-bold rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={() => {
                  submissionDispatch({type: 'DEL_AUTHOR', payload: i})
                }}
              >
                X
              </button>
            </div>
            <hr className='my-1'/>
            <div className='w-full md:flex md:items-center mb-1'>
              <span className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>Name :</span>
              {author.first_name + " " + author.last_name}
            </div>
            <div className='w-full md:flex md:items-center mb-1'>
              <span
                className='md:w-1/2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>Institution :</span>
              {author.institution}
            </div>
          </div>
        )
      })}
      <div className='flex items-center justify-center'>
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
               htmlFor="author-submit">
          Author Number
        </label>
        <div className='relative mr-4 w-1/4'>
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="author-submit"
            value={authorIdToAdd}
            onChange={e => setAuthorIdToAdd(parseInt(e.target.value))}
          >
            {toolState.authors.map((author) => {
              return <option key={author.id}>{author.id}</option>
            })}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={addAuthor}>
          Add Author
        </button>
      </div>
    </div>


  return (
    <>
      <h2 className='text-center text-4xl font-bold mb-4'>Submit New Experiment Data</h2>
      <hr className='mb-5'/>
      <div className='w-full md:flex flex-row mt-5 '>
      <div className='md:w-1/2 flex flex-col border p-3'>
      <div className='md:w-3/4 md:flex md:mx-auto md:justify-center items-center mb-5'>
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
               htmlFor="form-material-name">
          Material Name
        </label>
        <div className="md:w-1/4 relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="form-material-name"
            onChange={e => submissionDispatch({type: 'MATERIAL_NAME_CHANGE', payload: e.target.value})}
            value={submissionState.materialName}
          >
            {materialNameOptions.map((materialName) => {
              return <option key={materialName}>{materialName}</option>
            })}
          </select>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
      <hr className='mb-5'/>
      <h4 className='text-center text-3xl font-bold mb-4'>Environment Conditions</h4>
      <div className="md:flex md:items-center md:justify-center mb-6">
        <label className="block text-gray-500 font-bold">
          <input className="mr-2 leading-tight" type="checkbox"
                 onChange={e => submissionDispatch({
                   type: 'SET_CUSTOM_ENVIRONMENT_CONDITIONS',
                   payload: e.target.checked
                 })}/>
          <span className="text-sm">
              I will upload new Environment Conditions
            </span>
        </label>
      </div>
      <div className="md:w-3/4 md:flex md:items-center md:justify-center mb-6 mx-auto">
        {environmentConditionsForm}
      </div>
      <hr className='mb-5'/>
      <h4 className='text-center text-3xl font-bold mb-4'>Furnace</h4>
      <div className="md:flex md:items-center md:justify-center mb-6">
        <label className="block text-gray-500 font-bold">
          <input className="mr-2 leading-tight" type="checkbox"
                 onChange={e => submissionDispatch({type: 'SET_CUSTOM_FURNACE', payload: e.target.checked})}/>
          <span className="text-sm">
              I will upload a new Furnace
            </span>
        </label>
      </div>
      <div className="md:w-3/4 md:flex md:items-center md:justify-center mb-6 mx-auto">
        {furnaceForm}
      </div>
      <hr className='mb-5'/>
      <h4 className='text-center text-3xl font-bold mb-4'>Substrate</h4>
      <div className="md:flex md:items-center md:justify-center mb-6">
        <label className="block text-gray-500 font-bold">
          <input className="mr-2 leading-tight" type="checkbox"
                 onChange={e => submissionDispatch({
                   type: 'SET_CUSTOM_SUBSTRATE',
                   payload: e.target.checked
                 })}/>
          <span className="text-sm">
              I will upload a new Substrate
            </span>
        </label>
      </div>
      <div className="md:w-3/4 md:flex md:items-center md:justify-center mb-6 mx-auto">
        {substrateForm}
      </div>
      
      <hr className='mb-5'/>
      <h4 className='text-center text-3xl font-bold mb-4'>Properties</h4>
      <div className="md:flex md:items-center md:justify-center mb-6">
        <label className="block text-gray-500 font-bold">
          <input className="mr-2 leading-tight" type="checkbox"
                 onChange={e => submissionDispatch({
                   type: 'SET_CUSTOM_PROPERTIES',
                   payload: e.target.checked
                 })}/>
          <span className="text-sm">
              I will upload new Properties
            </span>
        </label>
      </div>
      <div className="md:w-3/4 md:flex md:items-center md:justify-center mb-6 mx-auto">
        {propertiesForm}
      </div>

      </div>
      <div className='md:w-1/2 flex flex-col border p-3'>

      <h4 className='text-center text-3xl font-bold mb-4'>Recipe</h4>
      <div className="md:flex md:items-center md:justify-center mb-6">
        <label className="block text-gray-500 font-bold">
          <input className="mr-2 leading-tight" type="checkbox"
                 onChange={e => submissionDispatch({type: 'SET_CUSTOM_RECIPE', payload: e.target.checked})}/>
          <span className="text-sm">
              I will upload a new Recipe
            </span>
        </label>
      </div>
      <div className="md:w-3/4 md:flex md:items-center md:justify-center mb-6 mx-auto">
        {recipeForm}
      </div>
      <hr className='mb-5'/>
      <h4 className='text-center text-3xl font-bold mb-4'>Authors</h4>
      <div className="md:w-3/4 md:flex md:flex-col md:items-center md:justify-center mb-6 mx-auto">
        {authorsForm}
      </div>

      <hr className='mb-5'/>
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label htmlFor="sem-files" className="form-label inline-block mb-2 text-gray-700">
            SEM File(s)
          </label>
          <input className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 type="file" id="sem-files"
                 onChange={e => submissionDispatch({type: 'UPLOAD_SEM_FILES', payload: e.target.files})}
                 multiple/>
        </div>
      </div>

      <hr className='mb-5'/>
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label htmlFor="raman-files" className="form-label inline-block mb-2 text-gray-700">
            RAMAN File(s)
          </label>
          <input className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 type="file" id="raman-files"
                 onChange={e => submissionDispatch({type: 'UPLOAD_RAMAN_FILES', payload: e.target.files})}
                 multiple/>
        </div>
      </div>

      </div>
      </div>

      <hr className='mb-5'/>
      <button
        className="w-1/12 self-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={onSubmitExperiment}>
        Submit
      </button>
      
    </>
  )
}

export default ToolSubmit