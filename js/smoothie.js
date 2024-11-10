//Get the form elements
const orderOutput = document.getElementById("orderOutput");
const orderButton = document.getElementById("orderButton");
const smoothieForm = document.getElementById("smoothieOrderForm");

//Smoothie class
class Smoothie {
    //Constructor with smoothie options
    constructor(baseFlavor, milkType, fruits, size)  {
        this.baseFlavor = baseFlavor;
        this.milkType = milkType;
        this.fruits = fruits;
        this.size = size;
    }

    //Generates the smoothie description
    smoothieDescription() {
        
        orderOutput.innerHTML = ' '; //This clears the output so only one smoothie is displayed

        //Thank you message for extra polish
        const thankYou = document.createElement('p');
        thankYou.textContent = 'Thank you for your order!';
        //Append thank you message to the order output
        orderOutput.appendChild(thankYou);

        let description = `A ${this.size} ${this.baseFlavor} smoothie with ${this.milkType} milk`
        if (this.fruits.length > 0) {
            description += ` and ${this.fruits.join(", ")}`
        } else {
            description += " and no fruits"
        }
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
        //toFixed learned in above link, toFixed(2) rounds to 2 decimal places, as required for dollar amounts
        //Adds total price to description
        description += ` for $${this.calculatePrice().toFixed(2)}`;

        //Creating the image element
        //images and switch cases covered in lesson 9
        const smoothieImage = document.createElement('img');
        smoothieImage.setAttribute('title', `${this.baseFlavor} smoothie`);

        //Set the image depending on the base flavor
        let imageSrc;
        switch (this.baseFlavor.toLowerCase()) {
            case 'strawberry':
                imageSrc = 'images/strawberry.png';
                break;
            case 'banana':
                imageSrc = 'images/banana.png';
                break;
            case 'mango':
                imageSrc = 'images/mango.png';
                break;
            case 'pineapple':
                imageSrc = 'images/pineapple.png';
                break;
            case 'peach':
                imageSrc = 'images/peach.png';
                break;
            case 'cherry':
                imageSrc = 'images/cherry.png';
                break;
        }

        smoothieImage.setAttribute('src', imageSrc);
        smoothieImage.setAttribute('width', '200'); 

        //append the smoothie image to the order output
        orderOutput.appendChild(smoothieImage);
        
        //code followed from lesson 9
        const desc = document.createElement('p');
        desc.textContent = description;
        orderOutput.appendChild(desc);
    }

    //Calculates the total price of smoothie
    calculatePrice() {
        let basePrice;

        //Determine base price based on size
        //Following switch case structure from lesson 9
        switch (this.size.toLowerCase()) {
            case 'small':
                basePrice = 6.00;
                break;
            case 'medium':
                basePrice = 7.50;
                break;
            case 'large':
                basePrice = 9.00;
                break;
            default:
                basePrice = 6.00;
        }

        //Get cost of extra fruits
        const extraFruitCost = this.fruits.length * 0.90;

        //Calculate total price
        const totalPrice = basePrice + extraFruitCost;

        return totalPrice;
    }
    
}

//Function gets the checked fruits from the form
//Looked at https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#checked to understand how to reference checkboxes with 'checked'
function getAddedFruits() {
    const addedFruits = []; //arrays covered in lesson 3
    const fruitCheckboxes = document.getElementsByName('fruits');
    // loops covered in lesson 4
    // uses a loop to check for checked boxes, appends checked values to an array
    for (let i = 0; i < fruitCheckboxes.length; i++) {
        if (fruitCheckboxes[i].checked) { 
            addedFruits.push(fruitCheckboxes[i].value); // push and arrays covered in lesson 3
        }
    }
    
    return addedFruits;
}

//Event listener for the order button
orderButton.addEventListener('click', function() {
    //Gets the values from the form
    const baseFlavor = document.getElementById('smoothie').value;
    const milkType = document.getElementById('milkType').value;
    const size = document.getElementById('size').value;
    const fruits = getAddedFruits();

    //Make a new smoothie object
    const newSmoothie = new Smoothie(baseFlavor, milkType, fruits, size);

    //call the smoothieDescription
    newSmoothie.smoothieDescription();
});