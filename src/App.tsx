import React, { useState, useEffect } from 'react';
import { Event } from './interface';
import { fetchEvents, fetchRegions,fetchPostalCodes,fetchDepartments, fetchDescriptions } from './composantes/FuncAPI';
import EventCollection from './composantes/EventCollection';
import './App.css';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [initialEvents, setInitialEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [regions, setRegions] = useState<string[]>([]);
  const [Mois, setSelectedMois] = useState<string>('');
  const [Departments, setDepartments] = useState<any[]>([]);
  const [PostalCodes, setPostalCodes] = useState<any[]>([]);
  const [Descriptions, setDescriptions] = useState<any[]>([]);



  

  const mois = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];


  useEffect(() => {
    const fetchData = async () => {

      const fetchedEvents = await fetchEvents();
      console.log("Liste recupere 1 :", fetchedEvents);


      const fetchedRegions = await fetchRegions();
      console.log("Liste recupere api Regions  :", fetchedRegions);


      ///non utilise dans l'app juste recup dans le console
      const fetchedDepartments = await fetchDepartments();
      console.log("Liste recupere api Departments :", fetchedDepartments);


      ///non utilise dans l'app juste recup dans le console
      const fetchedPostalCodes = await fetchPostalCodes();
      console.log("Liste recupere api PostalCodes :", fetchedPostalCodes);


      ///non utilise dans l'app juste recup dans le console
      const fetchedDescriptions = await fetchDescriptions();
      console.log("Liste recupere api Descriptions :", fetchedDescriptions);


      setEvents(fetchedEvents);
      setRegions(fetchedRegions);

      setInitialEvents(fetchedEvents);


    };
    fetchData();
  }, []);


////////////////////
  const handleRegionChange = async (region: string) => {

    setSelectedRegion(region);
    let filteredEvents: Event[];

    if (region) {
      const allEvents = await fetchEvents();
      filteredEvents = allEvents.filter(event => event.location_region === region);

    } else {

      filteredEvents = await fetchEvents();
    }
    setEvents(filteredEvents);
  };


////////////////
  const handleSearchChange = async (searchTerm: string) => {

    setSearchTerm(searchTerm);

    const allEvents = await fetchEvents();
    const filteredEvents = allEvents.filter(event =>event.title_fr.toLowerCase().includes(searchTerm.toLowerCase())

    );
    setEvents(filteredEvents);
  };
  
  /////////////
const handleMonthChange1 = (month: string) => {
    setSelectedMois(month);
    let filteredEvents: Event[] = initialEvents.slice();
   
    if (month) {
      filteredEvents = filteredEvents.filter(event => event.daterange_fr.toLowerCase().includes(month.toLowerCase()));
    } else {
      filteredEvents = initialEvents.slice();
    }
    
    setEvents(filteredEvents);
};

/////
const handleClear = () => {
  setSearchTerm('');
  setSelectedRegion('');
  setSelectedMois('');
  setEvents(initialEvents);
};

////////
const handleMoisChange = async (region: string, mois: string) => {
  setSelectedRegion(region);
  setSelectedMois(mois);

  let filteredEvents: Event[] = initialEvents.slice();

  if (region) {
    filteredEvents = filteredEvents.filter(event => event.location_region === region);
  }

  if (mois) {
    filteredEvents = filteredEvents.filter(event => event.daterange_fr.toLowerCase().includes(mois.toLowerCase()));
  }

  setEvents(filteredEvents);
};



  
  return (
    <div className="App">
      <header className="pokemon-header">Événements Publics</header>
      <div>
       
        {/* barre de recherc */}
        <input
          type="text"
          placeholder="Rechercher des evenement"
          onChange={(e) => handleSearchChange(e.target.value)}
          value={searchTerm}
          className="pokemon-list-containertest2"
        />

        {/* Liste deroulante region */}
        <select
          onChange={(e) => handleRegionChange(e.target.value)}
          value={selectedRegion}
          className="pokemon-list-containertest2"
        >
          <option value="">Toutes les regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>


        <select
         onChange={(e) => handleMoisChange(selectedRegion, e.target.value)}
           value={Mois}
               className="pokemon-list-containertest2"
>
  <option value="">Tous les mois</option>
  {mois.map((mois) => (
    <option key={mois} value={mois}>
      {mois}
    </option>
  ))}
</select>

 <button onClick={handleClear}className="clear-button">clear</button>

      </div>
     
      <EventCollection events={events} />
    </div>
  );
}

export default App;
