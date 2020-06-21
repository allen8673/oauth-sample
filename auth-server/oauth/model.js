// See https://oauth2-server.readthedocs.io/en/latest/model/spec.html for what you can do with this
const crypto = require('crypto')
const DebugControl = require('../utilities/debug.js')

// TODO: CONNECT TO DB
const db = { // Here is a fast overview of what your db model should look like
  authorizationCode: {
    authorizationCode: '', // A string that contains the code
    expiresAt: new Date(), // A date when the code expires
    redirectUri: '', // A string of where to redirect to with this code
    client: null, // See the client section
    user: null, // Whatever you want... This is where you can be flexible with the protocol
  },
  client: { // Application wanting to authenticate with this server
    clientId: '', // Unique string representing the client
    clientSecret: '', // Secret of the client; Can be null
    grants: [], // Array of grants that the client can use (ie, `authorization_code`)
    redirectUris: [], // Array of urls the client is allowed to redirect to
  },
  token: {
    accessToken: '', // Access token that the server created
    accessTokenExpiresAt: new Date(), // Date the token expires
    client: null, // Client associated with this token
    user: null, // User associated with this token
  },
}

const sqldb = require('../models');

// TODO-END: CONNECT TO DB


module.exports = {
  getClient: function (clientId, clientSecret) {
    // query db for details with client
    log({
      title: 'Get Client',
      parameters: [
        { name: 'clientId', value: clientId },
        { name: 'clientSecret', value: clientSecret },
      ]
    })

    return sqldb.client
      .findOne({
        where: {
          clientId: clientId,
          // clientSecret: clientSecret
        },
        include: ['grants', 'redirect_uris']
      }).then(client => {
        if (!client) return false;
        // return client;
        return {
          id: client.id,
          clientId: client.clientId,
          clientSecret: client.clientSecret,
          grants: client.grants.map(g => g.grant),
          redirectUris: client.redirect_uris.map(g => g.uri),
        };
      }).catch(function (err) {
        console.log("getClient - Err: ", err)
      });
  },

  saveToken: (token, client, user) => {
    /* This is where you insert the token into the database */
    log({
      title: 'Save Token',
      parameters: [
        { name: 'token', value: token },
        { name: 'client', value: client },
        { name: 'user', value: user },
      ],
    })

    return sqldb.token
      .create(
        {
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          refreshToken: token.refreshToken, // NOTE this is only needed if you need refresh tokens down the line
          refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        },
        {
          // include: [
          //   sqldb.token.belongs
          // ]
        }).then(token => {
          token.client_id = client.id;
          token.user_id = user.id;
          token.save();

          return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken, // NOTE this is only needed if you need refresh tokens down the line
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: client,
            user: user,
          };
        }).catch(function (err) {
          console.log("getClient - Err: ", err)
        });
  },
  getAccessToken: token => {
    /* This is where you select the token from the database where the code matches */
    log({
      title: 'Get Access Token',
      parameters: [
        { name: 'token', value: token },
      ]
    })

    return sqldb.token.findOne({
      where: {
        accessToken: token
      },
      include: ['client', 'user']
    }).then(tk=>{
      if (!tk || tk === 'undefined') return false
      return tk 
    }).catch(function (err) {
      console.log("getClient - Err: ", err)
    });

  },
  getRefreshToken: token => {
    /* Retrieves the token from the database */
    log({
      title: 'Get Refresh Token',
      parameters: [
        { name: 'token', value: token },
      ],
    })
    DebugControl.log.variable({ name: 'db.token', value: db.token })
    return new Promise(resolve => resolve(db.token))
  },
  revokeToken: token => {
    /* Delete the token from the database */
    log({
      title: 'Revoke Token',
      parameters: [
        { name: 'token', value: token },
      ]
    })
    if (!token || token === 'undefined') return false
    return new Promise(resolve => resolve(true))
  },
  saveAuthorizationCode: (code, client, user) => {
    /* This is where you store the access code data into the database */
    log({
      title: 'Save Authorization Code',
      parameters: [
        { name: 'code', value: code },
        { name: 'client', value: client },
        { name: 'user', value: user },
      ],
    })

    return sqldb.authorizationCode.create({
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
    }).then(authcode => {
      authcode.client_id = client.id;
      authcode.user_id = user.id;
      authcode.save();
      return authcode;
    }).catch(function (err) {
      console.log("getClient - Err: ", err)
    });
  },
  getAuthorizationCode: authorizationCode => {
    /* this is where we fetch the stored data from the code */
    log({
      title: 'Get Authorization code',
      parameters: [
        { name: 'authorizationCode', value: authorizationCode },
      ],
    })

    return sqldb.authorizationCode
      .findOne(
        {
          where: { authorizationCode },
          include: ['client', 'user']
        })
      .then(authCode => {
        return authCode;
      }).catch(function (err) {
        console.log("getClient - Err: ", err)
      });
  },
  revokeAuthorizationCode: authorizationCode => {
    /* This is where we delete codes */
    log({
      title: 'Revoke Authorization Code',
      parameters: [
        { name: 'authorizationCode', value: authorizationCode },
      ],
    })
    return sqldb.authorizationCode.findOne({
      where: {
        id: authorizationCode.id
      }
    }).then(authcode => {
      authcode.destroy();
      const codeWasFoundAndDeleted = true  // Return true if code found and deleted, false otherwise
      return codeWasFoundAndDeleted
    }).catch(function (err) {
      console.log("getClient - Err: ", err)
    });
  },
  verifyScope: (token, scope) => {
    /* This is where we check to make sure the client has access to this scope */
    log({
      title: 'Verify Scope',
      parameters: [
        { name: 'token', value: token },
        { name: 'scope', value: scope },
      ],
    })
    const userHasAccess = true  // return true if this user / client combo has access to this resource
    return new Promise(resolve => resolve(userHasAccess))
  }
}

function log({ title, parameters }) {
  DebugControl.log.functionName(title)
  DebugControl.log.parameters(parameters)
}
