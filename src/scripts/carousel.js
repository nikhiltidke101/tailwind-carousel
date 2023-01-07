const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', showPrevItem);
nextButton.addEventListener('click', showNextItem);

let currentIndex = 0;

function showPrevItem(){
  console.log("prev");
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  }
  showCurrentItem();
}

function showNextItem() {
  currentIndex++;
  if (currentIndex >= items.length) {
    currentIndex = 0;
  }
  showCurrentItem();
}

function showCurrentItem() {
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = 'none';
  }
  items[currentIndex].style.display = 'block';
}

showCurrentItem();