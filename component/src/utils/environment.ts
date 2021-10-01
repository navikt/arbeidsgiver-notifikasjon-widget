export interface Environment {
    MILJO: 'local' | 'dev-gcp' | 'prod-gcp'
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

export const gittMiljo = <T>(e: Miljo<T>): T=> {
    switch (environment.MILJO) {
        case 'prod-gcp':
            return e.prod
        case 'dev-gcp':
            return e.hasOwnProperty('dev') ? e.dev! : e.other;
        default:
            return e.other
    }
}

export default environment;

