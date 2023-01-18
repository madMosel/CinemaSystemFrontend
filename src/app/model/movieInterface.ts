export class Movie {
    constructor (
        public movieId: number,
        public movieName: string,
        public duration: number,
        public rating: number
    ) {

    }
}

export const dummyMovie: Movie = new Movie(-1, "dummyMovie", 100, 3)