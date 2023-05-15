import { useState, useEffect } from "react";
import { getHours } from "../../utils/utils";
interface IEvent {
  id: string
  name: string;
  description: string;
  date_begin: string;
  date_end: string;
  duration: string;
}

interface IDataResponse {
  response: any;
  status: string;
  msg: string;  
}
export function useFetch(url: string) {
  const [data, setData] = useState<IDataResponse | null>(null);
  const [events, setEvents ] = useState([]);
  const [hours, setHours ] = useState<any[]>([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let eventsArrya: any = [];
        const typeChannel = data.response.channels.map((channel: any) => channel.events);
        if(typeChannel){
          setHours(getHours(typeChannel[0])); 
          typeChannel.forEach((events: IEvent[]) => { 
            return events.forEach((event: any) => {eventsArrya.push(event)}) 
          });
        }
        setEvents(typeChannel)
        return data
      })
      .then((data) => setData(data) )
  },[url])
  return { data, events, hours }
}
/// reduce
//// mandar canales sin eventos 
//// mandar eventos solos [eventos]  
