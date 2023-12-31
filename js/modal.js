const openModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.remove("invisible");
}

const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.add("invisible");
  modal.innerHTML = "";
}

const modifySubmitButtonOnClick = (id) =>  {
  const newTodoContent = document.querySelector(".modal-main .text-input").value;
  const todo = TodoListService.getInstance().getTodoById(id);
  
  //변경사항이 없거나 수정할 내용을 공백으로 뒀을 경우
  if(todo.todoContent === newTodoContent || !newTodoContent){
    return;
  }
  const todoObj = {
    ...todo,
    todoContent : newTodoContent
  }
  TodoListService.getInstance().setTodo(todoObj);
  
}

const modifyModal = (todo) => {
  const modal = document.querySelector(".modal");
  modal.innerHTML = `
    <div class="modal-container">
      <header class="modal-header">
        <h1 class="modal-title">
          Todo 수정
        </h1>
      </header>
      <main class="modal-main">
        <p class="modal-message">
          Todo를 수정해주세요
        </p>
        <input type="text" class="text-input w-f" value="${todo.todoContent}">
      </main>
      <footer class="modal-footer">
        <button class="btn" onclick="modifySubmitButtonOnClick(${todo.id}); closeModal();">확인</button>
        <button class="btn" onclick="closeModal()">닫기</button>
      </footer>
    </div>
  `;
}