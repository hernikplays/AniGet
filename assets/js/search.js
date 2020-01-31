/*CODE CREATED BY HERNIKPLAYS, LICENSED UNDER GNU AGPLV3 LICENSE
API BY JIKAN.MOE and TRACE.MOE*/
let theme = "dark";

function searchAnime(term) {
    document.getElementById("error").style.display = "none";

    if (term.length <= 3) {
        document.getElementById("error").innerHTML = "Error: You need to enter more then 3 characters!"
        document.getElementById("error").style.display = "block";
        return;
    }
    fetch(`https://api.jikan.moe/v3/search/anime?q=${term}&page=1`)
        .then(response => {
            return response.json()
        })
        .then(data => {

            if (data.results.length == 0) return console.log("Nothing found")
            console.log(data.results[0])

            let img = document.getElementById("img")
            let name = document.getElementById("name")
            let link = document.getElementById("link")
            let syn = document.getElementById("synopsis")
            let rate = document.getElementById("rate")
            let type = document.getElementById("type")
            let startend = document.getElementById("startend")
            let air = document.getElementById("airing")
            let ep = document.getElementById("eps")
            let age = document.getElementById("age")

            img.src = data.results[0].image_url;

            link.href = data.results[0].url
            syn.innerHTML = data.results[0].synopsis
            rate.innerHTML = data.results[0].score
            type.innerHTML = data.results[0].type
            age.innerHTML = data.results[0].rated
            if (data.results[0].end_date == null) {
                var start = new Date(data.results[0].start_date).toLocaleDateString();
                //start = start.split(' ').slice(0,4).join(" ")
                startend.innerHTML = start + " / Still Airing"
            } else {
                var started = new Date(data.results[0].start_date).toLocaleDateString();
                var ended = new Date(data.results[0].end_date).toLocaleDateString();
                startend.innerHTML = started + " / " + ended

            }
            if (data.results[0].airing == true) {
                air.innerHTML = "Yes"
            } else {
                air.innerHTML = "No"
            }
            ep.innerHTML = data.results[0].episodes

            fetch(`https://api.jikan.moe/v3/anime/${data.results[0].mal_id}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    name.innerHTML = data.title_english + " / " + data.title_japanese

                    for (i in data.studios) {
                        if (i == 0) {
                            document.getElementById("studio").innerHTML += data.studios[i].name;
                        } else {
                            document.getElementById("studio").innerHTML += ", " + data.studios[i].name
                        }
                    }
                    for (i in data.producers) {
                        if (i == 0) {
                            document.getElementById("producer").innerHTML += data.producers[i].name;
                        } else {
                            document.getElementById("producer").innerHTML += ", " + data.producers[i].name
                        }
                    }
                    for (i in data.genres) {
                        if (i == 0) {
                            document.getElementById("genres").innerHTML += data.genres[i].name;
                        } else {
                            document.getElementById("genres").innerHTML += ", " + data.genres[i].name
                        }
                    }


                })
                .catch(err => {
                    document.getElementById("error").innerHTML = "Error: " + err;
                    document.getElementById("error").style.display = "block";
                })

            document.getElementById("items").style.visibility = "visible";
        })
        .catch(err => {
            document.getElementById("error").innerHTML = "Error: " + err;
            document.getElementById("error").style.display = "block";
        })
}
//LIGHT/DARK THEME SWITCH FUNCTION (WIP)
/*function themeswitch(){
if(theme == "dark"){
    console.log("start")
    document.body.style.backgroundColor = "white";
    document.getElementById("items").style.color = "black";
    document.getElementById("title").style.color = "black";
    document.getElementById("link").style.color = "black";
    document.getElementById("footer").style.color = "black";
    theme = "light";
}
else if(theme == "light"){
    document.body.style.backgroundColor = "rgb(54, 54, 54)";
    document.getElementById("items").style.color = "white";
    document.getElementById("title").style.color = "white";
    document.getElementById("link").style.color = "white";
    document.getElementById("footer").style.color = "white";
    theme = "dark"
}
}*/

/*function linkornolink(file){
    document.getElementById("error").style.display = "none";
    if(!document.getElementById('inputfile').files[0]) {
        searchLink(document.getElementById("search").innerHTML)
}
    else{
        searchImg()
    }
}*/

function searchLink(link) {
    fetch(`https://trace.moe/api/search?url=${link}`)
        .then(response => {
            return response.json()
        })
        .then(data => {

            console.log(data)
            if (data == "No image received" || data == "Error reading imagenull") {
                document.getElementById("error").innerHTML = "Error: Your URL is not a valid image or cannot be accessed";
                document.getElementById("error").style.display = "block";
                return;
            }

            document.getElementById("img").src = document.getElementById('search').value
            document.getElementById("name").innerHTML = data.docs[0].title_english + " / " + data.docs[0].title_native
            document.getElementById("episode").innerHTML = data.docs[0].episode

            let minutes = Math.floor(data.docs[0].at / 60)
            let seconds = data.docs[0].at - minutes * 60;
            document.getElementById("appear").innerHTML = `${minutes}min:${Math.round(seconds)}s`
            //If you want to make the name a link to auto search data, remove // from the following line
            //document.getElementById("link").href = `https://yourwebsite.com/aniget/?search=${data.docs[0].title_english}`
            document.getElementById("items").style.visibility = "visible";
        })
        .catch(err => {
            document.getElementById("error").innerHTML = "Error: " + err;
            document.getElementById("error").style.display = "block";
        })
}

/*function searchImg(){
    document.getElementById("img").src = URL.createObjectURL(document.getElementById('inputfile').files[0]);

    document.getElementById("items").style.visibility = "visible";
}*/
function searchfromparams() {
    var url = new URL(window.location);
    var par = url.searchParams.get("search");
    
    if (!par) return;  
    /*
    !!!WARNING!!!
    This will not work if you change the foldernames! This is currently a temporary solution
    !!!WARNING!!!
    */
   let inc = window.location
    if(inc.includes("manga")){
        searchManga(par)
    }
    else{ 
        searchAnime(par)
    }
    
}

function searchManga(term) {
    fetch(`https://api.jikan.moe/v3/search/manga?q=${term}&page=1`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            fetch(`https://api.jikan.moe/v3/manga/${data.results[0].mal_id}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    document.getElementById("name").innerHTML = data.title
                    document.getElementById("link").href = data.url
                    if (data.publishing == true) {
                        document.getElementById("publish").innerHTML = "Yes";
                    } else {
                        document.getElementById("publish").innerHTML = "No";
                    }
                    document.getElementById("synopsis").innerHTML = data.synopsis
                    document.getElementById("img").src = data.image_url
                    if (data.publishing == false) {
                        var started = new Date(data.published.from).toLocaleDateString();
                        var ended = new Date(data.published.to).toLocaleDateString();
                        startend.innerHTML = started + " / " + ended
                    }
                    else{
                        var started = new Date(data.published.from).toLocaleDateString();
                        startend.innerHTML = started + " / Still Publishing"
                    }

                    document.getElementById("rate").innerHTML = data.score;

                    if(data.chapters == null && data.volumes == null){
                        document.getElementById("volchap").innerHTML = "?? / ??";
                    }
                    else{
                        document.getElementById("volchap").innerHTML = `${data.volumes} / ${data.chapters}`;
                    }
                    
                    for (i in data.genres) {
                        if (i == 0) {
                            document.getElementById("genres").innerHTML += data.genres[i].name;
                        } else {
                            document.getElementById("genres").innerHTML += ", " + data.genres[i].name
                        }
                    }

                    for (i in data.authors) {
                        if (i == 0) {
                            document.getElementById("author").innerHTML += `<a id="link" href="${data.authors[i].url}">${data.authors[i].name}</a>`;
                        } else {
                            document.getElementById("author").innerHTML += `<a id="link" href="${data.authors[i].url}">, ${data.authors[i].name}</a>`
                        }
                    }

                    document.getElementById("items").style.visibility = "visible";
                })
            
        }).catch(err => {
            document.getElementById("error").innerHTML = "Error: " + err;
            document.getElementById("error").style.display = "block";
        })
}
/*
 */
