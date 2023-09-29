import { useRouter } from "next/router"
import MovieDetails from "../../app/components/MovieDetails"

const MovieDetailPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query as { id: number | undefined }

  return (
    <div>
      <MovieDetails movieId={id}></MovieDetails>
    </div>
  )
}

export default MovieDetailPage
