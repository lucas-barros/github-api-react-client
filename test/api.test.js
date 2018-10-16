import { requestUsers, requestUser, requestRepos } from '../lib/github-api'

describe('Test end points', () => {
  it('should load first page of users', async () => {
    const res = await requestUsers(32, 0);
    const users = await res.json();

    expect(users).toBeDefined();
    expect(users).toHaveLength(32);
    expect(users[0].id).toEqual(1);
  });

  it('should load my user', async () => {
    const res = await requestUser('lucas-barros')
    const user = await res.json();

    expect(user).toBeDefined();
    expect(user.login).toEqual('lucas-barros');

  })

  it('should load my repos', async () => {
    const res = await requestRepos('lucas-barros')
    const repos = await res.json();

    expect(repos).toBeDefined();
    expect(repos[0].name).toEqual('coursera-angular');
  })
})
