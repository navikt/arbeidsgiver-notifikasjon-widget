import amplitude from '../utils/amplitude'
import {Notifikasjon} from "../api/graphql-types";

export const loggLasting = (antallNotifikasjoner: number, ulesteNotifikasjoner: number) => {
  amplitude.logEvent('last-komponent', {
    tittel: 'notifikasjons-widget',
    url: window.location.toString(),
    'antall-notifikasjoner': antallNotifikasjoner,
    'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
    'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner
  })
}

export const loggÅpning = (antallNotifikasjoner: number, ulesteNotifikasjoner: number) => {
  amplitude.logEvent('panel-ekspander', {
    tittel: 'arbeidsgiver notifikasjon panel',
    url: window.location.toString(),
    'antall-notifikasjoner': antallNotifikasjoner,
    'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
    'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner
  })
}

export const loggLukking = () => {
  amplitude.logEvent('panel-kollaps', {
    tittel: 'arbeidsgiver notifikasjon panel',
    url: window.location.toString()
  })
}

export const loggPilTastNavigasjon = () => {
  amplitude.logEvent('piltast-navigasjon', {
    url: window.location.toString()
  })
}

export const loggNotifikasjonKlikk = (notifikasjon: Notifikasjon, index: number) => {
  const klikketPaaTidligere = notifikasjon.brukerKlikk.klikketPaa
  amplitude.logEvent('notifikasjon-klikk', {
    url: window.location.toString(),
    index: index,
    'merkelapp': notifikasjon.merkelapp,
    'klikket-paa-tidligere': klikketPaaTidligere,
    'destinasjon': notifikasjon.lenke
  })
}
