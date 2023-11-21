/* eslint-disable no-useless-catch */
import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";


class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client)
  }


  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)

      if (userAccount) {
        // add another method
        return this.login({ email, password })

      } else {
        return userAccount;
      }

    } catch (e) {
      console.log(e);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }


  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      throw error
    }
    // eslint-disable-next-line no-unreachable
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;