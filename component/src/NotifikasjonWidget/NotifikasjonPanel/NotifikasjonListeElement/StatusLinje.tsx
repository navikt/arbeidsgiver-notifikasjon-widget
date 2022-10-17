import React, { FC, ReactNode } from 'react';
import { BodyShort } from '@navikt/ds-react';
import './StatusLinje.less';
import {Notifikasjon, OppgaveTilstand} from "../../../api/graphql-types";
import {StopWatch, SuccessStroke} from "@navikt/ds-icons";
import {fristDatotekst} from "../dato-funksjoner";


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
        <StatusIkonMedTekst icon={<SuccessStroke/>}>
          Oppgaven er utført
        </StatusIkonMedTekst>
      )

    case OppgaveTilstand.Utgaatt:
      return (
        <StatusIkonMedTekst icon={<StopWatch/>}>
          Fristen gikk ut {fristDatotekst(new Date(notifikasjon.utgaattTidspunkt))}
        </StatusIkonMedTekst>
      )

    case OppgaveTilstand.Ny:
    default:
      return null;
  }
}


type StatusIkonMedTekstProps = {
  icon: ReactNode;
  children: ReactNode;
}

const StatusIkonMedTekst: FC<StatusIkonMedTekstProps> = ({icon, children}) =>
  <BodyShort className='oppgave_status_text' size='small'>
    {icon} {children}
  </BodyShort>;
