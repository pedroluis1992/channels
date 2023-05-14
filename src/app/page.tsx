"use client";
import React, { useState } from 'react';
import Modal from './components/modal/modal';
export default function Home() {


  const [openChannelList, setOpenChannelList] = useState<Boolean>(false);
  const onChangeChannelList = () => {
    setOpenChannelList(!openChannelList)
  }
  return (
    <main style={
      { 
        display: "flex" , 
        justifyContent: "center", 
        width: "100%",
        height: "100%"
      }
    }>
       <button onClick={() => onChangeChannelList()}>Mostrar EPG</button>
      {
        openChannelList && <Modal closeModal={() => onChangeChannelList()}></Modal>
      }
    </main>
  )
}
