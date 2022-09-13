const shoppingCard = document.getElementById("shoppingCard");
const templateList = document.getElementById("template-list");
const footer = document.querySelector("footer");
const templateFooter = document.getElementById("template-footer") 

const fragment = document.createDocumentFragment();


//delegation
document.addEventListener("click", (e) => {
    // matches captured the buttons = true or false
    if(e.target.matches(".card .btn-primary")){
        addShoppingCard(e);    
    }
    if(e.target.matches(".list-group-item btn-danger")){
        btnIncr(e);
    }
    if(e.target.matches(".list-group-item btn-success")){
        btnDecr(e);
    }
});

let shoppingCardObject = [];

const addShoppingCard = (e) => {
    //console.log(e.target.dataset.vegetable);
    
    const product = {
        id: e.target.dataset.vegetable, 
        item: e.target.dataset.vegetable,
        qty: 1,
        price: parseInt(e.target.dataset.price) 
    }
    
    const index = shoppingCardObject.findIndex(item => item.id === product.id)
    
    //checks if the product(object) is already in the container, 
    //otherwise it will be put into the shopping cart
    if(index === -1){
        shoppingCardObject.push(product);
    }else{
        shoppingCardObject[index].qty++;        
    }
    
    console.log(shoppingCardObject);
    showShoppingCard();
    
};

const showShoppingCard = () => {
    shoppingCard.textContent = "";
    
    //Object.values(shoppingCardObject).forEach((item) => {
        shoppingCardObject.forEach((item) => {    
        const clone = templateList.content.cloneNode(true);//first..., aufruf untergeordnete Knoten

        clone.querySelector("text-white, .lead").textContent = item.title;// ruft script und css
        clone.querySelector(".badge").textContent = item.qty;
        clone.querySelector("div .lead span").textContent = item.price * item.qty;

        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;

        fragment.appendChild(clone);//append..., fügt eien Konoten am Ende der Liste der Kinder..
    });

    shoppingCard.appendChild(fragment);// push to shopingCard
    showFooter() //push only one mal

};


const showFooter = () =>{
    
    footer.textContent = "";

    const total = shoppingCardObject.reduce((acc,current) =>
        acc + current.qty * current.price, 0 );
    
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("span").textContent = total;

    footer.appendChild(clone);

}

const btnIncr = (e) => {
 
 shoppingCardObject = shoppingCardObject.map(item => {
    if(item.id === e.target.dataset.id ){
        item.qty++;
    }
    return item;
 })
 showShoppingCard();
};

const btnDecr = (e) => {
    console.log("first")
    shoppingCardObject = shoppingCardObject.filter(item  =>  {
        if(item.id === e.target.dataset.id){
            if(item.qty > 0){
            item.qty--;
            }
            if(item.qty === 0)return
                return item;
            
        }else{
            return item;
        }
        
    })
    showShoppingCard();
};