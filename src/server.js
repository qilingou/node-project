'use strict';
/**
*pratice node-project
*
*@author Qilin Gou<gouqilin@outlook.com>
*/
import createDebug from 'debug';
import path from 'path';
import ProjectCore from 'project-core';

const $=global.$=new ProjectCore();

$.createDebug=function(name){
  return createDebug('node:'+name);
}
const debug=$.createDebug('server');
//加载配置文件
$.init.add((done)=>{
  $.config.load(path.resolve(__dirname,'config.js'));
  const env=process.env.NODE_ENV || null;
  if (env) {
    $.config.load(path.resolve(__dirname,"../config",env+'.js'));
  }
  $.env=env;
  done();
});
//初始化MongoDB
$.init.load(path.resolve(__dirname,"init","mongodb.js"));
//加载models
$.init.load(path.resolve(__dirname,"models"));

//初始化Express
$.init.load(path.resolve(__dirname,"init","express.js"));
//初始化路由
$.init.load(path.resolve(__dirname,"routes"))
//初始化
$.init((err)=>{
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  else {
      console.log("inited [env=%s]",$.env);
  }
  const item=new $.model.User({
    name:'test',
    pwd:'123456',
    nickname:'测试用户'
  });
  item.save(console.log);
});
