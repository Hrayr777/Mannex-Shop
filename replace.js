const apply=document.querySelector('.apply')
const form = document.querySelector("form");
const password_err = document.querySelector(".password_err");
const email_err = document.querySelector(".email_err");
const password2_err = document.querySelector(".password2_err");
const password3_err = document.querySelector(".password3_err");
const user = localStorage.getItem("user");
let res = true;

function validation() {
  if (
    form[3].value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/) &&
    form[3].value !== ""
  ) {
    password_err.innerText = "";
    form[3].classList.add("success");
    res = true;
  } else if (form[3].value !== "") {
    password_err.innerText =
      "От 8 до 15 символов с минимум одной цифрой,одной заглавной и одной строчной буквой";
    password_err.classList.add("error");
    res = false;
  }
  if (
    form[2].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/) &&
    form[2].value !== ""
  ) {
    email_err.innerText = "";
    form[2].classList.add("success");
    res = true;
  } else if (form[2].value !== "") {
    email_err.innerText =
      "Пожалуйста, используйте действительный адрес электронной почты";
    email_err.classList.add("error");
    res = false;
  }
  if (
    form[4].value === form[3].value &&
    form[4].value.length > 7 &&
    form[4].value.length < 16
  ) {
    password2_err.innerText = "";
    form[4].classList.add("success");
    res = true;
  } else if (form[4].value !== "") {
    password2_err.innerText = "Пароли не совпадают";
    password2_err.classList.add("error");
    res = false;
  }
  if(form[3].value!=="" && form[3].value===form[5].value){
    password_err.innerText =
    "новый и старый пароль не должны совпадать";
    password_err.classList.add("error");
    res = false;
  }else if(form[5].value!=="" && form[3].value!==form[5].value) {
    password_err.innerText = "";
    form[3].classList.add("success");
    res = true;
  }

}
for (let i = 2; i <= 5; i++) {
  form[i].addEventListener("input", validation);
}


apply.addEventListener("click", () => {
  if (res === true) {
    let apply = {
      name: form[0].value,
      lastname: form[1].value,
      email: form[2].value,
      newpassword: form[3].value,
      password: form[5].value,
    };
    if (form[0].value !== "")
      apply.name =
        form[0].value[0].toUpperCase() + form[0].value.slice(1, form[0].length);
    if (form[1].value !== "")
      apply.lastname =
        form[1].value[0].toUpperCase() + form[1].value.slice(1, form[1].length);
    for (let info in apply) {
      if (apply[info] === "") {
        delete apply[info];
      }
    }

    async function zapros() {
      if (apply.email !== undefined) {
        let data = await fetch(
          `https://retoolapi.dev/pXF605/data?email=${apply.email}`
        );
        const dataResp = await data.json();
        const emailchecker = dataResp.length;
         
        if (emailchecker === 0 || dataResp[0].id == user) {
          zapros1();
        } else {
          email_err.innerText = "Данный Электронный адрес уже занят";
          email_err.classList.add("error");
        }
      } else {
        zapros1();
      }
    }
    zapros();
    async function zapros1() {
      let data = await fetch(`https://retoolapi.dev/pXF605/data/${user}`);
      const dataResp = await data.json();

      if (dataResp.password === apply.password) {
        apply.password = apply.newpassword;
        delete apply.newpassword;
        let c = await fetch(`https://retoolapi.dev/pXF605/data/${user}`, {
          method: "PATCH",
          body: JSON.stringify(apply),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        window.location.href = "/replace.html";
      } else {
        password3_err.innerText = "не правильны пароль";
        password3_err.classList.add("error");
      }
    }
  }
});



async function zapros2() {
  const user = localStorage.getItem("user");
  let response = await fetch(`https://retoolapi.dev/pXF605/data/${user}`);
  let data = await response.json();

  let join = document.querySelector(".join");
  join.textContent = data.name;
}

zapros2();















