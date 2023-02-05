
let pageSize = 16;
let category;



let search = document.getElementById('search');




    const menu__items = document.querySelectorAll(".menu__item");
    
    menu__items.forEach((item) => {
        item.addEventListener("click", (e) => {
            makeRequest(e.target.innerText.toLowerCase(),1);
            category = e.target.innerText.toLowerCase();
        });
    })

    async function makeRequest(category,pgNo = 1){
        console.log("req",pgNo);

        if(category === "view all articles"  || search.value != "") {
            category = "";
        }
        
    
        const data = await fetch(`http://localhost:5550/?pagesize=${pageSize}&page=${pgNo}&search=${search.value}&category=${category}`);
        let jsonData = await data.json();
        
        load(jsonData,category,pgNo);
    }


    function load(data,head = "All Articles",pgNo){
        if(head === ""){
            head = "All Articles";
        }
        let h1 = document.createElement('h1');
        let container = document.getElementById('ChildCard');  
        if(pgNo == 1){
            container.innerHTML = "";
            
            console.log(h1);
            h1.className = 'heading';
            h1.innerHTML = head;
            container.appendChild(h1);
        }
        

        let btnContain = document.getElementById('btn__container');
        let loadMore_btn = document.createElement('button');
        loadMore_btn.className = "btn";
        loadMore_btn.innerText = "LOAD MORE";
        loadMore_btn.addEventListener('click' ,() =>{
            console.log("btn",pgNo);
            loadMore(++pgNo);
        })
        btnContain.innerHTML = "";
        btnContain.appendChild(loadMore_btn);
        
        
 


        for(let i in data){
            // console.log(data[i]);

            let containcard = document.createElement('div');
            containcard.id = 'cards';

            let div = document.createElement('div');
            div.className = "card-content";

            let img = document.createElement('img');
            let title = document.createElement('h2');
            let des = document.createElement('p');
            let author = document.createElement('h4');

            img.src = data[i].image;
            
            title.innerHTML = data[i].title;
            des.innerHTML = data[i].teaser;
            author.innerHTML = data[i].author;

            div.appendChild(title);
            div.appendChild(des);
            div.appendChild(author);
            let a = document.createElement('a');
            a.id = 'article-content';
            // console.log(data[i].title,data[i].urlTitle);
            a.href = "details/preview.html?url=" + data[i].urlTitle;
            
            
            containcard.appendChild(img);
            containcard.appendChild(div);
            a.appendChild(containcard);
            container.appendChild(a);
        }  
    }


    function loadMore(pgNo){
        console.log(pgNo);
        switch(category){
            case 'trends' : makeRequest(category,pgNo);
            break;

            case 'advice' :  makeRequest(category,pgNo++);
            break;

            case 'inspiration' :  makeRequest(category,pgNo++);
            break;

            default :  makeRequest(category,pgNo++);
            break;
        }

    }




