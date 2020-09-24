export interface Movie {
    name: string;
    productionYear: number;
    genre: string;
    synopsisShort: string;
    synopsis: string;
    image: string;
  };

export interface Context {
    movies?: Movie[]
}

export interface State {
    movies?: Movie[];
    isLoading: boolean;
   }

export interface Action {
    type: string,
    payload?: any
}

export interface Filters {
    [key: string]: any
}