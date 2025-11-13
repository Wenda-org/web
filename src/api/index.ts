import { apiLogin } from './auth/login.ts';

// Re-export API helpers for simpler imports across the app
export * from "./users";
export * from "./auth/login";

// Default export retained for backwards compatibility (was previously apiLogin)
export default apiLogin;