const mongoose=require('mongoose');
const Product=require('./models/products');
const arr=[
    {name:"Iphone 12",price:100000,desc:"latest iphone and most premium"},
    {name:"Macbook Air",price:909000,desc:"One of the most powerful machine"},
    {name:"Mountain bike",price:10000,desc:"This mountain bike is premium"},
    {name:"ASUS ROG",price:80000,desc:"Best gaming laptop ever."},
    {name:"Coke",price:100,desc:"best drink for summers."} 
];

function seedDB(){
    
Product.insertMany(arr,function(error,docs){
console.log("connected");
})

}
module.exports=seedDB;


