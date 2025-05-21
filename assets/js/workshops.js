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


  const defaultPassword = "byteClubMember123";
const defaultPassword2 = "ByteClub2025";

firebase.initializeApp(firebaseConfig);
const database = firebase.database();




function trySignInWithMultiplePasswords(email) {
    return firebase.auth().signInWithEmailAndPassword(email, defaultPassword)
        .catch((error1) => {
            console.log("First password failed:", error1.message);
            console.log("Trying second password...");

            return firebase.auth().signInWithEmailAndPassword(email, defaultPassword2)
                .catch((error2) => {
                    if (
                        error2.code === "auth/internal-error" &&
                        error2.message.includes("INVALID_LOGIN_CREDENTIALS")
                    ) {
                        console.log("EROR:NO MAIL BITCH")
                        console.log("❌ Second password also gave INVALID_LOGIN_CREDENTIALS (internal-error)");
                        mailthere =  false;
                    } else {
                        console.warn("⚠️ Some other second attempt error:", error2);
                    
                    console.error("Both password attempts failed.");
                    console.error("Second error:", error2.message);
                    
                    throw error2; // Rethrow to propagate the error if needed
                    }
                });
        });
}

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

      if (selectedSkills.size === 0) {
    alert("Please select at least one skill before submitting.");
    return;
  }
     const email = document.querySelector(".email").value + document.querySelector(".emailPlaceholder").textContent;
      const membersRef = database.ref('members');
    trySignInWithMultiplePasswords(email)
        .then(() => {
            // Now user is authenticated, safe to access database
            const membersRef = database.ref('members');
            membersRef.orderByChild('email').equalTo(email).once('value', snapshot => {
                if (snapshot.exists()) {
                    mailthere = true;
                
                } else {    
                    window.alert("Not Registered as Provisional Member\nRedirecting..")
                    window.location.href ="join"
                    mailthere =  false;
                }
            });
        })



if(mailthere){
try {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyMj0Y_K4BrXKNLU-pblbf7IiX_fO34G-th2UsQKC_qSVpvMWy60UE2jFFTrpXmNWEUpA/exec";

    // Collect other form data once (without skills)
    const formData = new FormData(form);
    const baseFormDataObj = {};
    for (let [key, value] of formData.entries()) {
      if (key !== "skills") {
        baseFormDataObj[key] = value;
      }
    }

    // Submit once per skill
    for (const skill of selectedSkills) {
      const formDataObj = {
        ...baseFormDataObj,
        skills: skill,
      };

      console.log("Submitting for skill:", skill, formDataObj);

      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formDataObj),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });

      const data = await response.json();
      console.log("Success for skill", skill, data);
    }

    alert("All skills submitted successfully!");
    form.reset();
    selectedSkills.clear();
    document.getElementById('skillsInput').value = "";

    // Remove all selected classes visually
    document.querySelectorAll('.skill.selected').forEach(el => el.classList.remove('selected'));
    window.location.href ="#"

  } catch (error) {
    console.error("Error during submission:", error);
    alert("Error submitting form, please try again.");
  }
}
  });


   
