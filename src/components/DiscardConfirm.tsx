import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';


interface DiscardConfirmProps {
  contact: any; // Replace 'any' with the appropriate type
  btnRef: React.RefObject<HTMLButtonElement>;
  removeContact: (id: number) => void;
  setContactToDiscard: React.Dispatch<React.SetStateAction<any>>;
}

export default function DiscardConfirm({ contact, setContactToDiscard, btnRef, removeContact }: DiscardConfirmProps) {

  const handleConfirm = () => {
    removeContact(contact.id)
  }

  const handleCancel = () => {
    setContactToDiscard(null)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" ref={btnRef} className='hidden'>Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent aria-describedby="discard-dialog-description" className='w-96' aria-description="discard-dialog-description">
        <AlertDialogHeader>
          <AlertDialogTitle>Segura querés descartar este contacto?</AlertDialogTitle>
          <AlertDialogDescription id="discard-dialog-description">
            Si descartás este contacto, tendrás que volver a cargar el CSV y empezar desde 0.
            <div className='mt-4'>
            <Badge>👤 {contact.name || 'Vacío'}</Badge> <Badge>🤝 {contact.company || 'Vacío'}</Badge> <Badge>📞 {contact.phone ? "0"+contact.phone : 'Vacío'}</Badge>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
