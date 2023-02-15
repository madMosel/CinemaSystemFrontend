export enum Stars {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}

export interface Rating {
    stars: Stars,
    description?: string
}

export function copyRating(old : Rating) : Rating{
    return {stars: old.stars, description: old.description } as Rating
}

export const dummyRating = {
    stars: Stars.THREE,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
     ut labore et dolore magna aliqua.`
} as Rating