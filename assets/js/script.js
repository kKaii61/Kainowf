// document.body.scrollTop = 0;
// document.documentElement.scrollTop = 0;

const navItem = document.querySelectorAll('.nav-item');
const homeDiv = document.getElementById('home');
const aboutDiv = document.getElementById('about');
const projectDiv = document.getElementById('project');
const contactDiv = document.getElementById('contact');
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

function getNavTargetPosition() {
  const homeTop = getOffset(homeDiv).top;
  const aboutTop = getOffset(aboutDiv).top;
  const projectTop = getOffset(projectDiv).top;
  const contactTop = getOffset(contactDiv).top;
  return [homeTop, aboutTop, projectTop, contactTop];
}

const divPos = getNavTargetPosition();

// Add this to your existing script file
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navContainer = document.querySelector('.nav-container');
  const headerContainer = document.querySelector('.header-container');

  menuToggle.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    headerContainer.classList.toggle('active');
  });
  navItem.forEach((item) => {
    item.addEventListener('click', () => {
      navContainer.classList.toggle('active');
      headerContainer.classList.toggle('active');
      const target = item.children[0].title;
      switch (target) {
        case 'home':
          document.documentElement.scrollTop = divPos[0];
          document.documentElement.scrollTop = 0;
          break;
        case 'about':
          document.documentElement.scrollTop = divPos[1] - 60;
          console.log(divPos);
          break;
        case 'project':
          document.documentElement.scrollTop = divPos[2] - 60;
          break;
        case 'contact':
          document.documentElement.scrollTop = divPos[3] - 60;
          break;
        default:
          console.log(divPos);
      }
    });
  });
});

// Typing effect
const titles = ['Web Designer', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingText = document.querySelector('.typing-text');
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    typingText.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentTitle.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 100 : 200);
  }
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// Intersection Observer for project cards
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    projectObserver.observe(card);
  });
});

// Contact form handling
const result = document.getElementById('result');
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      var jsonData = JSON.stringify(data);
      result.innerHTML = 'Please wait...';
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/object',
        },
        body: jsonData,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
            result.classList.remove('text-gray');
            result.classList.add('text-green');
          } else {
            console.log(response);
            result.innerHTML = json.message;
            result.classList.remove('text-gray');
            result.classList.add('text-red');
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = 'Something went wrong!';
        })
        .then(function () {
          contactForm.reset();
          setTimeout(() => {
            result.innerHTML = '';
            result.style.display = 'none';
          }, 5000);
        });
    });
    contactForm.reset();
  }
});

// Add contact section elements to the intersection observer
const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.addEventListener('DOMContentLoaded', () => {
  const contactElements = document.querySelectorAll(
    '.contact-info, .contact-form'
  );
  contactElements.forEach((element) => {
    contactObserver.observe(element);
  });
});
