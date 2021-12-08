import amplitude, { AmplitudeClient } from 'amplitude-js'
import { Notifikasjon } from '../api/graphql-types'
import { useEnvironment } from './EnvironmentProvider'

const getApiKey = () => {
  return window.location.hostname === 'arbeidsgiver.nav.no'
    ? '3a6fe32c3457e77ce81c356bb14ca886'
    : '55477baea93c5227d8c0f6b813653615'
}

const createAmpltiudeInstance = () => {
  const instance = amplitude.getInstance()
  instance.init(getApiKey(), '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true
  })
  return instance
}

class AmplitudeLogger {
  amplitudeClient: AmplitudeClient;

  constructor(amplitudeClient: AmplitudeClient) {
    this.amplitudeClient = amplitudeClient;
  }

  loggLasting(antallNotifikasjoner: number, ulesteNotifikasjoner: number) {
    this.amplitudeClient.logEvent('last-komponent', {
      tittel: 'notifikasjons-widget',
      url: window.location.toString(),
      'antall-notifikasjoner': antallNotifikasjoner,
      'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
      'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner
    })
  }

  loggÅpning(antallNotifikasjoner: number, ulesteNotifikasjoner: number) {
    this.amplitudeClient.logEvent('panel-ekspander', {
      tittel: 'arbeidsgiver notifikasjon panel',
      url: window.location.toString(),
      'antall-notifikasjoner': antallNotifikasjoner,
      'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
      'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner
    })
  }

  loggLukking() {
    this.amplitudeClient.logEvent('panel-kollaps', {
      tittel: 'arbeidsgiver notifikasjon panel',
      url: window.location.toString()
    })
  }

  loggPilTastNavigasjon() {
    this.amplitudeClient.logEvent('piltast-navigasjon', {
      url: window.location.toString()
    })
  }

  loggNotifikasjonKlikk(notifikasjon: Notifikasjon, index: number) {
    const klikketPaaTidligere = notifikasjon.brukerKlikk.klikketPaa
    this.amplitudeClient.logEvent('notifikasjon-klikk', {
      url: window.location.toString(),
      index: index,
      'merkelapp': notifikasjon.merkelapp,
      'klikket-paa-tidligere': klikketPaaTidligere,
      'destinasjon': notifikasjon.lenke
    })
  }
}

export function useAmplitude(): AmplitudeLogger {
  const { gittMiljø } = useEnvironment();

  const amplitudeClient = gittMiljø({
    prod: () => createAmpltiudeInstance(),
    dev: () => createAmpltiudeInstance(),
    other: () => ({
      logEvent: (event: string, data?: any) => {
        console.log(`${event}: ${JSON.stringify(data)}`, {event, data})
      },
      setUserProperties: (userProps: object) => {
        console.log(`set userprops: ${JSON.stringify(userProps)}`)
      }
    } as amplitude.AmplitudeClient)
  })()

  return new AmplitudeLogger(amplitudeClient)
}



