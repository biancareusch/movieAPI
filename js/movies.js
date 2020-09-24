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
                html = `<div class="movieDiv">
                <span>${title}</span>
                <span>${rating}</span>
                <select class="editOptions">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button class="editRating" type="submit" data-id=${id}>submit</button>
                <button class='deleteMovie' type="submit" data-id=${id}>X</button>
                </div>`
                $('.movies').append(html);
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
//adding it to server data
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
                // $('.movies').append("<div>" + $("#addInput").val() + " " + $(".addRating").val() + `<button  type="submit" class='deleteMovie'>X</button>` + "</div>");

            })


            $(document).on("click", ".deleteMovie", function (e) {
                e.preventDefault();
                console.log("getting here");
                console.log(`${URL}` + $(this).data("id"));
                let newid = $(this).data("id");
                console.log($(this).parent().html());
                $(this).parent().fadeOut()
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


//TODO: sum of old ratings + new rating / rating.length
//         push new rating, then sum it up, grab by ID
// //EDIT
//             $(document).on("click", ".editRating", function (e) {
//                 e.preventDefault();
//                 let editID = $(this).data("id");
//                 console.log($(this).parent().select.value);
//
//
//             fetch(`${URL}${editID}`, {
//                 method: "PATCH",
//                 body: JSON.stringify({
//                     rating: 4,
//                 }),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })
//                 .then(response => response.json)
//                 .catch(error => console.log(error))
//             });

$(".editRating").click(function test(){
    //this is path to current rating
    console.log($(".editOptions :selected").val());
})



//data fetch
        })
// IIFE don't touch
})();