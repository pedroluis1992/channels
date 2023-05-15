import React from 'react';
import './styles.css'
interface ICard {
  name: string;
  pathImage: string
}

const Card = ({ name, pathImage }: ICard) => {
  return(
    <div className="card">
       <div className="card-name">{name}</div>
        <img width="150" height="150" alt="image" src={pathImage}/>
    </div>
  )
}

export default Card;
