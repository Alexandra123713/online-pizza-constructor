// Getting form elements from the DOM

const nameInput = document.querySelector('input[name=name]');
const phoneInput = document.querySelector('input[name=phone]');
const emailInput = document.querySelector('input[name=email]');
const cancelButton = document.querySelector('input[name=cancel]');
const submitButton = document.querySelector('#btnSubmit');
const sauce = document.querySelector('#sauce');
const toppings = document.querySelector(['#topping']);

// Checking if the user entered a valid name
const validateName = () => {
	const regex = /^[А-Яа-яЄєІіЇїҐґё\-]+$/;
	return regex.test(nameInput.value);
};

// Checking if the user entered a valid phone number in the format +380XXXXXXXXX
const validatePhone = () => {
	const regex = /^\+380\d{9}$/;
	return regex.test(phoneInput.value);
};

// Checking if the user entered a valid email address
const validateEmail = () => {
	const regex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
	return regex.test(emailInput.value);
};

// Function to add a green border
const addSuccessClass = (element) => {
	element.classList.remove('error');
	element.classList.add('success');
};

// Function to add a red border
const addErrorClass = (element) => {
	element.classList.remove('success');
	element.classList.add('error');
};

// Function to reset styles
const removeSuccessAndErrorClass = (element) => {
	element.classList.remove('error');
	element.classList.remove('success');
};

// Name validation on blur (when losing focus)
nameInput.addEventListener('blur', () => {
	if (validateName()) {
		addSuccessClass(nameInput);
	} else {
		addErrorClass(nameInput);
	}
});

// Phone validation on blur (when losing focus)
phoneInput.addEventListener('blur', () => {
	if (validatePhone()) {
		addSuccessClass(phoneInput);
	} else {
		addErrorClass(phoneInput);
	}
});

// Email validation on blur (when losing focus)
emailInput.addEventListener('blur', () => {
	if (validateEmail()) {
		addSuccessClass(emailInput);
	} else {
		addErrorClass(emailInput);
	}
});

// Clearing the form when the cancel button is clicked
cancelButton.addEventListener('click', () => {
	removeSuccessAndErrorClass(nameInput);
	removeSuccessAndErrorClass(phoneInput);
	removeSuccessAndErrorClass(emailInput);
	nameInput.value = '';
	phoneInput.value = '';
	emailInput.value = '';
});

// Validating and submitting data when the order confirmation button is clicked
submitButton.addEventListener('click', () => {
// Checking if the user selected a sauce
	if (sauce.textContent === '') {
		alert('Будь ласка, виберіть соус');
		return;
	}

	// Checking the number of selected toppings (minimum 2)
	if (toppings.childElementCount < 2) {
		alert('Будь ласка, виберіть мінімум два топінги');
		return;
	}
// Validating all form fields
	if (!validateName() || !validatePhone() || !validateEmail()) {
		alert('Будь ласка, правильно заповніть усі поля!');
	} else {
		// Redirecting the user to the "thank-you" page
		setTimeout(() => {
			window.location.replace('./thank-you/index.html');
		}, 2000);
	}
});

export { nameInput, validatePhone, validateEmail, cancelButton, submitButton };
