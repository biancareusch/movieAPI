(function () {
    const URL = "https://capable-zenith-layer.glitch.me/movies/";

//fetch all movies on server
    $(window).on("load",function(){
        $(".loader-wrapper").fadeOut("slow");
    });
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            data.forEach(movie => {
                let html = "";
                let id = movie.id;
                let title = movie.title;
                let rating = movie.rating;
                let rateArray = []

                let startingRate = `${rating}`
                let lengthRate = `${rating.length}`

                let toNumbers = startingRate.split(",").map(function (item){
                    return parseInt(item, 10)
                })



                let addedRating = toNumbers.reduce((a, b) => a + b, 0)

                let finalRating = addedRating/toNumbers.length

                html =
                    `<div class="card movieDiv">
                            <div class="card-body">
                                <span class='card-img-top' id="${title}">${title}</span>
                                <br>
                                <span class="currentRating mt-10" style="font-size: 2em;"> Rating: ${finalRating.toFixed(2)} </span>
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
                    .then(response => response.json())
                    .then(data => {rateArray.push(data.rating); console.log(rateArray)

                    })





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
                        let inputRating = $(".addRating").val();
                        console.log(inputRating)
                        let movieLayout = (

                            "<div class='card movieDiv'>"+
                            "<div class='card-body'>"+

                            "<span class='currentRating mt-10' style='font-size: 2em;'> Added!</span>" +
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

            //TODO: RATINGS array doesnt take in new ratings



            $(document).on("click", ".editRating", function (e) {
                e.preventDefault();

                let editID = $(this).data("id");

                // console.log($(this).parent().select.value);
                // console.log($(this).data("id"))
                // console.log(document.getElementById($(this).data("id")).value)
                setTimeout(function (){
                    location.reload()
                },500)



                let newRating = document.getElementById($(this).data("id")).value

                let rateArray = []

                let ratingArray = []




                fetch(`${URL}${editID}`)
                    .then(response => response.json())
                    .then(data => {rateArray.push(data.rating);
                    let options = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            rating: rateArray
                        }),

                    };

                        fetch(`${URL}${editID}`, options)
                            .then(response => response.json())
                            .catch(error => console.log(error))
                    })

                rateArray.push(newRating)

                console.log(rateArray)

                $(this).parent().next(".currentRating").html = ratingArray

                $(this).parent().next(".currentRating").fadeOut()





                $(this).parent().next(".currentRating").fadeOut()

                $(this).fadeOut()

                function pageLoad (){
                    location.reload()
                }

                setTimeout(function (){


                    location.reload()

                },500)

            });



//data fetch
        })
// IIFE don't touch
})();