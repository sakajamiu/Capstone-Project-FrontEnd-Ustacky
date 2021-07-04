var products = [{

    index: 1,
    id: 'p1',
    name: 'Samsung TV',
    price: 500000 
    },
    {
    index: 2,
    id: 'p2',
    name: 'Pixel 4a',
    price: 250000
    },
    {
    index: 3,
    id: 'p3',
    name: 'PS 5',
    price: 300000
    },
    {
    index: 4,
    id: 'p4',
    name: 'MacBook Air',
    price: 800000
    },
    {    
    index: 5,
    id: 'p5',
    name: 'Apple Watch',
    price: 95000
    },
    {
    index: 6,
    id: 'p6',
    name: 'Air Pods',
    price: 75000
   },

]
var cartModal = document.getElementById('cart-modal');// cart modal
var cartImage = document.getElementById('cartImage');// cart image
var productCount = document.getElementById('product-count');// number of product in cart displat beside the cartimage
var _cartproduct = new Array();//array to keep product purchased 
var tableBody = document.getElementById('tbody');//table
var addToCart = document.getElementsByClassName("shopButton");// add to cart buttons
var productContainer = document.getElementsByClassName("product-container");//div that display the image of the product
var pricingHover = document.getElementsByClassName('pricing-hover');//div thathover on the product div to display the price
var continueShopping = document.getElementById('continueShopping');//continue shopping button in the cart modal
var totalPrice = document.getElementById('total'); //total price h3 in the cart modal
var total; //to get the total price of the product purchased
//open the cart modal with the cart image on the navigation bar
cartImage.onclick = () => {

    if (_cartproduct.length === 0){
        alert('you are yet to add an item to the cart. please continue shoppping');
    }
    else{        
        cartModal.style.display = "block";
        tableDisplay();
        
    }
    
}
// when user click on continue shopping this will close the cart and take user to shopping div 

continueShopping.onclick = ()  => {
    cartModal.style.display = "none";
    location.href ="#shop";
}
// this close the modal when users click anywhere outside the modal
window.onclick = function(event) {
    if (event.target == cartModal) {
      cartModal.style.display = "none";
    }
}

//add product to the _cartpProduct array when the add to cart button is clicked
function addProductToCart (i){
   for (const cart of products){
       if(addToCart[i].id === cart.id) {
           cart.quantity = 1;
           var _products = _cartproduct.push(cart);
           productCount.innerHTML = _cartproduct.length;
        }

    }
}
// remove the product when the remove from cart button is clicked
removeProductFromCart = (i) =>{
    function filtered (element){
        return (addToCart[i].id !== element.id)

    }
    _cartproduct = _cartproduct.filter(filtered);
    productCount.innerHTML = _cartproduct.length;
    
}
//remove product when the remove button on the cart modal is clicked
function remove(a){
   
    var b = a - 1;

    function removeProduct(element){
        if (element.id === addToCart[b].id){
            styleAddToCartText(b);
        }
       
        return (a !== element.index)
    
    }
    _cartproduct = _cartproduct.filter(removeProduct);
    productCount.innerHTML = _cartproduct.length; 
    if(_cartproduct.length === 0){
        alert('you have remove all the product in your cart, press ok to continue shopping');
        continueShopping.click();
        
    }
    tableDisplay()
      
}
// used to display the list of clicked product in the cart modal 
tableDisplay =() =>{
    tableBody.innerHTML = _cartproduct.map(item => `
        <tr> 
            <td>  ${_cartproduct.indexOf(item) + 1}</td>
            <td>  ${item.name}</td>
            <td> ₦ ${item.price}</td>
            <td><button onclick="add(${item.index})">+</button>${item.quantity}<button onclick="subtract(${item.index})">-</button></td>
            <td><button id="rowButton"onclick="remove(${item.index})" >Remove</button><td>
        </tr>`
        
    ).join('');
    productPriceUpdate();
}

// to display the price of the the product purchased
productPriceUpdate = () =>{
    total = 0;
    var amount = _cartproduct.map(item=> total +=item.price * item.quantity).join('') 
    totalPrice.innerHTML = '₦' + ' '+ total;
}

