const mongoose = require('mongoose');

const { Schema } = mongoose;

const formSchema = new Schema({
    name: {
        type: String,
        required: true,
     
    },
    date: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
   email:{
    type: String,
    required: true,
   
   },
//    userId: { 
//     type: Schema.Types.ObjectId,
//     required: true,
// }
   
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
