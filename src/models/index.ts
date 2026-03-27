export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "student";
  createdAt: string;
  applicationId?: string;
  emailVerified?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  level: string;
  published: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  durationSeconds: number;
  videoFile: string | null;
}

export interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  purchasedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  telegram: string;
  passportNumber: string;
  passportPhoto?: string;
  age: string;
  experience: string;
  course: string;
  message: string;
  submittedAt: string;
}

export interface IntroVideo {
  videoFile: string | null;
  duration: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: "admin" | "student";
}
