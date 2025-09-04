// Mock authentication system for demo purposes
export interface User {
  id: string
  email: string
  name: string
  role: "guest" | "customer" | "operator"
  avatar?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    email: "customer@example.com",
    name: "John Customer",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40&text=JC",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "operator@example.com",
    name: "Jane Operator",
    role: "operator",
    avatar: "/placeholder.svg?height=40&width=40&text=JO",
    createdAt: new Date("2024-01-01"),
  },
]

export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async signIn(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email)
    if (!user || password !== "password123") {
      throw new Error("Invalid email or password")
    }

    this.currentUser = user
    const token = `mock-token-${user.id}`

    // Store in localStorage for persistence
    localStorage.setItem("auth-token", token)
    localStorage.setItem("auth-user", JSON.stringify(user))

    return { user, token }
  }

  async signUp(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers.find((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "customer", // New users are customers by default
      createdAt: new Date(),
    }

    mockUsers.push(newUser)
    this.currentUser = newUser
    const token = `mock-token-${newUser.id}`

    // Store in localStorage for persistence
    localStorage.setItem("auth-token", token)
    localStorage.setItem("auth-user", JSON.stringify(newUser))

    return { user: newUser, token }
  }

  async signOut(): Promise<void> {
    this.currentUser = null
    localStorage.removeItem("auth-token")
    localStorage.removeItem("auth-user")
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to restore from localStorage
    const token = localStorage.getItem("auth-token")
    const userStr = localStorage.getItem("auth-user")

    if (token && userStr) {
      try {
        this.currentUser = JSON.parse(userStr)
        return this.currentUser
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem("auth-token")
        localStorage.removeItem("auth-user")
      }
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  hasRole(role: User["role"]): boolean {
    const user = this.getCurrentUser()
    return user?.role === role
  }

  canAccessOperatorPanel(): boolean {
    return this.hasRole("operator")
  }

  canPurchase(): boolean {
    const user = this.getCurrentUser()
    return user?.role === "customer" || user?.role === "operator"
  }
}
