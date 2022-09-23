import React, { FC, ReactNode } from 'react';
import { BodyShort } from '@navikt/ds-react';
import './Status.less';


export type Props = {
  icon: ReactNode;
  children: ReactNode;
}

export const Status: FC<Props> = ({icon, children}) =>
  <BodyShort className='oppgave_status_text' size='small'>
    {icon} {children}
  </BodyShort>;
