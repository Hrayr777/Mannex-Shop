let count=[]

if(localStorage.hasOwnProperty('basket')){
  let basket_items = localStorage.getItem("basket").split(",");
  const baskethtml = document.querySelector(".conteiner1");
  baskethtml.innerHTML = `<h2>Корзина</h2>
<div class="basket_products">
<div class="basket_info">
   <p>товар</p>
   <p>Описание</p>
   <p>Цена</p>
   <p>Кол-во</p>
   <p>Итоговая Стоимость</p>
</div>
</div>`;
  const basket_products = document.querySelector(".basket_products");


   
    fetch(`https://retoolapi.dev/kDeX9p/data?${basket_items.join("")}`)
    .then((response) => response.json())
    .then((datas) =>
      datas.forEach((element,index) => {
        count.length=datas.length
        if(localStorage.hasOwnProperty('count')){
            count =localStorage.getItem("count")
            count=count.split(',')
        }
        else {
            
            count[index]=1
        }
        let c=element.price
        c =parseInt(c.replace(/[^\d]/g, ""))
        c=c*count[index]
        c=`${c}`
        c = c.slice(0, c.length - 3) +"," +c.slice(c.length - 3, c.length) +"Դ";
        let div = document.createElement("div");
        div.classList = "basket_product";
        div.data = element.id;
        div.innerHTML = `<img src="${element.img}" alt="">
<p>${element.info}</p>
<p>${element.price}</p>
<div class="input-group">
    
        <button type="button" class="minusbtn">
          <span class="minus">-</span>
        </button>
   
    <input type="text" class="input-number" value="${count[index]}"readonly>
    
        <button type="button" class="plusbtn">
            <span class="plus">+</span>
        </button>
        </div>
        <p>${c}</p>
        <p>Удалить</p>
    `;
        basket_products.append(div);

      })
      ).then(data=>{
        
        let plusminus = document.querySelectorAll(".basket_product");
        let input = document.querySelector(".input-group");
        plusminus.forEach((element,index) => {
            
          element.addEventListener("click", (e) => {
            if (e.target.classList.value == "plusbtn") {
              e.target.previousElementSibling.value =
                +e.target.previousElementSibling.value + 1;
                count[index]=e.target.previousElementSibling.value
                localStorage.setItem('count',count)
              let b = e.target.parentElement.previousElementSibling.textContent;
              b = parseInt(b.replace(/[^\d]/g, ""));
              b = b * +e.target.previousElementSibling.value;
              b = `${b}`;
              b = b.slice(0, b.length - 3) +"," +b.slice(b.length - 3, b.length) +"Դ";
              e.target.parentElement.nextElementSibling.textContent = `${b}`;
            } else if (e.target.classList.value == "minusbtn") {
              if (+e.target.nextElementSibling.value > 1) {
                e.target.nextElementSibling.value =
                  +e.target.nextElementSibling.value - 1;
                  count[index]=e.target.nextElementSibling.value
                  localStorage.setItem('count',count)
                  console.log(e.target.nextElementSibling.value)
                let b = e.target.parentElement.nextElementSibling.textContent;
                let a = e.target.parentElement.previousElementSibling.textContent;
                a = parseInt(a.replace(/[^\d]/g, ""));
                b = parseInt(b.replace(/[^\d]/g, ""));
                b = b - a;
                b = `${b}`;
                b =
                  b.slice(0, b.length - 3) +
                  "," +
                  b.slice(b.length - 3, b.length) +
                  "Դ";
                e.target.parentElement.nextElementSibling.textContent = `${b}`;
                
              }
              
              
            }
            
          });
        });
        
      });
      

    
 
    }

       
 


