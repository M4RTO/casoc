'use strict';

let giuOAuthCfg = () => {

    let oauthCfg = (OAuthProvider) => {
      OAuthProvider.configure({
          clientId: 'giu',
          revokePath: '/logout'
      });
    };

    return oauthCfg;

};

export default giuOAuthCfg;
