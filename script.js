//Cards
/*--------------------
Vars
--------------------*/
let progress = 10
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.01
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)
// Select all carousel items
const carouselItems = document.querySelectorAll('.carousel-item');
//Card End//

//FAQ
document.addEventListener("DOMContentLoaded", function() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    item.addEventListener("click", () => {
      const activeItem = document.querySelector(".faq-item.active");
      if (activeItem && activeItem !== item) {
        activeItem.classList.remove("active");
        activeItem.querySelector(".faq-answer").style.display = "none";
      }

      item.classList.toggle("active");
      const answer = item.querySelector(".faq-answer");
      if (item.classList.contains("active")) {
        answer.style.display = "block";
      } else {
        answer.style.display = "none";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = [
      { id: 'trx-section', content: 'You can participate in multiple events as long as their timings don\'t overlap.' },
      { id: 'trx-section1', content: 'Online Registration will be closed by 17th Oct.' },
      { id: 'trx-section4', content: 'On-Spot Registration is Available, bring your clg ID .' },
      { id: 'trx-section2', content: 'Food and refreshment will be provided.' },
      { id: 'trx-section3', content: 'Parking is not allowed inside the College Campus.' },
      { id: 'trx-section5', content: 'Certificates will be provided.' },
      { id: 'trx-section6', content: 'Please wear formal attire and bring your college ID for verification.' },
  ];

  const contentSection = document.querySelector('.contentSection');
  let typingTimeout; // Variable to hold the typing timeout

  sections.forEach(section => {
      const element = document.getElementById(section.id);
      element.addEventListener('click', () => {
          clearActive();
          element.classList.add('active');
          clearTyping(); // Cancel ongoing typing
          typeContent(section.content);
      });
  });

  // Function to clear active class
  function clearActive() {
      const allSections = document.querySelectorAll('.class-info');
      allSections.forEach(section => section.classList.remove('active'));
  }

  // Clear ongoing typing
  function clearTyping() {
      clearTimeout(typingTimeout);
      contentSection.innerHTML = ''; // Clear previous content
  }

  // Typing animation function
  function typeContent(content) {
      let index = 0;

      function type() {
          if (index < content.length) {
              contentSection.innerHTML += content.charAt(index);
              index++;
              typingTimeout = setTimeout(type, 50); // Set the typing timeout
          }
      }

      type();
  }
});
//FAQ End//



document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  const nav = document.querySelector('nav');

  // Toggle the class 'nav-open' when the hamburger menu is clicked
  menuIcon.addEventListener('click', function() {
      nav.classList.toggle('nav-open');
  });
});
// Set the countdown date
var countdownDate = new Date("Oct 18, 2024 23:59:59").getTime();

// Update the countdown every 1 second
var countdownFunction = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
  
  // Find the difference between now and the countdown date
  var distance = countdownDate - now;
  
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Output the result in elements with id
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
  
  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

