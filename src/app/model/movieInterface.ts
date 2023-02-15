import { copyRating, dummyRating, Rating, Stars } from "./ratingInterface";

export interface Movie {
    movieId: number,
    movieTitle: string,
    age: number,
    duration: number,
    poster: string, //url of pic
    description: string,
    ratings: Rating[],
    price: number
}


export function compareMovies(a: Movie, b: Movie): boolean {
    return a.movieId == b.movieId
}

export function copyMovie(old: Movie) : Movie {
    let ratingsCopy = []
    for (let r of old.ratings) ratingsCopy.push(copyRating(r))
    return {movieId: old.movieId,
            movieTitle: old.movieTitle,
            age: old.age,
            duration: old.duration,
            description: old.description,
            poster: old.poster,
            ratings: ratingsCopy,
            price: old.price
        } as Movie
}


export const dummyMovie: Movie = {
    movieId: - 1,
    movieTitle: "dummyMovie",
    age: 0,
    duration: 100,
    poster: "/assets/default-poster.png",
    description: "This is the greatest and best movie in the world.",
    ratings: [dummyRating, { stars: Stars.ONE }],
    price: 10
} as Movie