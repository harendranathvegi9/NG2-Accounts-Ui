/**
 * Accounts Ui Service
 */
export class AccountsService {
  options:IAccountsOptions;
  message:IAccountsMessage;
  processing:boolean;

  constructor() {
    this.message = null;
    this.processing = false;

    this.options = {
      requestPermissions: ['email'],
      loginStyle: 'popup'
    };
  }

  /**
   * Login
   * Log the user in with a password.
   * Requires: accounts-password package
   */
  login(credentials) {
    this.processing = true;
    Meteor.loginWithPassword(credentials.usernameOrEmail, credentials.password, (e) => {
      this.handler(e = null, 'Logged in');
    });
  }

  /**
   * Create a new user.
   * http://docs.meteor.com/#/full/accounts_createuser
   * @params options {username, email, password, profile}
   */
  register(credentials:IAccountCredentials) {
    this.processing = true;
    //var validEmail = this.verifyEmail(this.credentials.email); // todo
    Accounts.createUser(credentials, (e) => {
      this.handler(e = null, 'New account created');
    });
  }

  /**
   * Logout
   */
  logout() {
    Meteor.logout()
      .then((e) => {
        this.handler(e, 'Logged out');
      });
  }


  /**
   * Login with OAuth
   * Facebook, Twitter, Google, Github, Weibo, MeteorDevGroup, Meetup
   * @returns {Promise|Promise<T>}
   */
  loginWith(social:string) {
    this.processing = true;
    switch (social) {
      case 'facebook':
        Meteor.loginWithFacebook(this.options, (e) => {
          this.handler(e, 'Logged in with Facebook');
        });
        break;
      case 'google':
        Meteor.loginWithGoogle(this.options, (e) => {
          this.handler(e, 'Logged in with Google+');
        });
        break;
      case 'twitter':
        Meteor.loginWithTwitter({},
          // Must get official approval for emails from Twitter
          (e) => {
            this.handler(e, 'Logged in with Twitter');
          });
        break;
      default:
        this.handler({
          message: 'Invalid OAuth provider'
        });
    }
  }

  /**
   * Request a forgot password email.
   * http://docs.meteor.com/#/full/accounts_forgotpassword
   */
  forgotPassword(credential:{email: string}) {
    Accounts.forgotPassword(credential, (e) => {
      this.handler(e, 'Forgotten password email sent');
    });
  }

  /**
   * Reset the password for a user using a token received in email. Logs the user in afterwards.
   * http://docs.meteor.com/#/full/accounts_resetpassword
   */
  resetPassword(token:string, newPassword:string) {
    Accounts.resetPassword(token, newPassword, (e) => {
      this.handler(e, 'Password has been reset');
    });
  }

  /**
   * Change the current user's password. Must be logged in.
   * http://docs.meteor.com/#/full/accounts_changepassword
   * @param oldPassword
   * @param newPassword
   */
  changePassword(oldPassword:string, newPassword:string) {
    Accounts.changePassword(oldPassword, newPassword, (e) => {
      this.handler(e, 'Password has been changed');
    });
  }

  /**
   * Marks the user's email address as verified. Logs the user in afterwards.
   * http://docs.meteor.com/#/full/accounts_verifyemail
   * @param token
   */
  verifyEmail(token:string) {
    Accounts.verifyEmail(token)
      .then((e) => {
        this.handler(e);
      });
  }


  /**
   * Internal: Success/Failure Handler
   * @param e
   * @param successMessage: 'success!'
   */
  handler(e, successMessage?:string) {
    if (e) {
      this.message = {
        content: e.reason,
        success: false
      };
      console.error(e);

    } else if (successMessage) {
      this.message = {
        content: successMessage,
        success: true
      };
      console.log(successMessage);
    }
    this.processing = false;
  }
}
