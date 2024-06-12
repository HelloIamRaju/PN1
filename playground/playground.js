document.addEventListener("DOMContentLoaded", () => {
    const contentbtn = document.querySelector("#content");
    const summarybtn = document.querySelector("#summary");
    const notesbtn = document.querySelector("#notes");
  
    const theorysummary = document.querySelector(".theory-summary");
    const theorycontent = document.querySelector(".theory-content");
    const theorynotes = document.querySelector(".theory-notes");
  
    contentbtn.addEventListener("click", () => {
      theorysummary.style.display = "none";
      theorynotes.style.display = "none";
      theorycontent.style.display = "block";
      contentbtn.style.backgroundColor="#8dbcff";
      summarybtn.style.backgroundColor="white";
      notesbtn.style.backgroundColor="white";

    });
  
    summarybtn.addEventListener("click", () => {
      theorycontent.style.display = "none";
      theorynotes.style.display = "none";
      theorysummary.style.display = "block";
      summarybtn.style.backgroundColor="#8dbcff";
      contentbtn.style.backgroundColor="white";
      notesbtn.style.backgroundColor="white";

    });
  
    notesbtn.addEventListener("click", () => {
      theorycontent.style.display = "none";
      theorysummary.style.display = "none";
      theorynotes.style.display = "block";
      notesbtn.style.backgroundColor="#8dbcff";
      contentbtn.style.backgroundColor="white";
      summarybtn.style.backgroundColor="white";

    });
  });
  


//   let lastScrollTop = 0;
// const navbar = document.querySelector('.header');

// window.addEventListener('scroll', () => {
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     if (scrollTop > lastScrollTop) {
//         // Scrolling down
//         navbar.style.top = '-10vh';
//     } else {
//         // Scrolling up
//         navbar.style.top = '0';
//     }
//     lastScrollTop = scrollTop;
// });
