const BASE_URL = 'http://localhost:3001/'

class API {
  constructor(url, options = {}) {
    this.url = url
    this.options = options
  }

  _getUrl(url) {
    let baseUrl = this.url

    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1)
    }

    if (url[0] === '/') {
      url = url.slice(1)
    }

    return `${baseUrl}/${url}`
  }

  get(url, options = {}) {
    return fetch(this._getUrl(url), {
      method: 'GET',
      ...options,
      ...this.options,
    })
  }

  post(url, data = {}, options = {}) {
    return fetch(this._getUrl(url), {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
      ...this.options,
    })
  }

  put(url, data = {}, options = {}) {
    return fetch(this._getUrl(url), {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
      ...this.options,
    })
  }

  delete(url, options = {}) {
    return fetch(this._getUrl(url), {
      method: 'DELETE',
      ...options,
      ...this.options,
    })
  }
}

export default new API(BASE_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
})
