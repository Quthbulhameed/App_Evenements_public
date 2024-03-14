import React, { useState } from 'react';
import './event.css';
import { addEventToCSV } from '../composantes/FuncAPI';

interface Props {
  title: string;
  image: string;
  daterange: string;
  address: string;
  postalcode: string | null;
  city: string;
  region: string;
  longdescription_fr: string; 
}

function EventList(props: Props) {
  const { title, image, daterange, address, postalcode, city, region, longdescription_fr } = props;


///////////////////
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false); 
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

////////////////

  const handleSaveToCSV = () => {
    const eventData = `${title},${image},${daterange},${address},${postalcode || 'N/A'},${city},${region}`;
    addEventToCSV(eventData);
  };


const cleanDescription = (description: string) => {
  return description.replace(/<[^>]*>/g, '')
                    .replace(/<\/?strong[^>]*>/g, '')
                    .replace(/<br\s*[/]?>/gi, '');
};


  return (
    <div className="event2">
      <p className="pokemon-name">{title}</p> 
      <img src={image} alt={title || 'Non disponible'} className="event-image" />


      <button onClick={() => setShowStats(!showStats)} className={showStats ? "orange-favoris-button" : "event-list-containertest"}>
        {showStats ? "Masquer les informations" : "Afficher les informations"}
      </button> 

      {showStats && (
        <div>
          <p className="event-nameTest33">Dates : {daterange|| 'Non disponible'}</p>
          <p className="event-addresse">Address: {address|| 'Non disponible'}</p>
          <p className="event-nameTest33">Code postal: {postalcode || 'Non disponible'}</p>
          <p className="event-nameTest33">Ville : {city|| 'Non disponible'}</p>
          <p className="event-nameTest33">Region: {region|| 'Non disponible'}</p>


          <button onClick={() => setShowDescription(!showDescription)} className="special-button">
            {showDescription ? "Masquer la description" : "Afficher la description"}
          </button>
          
          {showDescription && (
    <p className="event-nameTest33">Description: {longdescription_fr ? cleanDescription(longdescription_fr) : 'Description non disponible'}</p>
    )}
        </div>
      )}

      <button onClick={() => setIsFavorite(!isFavorite)} className={isFavorite ? "vert-favoris-button" : "blanc-favoris-button"}>
        {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      </button>

      <button onClick={handleSaveToCSV} className="bouton111111111">
        Telecharger
      </button>


    </div>
  );
}

export default EventList;
