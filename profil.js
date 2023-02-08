async function zapros1() {
  const user=localStorage.getItem('user')
  let response = await fetch(
    `https://retoolapi.dev/pXF605/data/${user}`
  );
  let data = await response.json();
  
    let name = document.querySelector(".name");
    let id = document.querySelector(".id");
    let lastname = document.querySelector(".lastname");
    let email = document.querySelector(".email");
    let join = document.querySelector(".join");
    join.textContent = data.name;
    name.innerHTML = `<strong >Имя</strong>                              ${data.name}`;
    lastname.innerHTML = `<strong >Фамилия</strong>                          ${data.lastname}`;
    id.innerHTML = `<strong>ID пользователя</strong>                  ${data.id}`;
    email.innerHTML = `<strong>E-mail</strong>                           ${data.email}`;
  
  let logoff = document.querySelector(".logoff");
  logoff.addEventListener("click", () => {
    
localStorage.clear()
      
        window.location.href = "http://127.0.0.1:5500/login.html";
      
   
  });
}
zapros1();






