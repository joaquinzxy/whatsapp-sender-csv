import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { SCREENS } from '@/lib/utils';
import React, { RefObject, useRef } from 'react';

interface ScreenSelectorProps {
  refTrigger: RefObject<HTMLButtonElement>;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  isDataLoaded: boolean;
}

const ScreenSelector: React.FC<ScreenSelectorProps> = ({ refTrigger, isDataLoaded, setScreen }) => {

  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const handleScreenSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setScreen(event.currentTarget.id)
    closeBtnRef.current?.click()
  }


  return (
    <Drawer>
      <DrawerTrigger ref={refTrigger} className='hidden'></DrawerTrigger>
      <DrawerContent aria-describedby="drawer-description">
        <DrawerHeader>
          <DrawerTitle className='mb-4'>Que aplicación te gustaría usar?</DrawerTitle>
          <DrawerDescription id="drawer-description" className='sr-only'>
          Selecciona una de las opciones a continuación para continuar.
          </DrawerDescription>
          <Button id={SCREENS[0]} onClick={handleScreenSelect} disabled={!isDataLoaded}>CSV a mensajes</Button>
          <Button id={SCREENS[1]} onClick={handleScreenSelect} disabled={!isDataLoaded}>CSV a contactos</Button>
          <Button id={SCREENS[2]} onClick={handleScreenSelect}>Cargar archivo</Button>

        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant={'outline'} ref={closeBtnRef}>Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ScreenSelector;