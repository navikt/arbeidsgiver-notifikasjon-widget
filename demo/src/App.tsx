//import React from 'react'

// @ts-ignore
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget'
import './App.css'

const App = () => {
  return <div className={"typo-normal bakgrunnsside"}>
    <NotifikasjonWidget apiUri="http://localhost:8081/api/graphql" />
  </div>
}

export default App
