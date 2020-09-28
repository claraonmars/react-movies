export interface Movie {
    name: string;
    productionYear: number;
    genre: string;
    synopsisShort: string;
    synopsis: string;
    image: string;
  };

export interface State {
    movies?: Movie[];
    isLoading: boolean;
    filtersApplied: Filters
   }

export interface Action {
    type: string,
    payload?: any
}

export interface Filters {
    [key: string]: any
}