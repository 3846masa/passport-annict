# [passport-annict]

> [Passport][passport] strategy for authenticating with [Annict][annict] using the OAuth 2.0 API.

[passport-annict]: https://www.npmjs.com/package/passport-annict
[passport]: http://www.passportjs.org/
[annict]: http://annict.jp/

## Install

```
npm i passport-annict
```

## Usage

```ts
passport.use(
  new AnnictStrategy(
    {
      clientID: process.env.ANNICT_CLIENT_ID!,
      clientSecret: process.env.ANNICT_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/login/callback',
      scope: 'read write',
    },
    (_accessToken, _refreshToken, _result, profile, cb) => {
      return cb(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
```

```ts
const app = Express();

app.use(session({ secret: process.env.SESSION_SECRET! }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('annict'));
app.get('/login/callback', passport.authenticate('annict'), (_req, res) => {
  res.redirect('/me');
});
app.get('/me', (req, res) => {
  res.json(req.user);
});

app.listen(4000);
```

## Contributing

PRs accepted.

## License

MIT (c) 3846masa
