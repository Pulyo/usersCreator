const fs = require('fs');

const rawData = fs.readFileSync('data.json');
const movies = JSON.parse(rawData);

let namesOfObj = createProfessionalObject(movies.movies);
//console.log(namesOfObj);

function createProfessionalObject(movies) {
    let result = {};
    movies.forEach((movie) => {
        const writers = movie.writers || [];
        const actors = movie.actors || [];
        const directors = movie.directors || [];

        [...writers, ...actors, ...directors].forEach((name) => {
            if (!result[name]) {
                result[name] = {};
            }
        })
    });

    const finalResult = Object.keys(result).map(name => {
        const [first, middle, last] = name.split(' ');
        return {
            [name]: {
                name: {
                    first,
                    middle,
                    last
                },
                movies: {
                    title: [],
                    roles: []
                }
            }
        };
    });
    return finalResult;
}

personInfoFiller(namesOfObj, movies.movies);
console.log(namesOfObj[3]['Paul Walker'].movies)


//fs.writeFileSync('users.json', JSON.stringify(namesOfObj, null, 2));

function personInfoFiller(namesOfObj, movies) {
    for (const nameOfObj of namesOfObj) {
        let name = Object.keys(nameOfObj)[0];
        //console.log(name);
        for (const movie of movies) {
            //console.log(movie)
            if (movie.writers.includes(name)) {
                nameOfObj[name].movies.title.push(movie.title);
                if (!nameOfObj[name].movies.roles.includes("writer")) {
                    nameOfObj[name].movies.roles.push("writer");
                }
            }
            if (movie.actors.includes(name)) {
                nameOfObj[name].movies.title.push(movie.title);
                if (!nameOfObj[name].movies.roles.includes("actors")) {
                    nameOfObj[name].movies.roles.push("actors");
                }
            }
            if (movie.directors.includes(name)) {
                nameOfObj[name].movies.title.push(movie.title);
                if (!nameOfObj[name].movies.roles.includes("directors")) {
                    nameOfObj[name].movies.roles.push("directors");
                }
            }
        }
    }
}