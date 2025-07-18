const banner = document.querySelector('#banner');
let maxLeft = 80;
let maxTop = 90;

// Function to make an element evade on mouse hover
const moveBannerPosition = () => {
	banner.addEventListener('mouseover', () => {
		const randomLeft = Math.random() * maxLeft;
		const randomTop = Math.random() * maxTop;
		banner.style.top = `${randomTop}%`;
		banner.style.left = `${randomLeft}%`;
	});
};
export { moveBannerPosition };
