
import axios from 'axios';
import { Event } from '../interface';
import EventList from './EventList';
import fs from 'fs';
import { saveAs } from 'file-saver';


/////////////////
/// api les infos event
export async function fetchEvents(): Promise<Event[]> {
  try{

    const res = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=100');
    const eventList: Event[] = res.data.results.map((result: any) => ({

      title_fr: result.title_fr,
      image: result.image,
      daterange_fr: result.daterange_fr,
      location_address: result.location_address,
      location_postalcode: result.location_postalcode,
      location_city: result.location_city,
      location_region: result.location_region,
      longdescription_fr: result.longdescription_fr


    }));
    return eventList;

  }
  
  catch(error){

    console.error('Erreur', error);
    throw error;
  }  
}


/////////////////
/// api regions
export async function fetchRegions(): Promise<string[]> {
  try {
    const url = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=location_region';
    const res = await axios.get(url);
    const regions: string[] = res.data.results.map((result: any) => result.location_region);



    // Supprimer les doublons
    const uniqueRegions = Array.from(new Set(regions));

    //trie
    const sortedRegions = uniqueRegions.sort();

    return sortedRegions;

  } catch (error) {
    console.error('Erreur', error);
    throw error;
  }
}
/////////////////
export async function fetchPostalCodes(): Promise<string[]> {
  try {
    const res = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=location_postalcode');
    const postalCodes: string[] = res.data.results.map((result: any) => result.location_postalcode);
 
    return postalCodes;
  } catch (error) {
    console.error('Erreur', error);
    throw error;
  }
}

/////////////////
export async function fetchDepartments(): Promise<string[]> {
  try {
    const res = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=location_department');
    const departments: string[] = res.data.results.map((result: any) => result.location_department);
    
    const uniqueDepartments = Array.from(new Set(departments));
    
    const sortedDepartments = uniqueDepartments.sort();
    
    return sortedDepartments;
  } catch (error) {
    console.error('Erreur', error);
    throw error;
  }
}
/////////////////
export async function fetchDescriptions(): Promise<string[]> {
  try {
    const res = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=longdescription_fr');
    const Descriptions: string[] = res.data.results.map((result: any) => result.longdescription_fr);
   
    return Descriptions;
  } catch (error) {
    console.error('Erreur', error);
    throw error;
  }
}



/////////////////
/// creation du fichier CSV a partir data Event
export async function addEventToCSV(eventData: string): Promise<void> {
  try {
    const headers = '"Title","Image","Date","heure","Adresse","AdressePostal","Ville","Region"\n';
    const csvData = headers + eventData;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'data.csv');
    console.log('event ajoute');
  } catch (error) {
    console.error('Erreur', error);
    throw error;
  }
}
