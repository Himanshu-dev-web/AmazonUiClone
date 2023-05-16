//sk_test_51M2V1hSH1PluxlBJBEb5JKbbZq83Hu1IX59UQty6IPc78ARfCJ86NDJNWvk5QLzHBq1iLO5fVoztbLPLXD3925XT0076KGJ16x


const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51N81c6SHgIjCcOurieS9uhBdRNmC9RUBAl2ENnMI4zbbdpxhx0hKC10DLOAHnpl4Zr6CSWosvTVWWE89vsUzqyCZ00yqvWSKJ3');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());


app.post("/checkout", async (req, res) => {
   
    const { items , email } = req.body;
    
   
  
    const transformedItems = items.map(item => ({
        
        quantity :1,
        price_data : {
            currency: 'gbp',
            unit_amount : item.price * 100,
            product_data:{
                name:item.title,
                description : item.description,
                images:[item.thumbnail]
            },
        }
    }));
    const session  = await stripe.checkout.sessions.create({
         payment_method_types : ["card"],
         //shipping_rates : ['shr_1M2YyaSH1PluxlBJqrjWRmh2'],
        shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'gbp',
                },
                display_name: 'Next day ',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 3,
                  },
                },
              },
            },
          ],
        shipping_address_collection :{
            allowed_countries : ['GB','US','CA']
        },
        line_items : transformedItems,
        mode:'payment',
        success_url:`http://127.0.0.1:5173/success`,
        cancel_url:`http://127.0.0.1:5173/checkout`,
        metadata:{
            email ,
            images: JSON.stringify(items.map(item => item.image))
        }
    });

    
    res.status(200).json({id:session.id})
});

app.listen(4000, () => console.log("Listening on port 4000!"));