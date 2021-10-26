import React, { useEffect, useState } from 'react'
import { Undertittel } from '../../typography'
import { Close } from '@navikt/ds-icons'
import { Alert } from '@navikt/ds-react'
import { NotifikasjonListeElement } from './NotifikasjonListeElement/NotifikasjonListeElement'
import './NotifikasjonPanel.less'
import { Notifikasjon, NotifikasjonerResultat } from '../../api/graphql-types'
import { useMutation } from '@apollo/client'
import { NOTIFIKASJONER_KLIKKET_PAA } from '../../api/graphql'
import { NotifikasjonInformasjon } from './NotifikasjonInformasjon/NotifikasjonInformasjon'
import { loggNotifikasjonKlikk } from '../../utils/funksjonerForAmplitudeLogging'

interface Props {
  erApen: boolean
  onLukkPanel: () => void
  notifikasjoner: NotifikasjonerResultat
}

const NotifikasjonPanel = (
  {
    notifikasjoner: { notifikasjoner, feilAltinn, feilDigiSyfo },
    erApen,
    onLukkPanel
  }: Props) => {
  const [valgtNotifikasjon, setValgtNotifikasjon] = useState(notifikasjoner[0])

  const lukkPanel = () => {
    setValgtNotifikasjon(notifikasjoner[0])
    onLukkPanel()
  }

  const focusXButton = () => {
    document.getElementById('notifikasjon_panel-header-xbtn')?.focus()
  }
  const focusNotifikasjon = () => {
    document
      .getElementById('notifikasjon_liste_element-id-' + valgtNotifikasjon.id)
      ?.focus()
  }
  const focusMoreInfo = () => {
    document.getElementById('notifikasjon-informasjon-knapp')?.focus()
  }

  useEffect(() => {
    if (erApen) {
      const containerElement = document.getElementById(
        'notifikasjon_panel-liste'
      )
      containerElement?.scrollTo(0, 0)
      setValgtNotifikasjon(notifikasjoner[0])
      focusNotifikasjon()
    }
  }, [erApen])

  useEffect(() => {
    if (erApen) {
      focusNotifikasjon()
    }
  }, [erApen, valgtNotifikasjon, notifikasjoner])

  const [notifikasjonKlikketPaa] = useMutation(NOTIFIKASJONER_KLIKKET_PAA)

  return (
    <div
      role='presentation'
      onKeyDown={({ key }) => {
        if (key === 'Escape' || key === 'Esc') {
          lukkPanel()
        }
      }}
    >
      <div
        id='notifikasjon_panel'
        role='dialog'
        aria-modal='true'
        aria-labelledby='notifikasjon_panel-header'
        className={`notifikasjon_panel ${
          erApen ? 'notifikasjon_panel--apen' : ''
        }`}
      >
        <div
          id='notifikasjon_panel-header'
          className='notifikasjon_panel-header'
        >
          <Undertittel>Beskjeder og oppgaver</Undertittel>
          <button
            id='notifikasjon_panel-header-xbtn'
            className='notifikasjon_panel-header-xbtn'
            aria-label='lukk'
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                if (event.shiftKey) {
                  focusMoreInfo()
                  event.preventDefault()
                }
              }
            }}
            onClick={() => {
              lukkPanel()
            }}
          >
            <Close />
          </button>
        </div>

        {(feilAltinn || feilDigiSyfo) ?
          <div className='notifikasjon_panel-feilmelding'>
            {feilAltinn ?
              <Alert variant='error'>
                Vi opplever ustabilitet med Altinn, så du
                ser kanskje ikke alle notifikasjoner.
                Prøv igjen senere.
              </Alert>
              : null}

            {feilDigiSyfo ?
              <Alert variant='error'>
                Vi opplever feil og kan ikke hente
                eventuelle notifikasjoner for sykemeldte
                som du skal følge opp.
                Prøv igjen senere.
              </Alert>
              : null}
          </div>
          : null
        }

        <ul
          role='feed'
          id='notifikasjon_panel-liste'
          className='notifikasjon_panel-liste'
        >
          {notifikasjoner?.map((notifikasjon: Notifikasjon, index: number) => (
            <li key={index} role='article'>
              <NotifikasjonListeElement
                antall={notifikasjoner?.length}
                erValgt={notifikasjon === valgtNotifikasjon}
                gåTilForrige={() => {
                  const forrigeIndex = Math.max(0, (notifikasjoner.indexOf(notifikasjon)) - 1)
                  setValgtNotifikasjon(notifikasjoner[forrigeIndex])
                }}
                gåTilNeste={() => {
                  const nesteIndex = Math.min(notifikasjoner.indexOf(notifikasjon) + 1, notifikasjoner?.length - 1)
                  setValgtNotifikasjon(notifikasjoner[nesteIndex])
                }}
                onKlikketPaaLenke={(klikketPaaNotifikasjon) => {
                  // noinspection JSIgnoredPromiseFromCall sentry håndterer unhandled promise rejections
                  loggNotifikasjonKlikk(klikketPaaNotifikasjon, notifikasjoner.indexOf(notifikasjon))
                  notifikasjonKlikketPaa({ variables: { id: klikketPaaNotifikasjon.id } })
                  setValgtNotifikasjon(klikketPaaNotifikasjon)
                }}
                notifikasjon={notifikasjon}
              />
            </li>
          ))}
        </ul>

        <div className='notifikasjon_panel-footer'>
          <NotifikasjonInformasjon
            onTabEvent={(shiftKey, event) => {
              if (!shiftKey) {
                focusXButton()
                event.preventDefault()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NotifikasjonPanel
