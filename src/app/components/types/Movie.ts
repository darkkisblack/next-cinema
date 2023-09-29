interface Movie {
  id: number
  title: string
  releaseDate: string
  description: string
  type: string
  year: string | number
  imageUrl: string
  team: {
    directors: string[]
    actors: string[]
  }
  images: string[]
}

export default Movie
