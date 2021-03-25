import axios from 'axios'
import apiUrl from '../apiConfig'

export const pictureCreate = (user, data) => {
  console.log(data, 'this is my user in the api request file')
  return axios({
    url: apiUrl + '/pictures',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
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
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const pictureShow = (id) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'Get'
    // headers: {
    //   'Authorization': `Bearer ${user.token}`
    // }
  })
}
export const pictureDelete = (user, id) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
export const pictureUpdate = (id, picture, user) => {
  return axios({
    url: apiUrl + '/pictures/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { picture }
  })
}
