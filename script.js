let menue_for_shop = document.querySelector(".product");
let page_div = document.querySelector(".page");
let dataCount = 0;
let limit = 6;
let timeout = false,
  delay = 250,
  calls = 0;

function getDimensions() {
  if (window.innerWidth > 1200 && limit === 4) {
    limit = 6;
    getDataWithPage(1, limit);
    pagination();
  } else if (window.innerWidth < 1200 && limit === 6) {
    limit = 4;
    getDataWithPage(1, limit);
    pagination();
  }
}
getDimensions();

window.addEventListener("resize", function () {
  clearTimeout(timeout);
  timeout = setTimeout(getDimensions, delay);
});

function resize() {
  if (window.innerWidth < 1200) {
    limit = 4;
  } else if (window.innerWidth > 1200) {
    limit = 6;
  }
}

function getDataWithPage(page = 1, limit, url) {
  let menue_for_shop = document.querySelector(".product");

  menue_for_shop.innerHTML = "";

  fetch(
    `https://retoolapi.dev/kDeX9p/data?_page=${page}&_limit=${limit}&&${url}`
  )
    .then((response) => response.json())
    .then((data) =>
      data.map((item) => {
        let div = document.createElement("div");
        div.classList = "prod";
        div.innerHTML = `
   
                    <img class="imgs" src="${item.img}" alt="">
                    <h2>${item.name}</h2>
                    <p>${item.info}</p>
                    <div>
                        <div>${item.price}</div> 
                        <div>Добавить в корзину</div>
                    `;
        menue_for_shop.append(div);
      })
    );
}
window.onload = () => {
  resize();
  zapros();
  getDataWithPage(1, limit);
  pagination();
};

async function zapros(url = "https://retoolapi.dev/kDeX9p/data") {
  let data = await fetch(url);
  const dataResp = await data.json();
  dataCount = dataResp.length;
}

async function pagination(url = "&") {
  await zapros(`https://retoolapi.dev/kDeX9p/data?${url}`);
  let num = Math.ceil(dataCount / limit);
  let c = 1;

  page_div.innerHTML = "";
  for (let i = 1; i <= num; i++) {
    let span = document.createElement("span");
    span.classList = i - 1;
    span.style.paddingLeft = "20px";
    span.innerText = i;
    if (i > 3 && i < num) {
      span.style.display = "none";
    }
    if (i === num) span.innerText = "..." + ` ` + i;
    page_div.append(span);
    span.addEventListener("click", (e) => {
      menue_for_shop.innerHTML = "";
      getDataWithPage(i, limit, url);
      if (
        e.target.previousElementSibling !== null &&
        e.target.previousElementSibling.previousElementSibling &&
        e.target.nextElementSibling !== null &&
        c < +e.target.textContent
      ) {
        e.target.nextElementSibling.style.display = "inline-block";
        e.target.previousElementSibling.previousElementSibling.style.display =
          "none";
        if (+e.target.textContent === num - 1) {
          e.target.nextElementSibling.textContent = `${num}`;
        }
        c = +e.target.textContent;
      } else if (
        c > +e.target.textContent &&
        e.target.previousElementSibling !== null
      ) {
        e.target.nextElementSibling.nextElementSibling.style.display = "none";
        e.target.previousElementSibling.style.display = "inline-block";
        if (+e.target.textContent === num - 2) {
          e.target.nextElementSibling.nextElementSibling.style.display =
            "inline-block";
          e.target.nextElementSibling.nextElementSibling.textContent = `... ${num}`;
        }

        c = +e.target.textContent;
      }
      if (e.target.textContent == `... ${num}`) {
        for (let i = 0; i < num - 1; i++) {
          if (page_div.children[i].style.display !== "none") {
            page_div.children[i].style.display = "none";
            e.target.textContent = num;
            e.target.previousElementSibling.style.display = "inline-block";
            e.target.previousElementSibling.previousElementSibling.style.display =
              "inline-block";
            c = num;
          }
        }
      }
      console.log(c);
    });
  }
}

async function zapros1() {
  if (localStorage.hasOwnProperty("user")) {
    const user = localStorage.getItem("user");
    let response = await fetch(`https://retoolapi.dev/pXF605/data/${user}`);
    let data = await response.json();

    let join = document.querySelector(".join");
    join.textContent = data.name;
    let person_icon = document.querySelector(".person_icon");
    person_icon.children[0].href = "./profil.html";
    person_icon.children[1].href = "./profil.html";
  }
}

zapros1();

const images = [
  "https://automax.am/5408-home_default/235-70-r16-powertrac-snowtour.jpg",
  "https://automax.am/5470-home_default/265-65-r17-firemax-fm806.jpg",
  "https://automax.am/4473-home_default/185-70-r13-torque-tq022.jpg",
];
let slider = document.querySelector(".slider");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
images.forEach((i) => {
  let img = document.createElement("img");
  img.src = i;
  slider.append(img);
});
let offset = 0;
let z = 1;
let nkaritiv = document.querySelector(".nkaritiv");
nkaritiv.children[1].textContent = `/0${slider.children.length}`;

next.addEventListener("click", () => {
  let nkaritiv = document.querySelector(".nkaritiv");
  if (-(offset - slider.parentElement.clientWidth) < slider.clientWidth-1){
    offset -= slider.parentElement.clientWidth;
    slider.style.transform = `translateX(${offset}px)`;
    z++;
    nkaritiv.children[0].textContent = `0${z}`;
  } else {
    z = 1;
    nkaritiv.children[0].textContent = `0${z}`;
    offset = 0;
    slider.style.transform = `translateX(${offset}px)`;
  }
  console.log(-(offset - slider.parentElement.clientWidth))
  console.log(slider.clientWidth)
});
prev.addEventListener("click", () => {
  if (offset >= -1) {
    z = slider.children.length;
    nkaritiv.children[0].textContent = `0${z}`;
    offset = -(slider.clientWidth - slider.parentElement.clientWidth);
    slider.style.transform = `translateX(${offset}px)`;
  } else {
    z--;
    nkaritiv.children[0].textContent = `0${z}`;
    offset += slider.parentElement.clientWidth;
    slider.style.transform = `translateX(${offset}px)`;
  }
});

const search_button = document.querySelector(".search_button");
search_button.addEventListener("click", () => {
  let array = [];

  const select = document.querySelectorAll("select");
  if (select[0].value !== "Выбраны все") {
    if (select[0].value === "Летние") {
      array[0] = `type=summer&&`;
    } else {
      array[0] = `type=winter&&`;
    }
  } else {
    array[0] = undefined;
  }
  if (select[1].value !== "Выбраны все") {
    array[1] = `name=${select[1].value}&&`;
  } else {
    array[1] = undefined;
  }
  if (select[2].value !== "Выбраны все") {
    array[2] = `size=${select[2].value}&&`;
  } else {
    array[2] = undefined;
  }
  if (select[3].value !== "Выбраны все") {
    array[3] = `radius=${select[3].value}&&`;
  } else {
    array[3] = undefined;
  }
  array = array.filter((item) => {
    return item !== undefined;
  });
  if (array.length > 0) {
    array = array.join("");
    
   
    getDataWithPage(1, limit, array);
    pagination(array);
  } else {
    getDataWithPage(1, limit);
    pagination();
  }
});





// if(g==page_div.children[i-1].textContent){
//   page_div.children[i].style.display="none"
//   page_div.children[i+1].style.display="none"
//   page_div.children[i-1].style.display="inline-block"
//   page_div.children[i-2].style.display="inline-block"
// }
// c=+page_div.children[i].textContent


