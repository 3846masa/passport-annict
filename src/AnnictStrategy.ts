import OAuth2Strategy, { InternalOAuthError } from 'passport-oauth2';

import { Profile } from './Profile';

interface AnnictStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: 'read' | 'read write';
}

class AnnictStrategy extends OAuth2Strategy {
  constructor(options: AnnictStrategyOptions, verify: OAuth2Strategy.VerifyFunction) {
    super(
      {
        ...options,
        authorizationURL: 'https://api.annict.com/oauth/authorize',
        tokenURL: 'https://api.annict.com/oauth/token',
      },
      verify,
    );
    this.name = 'annict';
  }

  userProfile(accessToken: string, done: (err: Error | null, profile?: any) => void) {
    const query = /* graphql */ `
      query {
        viewer {
          annictId
          name
          username
          email
          avatarUrl
        }
      }
    `;

    (this._oauth2 as any)._request(
      'POST',
      'https://api.annict.com/graphql',
      { 'Content-Type': 'application/json' },
      JSON.stringify({ query }),
      accessToken,
      (err: any, body: string | Buffer) => {
        if (err) {
          return done(new InternalOAuthError('Failed to fetch user profile', err));
        }
        try {
          const result = JSON.parse(body.toString());
          return done(null, Profile.create(result));
        } catch (err) {
          return done(new Error('Failed to parse user profile'));
        }
      },
    );
  }
}

export { AnnictStrategy, AnnictStrategyOptions };
