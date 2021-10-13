import amplitude from '../utils/amplitude'

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

export const loggNotifikasjonKlikk = (klikketPaaTidligere: boolean, index: number) => {
  amplitude.logEvent('notifikasjon-klikk', {
    url: window.location.toString(),
    index: index,
    'klikket-paa-tidligere': klikketPaaTidligere
  })
}
