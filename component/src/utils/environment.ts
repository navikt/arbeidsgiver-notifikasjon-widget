export type Miljø = 'local' | 'labs' | 'dev' | 'prod'
  /**
   * TODO: ta bort gcp suffix når vi har riktig håndtering av miljø parameter
   * slik det er nå så lener amplitude seg på at miljø er definert på window.environment
   * vi trenger å propagere dette ned fra prop kanskje via en environment provider elns
   */
  | 'labs-gcp' | 'dev-gcp' | 'prod-gcp';

export interface Environment {
    MILJO: Miljø
}

const environment: Environment = {
    MILJO: 'local',
    ...(window as any)?.environment
};

interface Miljo<T> {
    prod: T;
    dev?: T;
    labs?: T;
    other: T;
}

// TODO: ta bort defaulting av miljø til environment.MILJO pga tight coupling
export const gittMiljo = <T>(e: Miljo<T>, miljø:Miljø=environment.MILJO): T=> {
    switch (miljø) {
        case 'prod':
        case 'prod-gcp':
            return e.prod
        case 'dev':
        case 'dev-gcp':
            return e.hasOwnProperty('dev') ? e.dev! : e.other;
        case 'labs':
        case 'labs-gcp':
            return e.hasOwnProperty('labs') ? e.labs! : e.other;
        default:
            return e.other
    }
}

export default environment;

