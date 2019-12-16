export interface TravelAgent {
  uuid: string,
  email: string,
  firstName: string,
  lastName: string,
  title: string
}

export interface TravelAgentsDomain {
  status: string,
  data?: TravelAgent[]
}
