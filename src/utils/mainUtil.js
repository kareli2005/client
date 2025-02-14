  export const notValidEmail = (email) => {
    if (!email) return "Please enter email"

    const emailRegex = /^(?!.*\.@)(?!.*@\.)([^\s@]+@[^\s@]+\.[^\s@]+)$/

    return emailRegex.test(email) ? false : "Invalid email format"
  }


  export const notValidPassword = (password) => {
    if (!password) return "Please enter password"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (password.length > 32) return "Password must not exceed 32 characters"
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/[0-9]/.test(password)) return "Password must contain at least one number"
    return false
  }