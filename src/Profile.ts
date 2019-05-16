class Profile {
  static create({ data: { viewer } }: any) {
    return {
      provider: 'annict',
      id: viewer.annictId,
      displayName: viewer.name,
      username: viewer.username,
      preferredUsername: viewer.username,
      emails: [{ value: viewer.email }],
      photos: [{ value: viewer.avatarUrl }],
      accounts: [
        {
          domain: 'annict.com',
          userid: viewer.annictId,
          username: viewer.username,
        },
        {
          domain: 'annict.jp',
          userid: viewer.annictId,
          username: viewer.username,
        },
      ],
    };
  }
}

export { Profile };
