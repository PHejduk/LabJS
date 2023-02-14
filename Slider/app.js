let activeSlideNumber = 1;
let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");

let hideActiveSlide = () => {
  let activeElement = document.querySelector(".active");
  activeElement.classList.remove("active");
};

let showSlide = (slideNumber) => {
  hideActiveSlide();
  document.querySelector("#slide" + slideNumber).classList.add("active");
};

let showNextSlide = () => {
  if (activeSlideNumber === 5) {
    activeSlideNumber = 1;
  } else {
    activeSlideNumber = activeSlideNumber + 1;
  }
  showSlide(activeSlideNumber);
};

let showPreviousSlide = () => {
  if (activeSlideNumber === 1) {
    activeSlideNumber = 5;
  } else {
    activeSlideNumber = activeSlideNumber - 1;
  }
  showSlide(activeSlideNumber);
};

let loop = () => {
  showNextSlide();
  setTimeout(loop, 3000);
};
setTimeout(loop, 3000);

for (let i = 1; i <= 5; i++) {
  let showSlideI = () => {
    activeSlideNumber = i;
    showSlide(i);
  };
  document.querySelector("#dot" + i).addEventListener("click", showSlideI);
}

arrowRight.addEventListener("click", showNextSlide);
arrowLeft.addEventListener("click", showPreviousSlide);
