export interface ITravelAgent {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  phoneNumber: string;
  mobileNumber: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  countryCode: string;
  status: string;
  isExistingPartner: string;
  agreeToTerms: string;
  type: string;
  receiveEmailAlerts: string;
  companyUuid: string;
  companySignupInfo: {
    name: string;
    countryCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ITravelAgentResponseMeta {
  type: string;
  total: number;
  associations: string[];
}

export interface ITravelAgentResponse {
  data: ITravelAgent[];
  meta: ITravelAgentResponseMeta;
}
