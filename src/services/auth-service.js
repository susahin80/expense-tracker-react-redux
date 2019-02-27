import jwt_decode from "jwt-decode";

class AuthService {
  getToken = () => {
    return localStorage.getItem("token");
  };

  isValid = token => {
    const decoded = jwt_decode(token);

    const currentTime = Date.now() / 1000;

    if (currentTime > decoded.exp) {
      return false;
    }

    return true;
  };

  getDecoded() {
    return jwt_decode(this.getToken());
  }

  isAuthenticated = () => {
    const token = this.getToken();

    if (token && this.isValid(token)) {
      return true;
    }

    return false;
  };
}

export default new AuthService();
