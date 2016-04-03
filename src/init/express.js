'use strict';
/**
*pratice node-project
*
*@author Qilin Gou<gouqilin@outlook.com>
*/
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
import session from 'express-session';
import _RedisStore from 'connect-redis';
const RedisStore = _RedisStore(session);
module.exports=function(done){
  const app= express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(multiparty());
  app.use(session({
    secret:$.config.get('web.session.secret'),
    store: new RedisStore($.config.get('web.session.redis')),
  }));

  const router=express.Router();
  const routerWrap={};
  ['get','post','put','delete'].forEach(method=>{
    routerWrap[method]=function(path,...fnList){
      fnList=fnList.map(fn=>{
        return function(req,res,next){
          const ret=fn(req,res,next);
          if ( ret &&ret.catch) ret.catch(next);
        }
      });
      router[method](path, ...fnList);
    }
  });
  $.router=routerWrap;
  app.use(router);
  app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));
  app.use('/api',function(err,req,res,next){
    debug('api error:%s',err&&err.stack||err);
    res.json({error:err.toString()});
  });
  app.listen($.config.get('web.port'),err=>{
    done(err);
  });
}
