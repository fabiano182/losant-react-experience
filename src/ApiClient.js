import cookie from 'cookie';

class ApiClient {
  constructor() {
    this.authCookieName = process.env.REACT_APP_AUTH_COOKIE_NAME || 'authToken';
    this.token = cookie.parse(document.cookie)?.[this.authCookieName];
    this.apiBase = process.env.REACT_APP_API_BASE || '';
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
        throw new Error(typeof result.error === 'string' ? result.error : (result.error?.message || 'An unknown error occurred'))
      }
    } catch (e) {
      result = {
        error: {
          type: e.type,
          message: e.message
        }
      }
    }
    return result;
  }

  // user
  async authenticate({ email, password }) {
    const res = await this.request({
      path: '/api/auth',
      method: 'POST',
      body: { email, password }
    });
    if (res.auth?.token) {
      this.setToken({ token: res.auth.token, maxAge: res.auth.maxAgeMs / 1000 });
    }
    return res;
  }
  logOut() {
    this.removeToken();
    return { success: true }
  }
  async fetchUser(msg) {
    return await this.request({
      path: '/api/me'
    })
  }
  
  // session management
  setToken({ token, maxAge }) {
    this.token = token;
    const cookieString = cookie.serialize(this.authCookieName, token, {
      maxAge,
      path: '/'
    });
    document.cookie = cookieString;
  }
  removeToken() {
    this.token = '';
    const cookieString = cookie.serialize(this.authCookieName, '', {
      maxAge: 0,
      path: '/'
    });
    document.cookie = cookieString;
  }

  // devices
  async fetchDevices() {
    return await this.request({
      path: '/api/devices',
      method: 'GET'
    });
  }
  async fetchDevice({ deviceId }) {
    const res = await this.request({
      path: `/api/devices/${deviceId}`,
      method: 'GET'
    });
    return res;
  }
}

const apiClient = new ApiClient();
export default apiClient;