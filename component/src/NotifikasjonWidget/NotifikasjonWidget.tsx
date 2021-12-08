import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { NotifikasjonBjelle } from './NotifikasjonBjelle/NotifikasjonBjelle'
import NotifikasjonPanel from './NotifikasjonPanel/NotifikasjonPanel'
import './NotifikasjonWidget.less'
import { ServerError, useQuery } from '@apollo/client'
import { HENT_NOTIFIKASJONER } from '../api/graphql'
import useLocalStorage from '../hooks/useLocalStorage'
import { Notifikasjon, Query } from '../api/graphql-types'
import { useAmplitude } from '../utils/amplitude'

const uleste = (
  sistLest: string | undefined,
  notifikasjoner: Notifikasjon[]
): Notifikasjon[] => {
  if (sistLest === undefined) {
    return notifikasjoner
  } else {
    return notifikasjoner.filter(
      ({ opprettetTidspunkt }) =>
        new Date(opprettetTidspunkt).getTime() > new Date(sistLest).getTime()
    )
  }
}

const DEFAULT: Pick<Query, 'notifikasjoner'> = {
  notifikasjoner: {
    notifikasjoner: [],
    feilAltinn: false,
    feilDigiSyfo: false
  }
}

const NotifikasjonWidget = () => {
  const {loggLukking, loggLasting, loggÅpning} = useAmplitude()
  const [sistLest, _setSistLest] = useLocalStorage<string | undefined>(
    'sist_lest',
    undefined
  )

  const { data: { notifikasjoner: notifikasjonerResultat } = DEFAULT, stopPolling } = useQuery(
    HENT_NOTIFIKASJONER,
    {
      pollInterval: 60_000,
      onError(e) {
        if ((e.networkError as ServerError)?.statusCode === 401) {
          console.log('stopper poll pga 401 unauthorized')
          stopPolling()
        }
      },
      onCompleted() {
        if (!erLastetFørsteGang) {
          loggLasting(notifikasjoner.length, antallUleste)
          setErLastetFørsteGang(true)
        }
      }
    }
  )

  const { notifikasjoner } = notifikasjonerResultat
  const setSistLest = useCallback(() => {
    if (notifikasjoner.length > 0) {
      // naiv impl forutsetter sortering
      _setSistLest(notifikasjoner[0].opprettetTidspunkt)
    }
  }, [notifikasjoner])

  const antallUleste = uleste(sistLest, notifikasjoner).length

  const widgetRef = useRef<HTMLDivElement>(null)
  const bjelleRef = useRef<HTMLButtonElement>(null)
  const [erApen, setErApen] = useState(false)
  const [erLastetFørsteGang, setErLastetFørsteGang] = useState(false)

  const lukkÅpentPanelMedLogging = () => {
    if (erApen) {
      loggLukking()
      setErApen(false)
    }
  }
  const åpnePanelMedLogging = (antallNotifikasjoner: number, antallUlesteNotifikasjoner: number) => {
    loggÅpning(antallNotifikasjoner, antallUlesteNotifikasjoner)
    setErApen(true)
    setSistLest()
  }

  const handleFocusOutside: { (event: MouseEvent | KeyboardEvent): void } = (
    e: MouseEvent | KeyboardEvent
  ) => {
    const node = widgetRef.current
    // @ts-ignore
    if (node && node !== e.target && node.contains(e.target as HTMLElement)) {
      return
    }
    lukkÅpentPanelMedLogging()
  }

  useEffect(() => {
    document.addEventListener('click', handleFocusOutside)
    return () => {
      document.removeEventListener('click', handleFocusOutside)
    }
  }, [handleFocusOutside])

  useEffect(() => {
    if (erApen) {
      bjelleRef.current?.scrollIntoView({
        block: 'start',
        inline: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [erApen, bjelleRef])

  const style: CSSProperties = notifikasjoner.length === 0 ? { visibility: 'hidden' } : {};

  return <div ref={widgetRef} className='notifikasjoner_widget' style={style}>
    <NotifikasjonBjelle
      antallUleste={antallUleste}
      erApen={erApen}
      focusableRef={bjelleRef}
      onClick={() => {
        erApen ? lukkÅpentPanelMedLogging() : åpnePanelMedLogging(notifikasjoner.length, antallUleste)
      }}
    />
    <NotifikasjonPanel
      notifikasjoner={notifikasjonerResultat}
      erApen={erApen}
      onLukkPanel={() => {
        lukkÅpentPanelMedLogging()
        bjelleRef.current?.focus()
      }}
    />
  </div>
}

export default NotifikasjonWidget
