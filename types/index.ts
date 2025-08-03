export interface Lawyer {
  name: string;
  email: string;
  password: string;
  barRegistration: string;
  district: string;
  experience: string;
}

export interface Client {
  name: string;
  email: string;
  password: string;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  lawyerId: string;
}

export interface LegalArea {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface SearchFilters {
  legalArea?: string;
  location?: string;
  minRating?: number;
  maxRate?: number;
  availability?: string;
  experience?: number;
}

// New types for Advanced Functionality

export interface Booking {
  id: string;
  clientId: string;
  lawyerId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: "consultation" | "meeting" | "court-prep";
  notes?: string;
  meetingLink?: string;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  clientId: string;
  lawyerId: string;
  amount: number;
  platformFee: number;
  lawyerEarnings: number;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "card" | "bank" | "wallet";
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface VideoCall {
  id: string;
  bookingId: string;
  roomId: string;
  status: "waiting" | "active" | "ended";
  participants: {
    clientId: string;
    lawyerId: string;
    clientJoined: boolean;
    lawyerJoined: boolean;
  };
  startTime?: string;
  endTime?: string;
  duration?: number;
  recordingUrl?: string;
}

export interface ClientDashboardData {
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  totalSpent: number;
  favoriteLaywers: Lawyer[];
  recentPayments: Payment[];
}

export interface LawyerDashboardData {
  upcomingBookings: Booking[];
  todayBookings: Booking[];
  monthlyEarnings: number;
  totalClients: number;
  averageRating: number;
  recentReviews: Review[];
  availableSlots: TimeSlot[];
}

export interface AdminDashboardData {
  totalUsers: number;
  totalLawyers: number;
  totalBookings: number;
  monthlyRevenue: number;
  platformCommission: number;
  recentTransactions: Payment[];
  topLawyers: Lawyer[];
  userGrowth: { month: string; users: number }[];
}

export interface TimeSlot {
  id: string;
  lawyerId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isBooked: boolean;
  bookingId?: string;
}

export interface Commission {
  id: string;
  lawyerId: string;
  bookingId: string;
  paymentId: string;
  grossAmount: number;
  platformFee: number;
  platformFeePercentage: number;
  netAmount: number;
  status: "pending" | "paid" | "disputed";
  payoutDate?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "booking" | "payment" | "review" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
