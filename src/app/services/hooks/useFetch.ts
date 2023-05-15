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
  channels: any;
  events: any;
  hours: any;  
}
export function useFetch(url: string) {
  const [data, setData] = useState<IDataResponse | null>(null);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const dataReduce = data?.response?.channels?.reduce((acc: any, item: any) => {
          acc.events.push(item.events)
          delete item.events
          delete item.group
          acc.channels.push({...item }) 
          return acc
        }, {channels: [], events: []})
        setData({...dataReduce, hours : getHours()})
        
      })
  },[url])
  return {data}
}
