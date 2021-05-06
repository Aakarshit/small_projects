const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const port =80;
const seedDB=require('./seedDB');
const methodOverride=require('method-override');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to mongo");
})
.catch(e=>{
    console.log("DB not connected");
    console.log(e);
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
mongoose.set('useNewUrlParser',true);

//seedDB();

const Product=require('./models/products');

app.get('/',(req,res)=>{
    console.log("Connected");
    res.send("Connected");
});

// Get all the products

app.get('/products',async (req,res)=>{
    const products=await Product.find({});
    //console.log(products);
    res.render('products/index',{products:products});
});

// Getting a form for adding new products
app.get('/products/new',(req,res)=>{
res.render('Products/new');
});


// creating a new product inside the db
app.post('/products',async (req,res)=>{
    const product=await Product.create(req.body);
    //console.log(product);
    res.redirect("/products");
});

// Show particular product
app.get('/products/:id',async (req,res)=>{
   const product=await Product.findById(req.params.id);
   res.render('products/show',{product:product});
});

// get form for edit product
app.get('/products/:id/edit',async (req,res)=>{
    const foundProduct=await Product.findById(req.params.id);
    res.render('products/edit',{product:foundProduct})
});

app.patch('/products/:id',async (req,res)=>{
 //const foundProduct=await Product.findById(req.params.id);
 const updatedProduct =await Product.findOneAndUpdate({_id: req.params.id} , req.body);// will find the product and update it
 //console.log(updatedProduct);
  res.redirect('/products');
});

// Delete element
app.delete('/products/:id',async (req,res)=>{
 const deletedProduct=await Product.findByIdAndDelete(req.params.id);
 res.redirect('/products');

});


app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});