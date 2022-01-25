export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISO8601DateTime: any;
};

export type Beskjed = {
  __typename?: 'Beskjed';
  brukerKlikk: BrukerKlikk;
  merkelapp: Scalars['String'];
  tekst: Scalars['String'];
  lenke: Scalars['String'];
  opprettetTidspunkt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  virksomhet: Virksomhet;
};

export type BrukerKlikk = {
  __typename?: 'BrukerKlikk';
  id: Scalars['ID'];
  klikketPaa: Scalars['Boolean'];
};

export type EgendefinertStatus = {
  __typename?: 'EgendefinertStatus';
  value: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  notifikasjonKlikketPaa: NotifikasjonKlikketPaaResultat;
};


export type MutationNotifikasjonKlikketPaaArgs = {
  id: Scalars['ID'];
};

export type Notifikasjon = Beskjed | Oppgave;

export type NotifikasjonKlikketPaaResultat = BrukerKlikk | UgyldigId;

export type NotifikasjonerResultat = {
  __typename?: 'NotifikasjonerResultat';
  notifikasjoner: Array<Notifikasjon>;
  feilAltinn: Scalars['Boolean'];
  feilDigiSyfo: Scalars['Boolean'];
};

export type Oppgave = {
  __typename?: 'Oppgave';
  brukerKlikk: BrukerKlikk;
  tilstand?: Maybe<OppgaveTilstand>;
  merkelapp: Scalars['String'];
  tekst: Scalars['String'];
  lenke: Scalars['String'];
  opprettetTidspunkt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  virksomhet: Virksomhet;
};

export enum OppgaveTilstand {
  Ny = 'NY',
  Utfoert = 'UTFOERT'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  endCursor: Scalars['String'];
};

export type PredefinertStatus = {
  __typename?: 'PredefinertStatus';
  value: StatusEnum;
};

export type Query = {
  __typename?: 'Query';
  notifikasjoner: NotifikasjonerResultat;
  saker: SakConnection;
  whoami?: Maybe<Scalars['String']>;
};


export type QuerySakerArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  virksomhetsnummer: Scalars['String'];
};

export type Sak = {
  __typename?: 'Sak';
  virksomhet: Virksomhet;
  sisteStatus: Statusoppdatering;
};

export type SakConnection = {
  __typename?: 'SakConnection';
  edges: Array<SakEdge>;
  pageInfo: PageInfo;
};

export type SakEdge = {
  __typename?: 'SakEdge';
  node: Sak;
  cursor: Scalars['String'];
};

export type Status = PredefinertStatus | EgendefinertStatus;

export enum StatusEnum {
  Mottatt = 'MOTTATT',
  UnderBehandling = 'UNDER_BEHANDLING'
}

export type Statusoppdatering = {
  __typename?: 'Statusoppdatering';
  status: Status;
  tidspunkt: Scalars['ISO8601DateTime'];
};

export type UgyldigId = {
  __typename?: 'UgyldigId';
  feilmelding: Scalars['String'];
};

export type Virksomhet = {
  __typename?: 'Virksomhet';
  virksomhetsnummer: Scalars['String'];
  navn: Scalars['String'];
};