// increase the quantity of the product if the add button is clicked
add = (a) =>{
    for (const addition of _cartproduct){
        if(a === addition.index){
            addition.quantity += 1;
            tableDisplay()
        }
    }
}
//decrease the quantity of the product when the subtract button is clicked
subtract = (a) =>{
    for (const addition of _cartproduct){
        if(a === addition.index){
            if(addition.quantity >1){
                addition.quantity -= 1;
                tableDisplay()
            }else{
                remove(a);
            }  
        }
    }
}
// use to style the Add To Cart button and remove the price div that display the price
function styleAddToCartText (i){
    addToCart[i].style.padding ="15px 100px";
    pricingHover[i].style.bottom = "0";
    pricingHover[i].style.height = "0%";
    addToCart[i].textContent ="ADD TO CART";
}
// use to style the remove from cart and to display the price by displaying the price hover div
function styleRemoveFromCartText (i){
    addToCart[i].style.padding =" 15px 25%";
    pricingHover[i].style.bottom = "0";
    pricingHover[i].style.height ="100%";
    addToCart[i].textContent = "REMOVE FROM CART";

}
// add a product when the add to cart button is clicked and remove it when remove from cart is clicked
function addToCarts (i){
    if(addToCart[i].textContent == "ADD TO CART"){
        addProductToCart(i);
        styleRemoveFromCartText(i);
    }
    else{
        styleAddToCartText(i);
        removeProductFromCart(i);
    }
}
// validate the form //
let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
var userPhoneNo = document.getElementById('userPhoneNo');
var userText = document.getElementById('nameText');
var emailText = document.getElementById('emailText');
var userPhone = document.getElementById('userPhone')
//name validation
function nameValdation(){
    if(document.cartForm.userNames.value == ''){
        userText.innerHTML = 'please enter your name';
        return false;
    }
    else{
        userText.innerHTML = '';
        return true;
    }
}
//email validation
function emailValdation(){
    let email = document.cartForm.userEmails.value;
     var atPosition = email.indexOf("@");
     var dotPosition = email.lastIndexOf(".")
    if(document.cartForm.userEmails.value == ''){
        emailText.innerHTML = 'please enter your email';
        return false;

    }else if(atPosition < 1 || (dotPosition - atPosition < 3) ){ 
        emailText.innerHTML = 'please enter a correct email'
        return false;
    }
    else{
        emailText.innerHTML = '';
        return true;
    }
}
//phone validation
function phoneValdation(){
    if(document.cartForm.userPhoneNos.value == ''){
        userPhone.innerHTML = 'please enter your phone number';
        return false;
    }
    else if(document.cartForm.userPhoneNos.value.length != 11){
         userPhone.innerHTML = 'phone number should be 11 digits';
         return false
    }
    else{
        userPhone.innerHTML = '';
        return true;
    }
}
// generate refrence id for payment - paystack will see a duplicate transaction if the same reference is used
var serial =Math.floor(Math.random()*10000)  + "paymentReferenceNumber" + Math.floor(Math.random()*50);

//add evenlistener to the forms input
userName.addEventListener('mouseout', nameValdation);
userEmail.addEventListener('mouseout', emailValdation);
userPhoneNo.addEventListener('mouseout', phoneValdation);
// function to check if the form is correctly filled
function checkIfFormIsCorrectlyFilled() {
    return (nameValdation() && emailValdation() && phoneValdation())
}

//display the  payment summary modal
var paymentModalSummary = document.getElementById('paymentSummary');
paymentSucess =() =>{
    paymentModalSummary.style.display ="block";
    var customerName = document.getElementById('customerName').innerHTML = document.cartForm.userNames.value;
    var tbodyPayment = document.getElementById('paymentTbody');
    tbodyPayment.innerHTML = _cartproduct.map(summary =>`
        <tr>
           <td> ${_cartproduct.indexOf(summary)+1}</td>
           <td>${summary.name}</td>
           <td>${summary.quantity}</td>
        </tr>`
    ).join('');
}
//refresh the page to default if the outside of the payment modal is clicked
window.onclick = function(event) {
    if (event.target == paymentModalSummary) {
      window.location.reload();
    }
}
//refresh the page to default if the ok button on the payment summary mordal is clicked
var okButton = document.getElementById('refresh');
okButton.onclick = () =>{
    window.location.reload();
}
//paystack payment integration
function payWithPaystack() {
    var handler = PaystackPop.setup({
      key: 'pk_test_99eae0b89557c55e3e933077be2df0ce9150911e', // Replace with your public key
      email: document.cartForm.userEmails.value,
      amount: total * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
      currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
      ref: serial, // Replace with a reference you generated
      callback: function(response) {
          paymentSucess();
      },
 
    });
    handler.openIframe();
}

// call if form is correctly filled before allowing payment else prompt user to filled the form correctly.
let checkOut = document.getElementById('checkOut');
checkOut.onclick = () => (checkIfFormIsCorrectlyFilled()) ? payWithPaystack(): alert('please fill your details correctly in the form to enable us process your order ')
    

 
