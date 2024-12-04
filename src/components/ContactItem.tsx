import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ParsedData } from '@/interfaces/parsedData.interface';

interface ContactInfo {
  company?: string;
  name?: string;
  phone?: string;
  description?: string;
  id: number;
}

interface MessageItemProps {
  contactInfo?: ContactInfo;
  setContactToDiscard: React.Dispatch<React.SetStateAction<any>>;
  updateContact: (contact: ParsedData) => void;
}

export const ContactItem: React.FC<MessageItemProps> = ({ contactInfo = {} as ContactInfo, setContactToDiscard, updateContact }) => {
  const { company, name, phone, description, id } = contactInfo;

  const [contactData, setContactData] = useState(
    {
      company: company || '',
      name: name || '',
      phone: phone || '',
      description: description || '',
      id: id
    }
  )

  const [finalName, setFinalName] = useState(`${name} ${description} ${company}`)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLTextAreaElement> | any) => {

    const propertyName = event.target.id.split('-')[0]
      setContactData({
        ...contactData,
        [propertyName]: event.target.value,
      })
  }

  const isComplete = () => {
    const phoneRegex = /^\d{8}$/;
    if (contactData.company && contactData.name && contactData.description && phoneRegex.test(contactData.phone)) {
      return true
    }
    return false
  }

  const handleDiscard = () => {
    setContactToDiscard(contactInfo)
  }

  useEffect(() => {
    setFinalName(`${contactData.name} ${contactData.description} ${contactData.company}`)
    if(isComplete()) {
      updateContact(contactData)
    }
  }, [contactData])

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
      className="bg-white p-4 rounded-lg shadow-md w-full border border-gray-200"
      id={'contact-item-'+id}
    >
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="form-group  col-span-1">
          <Label htmlFor={"name-" + id}>👤 Nombre</Label>
          <Input type="text" className="form-control" id={"name-" + id} value={contactData.name} onChange={handleChange}/>
        </div>
        <div className="form-group  col-span-1">
          <Label htmlFor={"description-" + id}>✨ Distintivo</Label>
          <Input type="text" className="form-control" id={"description-" + id} value={contactData.description} onChange={handleChange}/>
        </div>
        <div className="form-group col-span-1">
          <Label htmlFor={"company-" + id}>🤝 Partner</Label>
          <Input type="text" className="form-control" id={"company-" + id} value={contactData.company} onChange={handleChange}/>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 mt-3">
        <div className="form-group col-span-4">
          <Label htmlFor={"finalName-" + id}>🪪 Nombre contacto</Label>
          <Input type="text" className="form-control" id={"finalName-" + id} value={finalName} disabled/>
        </div>
        <div className="form-group col-span-2">
          <Label htmlFor={"phone-" + id}>📞 Teléfono</Label>
          <Input type="text" className="form-control" id={"phone-" + id} value={contactData.phone} onChange={handleChange}/>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-3 w-full">
        <div className="col-span-1">
        <Button className='w-full' variant={'secondary'} onClick={handleDiscard}>Descartar</Button>
        </div>
        <div className="col-span-1 text-center">
          {
            isComplete() ? 
            (<Badge variant={'secondary'} className='px-6 py-3' style={{backgroundColor: '#8de0a3'}}>COMPLETO ✅</Badge>) : 
            (<Badge variant={'secondary'} className='px-6 py-3' style={{backgroundColor: '#e08d94'}}>INCOMPLETO 👀</Badge>)
          }
        </div>
      </div>
    </div>
  )
}
