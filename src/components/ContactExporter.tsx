import React from 'react';
import { Button } from "@/components/ui/button"

interface ExporterProps {
  contacts: any[];
}


export const ContactExporter: React.FC<ExporterProps> = ({ contacts }) => {
  const createVcfData = () => {
    let vcfData = '';
    contacts.forEach(row => {
        vcfData += 'BEGIN:VCARD\n';
        vcfData += 'VERSION:3.0\n';
        vcfData += `N:${row.LastName};${row.FirstName};${row.MiddleName};;\n`;
        vcfData += `FN:${row.FirstName} ${row.LastName}\n`;
        vcfData += `ORG:${row.Organization};\n`;
        vcfData += `TITLE:${row.Title}\n`;
        vcfData += `TEL;TYPE=VOICE,CELL;VALUE=text:${row.Phone}\n`;
        vcfData += 'END:VCARD\n';
    });
    return vcfData;
};

const handleExport = () => {
  const vcfData = createVcfData();
  const blob = new Blob([vcfData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  link.download = `contactos-${day}-${month}-${year}[${hours}h${minutes}m].vcf`;
  link.click();
};

return (
      <Button variant="default" onClick={handleExport} disabled={contacts.length === 0}>
        Exportar ({contacts.length}) Contactos
    </Button>
);
};