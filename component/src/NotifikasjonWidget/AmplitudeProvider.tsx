import React, {createContext, FunctionComponent} from 'react';
import amplitude from "../utils/amplitude";

type Context = {
  loggNotifikasjonKlikk: (klikketPaaTidligere: boolean, index: number) => void;
  loggÅpning: (lesteNotifikasjoner: number, ulesteNotifikasjoner: number) => void;
  loggLukking: () => void;
  loggPilTastNavigasjon: () => void;

}

interface Props {
  lokal: boolean
}

export const AmplitudeLoggerContext = createContext<Context>({} as Context);

export const AmplitudeProvider: FunctionComponent<Props> = (props) => {
  const amplitudeclient = amplitude(props.lokal)

  const loggÅpning = (antallNotifikasjoner: number, ulesteNotifikasjoner: number) => {
    amplitudeclient.logEvent('panel-ekspander', {
      tittel: 'arbeidsgiver notifikasjon panel',
      url: window.location.toString(),
      'antall-notifikasjoner': antallNotifikasjoner,
      'antall-ulestenotifikasjoner': ulesteNotifikasjoner,
      'antall-lestenotifikasjoner': antallNotifikasjoner - ulesteNotifikasjoner,
    });
  }

  const loggLukking = () => {
    amplitudeclient.logEvent('panel-kollaps', {
      tittel: 'arbeidsgiver notifikasjon panel',
      url: window.location.toString(),
    });
  }

  const loggPilTastNavigasjon = () => {
    amplitudeclient.logEvent('piltast-navigasjon', {
      url: window.location.toString(),
    });
  }
  const loggNotifikasjonKlikk = (klikketPaaTidligere: boolean, index: number) => {
    amplitudeclient.logEvent('notifikasjon-klikk', {
      url: window.location.toString(),
      index: index,
      'klikket-paa-tidligere': klikketPaaTidligere
    });
  }

  let defaultContext: Context = {
    loggNotifikasjonKlikk: loggNotifikasjonKlikk,
    loggLukking: loggLukking,
    loggÅpning: loggÅpning,
    loggPilTastNavigasjon: loggPilTastNavigasjon
  };

  return (
    <AmplitudeLoggerContext.Provider value={defaultContext}>
      {props.children}
    </AmplitudeLoggerContext.Provider>
  )
};
