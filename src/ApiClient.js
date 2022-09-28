import cookie from 'cookie';

class ApiClient {
  constructor() {
    this.authCookieName = process.env.REACT_APP_AUTH_COOKIE_NAME || 'authToken';
    this.token = cookie.parse(document.cookie)?.[this.authCookieName];
    this.apiBase = process.env.REACT_APP_API_BASE;
  }

  async request({
    path,
    method,
    body
  }) {
    let result, status;
    try {
      result = await fetch(`${this.apiBase}${path}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token ? `Bearer ${this.token}` : undefined
        },
        body: body ? JSON.stringify(body) : undefined
      });
      status = result.status;
      result = await result.json();
      if (status < 200 || status >= 300) {
        throw new Error(result.error || 'An unknown error occurred')
      }
    } catch (e) {
      result = {
        error: true,
        message: e.message
      }
    }
    return result;
  }

  // user
  async authenticate({ email, password }) {
    const result = await this.request({
      path: '/api/auth',
      method: 'POST',
      body: { email, password }
    });
    if (result.success) {
      this.setToken({ token: result.auth.token, maxAge: result.auth.maxAgeMs / 1000 });
    }
    return result;
  }

  setToken({ token, maxAge }) {
    const cookieString = cookie.serialize(this.authCookieName, token, {
      maxAge,
      path: '/'
    });
    document.cookie = cookieString;
  }
  removeToken() {

  }
}

const apiClient = new ApiClient();
export default apiClient;