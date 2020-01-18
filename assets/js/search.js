/*CODE CREATED BY HERNIKPLAYS, LICENSED UNDER GNU AGPLV3 LICENSE
API BY JIKAN.MOE and TRACE.MOE*/
let theme = "dark";
function searchAnime(term) {
    document.getElementById("error").style.display = "none";

    if(term.length <= 3){document.getElementById("error").innerHTML = "Error: You need to enter more then 3 characters!"
    document.getElementById("error").style.display = "block";
    return;
}
    fetch(`https://api.jikan.moe/v3/search/anime?q=${term}&page=1`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            
            if(data.results.length == 0) return console.log("Nothing found")
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
            if(data.results[0].end_date == null){
                var start = new Date(data.results[0].start_date).toLocaleDateString();
                //start = start.split(' ').slice(0,4).join(" ")
                startend.innerHTML = start + " / Still Airing"
            }
            else{
                var started = new Date(data.results[0].start_date).toLocaleDateString();
                var ended = new Date(data.results[0].end_date).toLocaleDateString();
                startend.innerHTML = started + " / " + ended
                
            }
            if(data.results[0].airing == true){
                air.innerHTML = "Yes"
            }
            else{
                air.innerHTML = "No"
            }
            ep.innerHTML = data.results[0].episodes

            fetch(`https://api.jikan.moe/v3/anime/${data.results[0].mal_id}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        
        name.innerHTML = data.results[0].title_english + " / " + data.results[0].title_japanese
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

function searchLink(link){
    fetch(`https://trace.moe/api/search?url=${link}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        
        console.log(data.docs[0])
        if(data == "No image received" || data == "Error reading imagenull"){
            document.getElementById("error").innerHTML = "Error: Your URL is not a valid image";
        document.getElementById("error").style.display = "block";
        }

        document.getElementById("img").src = document.getElementById('search').value
        document.getElementById("name").innerHTML = data.docs[0].title_english + " / " + data.docs[0].title_native
        document.getElementById("episode").innerHTML = data.docs[0].episode

        let minutes = Math.floor(data.docs[0].at / 60)
        let seconds = data.docs[0].at - minutes * 60;
        document.getElementById("appear").innerHTML = `${minutes}min:${Math.round(seconds)}s`

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