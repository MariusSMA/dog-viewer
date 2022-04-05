const select = document.getElementById("breeds");
const spinner = document.querySelector(".spinner");
const image = document.querySelector(".dog-img");

// Sets the source of the image when a new breed is selected

select.addEventListener("change", e => {
	const breed = e.target.value;
	const BREED_URL = `https://dog.ceo/api/breed/${breed}/images/random`;

	image.classList.remove("show");
	image.alt = `Picture of a ${breed}.`;
	setImageSrc(BREED_URL);
});

// Sets the image source

function setImageSrc(url) {
	spinner.classList.add("show");
	fetch(url)
		.then(response => response.json())
		.then(data => {
			image.src = data.message;

			image.addEventListener("load", () => {
				image.classList.add("show");
				spinner.classList.remove("show");
			});
		});
}

// Gets the breeds from the object

function getBreeds(url) {
	spinner.classList.add("show");

	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			const breeds = data.message;
			const breedsArray = Object.keys(breeds);
			const randomBreed = breedsArray[getRandomBreed(breedsArray)];

			loadRandomImage(randomBreed);
			setBreeds(breedsArray);
		});
}

// Iterates through the breeds object and appends each key as an option to the select element

function setBreeds(breedsArray) {
	for (let i = 0; i < breedsArray.length; i++) {
		const option = document.createElement("option");
		option.value = breedsArray[i];
		option.textContent = breedsArray[i];
		select.appendChild(option);
	}
}

// Gets a random breed from the breeds array

function getRandomBreed(breedsArray) {
	return Math.floor(Math.random() * breedsArray.length);
}

// Loads a random image on the first opening of the website

function loadRandomImage(randomBreed) {
	const BREED_URL = `https://dog.ceo/api/breed/${randomBreed}/images/random`;
	setImageSrc(BREED_URL);
}

// Main function

function main() {
	getBreeds("https://dog.ceo/api/breeds/list/all");
}

main();
