import React, { useRef } from 'react';
import Papa from 'papaparse';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast';
import { SCREENS } from '@/lib/utils';

interface SetupProps {
  setMessageDataList: (data: any[]) => void;
  setCsvData: (data: any[]) => void;
  setScreen: (screen: any) => void;
}

interface ParsedData {
  nombre: string;
  emprendimiento: string;
  distintivo: string;
  llegada: string;
  costoEnvio: string;
  costoProducto: string;
  costoTotal: string;
  direccion: string;
  whatsapp: string;
}

const validateCSV = (messageData: { name: string; company: string; time: string; shipmentCost: string; productCost: string; totalCost: string; phone: string }) => {
  if (!messageData.company || (!messageData.phone && !messageData.name)) {
    return false;
  }
  return true;
}

export const Setup: React.FC<SetupProps> = ({ setMessageDataList, setCsvData, setScreen }) => {

  const { toast } = useToast();
  const fileInput = useRef<HTMLInputElement>(null);

  const OnClickSubmit = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  const parsePhone = (phone: string) => {
    phone = phone.trim();
    if (phone.startsWith("598") && phone.length === 11) {
      return phone.slice(-8);
    }
    if (phone.startsWith("0") && phone.length === 9) {
      return phone.slice(1);
    }
    return phone;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageDataList([]);
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      Papa.parse(file, {
        header: true,
        complete: (results: Papa.ParseResult<ParsedData>) => {
          const processedData = results.data.map((item: ParsedData, index) => {
            return {
              id: index,
              name: item.nombre && item.nombre.trim(),
              company: item.emprendimiento && item.emprendimiento.trim(),
              time: item.llegada && item.llegada.trim(),
              shipmentCost: item.costoEnvio && item.costoEnvio.trim(),
              productCost: item.costoProducto && item.costoProducto.trim(),
              totalCost: item.costoTotal && item.costoTotal.trim(),
              phone: parsePhone(item.whatsapp),
              description: item.distintivo && item.distintivo.trim(),
            };
          });
          const validatedData = processedData.filter(validateCSV);
          setCsvData(processedData);
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
            setScreen(SCREENS[0]);
          }
        },
      });
    }
  };

  return (
    <div>
        <div className="grid w-full max-w-sm min-h-[80vh] items-center gap-1.5 mx-auto">
          <Button onClick={OnClickSubmit} className='mb-10'>Haz click aquí para subir el archivo CSV</Button>
          <Input type="file" className="form-control-file hidden" ref={fileInput} id="csv" onChange={handleFileUpload} />
        </div>
    </div>
  );
};