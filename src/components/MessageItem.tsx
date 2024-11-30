import { templateBuilder } from '@/helpers/templateBuilder';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface MessageInfo {
  company?: string;
  name?: string;
  time?: string;
  cost?: string;
  phone?: string;
}

interface MessageItemProps {
  messageInfo?: MessageInfo;
  hourGap?: number;
  id: number;
  sendWhatsapp: (phone: string, message: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({ messageInfo = {} as MessageInfo, hourGap = 1, id, sendWhatsapp }) => {
  const { company, name, time, cost, phone } = messageInfo;

  const [messageData, setMessageData] = useState(
    {
      company: company || '',
      name: name || '',
      time: time || '',
      cost: cost || '',
      phone: phone || '',
      lastPropUpdated: ''
    }
  )

  const [messageBody, setMessageBody] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLTextAreaElement> | any) => {
    if(event.target.id === 'message') {
      setMessageBody(event.target.value)
    } else {
      setMessageData({
        ...messageData,
        [event.target.id]: event.target.value,
        lastPropUpdated: event.target.id
      })
    }
  }

  const validateMessage = () => {
    if (!messageData.company || !messageData.name || !messageData.time || !messageData.cost || !messageData.phone || !messageBody) {
      return false;
    }
    return true;
  }

  const handleWhatsapp = () => {
    sendWhatsapp(messageData.phone, messageBody)
  }

  useEffect(() => {
    setMessageBody(templateBuilder({
      name: messageData.name,
      partner: messageData.company,
      time: messageData.time,
      hourGap
    }))
  }, [messageData])

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
    className="bg-white p-4 rounded-lg shadow-md w-full border border-gray-200"
    >
      <div className="grid grid-cols-5 gap-2 mt-3">
        <div className="form-group col-span-2">
          <Label htmlFor={"company"+id}>Partner</Label>
          <Input type="text" className="form-control" id={"company"+id} value={messageData.company} onChange={handleChange} />
        </div>
        <div className="form-group  col-span-3">
          <Label htmlFor={"name"+id}>Nombre</Label>
          <Input type="text" className="form-control" id={"name"+id} value={messageData.name} onChange={handleChange} />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2 mt-3">
        <div className="form-group col-span-3">
          <Label htmlFor={"time"+id}>Llegada</Label>
          <Input type="text" className="form-control" id={"time"+id} value={messageData.time} onChange={handleChange} />
        </div>
        <div className="form-group col-span-3">
          <Label htmlFor={"cost"+id}>Costo</Label>
          <Input type="text" className="form-control" id={"cost"+id} value={messageData.cost} onChange={handleChange} />
        </div>
        <div className="form-group col-span-4">
          <Label htmlFor={"phone"+id}>Teléfono</Label>
          <Input type="text" className="form-control" id={"phone"+id} value={messageData.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 w-full mt-3">
        <div className="form-group">
          <Label htmlFor={"message"+id}>Mensaje</Label>
          <Textarea className="form-control" id={"message"+id} value={messageBody} onChange={handleChange} rows={8}/>
        </div>
      </div>
      <div className="grid grid-cols-1 w-full mt-3">
        <div className="form-group">
          <Button id="sendWhatsapp" disabled={!validateMessage()} onClick={handleWhatsapp} className="w-full">ENVIAR</Button>
        </div>
      </div>
    </div>
  )
}
