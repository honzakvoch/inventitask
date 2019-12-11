

export interface Fact {
	fact: string
}

export interface FactAPI {
	fetchByCityName(cityName: string): Promise<Fact>
}
