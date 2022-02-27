import logo from './logo.svg';
import './App.css';
import BasicTableComponent from './components/BasicTableComponent'

import PaginationTableComponent from './components/PaginationComponent';
import { useEffect, useState } from 'react';

function App() {


  const [events,setEvents]=useState([])
 useEffect(()=>{
  return fetch("http://localhost:8080/getEvents")
  .then((response)=>{
      if(response.ok){
          return response
      }
      else{
          var err=new Error("Error"+response.status);
          err.response=response;
          throw err;
      }
  
  },
  (error)=>{
      var err=new Error(error.message);
      throw err;
  })
  .then((response)=> response.json())
  .then ((e)=>{
    console.log(events)
setEvents(events=>[...events,e])
  })
  
  .catch((error)=>console.log(error))

 },[])


 

  return (
    <div className="App">
  { events.length>0 && <PaginationTableComponent events={events}/>}
    </div>
  );
}

export default App;
