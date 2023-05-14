import React, { forwardRef, useEffect, useRef, useState, createRef } from 'react';
import './styles.css'
import Card from '../card/card';
import { useFetch } from '@/app/services/hooks/useFetch';
interface IModal {
  closeModal: any;
}

interface IEvent {
  name: string;
  description: string;
  date_begin: string;
  date_end: string;
  duration: string;
}

const RIGHT = "right";
const LEFT = "left";


const Modal = ({ closeModal }: IModal) => {
  let myRefs = useRef([]);
  const [stepScroll, setStepScroll] = useState(0);
  const [name, setName ] = useState("");
  const [description, setDescription ] = useState("");
  const [date, setDate] = useState("");
  const dateFrom = "20230512000000"


  const { data, events, hours } = useFetch(
    `https://mfwkweb-api.clarovideo.net/services/epg/channel?device_id=web&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&date_from=${dateFrom}&date_to=20230512230000&quantity=162`
    )
  const elementsRef = createRef();

  const scrollFun = (direction: any) => {
    if(direction === RIGHT){
      setStepScroll(stepScroll+150)
    } else {
      setStepScroll(stepScroll-150)
    }
  };

  useEffect(() => {
    document.getElementById('timeBox')?.scrollTo( stepScroll , document.getElementById('timeBox')?.scrollTop);

  }, [stepScroll])

  const getLargeofEvent = (dateBegin: string, dateEnd: string, index: number) => {
    let minutes = 0;
    if(index === 0){
      minutes = new Date(dateEnd) - new Date((dateFrom.slice(0,4)+ "/"+ dateFrom.slice(4,6)+ "/"+ dateFrom.slice(6,8)+ " "+ dateFrom.slice(8,10)+":"+dateFrom.slice(10,12)+":" +dateFrom.slice(12,14)).toString() )
    } else {
      minutes = new Date(dateEnd) - new Date(dateBegin)
    }
    return minutes/60000 * 5;
  }


  useEffect(() => {
    document.getElementById('channelsBox').addEventListener('scroll', event => {
      document.getElementById('eventsBox')?.scrollTo(document.getElementById('timeBox')?.scrollLeft, document.getElementById('channelsBox')?.scrollTop);
    });

    document.getElementById('timeBox')?.addEventListener('scroll', event => {
      document.getElementById('eventsBox')?.scrollTo(document.getElementById('timeBox')?.scrollLeft, document.getElementById('channelsBox')?.scrollTop);

    });

    document.getElementById('eventsBox')?.addEventListener('scroll', event => {
      document.getElementById('channelsBox')?.scrollTo(document.getElementById('timeBox')?.scrollLeft, document.getElementById('eventsBox')?.scrollTop);
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
            {hours?.map((item, index) => {
              return (
                <>
                  <div key={item.id} style={{ color: "white", marginRight: "93.69px" }} id={index.toString()} >{item.hour} </div>
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
            <div id={'channelsBox'} style={{ position: "fixed", top: "400px", overflowY: "scroll", height: "-webkit-fill-available", width: "20%"}} >
              {data?.response.channels.map((channel) => {
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
          <div id={'eventsBox'} ref={elementsRef} style={{ height: "100%", color: "white", width: "100%", display: "flex", textAlign: "center", maxWidth: "fitContent", overflow: "hidden", overflowY: "auto" }}>
            <div style={{height: "100%"}} >
              {events?.map((channel) => {
                return (
                  <div key={channel.id} style={{ display: "flex" }}>

                    <div style={{ display: "flex", marginTop: "12px", height: "133.50px" }}>
                      {channel?.map((event, index) => {
                        return (
                          <>
                            <div 
                              key={event.id}
                              onMouseOver={() => {getHeaderInfo(event)}}
                              style={{ backgroundColor: "#212222", 
                                borderStyle: "inset", 
                                borderWidth: "1px", 
                                height: "133px", 
                                borderColor: "white",
                                width: `${getLargeofEvent(event.date_begin, event.date_end, index)}px` 
                              }} 
                            >
                              <div>
                                {event.name}
                              </div>
                              <div style={{fontSize: "13px"}}>
                                {getTime(event)}
                              </div>
                            </div>
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