import { createContext } from 'react';
import { Context } from '../types'

const MovieContext = createContext<Context>({
    movies: [{name: 'string', productionYear: 1, genre: 'string', synopsisShort: 'string', synopsis: 'string', image: 'string'}]
})

export default MovieContext