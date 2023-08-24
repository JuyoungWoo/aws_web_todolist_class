class Routes {
  static #instance = null;
  
  static getInstance() {
    if(this.#instance === null){
      this.#instance = new Routes();
    }
    return this.#instance;
  }
  routeState = "welcome";
  
  show() {
    this.clear();    
    
    switch(this.routeState){
      case "welcome":
        const welcomePage = document.querySelector(".welcome-page-container");
        welcomePage.classList.remove("invisible"); 
        //routeState가 welcome page일 때 invisible 클래스를 제거하여 화면이 보이게끔 함
        break;
        
      case "todolist":
        const todolistPage = document.querySelector(".todo-page-container");
        todolistPage.classList.remove("invisible");
        //routeState가 todo page일 때 invisible 클래스를 제거하여 화면이 보이게끔 함
        break;
    }
  }
  
  clear() {
    const pages= document.querySelectorAll(".main-container > div"); 
    //요소의 자식들 중에 div
    //== welcome page, todo page
    pages.forEach(page => {
      page.classList.add("invisible"); //모든 페이지 display none
    });
    
  }
}