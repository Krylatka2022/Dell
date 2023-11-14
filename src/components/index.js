import "../pages/index.css";
import "../pages/style.css";
import "../components/validation.js";
document.addEventListener("DOMContentLoaded", function () {
	const sliderContainer = document.querySelector(".slider__container"); //slider-line
	const sections = document.querySelectorAll("section");
	const prevButton = document.querySelector(".button_prev-button");
	const nextButton = document.querySelector(".button_next-button");
	const nextButtonCover = document.querySelector(".button_next-button-cover");
	const navLinks = document.querySelectorAll(".itemLinks");

	const popup = document.querySelector(".popup");
	const profileButton = document.querySelector(".profile__edit-button");

	function openPopup(popup) {
		popup.classList.add("popup_opened");
		document.addEventListener("keydown", handleEscapeDown);
	}

	//закрыть любой попап
	function closePopup(popup) {
		popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", handleEscapeDown);
	}

	//Универсальный слушатель на закрытие всех попапов
	// находим все close проекта по универсальному селектору

	const closeButtons = document.querySelectorAll(".popup__close");

	closeButtons.forEach((button) => {
		// находим 1 раз ближайший к "крестику" popup
		const popup = button.closest(".popup");
		// устанавливаем обработчик закрытия на крестик и overlay
		closePopupOverlay(popup);
		button.addEventListener("click", () => {
			closePopup(popup);
		});
	});

	//закрываем попап по нажатию кнопки Escape
	function handleEscapeDown(evt) {
		if (evt.key === "Escape") {
			const popupOpened = document.querySelector(".popup_opened");
			closePopup(popupOpened);
		}
	}

	profileButton.addEventListener("click", function () {
		//Отслеживаем событие 'open'
		openPopup(popup);
	});

	profileButton.addEventListener("mouseenter", function () {
		openPopup(popup);
	});

	// profileButton.addEventListener("mouseleave", function () {
	//   closePopup(popup);
	// });
	function closePopupOverlay(popup) {
		popup.addEventListener("mousedown", function (evt) {
			if (evt.target == popup) {
				closePopup(popup);
			}
		});
	}

	// Индикатор
	function setupIndicatorClickHandlers() {
		navLinks.forEach((link, index) => {
			link.addEventListener("click", () => {
				showSlide(index);
				updateNavLinks(index);
			});
		});
	}

	const totalSlides = sections.length;
	let currentSlide = 0;

	// Клонируем и добавляем секции в слайдер
	sections.forEach((section) => {
		const clonedSection = section.cloneNode(true);
		clonedSection.classList.add("slider__section");
		sliderContainer.appendChild(clonedSection);
	});

	const sliderSections = document.querySelectorAll(".slider__section");
	console.log(sliderSections);
	// Устанавливаем обработчики событий для кнопок
	prevButton.addEventListener("click", showPreviousSlide);
	nextButton.addEventListener("click", showNextSlide);
	nextButtonCover.addEventListener("click", showNextSlide);

	function showCoverSlide() {
		currentSlide = 0;
		showSlide(currentSlide);
		prevButton.style.display = "none";
		nextButton.style.display = "none";
		nextButtonCover.style.display = "block";
		updateNavLinks(currentSlide);
	}

	function showPreviousSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
		showSlide(currentSlide);
		prevButton.style.display = "block";
		nextButton.style.display = "block";
		nextButtonCover.style.display = "none";
		updateNavLinks(currentSlide);
	}

	function showNextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
		showSlide(currentSlide);
		prevButton.style.display = "block";
		nextButton.style.display = "block";
		nextButtonCover.style.display = "none";
		updateNavLinks(currentSlide);
	}

	function showSlide(index) {
		sliderSections.forEach((slide, i) => {
			slide.style.display = i === index ? "block" : "none";
		});
	}
	function updateNavLinks(index) {
		navLinks.forEach((link, i) => {
			link.classList.toggle("active", i === index);
		});
	}
	setupIndicatorClickHandlers();
	showCoverSlide();
	// Инициализируйте слайдер
	// // Автоматическая смена слайдов
	// setInterval(showNextSlide, 3000);
	const burgerButton = document.querySelector(".header__burger");
	const popupHeader = document.querySelector(".header__popup");
	const navLinksHeader = document.querySelectorAll(".header__link");

	function handleNavLinkClick(path) {
		console.log(`Нажата ссылка с путем: ${path}`);
		// Здесь вы можете добавить свою логику обработки нажатия на ссылку
		// Например, перенаправить пользователя на указанный путь
		window.location.href = path;
	}

	function togglePopup() {
		popupHeader.classList.toggle("header__popup_visible");
		burgerButton.classList.toggle("header__burger_close");
	}

	// Обработчик нажатия на бургер
	burgerButton.addEventListener("click", togglePopup);

	// Обработчики нажатия на ссылки в меню
	navLinksHeader.forEach((link) => {
		link.addEventListener("click", function (event) {
			event.preventDefault();
			const path = this.getAttribute("href").substring(1); // Получаем путь из атрибута href
			handleNavLinkClick(path);
			togglePopup(); // Закрываем меню после нажатия на ссылку
		});
	});
});
