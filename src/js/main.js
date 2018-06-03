import resetstyles from '../css/reset.css';
import themes from '../css/theme.scss';
import styles from '../css/main.scss';
(function(){
    window.addEventListener("load", init, false);

    function init() {
        var elem = document.getElementById("newsblock");
        elem.addEventListener("mousedown", function (e) {
            drag(this, e);
        })
    }

    function drag(elementToDrag, event) {
        // координаты мыши в начале перетаскивания.
        var startX = event.clientX,
            startY = event.clientY;

        // начальные координаты элемента, который будет перемещаться.
        var origX = elementToDrag.offsetLeft,
            origY = elementToDrag.offsetTop;

        // разница между координатами мыши и координатами перетаскиваемого элемента.
        var deltaX = startX - origX,
            deltaY = startY - origY;

        // Регистрация событий mouseup и mousemove
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);

        function moveHandler(e) {
            if (!e) e = window.event;

            // перемещаем элемент с учетом отступа от первоначального клика.
            elementToDrag.style.left = (e.clientX - deltaX) + "px";
            elementToDrag.style.top = (e.clientY - deltaY) + "px";
        }

        function upHandler(e) {
            if (!e) e = window.event;

            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        }
    }
    var url = 'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/technology/1.json?api-key=094dd4bd21744520a83fec0ee892f39c';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(xhr.responseText).results;
            var posts = data.map(mapToPost);
            var elem = document.getElementById("newsblock");
            elem.innerHTML = getPostsTemplate(posts);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
    function mapToPost(post) {
        return {
            link: post.url,
            img: post.media[0] ? ((post.media[0]["media-metadata"])[2]).url : null,
            description: post.abstract,
            title: post.title,
            date: post.published_date
        }
    }
    function getPostsTemplate(posts) {
        return posts.reduce(function (tmpl, post) {
            tmpl += `<div class="post">
                                <h5 class="post-title">${post.title}</h5>
                                <img class="post-img" src=${post.img}>
                                <p class="post-description">${post.description}</p>
                                <a calss="post-link" href=${post.link}>Read more</a>
                                <p class="post-date">Publication date: ${post.date}</p>
                                <hr> <br> <hr>
                            </div>
                         `;
            return tmpl;
        }, '');
    }
})()


