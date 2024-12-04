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
  shipmentCost?: number;
  productCost?: number;
  totalCost?: number;
}

interface MessageItemProps {
  messageInfo?: MessageInfo;
  hourGap?: number;
  id: number;
  sendWhatsapp: (phone: string, message: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({ messageInfo = {} as MessageInfo, hourGap = 1, id, sendWhatsapp }) => {
  const { company, name, time, cost, phone, shipmentCost, productCost, totalCost } = messageInfo;

  const [wasSent, setWasSent] = useState(false);

  const [messageData, setMessageData] = useState(
    {
      company: company || '',
      name: name || '',
      time: time || '',
      cost: cost || '',
      phone: phone || '',
      lastPropUpdated: '',
      shipmentCost: shipmentCost || 0,
      productCost: productCost || 0,
      totalCost: totalCost || 0
    }
  )

  const [messageBody, setMessageBody] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLTextAreaElement> | any) => {

    const propertyName = event.target.id.split('-')[0]

    if (propertyName === 'message') {
      setMessageBody(event.target.value)
    } else {
      setMessageData({
        ...messageData,
        [propertyName]: event.target.value,
        lastPropUpdated: propertyName
      })
    }
  }

  const validateMessage = () => {
    if (!messageData.company || !messageData.name || !messageData.time || !messageData.phone || !messageBody) {
      return false;
    }
    return true;
  }

  const handleWhatsapp = () => {
    sendWhatsapp(messageData.phone, messageBody)
    setWasSent(true)
  }

  useEffect(() => {
    setMessageBody(templateBuilder({
      name: messageData.name,
      partner: messageData.company,
      time: messageData.time,
      hourGap,
      shipmentCost: messageData.shipmentCost,
      productCost: messageData.productCost,
      totalCost: messageData.totalCost
    }))
  }, [messageData])

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
      className="bg-white p-4 rounded-lg shadow-md w-full border border-gray-200"
    >
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="form-group col-span-1">
          <Label htmlFor={"company-" + id}>🤝 Partner</Label>
          <Input type="text" className="form-control" id={"company-" + id} value={messageData.company} onChange={handleChange} disabled={wasSent} />
        </div>
        <div className="form-group  col-span-1">
          <Label htmlFor={"name-" + id}>👤 Nombre</Label>
          <Input type="text" className="form-control" id={"name-" + id} value={messageData.name} onChange={handleChange} disabled={wasSent} />
        </div>
      </div>
      {
        !wasSent && (
          <>
            <div className="grid grid-cols-10 gap-2 mt-3">
              <div className="form-group col-span-5">
                <Label htmlFor={"time-" + id}>🕘 Llegada</Label>
                <Input type="text" className="form-control" id={"time-" + id} value={messageData.time} onChange={handleChange} />
              </div>
              <div className="form-group col-span-5">
                <Label htmlFor={"phone-" + id}>📞 Teléfono</Label>
                <Input type="text" className="form-control" id={"phone-" + id} value={messageData.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-9 gap-2 mt-3">
              <div className="form-group col-span-3">
                <Label htmlFor={"shipmentCost-" + id}>💸 Envío</Label>
                <Input type="number" className="form-control" id={"shipmentCost-" + id} value={messageData.shipmentCost} onChange={handleChange} />
              </div>
              <div className="form-group col-span-3">
                <Label htmlFor={"productCost-" + id}>💸 Producto</Label>
                <Input type="number" className="form-control" id={"productCost-" + id} value={messageData.productCost} onChange={handleChange} />
              </div>
              <div className="form-group col-span-3">
                <Label htmlFor={"totalCost" + id}>💸 Total</Label>
                <Input type="number" className="form-control" id={"totalCost-" + id} value={messageData.totalCost} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 w-full mt-3">
              <div className="form-group">
                <Label htmlFor={"message-" + id}>💬 Mensaje</Label>
                <Textarea className="form-control" id={"message-" + id} value={messageBody} onChange={handleChange} rows={8} />
              </div>
            </div>
          </>
        )
      }
      <div className="grid grid-cols-1 w-full mt-3 gap-2">
        {
          wasSent && (
            <div className="form-group">
              <Button id="sendWhatsapp" onClick={()=>{setWasSent(false)}} variant={'outline'} className="w-full">VOLVER A EDITAR</Button>
            </div>
          )
        }
        {
          !wasSent && (
            <div className="form-group">
              <Button id="sendWhatsapp" disabled={!validateMessage()} onClick={handleWhatsapp} className="w-full">ENVIAR</Button>
            </div>
          )
        }
      </div>
    </div>
  )
}
