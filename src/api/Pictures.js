import axios from 'axios'
import apiUrl from '../apiConfig'

export const pictureCreate = (data) => {
  console.log(data, 'this is my picture in the api request file')
  return axios({
    url: apiUrl + '/pictures',
    method: 'POST',
    data
  })
}

export const pictureIndex = user => {
  return axios({
    url: apiUrl + '/pictures',
    method: 'GET',
    // include an authorization header, that includes our user's token
    // so the API knows who to sign out
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const pictureShow = (user, id) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'Get',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
export const pictureDelete = (user, id) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
export const pictureUpdate = (id, picture, user) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { picture }
  })
}
