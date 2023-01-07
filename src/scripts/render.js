const items = document.querySelectorAll('.item');
items.forEach((item) => {
    item.classList.add("sm:w-[100%]", "w-full", "flex", "flex-col", "h-[70%]", "justify-center", "items-center", "rounded-3xl")
})

function lightenColor(colorStr, percentage) {
    var r = parseInt(colorStr.slice(1, 3), 16);
    var g = parseInt(colorStr.slice(3, 5), 16);
    var b = parseInt(colorStr.slice(5, 7), 16);
  
    r = Math.round(r + (255 - r) * percentage / 100);
    g = Math.round(g + (255 - g) * percentage / 100);
    b = Math.round(b + (255 - b) * percentage / 100);
  
    const modifiedColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return modifiedColor;
}
  

const renderSlides = () => {
    const carousel = document.getElementById("carousel");
    const storedArray = JSON.parse(localStorage.getItem('data'));
    console.log(storedArray);
    for(let i=0; i<items.length; i++){
        items[i].style.backgroundColor = storedArray[i].color;
        var lighterShade1 = lightenColor(storedArray[i].color, 70);
        var lighterShade2 = lightenColor(storedArray[i].color, 30);

        console.log(lighterShade1);
        
        items[i].innerHTML = `
                <h1 class="absolute top-20 left-20 text-9xl">${i+1}</h1>
                <div class="flex justify-center items-center flex-col h-full">
                    <h2 class="text-6xl text-white mb-10">${storedArray[i].name}</h2>
                    <div id="carousel-id-${i}" class="flex flex-col justify-center items-center gap-5 p-8 rounded-2xl">
                        <input id="input-text-${i}" placeholder="" class="text-xl p-2" type="text">
                        <input id="input-color-${i}" type="color" class="cursor-pointer px-1">
                        <button id="update-${i}" class="text-xl font-semibold px-4 py-2 border-b-4 border-l-2 border-r-2 rounded-xl border-black">Update</button>
                    </div>
                </div>
        `;

        const inputText = items[i].querySelector(`#input-text-${i}`);
        const inputColor = items[i].querySelector(`#input-color-${i}`);
        const carouselId = items[i].querySelector(`#carousel-id-${i}`);
        const btnUpdate = items[i].querySelector(`#update-${i}`);

        inputText.style.backgroundColor = `${lighterShade1}`;
        carouselId.style.backgroundColor = `${lighterShade2}`;
        btnUpdate.style.backgroundColor = `${lighterShade1}`;
        items[i].style.backgroundColor = `${storedArray[i].color}`;

        

        btnUpdate.addEventListener("click", () => {
            
            if(inputText.value != ""){
                storedArray[i].name = inputText.value;
            }
            storedArray[i].color = inputColor.value;
            setLocalStorage(storedArray);
        })

    }
}

// Set Local Storage Function
const setLocalStorage = (arr) => {
    localStorage.setItem('data', JSON.stringify(arr));
    renderSlides();
}

// Load Local Storage
if(!JSON.parse(localStorage.getItem('data'))){
    var local = [];
}else{
    var local = JSON.parse(localStorage.getItem('data'));
}
for(let i=0; i<items.length; i++){
    if(!local[i]){
        local.push({
            name: "Slide-" + (i+1),
            color: "#" + Math.floor(Math.random()*16777215).toString(16),
            imageUrl: "",
        });
    }
}
setLocalStorage(local);
