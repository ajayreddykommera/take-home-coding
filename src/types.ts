export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
}

export interface CrewMember {
  name: string;
  known_for_department: string;
}
