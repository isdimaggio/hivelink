export class Singleton {

    constructor() {
      if (!Singleton.instance) {
        Singleton.instance = this;
      }
      return Singleton.instance;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }
}
  