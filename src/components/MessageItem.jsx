import React, { useEffect, useState } from 'react'
import { templateBuilder } from '../helpers/templateBuilder';

export const MessageItem = ({messageInfo={}, hourGap=1, sendWhatsapp}) => {
  const { company, name, time, cost, phone } = messageInfo;

  const [messageData, setMessageData] = useState(
    {
      company: company || '',
      name: name || '',
      time: time || '',
      cost: cost || '',
      phone: phone || ''
    }
  )

  const [messageBody, setMessageBody] = useState("")

  const handleChange = (event) => {
    setMessageData({
      ...messageData,
      [event.target.id]: event.target.value
    })
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
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input type="text" className="form-control" id="company" value={messageData.company} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" value={messageData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input type="text" className="form-control" id="time" value={messageData.time} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="hourGap">Hour Gap</label>
        <input type="text" className="form-control" id="hourGap" value={hourGap} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="cost">Cost</label>
        <input type="text" className="form-control" id="cost" value={messageData.cost} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="text" className="form-control" id="phone" value={messageData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <input type="text" className="form-control" id="message" value={messageBody} onChange={handleChange} />
      </div>
      <div className="form-group">
        <button type="text" id="sendWhatsapp" disabled={!validateMessage()} onClick={handleWhatsapp}>ENVIAR</button>
      </div>
    </div>
  )
}
