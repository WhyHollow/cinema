export interface Movie {
  id: number
  name: string
  description: string
  genre: number
  image: string
  additional: string
  rating?: number
}

export interface ApiResponse {
  error_code: number
  error_message: string
  data: Movie[]
}
export interface Session {
  id: number
  showdate: string
  daytime: string
}

export interface Place {
  row: number
  seat: number
}

export interface BookingResponse {
  ticketkey: string
  movie_id: string
  row: string
  seat: string
  showdate: string
  daytime: string
}
export interface Seat {
  seat: number
  is_free: boolean
}

export interface Row {
  row: number
  seats: Seat[]
}
