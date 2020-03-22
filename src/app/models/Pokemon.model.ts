
export class Pokemon {
    name: string;
    url: string;
    imageUrl?: string;
}

export class ResponsePokemons {
    count: number;
    next: string;
    previous?: string;
    results: Pokemon[];
}
