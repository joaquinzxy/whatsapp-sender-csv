import { ParsedData } from '@/interfaces/parsedData.interface';

export const contactBuilder = (parsedData : ParsedData) => {
  
  const contact = {
    name: parsedData.name,
    company: parsedData.company,
    phone: parsedData.phone,
    email: `${parsedData.name.replace(' ', '')}@${parsedData.company.replace(' ', '')}.com`
  }

  return contact;

}