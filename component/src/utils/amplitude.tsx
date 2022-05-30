import amplitude, { AmplitudeClient } from 'amplitude-js'
import { Notifikasjon } from '../api/graphql-types'
import { useEnvironment } from './EnvironmentProvider'
import React, { createContext, FC, useContext } from "react";

const createAmpltiudeInstance = (apiKey: string) => {
  const instance = amplitude.getInstance()
  instance.init(apiKey, '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true
  })
  return instance
}

const createAmplitudeLogger = (amplitudeClient: AmplitudeClient) => ({
  loggLasting: (antallNotifikasjoner: number, ulesteNotifikasjoner: number) => {
    amplitudeClient.logEvent('last-komponent', {
      tittel: 'notifikasjons-widget',
      url: window.location.toString(),
      'antall-notifikasjoner': antallNotifikasjoner,
      'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
      'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner
    })
  },

  loggÅpning: (antallNotifikasjoner: number, ulesteNotifikasjoner: number) => {
    amplitudeClient.logEvent('panel-ekspander', {
      tittel: 'arbeidsgiver notifikasjon panel',
      url: window.location.toString(),
      'antall-notifikasjoner': antallNotifikasjoner,
      'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
      'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner
    })
  },

  loggLukking: () => {
    amplitudeClient.logEvent('panel-kollaps', {
      tittel: 'arbeidsgiver notifikasjon panel',
      url: window.location.toString()
    })
  },

  loggPilTastNavigasjon: () => {
    amplitudeClient.logEvent('piltast-navigasjon', {
      url: window.location.toString()
    })
  },

  loggNotifikasjonKlikk: (notifikasjon: Notifikasjon, index: number) => {
    const klikketPaaTidligere = notifikasjon.brukerKlikk.klikketPaa
    amplitudeClient.logEvent('notifikasjon-klikk', {
      url: window.location.toString(),
      index: index,
      'merkelapp': notifikasjon.merkelapp,
      'klikket-paa-tidligere': klikketPaaTidligere,
      'destinasjon': notifikasjon.lenke
    })
  }
})

const stubbedAmplitudeClient = {
  logEvent: (event: string, data?: any) => {
    console.log(`${event}: ${JSON.stringify(data)}`, {event, data})
  },
  setUserProperties: (userProps: object) => {
    console.log(`set userprops: ${JSON.stringify(userProps)}`)
  }
} as amplitude.AmplitudeClient

const AmplitudeContext = createContext(createAmplitudeLogger(stubbedAmplitudeClient))

export const AmplitudeProvider: FC = ({children}) => {
  const { gittMiljø } = useEnvironment();
  const client = gittMiljø({
    prod: () => createAmpltiudeInstance('a8243d37808422b4c768d31c88a22ef4'),
    dev: () => createAmpltiudeInstance('6ed1f00aabc6ced4fd6fcb7fcdc01b30'),
    other: () => stubbedAmplitudeClient
  })()
  const logger = createAmplitudeLogger(client)
  return <AmplitudeContext.Provider value={logger}>
    {children}
  </AmplitudeContext.Provider>
}

export function useAmplitude() {
  return useContext(AmplitudeContext)
}



