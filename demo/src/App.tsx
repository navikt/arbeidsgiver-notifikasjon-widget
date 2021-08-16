//import React from 'react'

import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget'
import './App.css'

const App = () => {
  return <div className={"typo-normal bakgrunnsside"}>
    <Bedriftsmeny
      organisasjoner={[]}
      onOrganisasjonChange={() => null}
      history={() => {}}>
      <NotifikasjonWidget apiUri="http://localhost:8081/api/graphql" />
    </Bedriftsmeny>
  </div>
}

export default App
