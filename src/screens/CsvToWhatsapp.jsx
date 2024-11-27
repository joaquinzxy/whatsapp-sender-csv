import React, { useState } from 'react'
import { Setup } from '../components/Setup'
import { MessageItem } from '../components/MessageItem';

export const CsvToWhatsapp = () => {

  const [messageDataList, setMessageDataList] = useState([]);

  const phoneParser = (phone) => {
    // if phone starts with 0 like this, 097436970, remove first 0 and start 598
    if (phone.startsWith('0')) {
      return `598${phone.substring(1)}`;
    }
    return phone;
  }

  const sendWhatsapp = (phone, message) => {
    if (message && phone) {
      const url = `https://api.whatsapp.com/send/?phone="${phoneParser(phone)}&text=${encodeURIComponent(message)}`;
      console.log(url);
      
      window.open(url, '_blank');
    }
  }

  return (
    <>
    <Setup setMessageDataList={setMessageDataList}/>
    {
      messageDataList && messageDataList.map((messageData, index) => (
        <MessageItem key={index} messageInfo={messageData} sendWhatsapp={sendWhatsapp}/>
      ))
    }
    </>
  )
}
