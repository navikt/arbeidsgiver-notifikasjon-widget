import Bedriftsmeny from '@navikt/bedriftsmeny'
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css'
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget'
import { Router } from 'react-router-dom'
import './App.css'
import { createBrowserHistory, History } from 'history'
import { MOCK_ORGANISASJONER } from './MockOrganisasjoner'
import {useState} from "react";

const history: History = createBrowserHistory()

const App = () => {
  const [orgname, setOrgname] = useState("")
  return <div className={'typo-normal bakgrunnsside'}>
    <Router history={history}>
      <div style={{height: "20em"}}>
        dekorator
      </div>
      <Bedriftsmeny
        sidetittel={orgname}
        organisasjoner={MOCK_ORGANISASJONER}
        onOrganisasjonChange={(org) => setOrgname(org.Name)}
        history={history}>
        <NotifikasjonWidget miljo={'local'} />
      </Bedriftsmeny>
      <div style={{height: "30em"}}>
        footer
      </div>
    </Router>
  </div>
}

export default App
