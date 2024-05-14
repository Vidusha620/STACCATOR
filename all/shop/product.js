// Assign Product items
const product = [
    {
        id: 0,
        image: 'images1/piano.JPG',
        title: 'Piano',
        price: 6000,
    },
    {
        id: 1,
        image: 'images1/xyl.jpg',
        title: 'Xlophone',
        price: 200,
    },
    {
        id: 2,
        image: 'images1/baj.jpeg',
        title: 'Banjo',
        price: 800,
    },
    {
        id: 3,
        image: 'images1/oct.webp',
        title: 'Octapad',
        price: 180,
    },
    {
        id: 4,
        image: 'images1/picc(5).jpg',
        title: 'Piccolo',
        price: 200,
    },
    {
        id: 5,
        image: 'images1/sax(4).png',
        title: 'Saxophone',
        price: 1100,
    },
    {
        id: 6,
        image: 'images1/edrum(2).webp',
        title: 'Electronic Drum',
        price: 450,
    },
    {
        id: 7,
        image: 'images1/eguitar(3).png',
        title: 'Electronic Guitar',
        price: 400,
    },
    {
        id: 8,
        image: 'images1/EP.jpg',
        title: 'Electric Piano',
        price: 137,
    },
    {
        id: 9,
        image: 'images1/EV.jpg',
        title: 'Electric Violin',
        price: 3000,
    },
    {
        id: 10,
        image: 'images1/B.jpg',
        title: 'Trumpet',
        price: 500,
    },
    {
        id: 11,
        image: 'images1/zz.png',
        title: 'Base Guitar',
        price: 1500,
    },
  

    
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}
//design of the cart
function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
    }

    
}

// The aletrs which are displaying at the webpage. 
function showAlert() {
    let total=0;
    document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
        })
// Accessing the data which are assinged in the form.
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
// Payment successful alert messege.
    const message = `Total = ${total} \n\n Payment successful!\n\nThank you for your purchase, ${firstName} ${lastName}!\n\nWe will send your order to the following address:\n${address}, ${city}, ${zip}\n\nA confirmation email has been sent to ${email}.`;
    if(total != 0){
        if(firstName,lastName,email,address,city,zip ==''){
            alert('Please fill all the blancks')
        }
        else{
            alert(message);
        }
            
        
    }else{
        alert("Your cart is empty");
    }
    
}
var stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');




