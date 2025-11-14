/* --- Documents --- */
export interface IDocument {
  id: number;
  application_id: number;
  doc_type: "passport" | "invitation_letter" | "visa";
  file_url: string;
  download_url?: string; // ADDED: For forced downloads
  file_full_url?: string;
  created_at: string;
}

/* --- Athlete --- */
export interface IAthlete {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  passport_number?: string;
  phone_number?: string; // NEW
  email?: string; // NEW
  user_id: number;
}

/* --- User --- */
export type TUserRole = "individual" | "corporate" | "admin";
export type TUserThemePreference = "light" | "dark";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
  theme_preference: TUserThemePreference;
  phone_number?: string;
  country_code?: string;
}

/* --- InvoiceApplication --- */
export interface IInvoiceApplication {
  id: number;
  invoice_id: number;
  application_id: number;
  unit_price: string;
}

/* --- Invoice --- */
export type TInvoiceStatus = "pending" | "paid" | "cancelled";

export interface IInvoice {
  id: number;
  user_id: number;
  invoice_number: string;
  total_amount: string;
  issue_date: string;
  due_date?: string;
  status: TInvoiceStatus;
  notes?: string;
  applications: IApplication[]; // applications on the invoice (each includes unit_price)
  invoice_applications?: IInvoiceApplication[]; // optional, backend may include it
  created_at: string;
  updated_at: string;
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
    phone_number?: string;
    email?: string;
  };

  country: string;
  proposed_travel_date?: string;
  status: TApplicationStatus;
  remarks?: string;
  documents: IDocument[];
  created_at: string;
  updated_at: string;
  invoice_id?: number | null;
  invoice?: IInvoice | null;
}

export interface IApplicationsResponse {
  applications: IApplication[];
  meta: {
    total_count: number;
    total_pages: number;
    current_page: number;
    per_page: number;
  };
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

export interface IUserWithApplications {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
  application_count: number;
  pending_applications_count: number;
  invoiced_applications_count: number;
  applications: IApplication[];
}

export interface IApplicationsState {
  applications: IApplication[];
  groupedApplications: IUserWithApplications[]; // Add this
  currentApplication: IApplication | null;
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}

/* --- API payload types (use these in hooks) --- */
export interface ICreateApplicationPayload {
  application: {
    athlete_attributes: {
      first_name: string;
      last_name: string;
      passport_number?: string;
      date_of_birth?: string;
      phone_number?: string;
      email?: string;
    };

    country: string;
    proposed_travel_date: string;
    remarks?: string;
  };
}

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
  phone_number?: string;
  country_code?: string;
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
