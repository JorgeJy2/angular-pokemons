
export class Pokemon {
    name: string;
    url: string;
    imageUrl?: string;
    detailImmageUrl?: string;
    backgroundColor?: string;
}

export class ResponsePokemons {
    count: number;
    next: string;
    previous?: string;
    results: Pokemon[];
}
