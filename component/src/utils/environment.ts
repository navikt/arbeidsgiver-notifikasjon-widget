export type Miljø = 'local' | 'dev-gcp' | 'prod-gcp'

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
    other: T;
}

export const gittMiljo = <T>(e: Miljo<T>, miljø:Miljø=environment.MILJO): T=> {
    switch (miljø) {
        case 'prod-gcp':
            return e.prod
        case 'dev-gcp':
            return e.hasOwnProperty('dev') ? e.dev! : e.other;
        default:
            return e.other
    }
}

export default environment;

