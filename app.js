'use strict';

const toggle = document.querySelector('.toggle');
const body = document.querySelector('body');
const input = document.querySelector('.todo-input');
const cont = document.querySelector('.cont');
const todoContainer = document.querySelector('.todo-container');
const existingDiv = document.querySelector('.down');
let newDivs = []; // Array to hold the newDiv elements
const down = document.querySelector('.down');

const createDiv = function () {
  const newDiv = document.createElement('div');
  newDiv.className = 'rect';
  const span = document.createElement('span');
  const p = document.createElement('p');
  p.className = 'change';
  p.textContent = input.value;
  if (body.classList.contains('display')) {
    p.style.color = 'var(--very-dark-blue)'; // Set dark mode color
  } else {
    p.style.color = 'var(--very-light-gray)'; // Set light mode color
  }
  const imgg = document.createElement('img');
  imgg.src = 'images/icon-cross.svg';
  imgg.className = 'image';
  newDiv.appendChild(span);
  newDiv.appendChild(p);
  newDiv.appendChild(imgg);
  todoContainer.insertBefore(newDiv, existingDiv);
  newDivs.push(newDiv); // Add the newDiv to the array

  let clicked = false; // Initialize clicked for this span

  imgg.addEventListener('click', () => {
    const divToRemove = imgg.parentNode;
    todoContainer.removeChild(divToRemove);
    newDivs = newDivs.filter(div => div !== divToRemove); // Remove the div from the newDivs array
    const len = document.querySelector('.length');
    len.textContent = `${newDivs.length} items left`;
  });

  span.addEventListener('click', () => {
    if (!clicked) {
      span.style.background = 'linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))';
      span.style.border = 'none';
      p.style.textDecoration = 'line-through';
      p.style.color = 'var(--very-dark-grayish-blue)';
      clicked = true;
      const img = document.createElement('img');
      img.src = 'images/icon-check.svg';
      newDiv.classList.add('clicked');
      span.appendChild(img);
    } else {
      span.style.background = 'transparent'; // Reset the background color
      span.style.border = '2px solid var(--very-dark-grayish-blue)';
      p.style.textDecoration = 'none';
      if (body.classList.contains('display')) {
        p.style.color = 'var(--very-dark-blue)'; // Set dark mode color
      } else {
        p.style.color = 'var(--very-light-gray)'; // Set light mode color
      }
      span.removeChild(span.querySelector('img')); // Remove the checkmark image
      newDiv.classList.remove('clicked');
      clicked = false;
    }
  });

  return { newDiv, p }; // Return both the newDiv and p elements
};

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (input.value !== '') {
      const { newDiv } = createDiv(); // Destructure the returned object to get newDiv
      input.value = '';
      const len = document.querySelector('.length');
      len.textContent = `${newDivs.length} items left`;
      return newDiv;
    }
  }
});

toggle.addEventListener('click', () => {
  if (!body.classList.contains('display')) {
    const changes = document.querySelectorAll('.change');
    body.classList.add('display');
    down.style.setProperty('--after-background-color', 'var(--very-light-gray)');
    toggle.src = 'images/icon-moon.svg';
    input.classList.add('display');
    input.style.color = 'var(--very-dark-blue)';
    cont.classList.add('display');
    changes.forEach(change => {
      change.style.color = 'var(--very-dark-blue)';
    });
    todoContainer.style.backgroundColor = 'var(--very-light-gray)'; // Change background color to light mode
    todoContainer.style.boxShadow = '0px 0px 3px rgba(0,0,0,0.4)';
    down.style.setProperty('--box-shadow', '0px 0px 3px rgba(0,0,0,0.4)');
    document.querySelector('.header').style.backgroundImage = 'url(images/bg-desktop-light.jpg)';
    // Set p color to light mode color
    changes.forEach(change => {
      change.style.color = 'var(--very-dark-blue)';
    });
  } else if (body.classList.contains('display')) {
    const changes = document.querySelectorAll('.change');
    body.classList.remove('display');
    down.style.setProperty('--after-background-color', 'var(--very-dark-desaturated-blue)');
    todoContainer.style.backgroundColor = 'var(--very-dark-desaturated-blue)';
    changes.forEach(change => {
      change.style.color = 'var(--very-light-gray)';
    });
    input.classList.remove('display');
    input.style.color = 'var(--very-light-gray)';
    cont.classList.remove('display');
    toggle.src = 'images/icon-sun.svg';
    document.querySelector('.header').style.backgroundImage = 'url(images/bg-desktop-dark.jpg)';
  }
});

const completed = document.querySelector('.completed');
completed.addEventListener('click', () => {
  const hasCompletedTasks = newDivs.some(newDiv => newDiv.classList.contains('clicked'));

  if (hasCompletedTasks) {
    newDivs.forEach(newDiv => {
      if (!newDiv.classList.contains('clicked')) {
        newDiv.style.display = 'none'; // Hide the divs that do not have the clicked class
      }
    });
  }
});

document.querySelector('.all').addEventListener('click', () => {
  newDivs.forEach(newDiv => {
    newDiv.style.display = 'block'; // Show all divs
  });
});

document.querySelector('.clear').addEventListener('click', () => {
  newDivs = newDivs.filter(newDiv => !newDiv.classList.contains('clicked'));

  // Update the items left count
  const len = document.querySelector('.length');
  len.textContent = `${newDivs.length} items left`;

  // Remove completed tasks from the todoContainer
  const completedDivs = todoContainer.querySelectorAll('.clicked');
  completedDivs.forEach(completedDiv => {
    todoContainer.removeChild(completedDiv);
  });
});
