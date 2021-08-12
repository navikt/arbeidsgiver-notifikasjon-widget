//import React from 'react'

// @ts-ignore
import { NotifikasjonWidget } from '@navikt/arbeidsgiver-notifikasjon-widget'
import './App.less'

const App = () => {
  return <div className={"typo-normal bakgrunnsside"}>
    <NotifikasjonWidget text={'yas, mhms'} />
  </div>
}

export default App
