const posts = [
    {
        "id": 1654,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2234,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 453,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 45621,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 565776,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const postLiked = [2234, 1654, 565776];

const container = document.getElementById('container');
container.innerHTML = '';

const formatDate = (dateToReverse) => dateToReverse.split('-').reverse().join('/');

const printAuthorImage = (author) => `<img class="profile-pic" src="${author.image}" alt="${author.name}"> `;

const printInitialsAuthor = (author) => {

    let initials = '';

    const authorSplitted = author.name.split(' ');
    console.log(authorSplitted)
    for(let element of authorSplitted){
        console.log(element)
        console.log('charAt(0)',element.charAt(0))
        initials += element.charAt(0);
    }

    return `<div class="profile-pic-default">
        <span>${initials}</span>
    </div> `

}

const isPostLiked = (id) => postLiked.includes(id) ? 'like-button--liked' : '';
// function isPostLiked(id) {
//     if(postLiked.includes(id)){
//         return 'like-button--liked'
//     }
//     return '';
// }

const postTemplate = (post) => 
{   
    /*
        const id = post.id;
        const content = post.content;
        const media = post.media;
        ecc...
    */
    const {id, content, media, author, likes, created} = post;

    return `<div class="post">
                <div class="post__header">
                    <div class="post-meta">
                        <div class="post-meta__icon">
                            ${author.image ? printAuthorImage(author) : printInitialsAuthor(author)}
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${author.name}</div>
                            <div class="post-meta__time">${formatDate(created)}</div>
                        </div>                    
                    </div>
                </div>
                <div class="post__text">${content}</div>
                <div class="post__image">
                    <img src="${media}" alt="">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <!-- like-button--liked -->
                            <a class="like-button  js-like-button ${isPostLiked(id)}" href="#" data-postid="${id}">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                        </div>
                    </div> 
                </div>            
            </div>`
}


for(let post of posts){
    container.innerHTML += postTemplate(post)
}

//const likeButtons = document.querySelectorAll('.like-button');
const likeButtons = document.getElementsByClassName('like-button');

for(let i = 0; i < likeButtons.length; i++){
    const btn = likeButtons[i];
    console.log(i);
     btn.addEventListener('click', function(event){
         const postid = parseInt(this.getAttribute('data-postid'));
         // inibisco la funzionalità del tag a
         event.preventDefault();
         if(postLiked.includes(postid)){
             // l'ID del post è presente in quelli link quindi
             // devo toglierlo dall'elenco
             // togliere la classe del like
             // decrementare il numero di like
             postLiked.splice(postLiked.indexOf(postid),1);
             this.classList.remove('like-button--liked');
             posts[i].likes--;
         }else{
             // l'ID del post NON è presente in quelli link quindi
             // devo aggiungerlo dall'elenco
             // mettere la classe del like
             // incrementare il numero di like
             postLiked.push(postid);
             this.classList.add('like-button--liked');
             posts[i].likes++;
         }

         document.getElementById('like-counter-'+postid).innerHTML = posts[i].likes;
    });
}
