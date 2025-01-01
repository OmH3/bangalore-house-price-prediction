import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [area,setArea] = useState('')
  const [bhk,setBHK] = useState('')
  const [bath,setBath] = useState('')
  const [location,setLocation] = useState('')
  const [price,setPrice] = useState('')
  const [places,setPlaces] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await fetch('http://localhost:5000/get-locations')
        const data = await response.json()
        setPlaces(data.locations)
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])

  const estimatePrice = async()=>{
    try{
      const response = await fetch('http://localhost:5000/predict-price',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          total_sqft : parseFloat(area),
          location:location,
          bhk:parseInt(bhk),
          bath : parseInt(bath),
        })
      })
      const data = await response.json()
      setPrice(data.estimated_price)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      <div>
        <p>Area (Square Feet)</p>
        <input type="number" value={area} onChange={(e)=>setArea(e.target.value)}/>
      </div>
      <div>
        <p>BHK</p>
        <div>
        <button value='1' onClick={(e)=>setBHK(e.target.value)}>1</button>
        <button value='2' onClick={(e)=>setBHK(e.target.value)}>2</button>
        <button value='3' onClick={(e)=>setBHK(e.target.value)}>3</button>
        <button value='4' onClick={(e)=>setBHK(e.target.value)}>4</button>
        <button value='5' onClick={(e)=>setBHK(e.target.value)}>5</button>
        </div>
      </div>
      <div>
        <p>Bath</p>
        <div>
        <button value='1' onClick={(e)=>setBath(e.target.value)}>1</button>
        <button value='2' onClick={(e)=>setBath(e.target.value)}>2</button>
        <button value='3' onClick={(e)=>setBath(e.target.value)}>3</button>
        <button value='4' onClick={(e)=>setBath(e.target.value)}>4</button>
        <button value='5' onClick={(e)=>setBath(e.target.value)}>5</button>
        </div>
      </div>
      <div>
        <p>Location</p>
        <select value={location} onChange={(e)=>setLocation(e.target.value)}>
        {places.map((place,index)=>(
          <option key={index} value={place}>{place}</option>
        ))}
        </select>
      </div>
      <div>
        <button onClick={estimatePrice}>Estimate Price</button>
        <p>{price}</p>
      </div>
      <div>

      </div>
    </div>
  )
}

export default App
