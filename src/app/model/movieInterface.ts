import { dummyRating, Rating, Stars } from "./ratingInterface";

export class Movie {
    constructor (
        public movieId: number,
        public movieTitle: string,
        public age: number,
        public duration: number,
        public poster: string, //url of pic
        public description: string,
        public ratings: Rating[]
        ) {

    }
}

export const dummyMovie: Movie = new Movie(-1, 
    "dummyMovie",
    0, 
    100, 
    "/assets/default-poster.png", 
    "This is the greatest and best movie in the world.", 
    [ dummyRating, new Rating(Stars.ONE) ])