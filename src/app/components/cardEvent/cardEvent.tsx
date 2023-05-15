
import './styles.css'
interface ICard {
  id: string;
  name: String;
  onChangeMouseOver: any;
  getWith: any;
  getTime: any;
  getLargeofEvent: any
}


const CardEvent = ({ id, name, onChangeMouseOver, getLargeofEvent, getTime }: ICard) => {
  return (
    <div
      key={id}
      onMouseOver={onChangeMouseOver}
      className='cardEvent'
      style={{
        width: `${getLargeofEvent}px`
      }}
    >
      <div>
        {name}
      </div>
      <div style={{ fontSize: "13px" }}>
        {getTime}
      </div>
    </div>
  )
}
export default CardEvent;