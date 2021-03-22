export const signUp = credentials => {
  return axios({
    // the method and url are similar to the jQuery-ajax-token-auth
    // (using the same API)
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}
