
interface Venue {
  id: string;
  name: string;
  distance: string;
}

class VenuesService {
  public getNearbyVenues(): Venue[] {
    return [
      { id: "venue1", name: "Jawaharlal Nehru Stadium", distance: "1.2 km" },
      { id: "venue2", name: "Indira Gandhi Sports Complex", distance: "3.5 km" },
      { id: "venue3", name: "Major Dhyan Chand National Stadium", distance: "5.8 km" }
    ];
  }
}

export const venuesService = new VenuesService();
export type { Venue };
