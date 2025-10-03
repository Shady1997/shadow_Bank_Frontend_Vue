export const authService = {
  login(username, password) {
    return username === 'shady1997' && password === 'shady1997'
  },
  
  logout() {
    localStorage.removeItem('isAuthenticated')
  },
  
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true'
  }
}