import { Menu } from 'lucide-react'
import { Button } from './components/ui/button'
import ScreenSelector from './screens/ScreenSelector'
import { useEffect, useRef, useState } from 'react'
import { SCREENS } from './lib/utils'
import { ParsedData } from './interfaces/parsedData.interface'
import { Setup } from './components/Setup'
import CsvToWpp from './screens/CsvToWpp'
import CsvToContacts from './screens/CsvToContacts'

function App() {

  const menuTrigger = useRef<HTMLButtonElement>(null)

  const [screen, setScreen] = useState(SCREENS[2]);

  const [csvData, setCsvData] = useState<any[]>([]);

  const [messageDataList, setMessageDataList] = useState<ParsedData[]>([]);
  const [contactDataList, setContactDataList] = useState<any[]>([]);


  const onClickMenuBtn = () => {
    if (menuTrigger.current) {
      menuTrigger.current.click()
    }
  }

  useEffect(() => {
    if(csvData){
      setContactDataList(csvData)
    }
  }, [csvData])
  

  return (
    <>
      <ScreenSelector refTrigger={menuTrigger} setScreen={setScreen} isDataLoaded={csvData?.length > 1}/>
      { screen === SCREENS[0] && <CsvToWpp messageDataList={messageDataList}/> }
      { screen === SCREENS[1] && <CsvToContacts contacts={contactDataList} setContacts={setContactDataList}/> }
      { screen === SCREENS[2] && <Setup setMessageDataList={setMessageDataList} setCsvData={setCsvData}/> }
      <Button size="icon" onClick={onClickMenuBtn} className="fixed bottom-4 right-4">
        <Menu/>
      </Button>
    </>
  )
}

export default App
