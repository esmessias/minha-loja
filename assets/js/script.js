//slide topo
const imgs = document.querySelectorAll('.img-select a');

const imgBtns = [...imgs];

let imgId = 1;

//add imagens
const images = [
  { 'id': '1', 'url': './img/banners/img1.jpg'},
  { 'id': '2', 'url': './img/banners/img2.jpg'},
  { 'id': '3', 'url': './img/banners/img3.jpg'},
  { 'id': '4', 'url': './img/banners/img4.jpg'},
];


const containerItems = document.querySelector("#container-items");

const loadImages = (images) =>{
  images.forEach(image =>{
    containerItems.innerHTML += `
    <div class='item'>
    <img src='${image.url}'>
    </div> 
    `;
  });
};

loadImages(images, containerItems);

//função click
let items = document.querySelectorAll(".item");

const previous = () => {
  const lastItem = items[items.length - 1];
  containerItems.insertBefore(lastItem, items[0]);
  items = document.querySelectorAll(".item");
};

const next = () => {
  containerItems.appendChild(items[0]);
  items = document.querySelectorAll(".item");
};

document.querySelector("#previous").addEventListener("click", previous);

document.querySelector("#next").addEventListener("click", next);

let autoPlayInterval;

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() =>{
      next();
  }, 5000);
};

const stopAutoPlay = () => {
  clearInterval(autoPlayInterval);
};

startAutoPlay();

const interactiveElements = [containerItems, ...
  document.querySelectorAll('.container-shadow, .item, .item img')];
  
  interactiveElements.forEach(element => {
    element.addEventListener("mouseenter", stopAutoPlay);
    element.addEventListener("mouseleave", startAutoPlay);
  });

containerItems.addEventListener("mouseenter", stopAutoPlay);
containerItems.addEventListener("mouseleave", startAutoPlay);
//fim do slide topo

//slide equipe
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");

const carouselChildreans = [...carousel.children];

let isDragging = false,
isAutoplay = true,
startX,
startScrollleft,
timeoutid;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildreans.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildreans.slice(0, cardPerView).forEach( card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

//Função quando o usuário começa
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollleft=carousel.scrollLeft;
};

//Função enquanto o usuário arrasta
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollleft - (e.pageX - startX)
};

//Função quando o usuário para
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  //Se o carrosel estiver no ínicio, rola para o final
  if ( carousel.scrollLeft ===0){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  //Se o carrosel estiver no final, rola para o inicio
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth <800 || !isAutoplay ) return;
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

autoPlay ();

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",infiniteScroll);

wrapper.addEventListener("mouseenter", () => clearTimeout (timeoutId));

wrapper.addEventListener("mouseleave", autoPlay);
//fim do slide equipe
