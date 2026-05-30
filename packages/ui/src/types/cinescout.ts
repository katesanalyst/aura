// Frontend types for CineScout
export interface Venue {
  venue_code_bms: string
  venue_code_district: string
  venue_name: string
  address: string
  total_seats: number
  city_code: string
  state_code: string
  source: 'BMS' | 'District'
  houseful_threshold?: number
}

export interface Show {
  id: number
  movie_code: string
  venue_code: string
  show_time: string
  date_code: string
  total_seats: number
  available_seats: number
  occupancy_pct: number
  houseful: boolean
}

export interface FetchJob {
  id: string
  movie_codes: string[]
  city_codes: string[]
  mode: 'immediate' | 'future' | 'periodic'
  status: 'pending' | 'scheduled' | 'running' | 'completed' | 'failed'
}

export interface HousefulAlert {
  movie_name: string
  venue_name: string
  city: string
  show_time: string
  occupancy: number
  message: string
}

// API hooks using aura-ui
export const apiHooks = {
  fetchShows: (params: { movie: string; cities: string[]; date: string }) => 
    fetch(`/api/shows?movie=${params.movie}&cities=${params.cities.join(',')}&date=${params.date}`),
  
  createJob: (job: FetchJob) => 
    fetch('/api/jobs', { method: 'POST', body: JSON.stringify(job) }),
  
  getHouseful: () => fetch('/api/houseful'),
  
  getReports: (type: string, params?: any) =>
    fetch(`/api/reports/${type}?${new URLSearchParams(params)}`)
}