// Слайдер в начале страницы

$(document).ready(function () {
  // Слайдер на главной
  $('.home-slider').slick({
    dots: false,
    responsive: [{
      breakpoint: 600,
      settings: {
        dots: true,
        arrows: false
      }
    }]
  });

  // Слайдер Партнеры
  $('.partners__list').slick({
    slidesToShow: 5,
    dots: false,
  });

  // Меню бургер

  const menuBtn = document.querySelector(".menu-btn"); // Кнопка меню
  const headerNav = document.querySelector(".nav"); // Блок с меню
  const headerMenu = document.querySelector(".nav__menu"); // Меню
  const navContacts = document.querySelector(".nav__contacts"); // Контакты в меню (в мобильных устройстваъ)
  const navMenuContainer = document.querySelector(".nav__menu-container");
  const lightBox = document.querySelector(".light-box"); // Лайтбокс (темный фон)

  let showMenu = false; // флаг

  menuBtn.addEventListener("click", toggleMenu);
  lightBox.addEventListener("click", closeMenu);

  function toggleMenu() {
    if (!showMenu) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    menuBtn.classList.add("close");
    headerNav.classList.add("show");
    headerMenu.classList.add("show");
    navContacts.classList.add("show");
    navMenuContainer.classList.add("show");
    lightBox.classList.add("show");
    // menuItems.forEach(item => item.classList.add('show'));
    window.addEventListener("scroll", noScroll);
    showMenu = true;
  }

  function closeMenu() {
    menuBtn.classList.remove("close");
    headerNav.classList.remove("show");
    headerMenu.classList.remove("show");
    navContacts.classList.remove("show");
    navMenuContainer.classList.remove("show");
    lightBox.classList.remove("show");
    // menuItems.forEach(item => item.classList.remove('show'));
    window.removeEventListener("scroll", noScroll);
    showMenu = false;
  }

  // Остановить скролл когда открыт меню
  function noScroll() {
    window.scroll(0, 0);
  }

  // Плавная прокрутка к секциям
  const callbackBtn = document.querySelectorAll('.call-back');
  // const button = document.querySelector('#button');
  const dialog = document.querySelector('.dialog');
  const closeBtn = document.querySelector('.close');

  function toggleShowDialog() {
    dialog.classList.toggle("show-dialog");
  }

  closeBtn.addEventListener('click', toggleShowDialog);
  dialog.addEventListener('click', function (e) {
    if (e.target === this) {
      toggleShowDialog();
    }
  });

  callbackBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (showMenu) closeMenu();
      toggleShowDialog();
    })
  });

  const submitBtn = document.querySelectorAll('.form__btn');
  submitBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
    })
  })
  headerMenu.addEventListener("click", (e) => {
    e.preventDefault();
    if (showMenu) toggleMenu();
    let targetSection = e.target.getAttribute('href');
    document.querySelector(targetSection).scrollIntoView({
      behavior: 'smooth'
    })
  })
})