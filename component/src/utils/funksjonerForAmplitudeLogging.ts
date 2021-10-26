import amplitude from '../utils/amplitude'
import {Notifikasjon} from "../api/graphql-types";

export const loggÅpning = (antallNotifikasjoner: number, ulesteNotifikasjoner: number) => {
  amplitude.logEvent('panel-ekspander', {
    tittel: 'arbeidsgiver notifikasjon panel',
    url: `${window.location.origin}${window.location.pathname}`,
    'antall-notifikasjoner': antallNotifikasjoner,
    'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
    'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner
  })
}

export const loggLukking = () => {
  amplitude.logEvent('panel-kollaps', {
    tittel: 'arbeidsgiver notifikasjon panel',
    url: `${window.location.origin}${window.location.pathname}`
  })
}

export const loggPilTastNavigasjon = () => {
  amplitude.logEvent('piltast-navigasjon', {
    url: `${window.location.origin}${window.location.pathname}`
  })
}

export const loggNotifikasjonKlikk = (notifikasjon: Notifikasjon, index: number) => {
  const klikketPaaTidligere = notifikasjon.brukerKlikk.klikketPaa
  amplitude.logEvent('notifikasjon-klikk', {
    url: `${window.location.origin}${window.location.pathname}`,
    index: index,
    'merkelapp': notifikasjon.merkelapp,
    'klikket-paa-tidligere': klikketPaaTidligere
  })
}
