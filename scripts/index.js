// Importing necessary data and functions
import { dataPizza } from './data.js';
import { moveBannerPosition } from './banner.js';
import {
	nameInput,
	validatePhone,
	validateEmail,
	cancelButton,
	submitButton,
} from './form.js';

// Getting DOM elements
const [...radios] = document.querySelectorAll('#pizza input');
const ingridients = document.querySelector('.ingridients');
const cake = document.querySelector('.table');
const body = document.querySelector('body');

// Creating a pizza object
const pizza = {
	size: {
		size: 'big',
		price: 100,
	},
	topping: [],
};

// Adding event listener for pizza size change
radios.forEach((el) => {
	el.addEventListener('change', (e) => {
		const findElement = dataPizza.size.findIndex(function (size) {
			return size.size === e.target.id;
		});
		pizza.size = dataPizza.size[findElement];
		showPrice(pizza);
	});
});

// Adding click event handler for ingredients (sauces and toppings)
ingridients.addEventListener('click', (e) => {
	const sauceElement = dataPizza.sauce.findIndex((el) => {
		return el.name === e.target.id;
	});

	const toppingElement = dataPizza.topping.findIndex((el) => {
		return el.name === e.target.id;
	});

	if (sauceElement !== -1) {
		pizza.sauce = { ...dataPizza.sauce[sauceElement], src: e.target.src };
	}

	if (toppingElement !== -1) {
		pizza.topping.push({
			...dataPizza.topping[toppingElement],
			src: e.target.src,
		});
	}
	showPrice(pizza);
});

// Function to display the pizza price and ingredients
function showPrice(pizza) {
	const [...children] = cake.children;
	children.forEach((img) => img.remove());
	// Adding the pizza base image
	const cakeimage = createImage(
		'assets/klassicheskij-bortik_1556622914630.png',
		'cake'
	);
	cake.append(cakeimage);

	const elementPrice = document.querySelector('#price');
	const sauce = document.querySelector('#sauce');
	const topping = document.querySelector('#topping');

	let price = 0;
	price = price + parseFloat(pizza.size.price);

	// Displaying the sauce if selected
	if (pizza.sauce) {
		price = price + parseFloat(pizza.sauce.price);
		cake.append(createImage(pizza.sauce.src));
		sauce.textContent = pizza.sauce.publickName;
	}

	// Adding each topping
	if (pizza.topping.length > 0) {
		const [...telements] = topping.children;
		telements.forEach((el) => el.remove());

		const toppingCounts = {};

		pizza.topping.forEach((top) => {
			const key = top.publickName;
			if (toppingCounts[key]) {
				toppingCounts[key].count += 1;
			} else {
				toppingCounts[key] = { ...top, count: 1 };
			}
		});

		Object.values(toppingCounts).forEach((top) => {
			cake.append(createImage(top.src));
			topping.append(
				badge(top.publickName, top.count, function () {
					const findCurrentTopping = pizza.topping.findIndex((element) => {
						return this.parentNode.textContent.includes(element.publickName);
					});
					pizza.topping.splice(findCurrentTopping, 1);
					this.parentNode.remove();
					showPrice(pizza);
				})
			);
		});

		price = pizza.topping.reduce(function (acc, top) {
			return acc + top.price;
		}, price);
	}

	elementPrice.textContent = price + ' грн.';
}

// Function to create an image
function createImage(src, alt = 'pizza') {
	const img = document.createElement('img');
	img.src = src;
	img.alt = alt;

	return img;
}

// Function to create a badge with a delete "x" button
function badge(name, count, listener) {
	const badge = document.createElement('span');
	const del = document.createElement('span');
	const countElement = document.createElement('span');
	badge.className = 'badge';
	del.innerText = 'x';
	del.className = 'del';
	badge.innerText = name;
	countElement.className = 'count';
	countElement.innerText = `x${count}`;
	del.addEventListener('click', listener);
	badge.append(del, countElement);
	return badge;
}

moveBannerPosition();
validatePhone();
validateEmail();
showPrice(pizza);

// Drag & drop functionality
const tableWrapper = document.querySelector('.table-wrapper');
const draggables = document.querySelectorAll('.draggable');

let isDragged = false;

// Adding event handlers for draggable elements
draggables.forEach((el) => {
	el.addEventListener('dragstart', (e) => {
		e.dataTransfer.setData('text/plain', e.target.id);
		isDragged = true;
	});
	el.addEventListener('drag', (e) => {
		e.target.style.cursor = 'grabbing';
	});

	el.addEventListener('mouseover', (e) => {
		// Resetting style on repeated hover
		if (isDragged) {
			e.target.style.cursor = 'grab';
		}
	});

	// Restoring cursor style after mouse button release
	el.addEventListener('mouseup', (e) => {
		e.target.style.cursor = 'grab';
	});
});

// Allow dragging over the pizza area
cake.addEventListener('dragover', (e) => {
	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
});

// Handling the "drop" event — placing the ingredient on the pizza

cake.addEventListener('drop', (e) => {
	// Changing the cursor
	e.preventDefault();
	e.target.style.cursor = 'grab';
	tableWrapper.style.cursor = 'grab';
	const id = e.dataTransfer.getData('text/plain');
	const draggedElement = document.getElementById(id);

	const sauce = dataPizza.sauce.find((s) => s.name === id);
	const topping = dataPizza.topping.find((t) => t.name === id);

	// Adding the ingredient to the pizza
	if (sauce) {
		pizza.sauce = { ...sauce, src: draggedElement.src };
	} else if (topping) {
		pizza.topping.push({ ...topping, src: draggedElement.src });
	}

	// Updating the price and interface
	showPrice(pizza);
	// isDragged = true;
});
