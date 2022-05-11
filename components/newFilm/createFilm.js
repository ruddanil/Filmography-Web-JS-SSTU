class Film {
    id = Math.random().toString(16).slice(2);
    name;
    country;
    genre;
    screenwriter;
    producer;
    operator;
    composer;
    budget;
    worldFees;
    ageRate;
    filmLength;
    releaseDate;
    posterUrl;
    director = [];

    constructor(name, country, genre, screenwriter, producer, operator, composer, budget, worldFees, ageRate, filmLength, releaseDate, posterUrl, ...director) {
        this.name = name;
        this.country = country;
        this.genre = genre;
        this.screenwriter = screenwriter;
        this.producer = producer;
        this.operator = operator;
        this.composer = composer;
        this.budget = budget;
        this.worldFees = worldFees;
        this.ageRate = ageRate;
        this.filmLength = filmLength;
        this.releaseDate = releaseDate;
        this.posterUrl = posterUrl;
        this.director.push(...director);
    }
}

filter.filterRender();

let form = document.forms.newFilm;

class CreateFilm {

    createFilm() {
        return new Film(
            form.name.value,
            document.getElementById("country-filter").value,
            document.getElementById("genre-filter").value,
            form.screenwriter.value,
            form.producer.value,
            form.operator.value,
            form.composer.value,
            form.budget.value,
            form.worldFees.value,
            form.ageRate.value,
            form.filmLength.value,
            form.releaseDate.value,
            form.posterUrl.value,
            form.director1.value,
            form.director2.value,
            form.director3.value
        );
    }

    getFilmList() {
        let filmListJson = localStorage.getItem("offlineFilmList");
        if (filmListJson !== null) {
            return JSON.parse(filmListJson);
        }
        return [];
    }

    addToFilmList() {
        let filmListJson = this.getFilmList();
        let film = this.createFilm();
        if (film.name !== '' && film.releaseDate !== "" && film.filmLength !== "") {
            filmListJson.push(film);
            localStorage.setItem("offlineFilmList", JSON.stringify(filmListJson));
        }
    }
}

const createFilm = new CreateFilm();
