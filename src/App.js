
import './App.css';
import PaginationTableComponent from './components/PaginationComponent';
import { useEffect, useState } from 'react';

function App() {
//Start Java SPringboot RestApi, and enter "http://localhost:8080/" to begin scraping. 

  const [events,setEvents]=useState([])
 useEffect(()=>{
   //Once data loaded into H2 database, fetch retrieves all events from database
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
      {/* Passing retrieved data into PaginationComponent  */}
        { events.length>0 && <PaginationTableComponent events={events}/>}
    </div>
  );
}

export default App;
