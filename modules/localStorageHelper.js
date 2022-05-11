function getFilmList (localStorage) {
    let filmListJson = localStorage.getItem(this.localStorage);
    if (filmListJson !== null) {
        return JSON.parse(filmListJson);
    }
    return [];
}