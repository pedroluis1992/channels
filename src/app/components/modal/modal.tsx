import React, { useEffect, useState } from 'react';
import './styles.css'
import Card from '../card/card';
import { useFetch } from '@/app/services/hooks/useFetch';
import CardEvent from '../cardEvent/cardEvent';
interface IModal {
  closeModal: any;
}

interface IEvent {
  id: string
  name: string;
  description: string;
  date_begin: string;
  date_end: string;
  duration: string;
}

interface IChannel {
  id: string;
  number: string;
  image: string;
  events: IEvent[]
}

interface Ihour {
  id: string;
  hour: string;
}

const RIGHT = "right";
const LEFT = "left";


const Modal = ({ closeModal }: IModal) => {
  const [stepScroll, setStepScroll] = useState(0);
  const [name, setName ] = useState("");
  const [description, setDescription ] = useState("");
  const [date, setDate] = useState("");
  const dateFrom = "20230512000000"


  const { data } = useFetch(
    `https://mfwkweb-api.clarovideo.net/services/epg/channel?device_id=web&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&date_from=${dateFrom}&date_to=20230512230000&quantity=162`
    )

  const scrollFun = (direction: any) => {
    if(direction === RIGHT){
      setStepScroll(stepScroll+150)
    } else if(direction === LEFT && stepScroll > 0) {
      setStepScroll(stepScroll-150)
    }
  };

  useEffect(() => {
    document.getElementById('timeBox')?.scrollTo( stepScroll , document?.getElementById('timeBox')?.scrollTop!);
  }, [stepScroll])

  const getLargeofEvent = (dateBegin: string, dateEnd: string, index: number) => {
    let minutes = 0;
    if(index === 0){
      minutes = new Date(dateEnd).valueOf() - new Date((dateFrom.slice(0,4)+ "/"+ dateFrom.slice(4,6)+ "/"+ dateFrom.slice(6,8)+ " "+ dateFrom.slice(8,10)+":"+dateFrom.slice(10,12)+":" +dateFrom.slice(12,14)).toString() ).valueOf()
    } else {
      minutes = new Date(dateEnd).valueOf() - new Date(dateBegin).valueOf()
    }
    return minutes/60000 * 5;
  }


  useEffect(() => {
    document.getElementById('channelsBox')?.addEventListener('scroll', event => {
      document.getElementById('eventsBox')?.scrollTo(document.getElementById('timeBox')?.scrollLeft!, document.getElementById('channelsBox')?.scrollTop!);
    })

    document.getElementById('timeBox')?.addEventListener('scroll', event => {
      document.getElementById('eventsBox')?.scrollTo(document.getElementById('timeBox')?.scrollLeft!, document.getElementById('channelsBox')?.scrollTop!);

    });

    document.getElementById('eventsBox')?.addEventListener('scroll', event => {
      document.getElementById('channelsBox')?.scrollTo(document.getElementById('timeBox')?.scrollLeft!, document.getElementById('eventsBox')?.scrollTop!);
    });

  }, [])
  const moveToScroll = (direction: string) => {
    scrollFun(direction)
  }

  const getTime = (event: IEvent) => {
    let dateBegin = `${event.date_begin.split(" ")[1].split(":")[0]}:${event.date_begin.split(" ")[1].split(":")[1]}hrs`
    let dateEnd = `${event.date_end.split(" ")[1].split(":")[0]}:${event.date_end.split(" ")[1].split(":")[1]}hrs`
    return `${dateBegin} a ${dateEnd}`;
  }

  const getHeaderInfo = (event: IEvent) => {
    let dateBegin = `${event.date_begin.split(" ")[1].split(":")[0]}:${event.date_begin.split(" ")[1].split(":")[1]}hrs`
    let dateEnd = `${event.date_end.split(" ")[1].split(":")[0]}:${event.date_end.split(" ")[1].split(":")[1]}hrs`
    let timeSplit = event.duration.split(":")
    let hour = parseInt(timeSplit[0]) > 0 ? `${timeSplit[0]}h` : "" 
    let min = parseInt(timeSplit[1])
    setDate(`${dateBegin} a ${dateEnd} ${hour} ${min}min`)
    setName(event?.name)
    setDescription(event?.description)

  }
  return (
    <div className="modal" id="modal" style={{ height: "100%" }}>
      <div className="modalHeader" style={{ height: "40%" }}>
        <div className="closeModalDescription" onClick={() => closeModal()}>X</div>
        <div className="channelsDescription">
          <div>{name}</div>
          <div className='channelDescriptionResume'>
            {date}
            <div>
              {
                description
              }
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "black", height: "60%", width: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%", height: "20px", color: "white", display: "flex" }}>
          <div style={{ height: "42%", width: "20%", display: "flex", justifyContent: "center" }}>
            HOY
          </div>
          <div id={'timeBox'} style={{ height: "40px", width: "80%", display: "flex", contentVisibility: "auto", overflowX: "auto" }}>
            {data?.hours?.map((item: Ihour) => {
              return (
                <>
                  <div key={item.id} style={{ color: "white", marginRight: "93.69px" }} id={item.toString()} >{item.hour} </div>
                </>
              )
            })
            }
          </div>
          <div style={{ width: "5%", display: "flex", color: "white" }}>
            <div onClick={() => moveToScroll("left")} style={{ marginRight: "2em", cursor: "pointer" }}>{"<"}</div>
            <div onClick={() => moveToScroll("right")} style={{ cursor: "pointer" }}>{">"}</div>
          </div>
        </div>

        <div style={{ display: "flex", height: "97%" }}>
          <div style={{ height: "100%", color: "white", width: "25%", display: "flex", textAlign: "center", maxWidth: "fitContent", flexDirection: "column" }}>
            <div id={'channelsBox'} className='channelsLeft'>
              { data?.channels.map((channel: IChannel) => {
                return (
                  <div key={channel.id} style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column", overflowY: "auto", width: "100%" }} >
                      <div className="channels">
                        <Card name={channel.number} pathImage={channel.image} />
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>
          <div id={'eventsBox'} style={{ height: "100%", color: "white", width: "100%", display: "flex", textAlign: "center", maxWidth: "fitContent", overflow: "hidden", overflowY: "auto" }}>
            <div style={{height: "100%"}} >
              {data && data.events?.map((channel: any) => {
                return (
                  <div key={channel.id} style={{ display: "flex" }}>

                    <div className="events">
                      {channel?.map((event: IEvent, index: number) => {
                        return (
                          <>
                            <CardEvent
                              name={event.name}
                              getLargeofEvent={getLargeofEvent(event.date_begin, event.date_end, index)}
                              onChangeMouseOver={() => getHeaderInfo(event)}
                              getTime={getTime(event)}
                              id={event.id}
                              getWith={getLargeofEvent(event.date_begin, event.date_end, index)}
                            />
                          </>
                        )
                      })}
                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;