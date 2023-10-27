const addButton = document.querySelector("#btn");
const container = document.querySelector("#display-input");
const deleteBtn = document.querySelector("#deleteAll");
const getInput = document.querySelector("#input");
const alertMsg = document.querySelector(".alert-wrapper");

var myArr = [];
// var alert;
class UI {
  clearField() {
    input.value = "";
  }

  uiWrap() {
    var uiWrap = document.querySelector("#ui-wrapper");
    if (myArr.length != 0) {
      uiWrap.style.display = "block";
    } else {
      uiWrap.style.display = "none";
    }
  }

  addPost(e) {

    e.preventDefault();
    
    // const input = document.querySelector("#input");

    if (input.value.trim() === "") {
      ui.alertEvent("alert-danger", "Please Enter The Value");
    } else {
      const input = document.querySelector("#input").value.toUpperCase().trim();
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between"; 
      li.innerHTML = `<div class="overflow-hidden">${input}<div/>`;
      const div = document.createElement("div");
      div.className = "d-flex gap-4 align-self-center";
      const link = document.createElement("a");
      const link1 = document.createElement("a");
      const editIcon = document.createElement("i");
      editIcon.className = "fa-solid fa-pen-to-square text-warning edit";
      const removeIcon = document.createElement("i");
      removeIcon.className = "fa-solid fa-trash text-danger delete";
      link.appendChild(editIcon);
      link1.appendChild(removeIcon);
      div.appendChild(link);
      div.appendChild(link1);
      li.appendChild(div);
      container.appendChild(li);
      container.appendChild(li);
      myArr.push(input);

      storage.setItems();

      ui.alertEvent("alert-success", "Added Sucessful");
      ui.clearField();
    }
    ui.uiWrap();
  }

  deleteAll() {
    container.innerHTML = "";
    container.value = myArr;
    myArr = [];
   
    ui.alertEvent("alert-danger", "Deleted Sucessful");
    storage.removeItem();
    ui.uiWrap();
  }

  deleteIWant(e) {
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.parentElement.parentElement.remove();
      myArr.splice(e.target.parentElement.parentElement.parentElement,1)
      storage.setItems()
      ui.alertEvent("alert-warning", "Removed Sucessful");
    }
    if(myArr<[-1]){
      ui.uiWrap();
    }
  }

  editIWant(e) {
    // const input = document.querySelector("#input");

    if(input.value===""){
    if (e.target.classList.contains("edit")) {
      e.target.parentElement.parentElement.parentElement.remove();
      myArr.splice(e.target.parentElement.parentElement.parentElement,1)
      const innerTexts = e.target.parentElement.parentElement.previousElementSibling.innerText.toLowerCase();
      input.value += innerTexts;
      storage.setItems()
    }
  }
  }

  alertEvent(className, message) {
    // Clear any existing alerts
    ui.clearAlert();

    // Create a div element
    const newdiv = document.createElement("div");

    // Add class
    newdiv.className = `alert ${className}`;

    // Add text
    newdiv.innerHTML = `${message}`;

    alertMsg.appendChild(newdiv);

    // Automatically remove the alert after 3 seconds
    setTimeout(() => {
      ui.clearAlert();
    }, 2000);
  }
  clearAlert() {
    const existingAlert = document.querySelector(".alert-wrapper");
    if (existingAlert) {
      existingAlert.innerHTML = "";
    }
  }
}

class Storage{
    setItems(){
            localStorage.setItem("data",JSON.stringify(myArr));
    }
    getItems(){
        if (localStorage.getItem("data")) {
            myArr = JSON.parse(localStorage.getItem("data"));
            myArr.forEach((item) => 
            { const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between";
           
            li.innerHTML = `<h6>${item}<h6/>`;
            const div = document.createElement("div");
            div.className = "d-flex gap-4 align-self-center";
            const link = document.createElement("a");
            const link1 = document.createElement("a");
            const editIcon = document.createElement("i");
            editIcon.className = "fa-solid fa-pen-to-square text-warning edit";
            const removeIcon = document.createElement("i");
            removeIcon.className = "fa-solid fa-trash text-danger delete";
            link.appendChild(editIcon);
            link1.appendChild(removeIcon);
            div.appendChild(link);
            div.appendChild(link1);
            li.appendChild(div);
            container.appendChild(li);
            container.appendChild(li);});
          }
    }
    removeItem(){
      localStorage.clear();
    }

}

const storage=new Storage()
const ui = new UI();
document.addEventListener("DOMContentLoaded",
()=>{ 
   storage.getItems();
   ui.uiWrap();})
addButton.addEventListener("click",(e)=>ui.addPost(e));
deleteBtn.addEventListener("click", ui.deleteAll);
container.addEventListener("click", ui.deleteIWant);
container.addEventListener("click", ui.editIWant);
