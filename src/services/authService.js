export const login = async ({ username, password }) => {
  await new Promise((r) => setTimeout(r, 800)) //simulate request

  //simulate check that should happen in the backend.
  if (username === 'admin' && password === 'password123') {
    return {
      token: 'fake-token-123',
      user: { username },
    }
  }

  throw new Error('Invalid username or password')
}
