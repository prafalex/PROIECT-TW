window.addEventListener("DOMContentLoaded", function () {
  
    var checkbox = document.getElementById("dark-mode-toggle");
    localStorage.setItem("dark-mode-toggle", checkbox.checked);

    var checked = JSON.parse(localStorage.getItem("dark-mode-toggle"));
    document.getElementById("dark-mode-toggle").checked = checked;


let darkMode = localStorage.getItem("darkMode");
  const toggle = document.querySelector("#dark-mode-toggle");

  const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", null);
  };

  if (darkMode === "enabled") {
    enableDarkMode();
  }

  toggle.addEventListener("click", () => {
    


    darkMode = localStorage.getItem("darkMode");

    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  })
});


function save(){    
  var checkbox = document.getElementById('dark-mode-toggle');
  localStorage.setItem('dark-mode-toggle', checkbox.checked);
}

function load(){    
    var checked = JSON.parse(localStorage.getItem('dark-mode-toggle'));
    document.getElementById("dark-mode-toggle").checked = checked;
}
load();