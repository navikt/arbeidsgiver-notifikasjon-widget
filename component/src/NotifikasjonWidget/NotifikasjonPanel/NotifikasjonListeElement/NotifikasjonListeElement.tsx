import React from 'react'
import { Next as HoyreChevron } from '@navikt/ds-icons'
import { BodyShort, Detail } from '@navikt/ds-react'
import { sendtDatotekst } from '../dato-funksjoner'
import { Notifikasjon, OppgaveTilstand } from '../../../api/graphql-types'
import { useAmplitude } from '../../../utils/amplitude'
import { StatusLinje } from './StatusLinje'
import './NotifikasjonListeElement.css'
import { BeskjedIkon, OppgaveIkkeNyIkon, OppgaveIkon } from './Ikoner'

interface Props {
  notifikasjon: Notifikasjon
  antall: number
  onKlikketPaaLenke: (notifikasjon: Notifikasjon) => void
  onTabEvent?: (shiftKey: boolean) => void
  gåTilForrige: () => void
  gåTilNeste: () => void
  erValgt: boolean
}

export const NotifikasjonListeElement = (props: Props) => {
  const { loggPilTastNavigasjon } = useAmplitude()
  const notifikasjon = props.notifikasjon

  const date = new Date(notifikasjon.opprettetTidspunkt)
  console.log("Sakstittel: ", notifikasjon.sak?.tittel)

  let ikon
  switch (props.notifikasjon.__typename) {
    case 'Beskjed':
      ikon = <BeskjedIkon />
      break
    case 'Oppgave':
      ikon =
        props.notifikasjon.tilstand === OppgaveTilstand.Ny ? (
          <OppgaveIkon/>
        ) : (
          <OppgaveIkkeNyIkon />
        )

      break
    default:
      console.error(
        // @ts-ignore
        `ukjent notifikasjonstype ${props.notifikasjon.__typename}: ignorerer`
      )
      return null
  }

  return (
    <a
      tabIndex={props.erValgt ? 0 : -1}
      href={props.notifikasjon.lenke}
      className='notifikasjon_liste_element'
      id={'notifikasjon_liste_element-id-' + props.notifikasjon.id}
      onKeyDown={(event) => {
        loggPilTastNavigasjon()
        if (event.key === 'Tab') {
          props.onTabEvent?.(event.shiftKey)
          event.preventDefault()
        }
        if (event.key === 'ArrowUp' || event.key === 'Up') {
          props.gåTilForrige()
        }
        if (event.key === 'ArrowDown' || event.key === 'Down') {
          props.gåTilNeste()
        }
      }}
      onClick={() => {
        props.onKlikketPaaLenke(notifikasjon)
      }}
    >
      <div className='notifikasjon_liste_element-lenkepanel'>
        <div className='notifikasjon_liste_element-lenkepanel-ikon'>{ikon}</div>
        <div className='notifikasjon_liste_element-lenkepanel-innhold'>
          <BodyShort size="small">
            {notifikasjon.brukerKlikk?.klikketPaa ? (
              notifikasjon.tekst
            ) : (
              <strong>{notifikasjon.tekst}</strong>
            )}
          </BodyShort>
          <StatusLinje notifikasjon={notifikasjon} />
        </div>
        <div className='notifikasjon_liste_element-lenkepanel-chevron'>
          <HoyreChevron aria-hidden={true} />
        </div>

        <div
          aria-label={notifikasjon.brukerKlikk?.klikketPaa ? '' : 'ikke besøkt'}
        />
      </div>

      <div className='notifikasjon_liste_element-metadata'>
        <Detail spacing={false} className='notifikasjon_liste_element-metadata-dato' size='small'>
          {sendtDatotekst(date)}
        </Detail>
      </div>
      {notifikasjon.sak?.tittel ? <BodyShort spacing={false}>
        {notifikasjon.brukerKlikk?.klikketPaa ? (
          notifikasjon.sak?.tittel
        ) : (
          <strong>{notifikasjon.sak?.tittel}</strong>
        )}
      </BodyShort> : null}
      <BodyShort spacing={false} className='notifikasjon_liste_element-virksomhetsnavn' size='small'>
        {notifikasjon.virksomhet.navn.toUpperCase()}
      </BodyShort>


    </a>
  )
}
