import React, {FC, ReactNode} from 'react';
import {BodyShort} from '@navikt/ds-react';
import './StatusLinje.less';
import {Notifikasjon, OppgaveTilstand} from "../../../api/graphql-types";
import {StopWatch, SuccessStroke} from "@navikt/ds-icons";
import {formatterDato, fristDatotekst} from "../dato-funksjoner";


export interface StatusLinjeProps {
  notifikasjon: Notifikasjon
}

export const StatusLinje: FC<StatusLinjeProps> = ({notifikasjon}) => {
  if (notifikasjon.__typename !== 'Oppgave') {
    return null;
  }

  switch (notifikasjon.tilstand) {
    case OppgaveTilstand.Utfoert:
      return (
        <StatusIkonMedTekst icon={<SuccessStroke aria-hidden={true}/>}>
          Oppgaven er utført
        </StatusIkonMedTekst>
      )

    case OppgaveTilstand.Utgaatt:
      return (
        <StatusIkonMedTekst icon={<StopWatch aria-hidden={true}/>}>
          Fristen gikk ut {fristDatotekst(new Date(notifikasjon.utgaattTidspunkt))}
        </StatusIkonMedTekst>
      )

    case OppgaveTilstand.Ny:

      if (!notifikasjon.frist && !notifikasjon.paaminnelseTidspunkt) {
        return null
      } else if (!notifikasjon.frist && notifikasjon.paaminnelseTidspunkt) {
        return <StatusIkonMedTekst
          className="oppgave_status_paminnelse"
          icon={<StopWatch aria-hidden={true}/>}
        >
          Påminnelse
        </StatusIkonMedTekst>
      } else if (notifikasjon.frist && !notifikasjon.paaminnelseTidspunkt) {
        return <StatusIkonMedTekst icon={<StopWatch aria-hidden={true}/>}>
          Frist {formatterDato(new Date(notifikasjon.frist))}
        </StatusIkonMedTekst>
      } else {
        return <StatusIkonMedTekst
          className="oppgave_status_paminnelse"
          icon={<StopWatch aria-hidden={true}/>}
        >
          Påminnelse &ndash; Frist {formatterDato(new Date(notifikasjon.frist))}
        </StatusIkonMedTekst>
      }

    default:
      return null;
  }
}


type StatusIkonMedTekstProps = {
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}

const StatusIkonMedTekst: FC<StatusIkonMedTekstProps> = ({icon, className, children}) =>
  <BodyShort className={`oppgave_status_text ${className}`} size='small'>
    {icon} {children}
  </BodyShort>;
