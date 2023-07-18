export class UnsplashAPI {
    #API_KEY = '38292476-2e9a08398af0b2923a0e3887f';
    #BASE_URL = 'https://pixabay.com/api/';
    q = null;
    page = 1;
    itemsPerPage = 40;
    fetchPhotos() {
      let url = `${this.#BASE_URL}?key=38292476-2e9a08398af0b2923a0e3887f&q=${
          this.q
        }&page=${this.page}&per_page=${this.itemsPerPage}&client_id=${this.#API_KEY}`;
      console.log(url);
      return fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });
    }
  }