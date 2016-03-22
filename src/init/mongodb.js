'use strict';
/**
*pratice node-project
*
*@author Qilin Gou<gouqilin@outlook.com>
*/
import mongoose from 'mongoose';
module.exports=function(done){
  const conn=mongoose.createConnection($.config.get('db.mongodb'));
}
