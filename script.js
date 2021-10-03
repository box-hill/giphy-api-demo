// whilst it is bad practice to put api keys on front end, this demo uses a free key
const key = '9iHTj7SlHCJ3P0SWruvvmeBal1R1bhOn';
let alreadyCalled = false;

const button = document.getElementById('gif-search');
button.addEventListener('click',startSearch);

document.getElementById('search-input').addEventListener('keydown',(e)=>{
    if(e.keyCode === 13){
        e.preventDefault();
        startSearch();
    }
})
function startSearch(){
    
    if(alreadyCalled === true) return;
    // remove existing GIF result
    alreadyCalled = true;
    const content = document.getElementById('search-result');
    if(content.hasChildNodes()){
        content.removeChild(content.childNodes[0]);
    }

    const userSearchInput = document.getElementById('search-input').value;
    let urlString = 'https://api.giphy.com/v1/gifs/translate?api_key=' + key + '&s=' + userSearchInput;
    fetch(urlString, {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        const gifResponse = document.createElement('img');
        gifResponse.src = response.data.images.original.url;
        gifResponse.setAttribute('id','GIF-result');
        content.appendChild(gifResponse);    
        alreadyCalled = false;
        
    })
    .catch((error) => {
        console.log(error);
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = "Failed to find a GIF :(";
        errorMsg.style.margin = '20px';
        content.appendChild(errorMsg);
        alreadyCalled = false;
    });
}

