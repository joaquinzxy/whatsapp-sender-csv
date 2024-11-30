import React, { useRef } from 'react';
import Papa from 'papaparse';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast';

interface SetupProps {
  setMessageDataList: (data: any[]) => void;
}

interface ParsedData {
  name: string;
  company: string;
  time: string;
  cost: string;
  phone: string;
}

const validateCSV = (messageData: ParsedData) => {
  if (!messageData.company || (!messageData.phone && !messageData.name)) {
    return false;
  }
  return true;
}

export const Setup: React.FC<SetupProps> = ({ setMessageDataList }) => {

  const { toast } = useToast();
  const fileInput = useRef<HTMLInputElement>(null);

  const OnClickSubmit = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageDataList([]);
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      Papa.parse(file, {
        header: true,
        complete: (results: Papa.ParseResult<ParsedData>) => {
          const processedData = results.data.map((item: ParsedData) => {
            return {
              name: item.name,
              company: item.company,
              time: item.time,
              cost: item.cost,
              phone: item.phone,
            };
          });
          const validatedData = processedData.filter(validateCSV);
          if (validatedData.length === 0) {
            toast({
              title: "CSV inválido",
              description: "El CSV no tiene los campos necesarios",
              variant: "destructive"
            });
          } else {
            toast({
              title: `${validatedData.length} mensajes cargados`,
              duration: 2000,
            });
            setMessageDataList(validatedData);
          }
        },
      });
    }
  };

  return (
    <div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Button onClick={OnClickSubmit}>Haz click aquí para subir el archivo CSV</Button>
          <Input type="file" className="form-control-file hidden" ref={fileInput} id="csv" onChange={handleFileUpload} />
        </div>
    </div>
  );
};