import { ContactItem } from '@/components/ContactItem';
import { MessageItem } from '@/components/MessageItem';
import { Setup } from '@/components/Setup';
import { Toaster } from '@/components/ui/toaster';
import React, { useEffect, useRef, useState } from 'react';

import { ParsedData } from '@/interfaces/parsedData.interface';
import { ContactExporter } from '@/components/ContactExporter';
import { Button } from '@/components/ui/button';
import DiscardConfirm from '@/components/DiscardConfirm';

interface CsvToContactsProps {
  contacts: ParsedData[];
  setContacts: React.Dispatch<React.SetStateAction<any[]>>;
}

const CsvToContacts: React.FC<CsvToContactsProps> = ({ contacts, setContacts }) => {


  const [contactToDiscard, setContactToDiscard] = useState(null);

  const discardDialogBtn = useRef<HTMLButtonElement>(null);

  const [contactAgenda, setContactAgenda] = useState(contacts.map(c => ({
    id: c.id,
    FirstName: c.name,
    MiddleName: c.description,
    LastName: c.company,
    Phone: c.phone,
    Organization: 'BORRAR'
  })));

  const removeContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
    setContactAgenda(contactAgenda.filter((contact) => contact.id !== id))
  }

  const getIncompleteContacts = () => {
    return contactAgenda.filter((contact) => {
      return !contact.FirstName || !contact.MiddleName || !contact.LastName || !contact.Phone
    })
  }

  const updateContact = (contact: ParsedData) => {
    const structuredContact = {
      id: contact.id,
      FirstName: contact.name,
      MiddleName: contact.description,
      LastName: contact.company,
      Phone: "0" + contact.phone,
      Organization: 'BORRAR'
    }
    setContactAgenda(contactAgenda.map(c => c.id === contact.id ? structuredContact : c))
  }

  const showIncomplete = () => {
    const incompleteContacts = getIncompleteContacts();
    if (incompleteContacts.length === 0) {
      return;
    }
    const firstIncomplete = incompleteContacts[0];
    const element = document.getElementById(`contact-item-${firstIncomplete.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    if (contactToDiscard) {
      discardDialogBtn.current?.click();
    }
  }, [contactToDiscard])
  

  return (
    <>
      <div className="header absolute top-0 left-0 w-full border-b-2 border-gray-100 p-4 bg-white">
        <h1 className="text-2xl font-bold text-center">CSV to Contactos</h1>
        {
          contactToDiscard && (
            <DiscardConfirm contact={contactToDiscard} removeContact={removeContact} btnRef={discardDialogBtn} setContactToDiscard={setContactToDiscard}/>
          )
        }
      </div>
      <div className='p-2 mt-16 w-full flex items-center justify-end flex-col mb-20'>
        <div className="grid gap-4 p-2">
          {
            contacts.map((contact) => (
              <ContactItem key={contact.id} contactInfo={contact} updateContact={updateContact} setContactToDiscard={setContactToDiscard} />
            ))
          }
        </div>
      </div>
      <div className="fixed bottom-4 left-4">
        {
          getIncompleteContacts().length > 0 && (
            <Button onClick={showIncomplete} variant={'destructive'}>Ver incompletos ({getIncompleteContacts().length}/{contactAgenda.length})
            </Button>
          )
        }
        {
          getIncompleteContacts().length === 0 && (
            <ContactExporter contacts={contactAgenda} />
          )
        }
      </div>
      <Toaster />
    </>
  );
}

export default CsvToContacts;