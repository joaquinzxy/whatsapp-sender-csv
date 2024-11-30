import { MessageItem } from '@/components/MessageItem';
import { Setup } from '@/components/Setup';
import { Toaster } from '@/components/ui/toaster';
import React, { useState } from 'react';

interface ParsedData {
  name: string;
  company: string;
  time: string;
  cost: string;
  phone: string;
}

const phoneParser = (phone: string) => {
  if (phone.startsWith('0')) {
    return `598${phone.substring(1)}`;
  }
  return phone;
}


const CsvToWpp: React.FC = () => {
  const [messageDataList, setMessageDataList] = useState<ParsedData[]>([]);

  const sendWhatsapp = (phone: string, message: string) => {
    if (message && phone) {
      const url = `https://api.whatsapp.com/send/?phone=${phoneParser(phone)}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  }

  return (
    <>
      <div className="header absolute top-0 left-0 w-full border-b-2 border-gray-100 p-4 bg-white">
        <h1 className="text-2xl font-bold text-center">CSV to Whatsapp</h1>
      </div>
      <div className='p-2 mt-16 w-full min-h-[90vh] flex items-center justify-end flex-col'>
        <Setup setMessageDataList={setMessageDataList} />
        <div className="grid gap-4 p-2">
          {
            messageDataList && messageDataList.map((messageData, index) => (
              <MessageItem key={index} messageInfo={messageData} sendWhatsapp={sendWhatsapp} id={index}/>
            ))
          }
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default CsvToWpp;