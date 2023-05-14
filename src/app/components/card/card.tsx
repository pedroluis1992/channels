import './styles.css'
interface ICard {
  name: String;
  pathImage: String
}

const Card = ({ name, pathImage }: ICard) => {
  return(
    <div className="card">
       <div className="card-name">{name}</div>
        <img width="150" height="150" src={pathImage} />
    </div>
  )
}

export default Card;