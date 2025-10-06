/* --- Documents --- */
export interface IDocument {
  id: number;
  application_id: number;
  doc_type: "passport" | "invitation_letter" | "visa";
  file_url: string;
  created_at: string;
}

/* --- Athlete --- */
export interface IAthlete {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  passport_number: string;
  user_id: number;
}

/* --- User --- */
export type TUserRole = "individual" | "corporate" | "admin";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
}

/* --- Application --- */
export type TApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "invoiced"
  | "completed";

export interface IApplication {
  id: number;
  user_id: number;
  athlete_id: number;
  athlete?: {
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    passport_number?: string;
  };
  country: string;
  status: TApplicationStatus;
  remarks?: string;
  documents: IDocument[]; // corrected to use IDocument
  created_at: string;
  updated_at: string;
}

/* --- Redux slice states --- */
export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface IUserState {
  currentUser: IUser | null;
  athletes: IAthlete[];
  isLoading: boolean;
  error: string | null;
}

export interface IApplicationsState {
  applications: IApplication[];
  currentApplication: IApplication | null;
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}

/* --- API payload types (use these in hooks) --- */
export interface ICreateApplicationPayload {
  athlete_id?: number;
  athlete?: {
    first_name: string;
    last_name: string;
    passport_number: string;
    date_of_birth?: string;
  };
  country: string;
  remarks?: string;
}

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
  role?: TUserRole; // optional since it might have a default on backend
}

export type TUpdateApplicationPayload = Partial<
  Pick<IApplication, "status" | "remarks">
>;

/* --- API response shapes --- */
export interface ILoginResponse {
  token: string;
  user: IUser;
}

export type TApplicationsResponse = IApplication[] | IApplication;
export type TAthletesResponse = IAthlete[];
export type TDocumentResponse = IDocument;
