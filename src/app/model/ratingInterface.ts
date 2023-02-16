export enum Stars {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}

export function mapNumberOnStars(n: number): Stars | null {
    switch (n) {
        case 1:
            return Stars.ONE
            break
        case 2:
            return Stars.TWO
            break
        case 3:
            return Stars.THREE
            break
        case 4:
            return Stars.FOUR
            break
        case 5:
            return Stars.FIVE
            break
        default:
            return 0
            break
    }
}

export interface Rating {
    username: string,
    stars: Stars,
    description?: string,
}

export function copyRating(old: Rating): Rating {
    return { stars: old.stars, description: old.description, username : old.username } as Rating
}

export const dummyRating = {
    stars: Stars.THREE,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
     ut labore et dolore magna aliqua.`
} as Rating