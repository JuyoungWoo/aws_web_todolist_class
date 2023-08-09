
//할일을 입력하고 '추가' 버튼 눌렀을때
const addTodoButtonOnclickHandle = () => {
  //spread 연산자
  /* const testObj = {
    name: '김준일',
    age: 10
  }  
  console.log(testObj);
  const testObj2 = {
     //testObj의 내용을 그대로 복사(깊은 복사)
    ...testObj,
    address: "부산",
    name: "김준이" //testObj에 있는 name이 있어도 키값은 중복되지 않으므로 name이라는 키는 그대로 있고, 그 키의 값만 "김준이" 로 변경
  }
  console.log(testObj2);
  
  const testArray = [1,2,3,4,5];
  console.log(testArray);
  const testArray2 = [...testArray, 6,7,8]
  console.log(testArray2);
  */
  generateTodoObj();
}

//할일을 입력하고 엔터 키를 쳤을 때도 할일 추가
const addTodoOnKeyUpHandle = (event) => {
  if(event.keyCode === 13){ //=엔터 키
    generateTodoObj();
  }
} 

const checkedOnChangeHandle = (target) => {
  TodoListService.getInstance().setCompleteStatus(target.value, target.checked);
}

const modifyTodoOnClickHandle = (target) => {
  openModal();
  modifyModal(TodoListService.getInstance().getTodoById(target.value));
}

const deleteTodoOnClickHandle = (target) => {
  TodoListService.getInstance().removeTodo(target.value);
}

const generateTodoObj = () => {
  const todoContent = document.querySelector(".todolist-header-items .text-input").value;
  const todoObj = {
    id: 0,
    todoContent: todoContent,
    createDate: DateUtils.toStringByFormatting(new Date()),
    completeStatus: false //처음엔 체크 안되어있음
  };
  
  TodoListService.getInstance().addTodo(todoObj);
}

//싱글톤
class TodoListService {
  static #instance = null;
  
  static getInstance() {
    if(this.#instance === null){
      this.#instance = new TodoListService();
    }
    return this.#instance;
  }
  todoList = new Array();
  todoIndex = 1;
  
  constructor() { //객체가 생성될 때 기존 로컬스토리지에 있는 데이터를 불러옴
    this.loadTodoList(); 
  }
  
  loadTodoList(){
    //JSON.parse(제이슨 문자열) : 제이슨 문자열 -> 객체 형으로 바꿔줌
    //JSON.stringify(객체): 객체 -> json 문자열로
    
    //기존 로컬스토리지에 todolist가 있으면 그 배열을 반환, false 면 새 배열 생성
    this.todoList = !!localStorage.getItem("todoList") ?
      JSON.parse(localStorage.getItem("todoList")) : new Array();
      //todolist라는 배열
      
    //기존의 마지막 인덱스를 가져옴 / 비어있으면 인덱스도 초기화
    this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ?      //
     this.todoList[this.todoList.length - 1].id + 1 : 1;
    /*this.todoList[this.todoList.length - 1]?.id
    * ?: 객체 주소를 참조하여 id를 가져오되, 값이 없으면 .으로 참조하지 않음
    */
  }
  
  saveLocalStorage() { //로컬 스토리지에 저장하는 문장을 따로 함수로 뺌
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    //배열 -> json으로 만들어 로컬 스토리지에 저장
  }
  
  getTodoById(id){
    //filter(): 조건에 맞는 요소만 새 배열에 담아줌
    // console.log(this.todoList);
    // console.log(this.todoList.filter(todo => todo.id === parseInt(id)) );
    // console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);
    
    //매개변수로 받은 id와 일치하는 투두만 가져옴
    return this.todoList.filter(todo => todo.id === parseInt(id))[0]; 
  }
  
  addTodo(todoObj){
    
    const todo = {
      ...todoObj,
      id : this.todoIndex //id만 새로 바꿈
    };

    this.todoList.push(todo);
    this.saveLocalStorage(); 
    //배열 -> json으로 만들어 로컬 스토리지에 저장
    this.updateTodoList();
    this.todoIndex++;
  }
  
  setCompleteStatus(id, status) {
    //매개변수로 받아온 id는 html요소의 value임(문자열)
    
    this.todoList.forEach((todo, index) => {
      //(todo를 하나씩 꺼내면서 index도 지정)
      if(todo.id === parseInt(id)){
        this.todoList[index].completeStatus = status;
      }
    });
    this.saveLocalStorage();
  }
  
  setTodo(todoObj) {
    for(let i = 0; i < this.todoList.length; i++){
      if(this.todoList[i].id === todoObj.id) { //수정할 todo를 찾음
        this.todoList[i] = todoObj;
        break;
      }
    }
    
    this.saveLocalStorage();
    this.updateTodoList();
  }
  
  removeTodo(id) {
    this.todoList = this.todoList.filter(todo => {
      return todo.id !== parseInt(id); // id가 동일한 것만 담기
    });
    //filter: 조건이 참이면 새로운 배열
    
    this.saveLocalStorage();
    this.updateTodoList();
    
  }
  
  updateTodoList(){
    //ul 태그요소
    const todolistMainContainer = document.querySelector(".todolist-main-container");
    todolistMainContainer.innerHTML = this.todoList.map(todo => {
      return `
            <li class="todolist-items">
                <div class="item-left">
                    <input type="checkbox" id="complete-chkbox${todo.id}" class="complete-chkboxes" ${todo.completeStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                    <label for="complete-chkbox${todo.id}"></label>
                </div>
                <div class="item-center">
                    <pre class="todolist-content">${todo.todoContent}</pre>
                </div>
                <div class="item-right">
                    <p class="todolist-date">${todo.createDate}</p>
                    <div class="todolist-item-buttons">
                        <button class="btn btn-edit" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);">수정</button>
                        <button class="btn btn-remove" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);">삭제</button>
                    </div>
                </div>
            </li>
        `;

    }).join("");
    
  }
  
  
}