const inputs = document.querySelector(".inputs");
const tocome = document.querySelector(".tocome");




tocome.addEventListener("click", () => {
  
  
  async function zapros1() {
    let response = await fetch(
      `https://retoolapi.dev/pXF605/data?email=${inputs.children[0].value}`
    );
    let data = await response.json();
    
    if (data[0].password === inputs.children[1].value) {
      
      localStorage.setItem('user',`${data[0].id}`)

    
        window.location.href = "http://127.0.0.1:5500/profil.html";
      
    }
  }
  zapros1();
});





