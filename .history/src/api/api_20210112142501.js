import { postData, getData } from './http.js'

export function cityList(data = {}) {
  return postData('/xxxx/xx', data);
}