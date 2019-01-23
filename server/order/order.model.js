module.exports = function (Mongoose) {

    const orderSchema = new Mongoose.Schema({
        firstName:{ 
            type:String,
            required:true
        },

        lastName:{ 
            type:String,
            required:true
        },

        company:{
            type:String,
            required:false
        },

        deliveryAdress:{
            type:String,
            required:true
        },

        billingAdress:{
            type:String,
            required:true
        },
       
        country:{
            type:String,
            required:true
        },

        city:{
            type:String,
            required:true
        },

        state:{
            type:String,
            required:true
        },

        zipCode:{
            type:String,
            required:false
        },

        phoneNumber:{
            type:String,
            required:true
        },

        cart: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        },

    });

    const orders = Mongoose.model("Order", orderSchema);

}

