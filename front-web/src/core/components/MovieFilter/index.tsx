import './styles.scss'

import { GenresResponse } from '@type/Genre'
import { Genre } from '@type/Movie'
import { makePrivateRequest } from '@utils/request'
import { useEffect, useState } from 'react'
import Select from 'react-select'

type Props = {
  handleChangeGenre: (genre: Genre) => void
  genre: Genre | undefined
}

const MovieFilter = ({ handleChangeGenre, genre }: Props) => {
  const [genres, setGenres] = useState<GenresResponse>([])
  const [genreIsLoading, setGenreIsLoading] = useState(false)

  useEffect(() => {
    setGenreIsLoading(true)
    makePrivateRequest({ url: '/genres' })
      .then((response) => setGenres(response.data))
      .finally(() => setGenreIsLoading(false))
  }, [])

  return (
    <div className="input-base movie-filters-container">
      <Select
        name="genres"
        key={`select${genre?.id}`}
        getOptionLabel={(option: Genre) => option.name}
        getOptionValue={(option: Genre) => String(option.id)}
        isLoading={genreIsLoading}
        isSearchable={false}
        isClearable
        value={genre}
        classNamePrefix="movie-genres-select"
        placeholder="Filtrar por categoria"
        className="filter-select-container"
        maxMenuHeight={600}
        options={genres}
        onChange={(value) => handleChangeGenre(value as Genre)}
      />
    </div>
  )
}

export default MovieFilter
