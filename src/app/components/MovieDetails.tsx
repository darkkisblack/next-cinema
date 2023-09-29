import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "tailwindcss/tailwind.css"
import Movie from "./types/Movie"
import Image from "next/image"
import Lightbox from "react-18-image-lightbox"
import "react-18-image-lightbox/style.css"

interface MovieDetailsProps {
  movieId: number | undefined
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId }) => {
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    if (movieId) {
      fetch(`http://localhost:3001/movies/${movieId}`)
        .then((response) => response.json())
        .then((data) => setMovie(data))
    }
  }, [movieId])

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxIsOpen(true)
  }

  const closeLightbox = () => {
    setLightboxIsOpen(false)
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div>
      <div className="flex items-center justify-center bg-blue-600 text-white py-4">
        <Image
          src="https://www.svgrepo.com/show/99301/popcorn.svg"
          alt="Киновтопку"
          width={33}
          height={33}
        />
        <h1 className="text-xl font-semibold ml-2">Киновтопку</h1>
      </div>
      <div className="container mx-auto py-8 shadow-lg">
        <div className="bg-white  rounded-lg overflow-hidden">
          <img
            src={movie.images[0]}
            alt={movie.title}
            className="object-cover h-200 w-300 mx-auto text-center"
          />
          <div className="px-6 py-10 mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-2">{movie.title}</h1>
            <p className="text-gray-500 mb-4">
              Дата выхода: {movie.releaseDate}
            </p>
            <p className="mb-4">{movie.description}</p>

            <h2 className="text-xl font-semibold mb-2">Команда:</h2>
            <div className="mb-4">
              <p className="font-semibold">Режиссеры:</p>
              <p>{movie.team.directors.join(", ")}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Актеры:</p>
              <p>{movie.team.actors.join(", ")}</p>
            </div>

            <h2 className="text-xl font-semibold mb-2">Кадры из фильма:</h2>
            <div className="carousel-container">
              <Slider {...carouselSettings} className="carousel">
                {movie.images.map((image, index) => (
                  <div
                    key={index}
                    className="carousel-slide mx-auto text-center"
                    onClick={() => openLightbox(index)}>
                    <img
                      src={image}
                      alt={`Кадр ${index + 1}`}
                      className="object-cover rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto h-300 w-200"
                      style={{ margin: "auto" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {lightboxIsOpen && (
        <Lightbox
          mainSrc={movie.images[currentImageIndex]}
          nextSrc={movie.images[(currentImageIndex + 1) % movie.images.length]}
          prevSrc={
            movie.images[
              (currentImageIndex + movie.images.length - 1) %
                movie.images.length
            ]
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setCurrentImageIndex(
              (currentImageIndex + movie.images.length - 1) %
                movie.images.length,
            )
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((currentImageIndex + 1) % movie.images.length)
          }
        />
      )}
    </div>
  )
}

export default MovieDetails
