window.onload = () => {
    news();
    document.getElementById("loader").style.display = "none";
    // for testing 
    // fetch('/demo_data.json').then((response) => response.json()).then(data => {
    //     // console.log(data);
    //     cur_articles = data.articles;
    //     for (let i = 0; i < data.articles.length; i++) {
    //         let curr = data.articles[i];
    //         // console.log(curr)
    //         let date = (curr.publishedAt.split("T")[0]).split('-');
    //         document.getElementById("container").innerHTML += `
    //                 <div id="card" onclick="toottip(${i})">  
    //                   <img src="${curr.urlToImage}" alt="News image">
                      
    //                  <h3 id="title">${curr.title}</h3>
    //                  <p id="description"> ${curr.description ? curr.description : ""}
    //                  </p>
    //                  <span id="published_time">Published At : ${date[2]}/${date[1]}/${date[0]} </span>
    //                </div> `;
    //         // console.log(data.articles[i].urlToImage);
    //     }
    // });
}

var cur_articles;

// Take user query 
function submit_form(){
    let q = document.getElementById("search_text").value;
    q = q.trim();
    if(q.length == 0) return
    // console.log(q);
    document.getElementById("container").innerHTML = '';
    let url = `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&apiKey=c897f5fb6033410aa1144ceb23d6b24e`
    // console.log(url);
    document.getElementById("main_heading").innerHTML = q.toUpperCase();
    document.getElementById("loader").style.display = "block"
    fetch_news(url);
}

// function to form url news 
function news(news_type) {
    document.getElementById("container").innerHTML = '';
    let url;
    // console.log(news_type);
    if (news_type === undefined) {
        url = `https://newsapi.org/v2/everything?q=coding&language=en&sortBy=publishedAt&apiKey=c897f5fb6033410aa1144ceb23d6b24e`;
        document.getElementById("main_heading").innerHTML = "CODING";
    } else {
        url = `https://newsapi.org/v2/top-headlines?country=in&category=${news_type}&language=en&apiKey=04e521e4245a4c9aab26ff4a6bf22b08`;
        document.getElementById("main_heading").innerHTML = news_type.toUpperCase();
    }
    document.getElementById("loader").style.display = "block"
    fetch_news(url)
}

// function to fetch and show news 
function fetch_news(url){
    fetch(url).then((response) => response.json()).then(data => {
        // console.log(data);
        cur_articles = data.articles;
        for (let i = 0; i < data.articles.length; i++) {
            let curr = data.articles[i];
            // console.log(curr)
            let date = (curr.publishedAt.split("T")[0]).split('-');
            document.getElementById("container").innerHTML += `
                    <div id="card" onclick="toottip(${i})">  
                      <img src="${curr.urlToImage}" alt="News image">
                      
                     <h3 id="title">${curr.title}</h3>
                     <p id="description"> ${curr.description ? curr.description : ""}
                     </p>
                     <span id="published_time">Published At : ${date[2]}/${date[1]}/${date[0]} </span>
                   </div> `;
            // console.log(data.articles[i].urlToImage);
        }
        document.getElementById("loader").style.display = "none";
    });
}
// function to show pop up or toot tip
function toottip(i) {
    // i is index of current article 
    console.log(cur_articles[i]);
    document.getElementById("tooltip_image").src = cur_articles[i].urlToImage;
    document.getElementById("tooltip_box_heading").innerText = cur_articles[i].title;
    document.getElementById("tooltip_box_desc").innerHTML = cur_articles[i].description;
    document.getElementById("source_url").innerHTML = cur_articles[i].url;
    document.getElementById("source_url").href = cur_articles[i].url;
    document.getElementById("tooltip_box").style.display = "flex";
}

function hideTooltip() {
    document.getElementById("tooltip_box").style.display = "none";
}