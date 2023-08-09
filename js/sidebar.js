const sidebarToggleButtonOnClickHandle = () => {
  
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");
  
   //css 클래스를 탈부착
  if(sidebar.classList.contains("isSideBarOpen")){
    sidebar.classList.remove("isSideBarOpen");
    sidebarToggleButton.innerHTML = '▶';
  } else {
    sidebar.classList.add("isSideBarOpen"); //사이드바가 열려있을 때
    sidebarToggleButton.innerHTML = '◀';
  }
  
}

const sidebarMenuOnClickHandle = (target) => {
  // console.log(target.innerHTML); 시작하기 / todolist
  switch(target.innerHTML) {
    case "시작하기":
      Routes.getInstance().routeState = "welcome";
      break;
    case "ToDoList":
      Routes.getInstance().routeState = "todolist"
      break;
  }
  Routes.getInstance().show();
  sidebarToggleButtonOnClickHandle();//사이드바 메뉴 누르면 사이드바가 닫히게
}
