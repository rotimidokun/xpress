export interface User {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessCategory: string;
  accountNo: string;
  logo?: string | null;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  password: string;
}

// LocalStorage keys
const USERS_KEY = "xpress_users";
const CURRENT_USER_KEY = "xpress_current_user";

// Get users from local storage
export const getUsers = (): Record<string, User> => {
  const usersJSON = localStorage.getItem(USERS_KEY);
  return usersJSON ? JSON.parse(usersJSON) : {};
};

// Save users to local storage
export const saveUsers = (users: Record<string, User>) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = (user: User): boolean => {
  const users = getUsers();

  // Check if email already exists
  if (users[user.businessEmail]) {
    return false;
  }

  // Add new user
  users[user.businessEmail] = {
    ...user,
    // logo: null // We can't store File objects in localStorage
  };

  saveUsers(users);
  return true;
};

// Login
export const loginUser = (email: string, password: string): boolean => {
  const users = getUsers();
  const user = users[email];

  if (user && user.password === password) {
    // Store current user in session storage
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email }));
    sessionStorage.setItem("userLoggedIn", "true");
    return true;
  }

  return false;
};

// Logout
export const logoutUser = () => {
  sessionStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem("userLoggedIn");
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return sessionStorage.getItem("userLoggedIn") === "true";
};

// Get current user info
export const getCurrentUser = (): User | null => {
  const currentUserJSON = sessionStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserJSON) return null;

  const { email } = JSON.parse(currentUserJSON);
  const users = getUsers();
  return users[email] || null;
};
