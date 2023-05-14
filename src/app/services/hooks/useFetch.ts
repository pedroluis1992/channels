import { useState, useEffect } from "react";
import { getHours } from "../../utils/utils";
export function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [events, setEvents ] = useState(null);
  const [hours, setHours ] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let eventsArrya: any = [];
        const typeChannel = data.response.channels.map((channel: any) => channel.events);
        setHours(getHours(typeChannel[0])); 
        typeChannel.forEach((events) => { 
          return events.forEach((event) => {eventsArrya.push(event)}) 
        });
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
