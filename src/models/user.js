'use strict';
/**
*pratice node-project
*
*@author Qilin Gou<gouqilin@outlook.com>
*/
import mongoose from 'mongoose';
module.exports=function(done){
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const User = new Schema({
    name:{type:String,unique:true},
    pwd:{type:String},
    nickname:{type:String}
  });
  $.mongodb.model('User',User);
  $.model.User=$.mongodb.model('User');
  done();
}
