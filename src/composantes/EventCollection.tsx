import React from 'react';
import { Event } from '../interface';
import EventList from './EventList';
import './event.css';

interface Props {
  events: Event[];

}


function EventCollection(props: Props) {
  const { events  } = props;

  return (
    <section className="collection-container">
      {events.map((event) => (
        <EventList
         //s key={event.idu}
          title={event.title_fr}

          image={event.image}

          daterange={event.daterange_fr}

          address={event.location_address}

          postalcode={event.location_postalcode}
          
          city={event.location_city}

          region={event.location_region}

          longdescription_fr={event.longdescription_fr} 


        />
      ))}
    </section>
  ); 
}

export default EventCollection;
