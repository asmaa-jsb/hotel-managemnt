import Cookies from "universal-cookie";

const cookie = new Cookies();

class CookieServices {
  get(name: string) {
    return cookie.get(name);
  }
  set(name: string, value: string, options?: object) {
    return cookie.set(name, value, options);
  }
  remove(name: string) {
    return cookie.remove(name);
  }
}

export default new CookieServices();
