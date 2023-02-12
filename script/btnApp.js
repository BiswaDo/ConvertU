const btn = document.getElementsByClassName("menu_btn")[0];
btn.addEventListener("click", function(){
const pop_box = document.getElementsByClassName("active_menu")[0];
  if(pop_box.style.display != "flex"){
    pop_box.style.display = "flex";
  }else{
    pop_box.style.display = "none";
    pop_box.style.height = "0px";
  }
});