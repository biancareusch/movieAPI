(function () {
    const URL = "https://capable-zenith-layer.glitch.me/movies/";
//fetch all movies on server


    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            data.forEach(movie => {
                let html = "";
                let id = movie.id;
                let title = movie.title;
                let rating = movie.rating;

                html =
                    `<div class="card movieDiv">
                            <div class="card-body">
                                <span class='card-img-top' id="${title}">${title}</span>
                                <br>
                                <span class="currentRating mt-10" style="font-size: 2em;"> Rating:${rating}</span>
                                <br>
                                <div class="submitDiv">
                                     <select class="editOptions" id=${id}>
                                         <option value="1">1</option>
                                         <option value="2">2</option>
                                         <option value="3">3</option>
                                         <option value="4">4</option>
                                         <option value="5">5</option>
                                     </select>
                                <button class="editRating btn-primary" data-toggle="button" type="submit" data-id=${id}>Submit Ranking</button>
                               
                                <button class='deleteMovie deleteBtn btn btn-primary btn-danger' data-toggle="button" type="submit" data-id=${id}><i class="far fa-trash-alt"></i></button>
                          </div>  
                          </div>
                    </div>`
                $('.movies').append(html);



               fetch(`${URL}${id}`)
                    .then(response => response.json()
                    .then(data => console.log(data.rating)))











                // function that gets just the image of a movie

                function singleMovie(title) {


                    $.get("http://www.omdbapi.com/?s=" + title + "&apikey=996b9c18", function (rawdata) {
                        let rawString = JSON.stringify(rawdata)


                        data = JSON.parse(rawString)
                        let title = data.Search[0].Title;
                        let year = data.Search[0].Year;
                        let imdburl = "https://www.imdb.com/title/" + data.Search[0].imdbID + "/";
                        let posterURL = data.Search[0].Poster;

                        let movieLayout = ("<h1>" + title + "</h1>" +
                            "<br>" +
                            "<a href='" + imdburl + "' target='_blank' rel='noopener noreferrer'><img class='card-img-top'src='" + posterURL + "'></a>" +
                            "<br>" +
                            "<p>Year Released:" + year + "</p>" +
                            "<br>")
                        document.getElementById(title).innerHTML = movieLayout;



                    })
                }

                singleMovie(title)

                // let searchMovie = document.querySelector("#search");
                //
                // let allMovies = data
                //
                // console.log(allMovies)


                // function updateMovies(e) {
                //     e.preventDefault(); // don't submit the form, we just want to update the data
                //     var searchedName = searchMovie.value.toLowerCase()
                //     var filteredMovies = [];
                //     allMovies.forEach(function(movie) {
                //         if (movie.title.toLowerCase().includes(searchedName)){
                //             filteredMovies.push(movie);
                //             console.log(data.id)
                //         }
                //     });
                //     document.getElementsByClassName(movies).innerHTML = updateMovies(filteredMovies);
                // }
                //
                // searchMovie.addEventListener('input', updateMovies);
                //


                // });


                $(document).on("click", ".deleteMovie", function (e) {
                    e.preventDefault();
                    console.log(`${URL}` + $(this).data("id"));
                    let newid = $(this).data("id");
                    console.log($(this).parent().html());
                    $(this).parent().parent().parent().fadeOut()
                    deleteMovie(newid);

                })


                function deleteMovie(newId) {
                    const deleteOptions = {
                        "method": "DELETE",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                    };
                    let deleteURL = `${URL}${newId}`;

                    fetch(deleteURL, deleteOptions)
                        .then(response => response.json)
                        .catch(error => console.log(error))

                }


//TODO: RATINGS array doesnt take in new ratings

                $(document).on("click", ".editRating", function (e) {
                    e.preventDefault();




                    let editID = $(this).data("id");
                    // console.log($(this).parent().select.value);
                    // console.log($(this).data("id"))
                    // console.log(document.getElementById($(this).data("id")).value)


                    let newRating = document.getElementById($(this).data("id")).value

                    let ratingArray = []

                    console.log(newRating)


                    // let addedRating = ratingArray.reduce((a, b) => a + b, 0)

                    // let averageRating = addedRating / ratingArray.length

                    let options = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            rating: newRating
                        }),
                    };

                    fetch(`${URL}${editID}`, options)
                        .then(response => response.json())
                        .catch(error => console.log(error))



                    console.log($(this).parent().next(".currentRating"))

                    $(this).parent().next(".currentRating").html = newRating

                    // $(this).parent().next(".currentRating").fadeOut()

                    $(this).fadeOut()



                });




// $(".editRating").click(function test(){
//     //this is path to current rating
//     console.log($(".editOptions :selected").val());
// })
            });
//add movies
            $('.addMovie').click((e) => {
                e.preventDefault()
                let inputText = $("#addInput").val();
                let inputRating = $(".addRating").val();
//new movie object
                let movieObj = {
                    title: inputText,
                    rating: inputRating
                };
//adding it to server
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieObj),
                };

                fetch(URL, options)
                    .then(response => response.json())
                    .catch(error => console.log(error))


                function getMoviePoster(movie) {


                    $.get("http://www.omdbapi.com/?s=" + movie + "&apikey=996b9c18", function (rawdata) {
                        let rawString = JSON.stringify(rawdata)

                        data = JSON.parse(rawString)
                        let title = data.Search[0].Title;
                        let year = data.Search[0].Year;
                        let imdburl = "https://www.imdb.com/title/" + data.Search[0].imdbID + "/";
                        let posterURL = data.Search[0].Poster;

                        let movieLayout = (

                            "<div class='card movieDiv'>"+
                            "<div class='card-body'>"+

                            "<span class='currentRating mt-10' style='font-size: 2em;'> Rating:${rating}</span>" +
                            "<h1>" + title + "</h1>" +
                            "<br>" +
                            "<a href='" + imdburl + "' target='_blank' rel='noopener noreferrer'><img class='card-img-top'src='" + posterURL + "'></a>" +
                            "<br>" +
                            "<p>Year Released:" + year + "</p>" +
                            "<br>" +
                            "</div>"+
                          "</div>"
                            )

                        $(".newMovies").append(movieLayout);
                    })

                }

                getMoviePoster(inputText)
            })


            // let element = document.getElementById("labelID")
            // function hasDisplayNone(element) {
            //     return (element.classList.value.indexOf("d-none") !== -1);
            // }
            // if (hasDisplayNone(element)) {
            //     element.classList.remove("d-none");
            // }
//data fetch
        })
// IIFE don't touch
})();