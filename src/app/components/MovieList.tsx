"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Movie from "./types/Movie"
import Image from "next/image"

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [yearFilter, setYearFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMovies(data)
      })
  }, [])
  const filteredMovies = movies.filter((movie: Movie) => {
    const filterByYear =
      yearFilter === "" || movie.year.toString() === yearFilter
    const filterByType = typeFilter === "" || movie.type === typeFilter
    return filterByYear && filterByType
  })

  const handleYearFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearFilter(e.target.value)
  }

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value)
  }

  const uniqueYears = Array.from(new Set(movies.map((movie) => movie.year)))

  const yearOptions = uniqueYears.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))

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
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold my-8 text-center">
          ТОП-10 самых низкорейтинговых фильмов
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          <select
            className="p-2 border border-gray-300 rounded"
            value={yearFilter}
            onChange={handleYearFilterChange}>
            <option value="">Все годы</option>
            {yearOptions}
          </select>
          <select
            className="p-2 border border-gray-300 rounded"
            value={typeFilter}
            onChange={handleTypeFilterChange}>
            <option value="">Все типы</option>
            <option value="фильм">Фильмы</option>
            <option value="сериал">Сериалы</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.slice(0, 10).map((movie) => (
            <Link
              className="hover:underline"
              href={`/movie/${movie.id}/`}
              key={movie.id}>
              <div className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                <img
                  src={movie.images[0]}
                  alt={movie.title}
                  className="w-full h-auto mb-4 rounded-lg w-40 h-60 mx-auto"
                />
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-500">
                  Дата выхода: {movie.releaseDate}
                </p>
                <p className="mt-2">{movie.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList
