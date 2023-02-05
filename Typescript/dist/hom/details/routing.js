function isAlpha(letter){
    return ([...letter].every(x => x.charCodeAt() >= 97 && x.charCodeAt() <= 122 ));
}

async function fetchDetails(){
    let params = new URLSearchParams(window.location.search);
    let url = params.get('url');
    url = url.toLowerCase().split(" ");//.replaceAll(" ","-")
    console.log(url);
    let newUrl = [];
    for(let word of url ){
        let len = word.length;
        if(isAlpha(word[len-1])){
            newUrl.push(word);
        }
        else{
            console.log(word);
            word = word.substr(0,len-1);
            newUrl.push(word);
        }
    }

    newUrl = newUrl.join('-');
    console.log(newUrl);
    const response = await fetch(`http://localhost:5550?title=${newUrl}`);
    const data = await response.json();
    console.log(data);

    createPreview(data[0]);

}

function createPreview(data){

    let mainView = document.querySelector('.main-view');
    

    let title = document.createElement("h1");
    let author = document.createElement('p');
    author.className = 'author';
    let images = document.createElement('div');
    images.className = '';
    

    let displayPicture = document.createElement('img');
    displayPicture.className = 'dp';

    let description = document.createElement('p');
    description.className = 'desc'

    let paginator = document.querySelector('.paginator');
    let pagelist = document.querySelector('ol');
    let pageitem = document.createElement('li');

    for(let i = 1; i <= data.images.length; i++){
        pageitem = document.createElement('li');
        pageitem.innerText = i;
        pagelist.appendChild(pageitem);
    }
    

    title.innerHTML = data.title;
    author.innerHTML = "By " + data.author;
    mainView.appendChild(title);
    mainView.appendChild(author);

    

    

    if(data.html == ""){
        images.innerHTML = data.images[0].image;
        description.innerHTML = data.images[0].overlayAreaOne;

        pageitem.addEventListener('click', (e) =>{
            let val = e.target.innerText;
            console.log(e.target.innerText);
            images.innerHTML = data.images[val-1].image;
            description.innerHTML = data.images[val-1].overlayAreaOne;
    
        })
        
        mainView.appendChild(images);
        mainView.appendChild(paginator);
        mainView.appendChild(description);
    }
    else{
        displayPicture.src = data.imageUrl;
        description.innerHTML = data.html;
        mainView.appendChild(displayPicture);
        mainView.appendChild(description);
    
    }

    
    
    
    

}


function pagination(){

}


fetchDetails();