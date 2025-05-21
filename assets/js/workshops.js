mailthere = false;


// Function to detect mobile devices
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 800);
}

if (!(isMobile())) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'assets/js/keyboard.js';
    script.defer = true;
    script.type = "module";
    document.head.appendChild(script);
}

// smooth scrolll
const lenis = new Lenis()

lenis.on('scroll', (e) => {
    // console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

function rotateNumbers(e) {
    numbers = $(e).find(".numbers")[0]
    numbers.classList.add("numberRotate")
}
function stopRotateNumbers(e) {
    numbers = $(e).find(".numbers")[0]
    numbers.classList.remove("numberRotate");
}

// navbar circles and lines

circle1 = document.getElementById("circle1")
circle2 = document.getElementById("circle2")
navByte = document.getElementById("navByte")
line1 = document.getElementById("line1")
line2 = document.getElementById("line2")
bigNav = document.getElementById("bigNav")
span1 = document.getElementById("span1")
span2 = document.getElementById("span2")
span3 = document.getElementById("span3")
span4 = document.getElementById("span4")
var n = 0

function rotateBack() {
    circle1.classList.remove("rotateStop")
    circle2.classList.remove("rotateStop")
}
function rotateStop() {
    circle1.classList.add("rotateStop")
    circle2.classList.add("rotateStop")
}
function navMenuClick() {
    if (n == 0) {
        line1.classList.add("line1Click")
        line2.classList.add("line2Click")
        circle1.classList.add("circleBigNav")
        circle2.classList.add("circleBigNav")
        bigNav.classList.add("bigNavAppear")
        span1.style.animationPlayState = "running"
        span2.style.animationPlayState = "running"
        span3.style.animationPlayState = "running"
        span4.style.animationPlayState = "running"
        navByte.style.color = "whitesmoke"

        n = 1
    } else {
        line1.classList.remove("line1Click")
        line2.classList.remove("line2Click")
        circle1.classList.remove("circleBigNav")
        circle2.classList.remove("circleBigNav")
        bigNav.classList.remove("bigNavAppear")
        navByte.style.color = "black"

        n = 0
    }
}

  const selectedSkills = new Set();

  function skillClicked(element) {
    if (element.classList.contains("clicked")) {
        element.classList.remove("clicked")
    } else {
        element.classList.add("clicked")
    }
    const skill = element.textContent.trim();

    if (selectedSkills.has(skill)) {
      selectedSkills.delete(skill);
      element.classList.remove("selected");
    } else {
      selectedSkills.add(skill);
      element.classList.add("selected");
    }

    document.getElementById('skillsInput').value = Array.from(selectedSkills).join(', ');
  }

  const form = document.querySelector("form");


  form.addEventListener("submit", async function (e) {
    e.preventDefault();
          window.alert("Submitting please wait")

    try {
      const formData = new FormData(form);
      
      const formDataObj = {};

      for (let [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyMj0Y_K4BrXKNLU-pblbf7IiX_fO34G-th2UsQKC_qSVpvMWy60UE2jFFTrpXmNWEUpA/exec";

      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formDataObj),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });

      const data = await response.json();
      console.log("Success:", data);
      window.alert("Submitted")
    } catch (error) {
      console.error("Error:", error);
    }
  });

