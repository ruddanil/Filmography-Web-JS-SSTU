// function createNode(element) {
//     return document.createElement(element);
// }
//
// function append(parent, el) {
//     return parent.appendChild(el);
// }
//
// const ul = document.getElementById('authors');
// const url = 'https://kinobd.ru/api/films';
//
// fetch(url)
//     .then((resp) => resp.json())
//     .then(function (data) {
//         let tempFilmList = [];
//         for (let i = 0; i < data.data.length; i++) {
//             tempFilmList.push(data.data[i]);
//         }
//         localStorage.setItem('movieCollection', JSON.stringify(tempFilmList));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
//
// function createFilm (film) {
//     let img = createNode('img');
//     let li = createNode('li');
//     img.src = film.big_poster;
//     append(li, img);
//     append(ul, li);
// }
// let filmList = JSON.parse(localStorage.getItem('movieCollection'));
//
// createFilm(filmList[0]);
class OnlineFilmList {
    connectionToApi(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': '11311686-cebf-44be-a210-8321cfd3a069',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(function (json) {
                let tempFilmList = [];
                try {
                    for (let i = 0; i < json.films.length; i++) {
                        tempFilmList.push(new SimpleFilm(json.films[i]));
                    }
                } catch (err) {
                    for (let i = 0; i < json.items.length; i++) {
                        tempFilmList.push(new SimpleFilm(json.items[i]));
                    }
                }
                localStorage.setItem('onlineFilmList', JSON.stringify(tempFilmList))
            })
            .catch(err => console.log(err))
    }

    setFilmsBySearch(keyword) {
        if (keyword == "" || keyword == null) {
            keyword = "Шрек";
        }
        let url = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + keyword + '&page=1';
        this.connectionToApi(url);
        this.catalogRender();
    }

    setFilmsByFilter(country, genre, yearFrom, yearTo) {
        let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?';
        let yearFromTrusted = 1000;
        let yearToTrusted = 3000;
        if (country != null && country !== "" && country !== "0") {
            url += 'countries=' + country;
        }
        if (genre != null && genre !== "" && genre !== "0") {
            url += '&genres=' + genre;
        }
        if (yearFrom == null && yearFrom === "" && !isNaN(yearFrom)) {
            yearFromTrusted = yearFrom;
        }
        if (yearTo != null && yearTo !== "" && !isNaN(yearTo)) {
            yearToTrusted = yearTo;
        }
        url += '&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=' + yearFromTrusted + '&yearTo=' + yearToTrusted + '&page=1';
        this.connectionToApi(url);
        this.catalogRender();
    }

    catalogRender() {
        let htmlCatalog = '';
        const filmList = this.getFilmList('onlineFilmList');
        if (filmList.length > 0) {
            filmList.forEach(({nameRu, country, filmLength, year, posterUrl, genres}) => {
                htmlCatalog += `
                <li class="catalog-element">
                    <span class="catalog-element__name">${nameRu}</span>
                    <img class="catalog-element__img" src="${posterUrl}" />
                    <span class="catalog-element__description">Страна: ${country}</span>
                    <span class="catalog-element__description">Дата выхода: ${year} год</span>
                    <span class="catalog-element__description">Длительность: ${filmLength}</span>
                    <span class="catalog-element__description">Жанр: ${genres}</span>
                </li>
            `;
            });
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                ${htmlCatalog}
            </ul>
        `;
        } else {
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                <h1>Фильмы не найдены</h1>
            </ul>
        `;
        }
    }

    getFilmList(localStorageName) {
        let filmListJson = localStorage.getItem(localStorageName);
        if (filmListJson !== null) {
            return JSON.parse(filmListJson);
        }
        return [];
    }
}

class SimpleFilm {
    constructor(film) {
        this.nameRu = film.nameRu;
        this.country = film.countries[0].country;
        if(film.filmLength === "" || film.filmLength == null) {
            this.filmLength = "01:29";
        } else this.filmLength = film.filmLength;
        this.year = film.year;
        this.posterUrl = film.posterUrl;
        this.genres = film.genres[0].genre;
    }
}
const onlineFilmList = new OnlineFilmList();

filter.filterRender();
onlineFilmList.setFilmsBySearch('');

let countryEvent = document.querySelector('#country-filter');
let genreEvent = document.querySelector('#genre-filter');
let yearFromEvent = document.querySelector('#yearFrom-filter');
let yearToEvent = document.querySelector('#yearTo-filter');
let keyword = document.querySelector('#keyword-filter');
let submitEvent = document.querySelector('#submit-keyword-filter');

countryEvent.addEventListener('change', function() {
    onlineFilmList.setFilmsByFilter(countryEvent.value, genreEvent.value, new Date(yearFromEvent.value).getFullYear(), new Date(yearToEvent.value).getFullYear());
    onlineFilmList.catalogRender();
});
genreEvent.addEventListener('change', function() {
    onlineFilmList.setFilmsByFilter(countryEvent.value, genreEvent.value, new Date(yearFromEvent.value).getFullYear(), new Date(yearToEvent.value).getFullYear());
    onlineFilmList.catalogRender();
});
yearFromEvent.addEventListener('change', function() {
    onlineFilmList.setFilmsByFilter(countryEvent.value, genreEvent.value, new Date(yearFromEvent.value).getFullYear(), new Date(yearToEvent.value).getFullYear());
    onlineFilmList.catalogRender();
});
yearToEvent.addEventListener('change', function() {
    onlineFilmList.setFilmsByFilter(countryEvent.value, genreEvent.value, new Date(yearFromEvent.value).getFullYear(), new Date(yearToEvent.value).getFullYear());
    onlineFilmList.catalogRender();
});
submitEvent.addEventListener('click', function() {
    onlineFilmList.setFilmsBySearch(keyword.value);
    onlineFilmList.catalogRender();
});



