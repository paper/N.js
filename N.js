/**==========================================================
  N.js

  Author   paper
  Date     2014-08
  Site     https://github.com/paper
  
  Intro    先进先出原则
           可以实现对数据进行动画效果处理 或 延迟处理
==========================================================*/
;(function(global, undefined){

  var anotherN = global.N;
  
  function N(){
    // 写了new
    if( this instanceof N ){
      this.arr = [];
    }
    // 忘记写new
    else{
      return new N();
    }
  };
  
  /*------------------- for nodejs ---------------
  
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = N;
    }
    exports.N = N;
  } else {
    global.N = N;
  }
  
  ---------------------------------------------*/
  
  global.N = N;
  
  function _copy(elem){
    if( elem === undefined ) return;
    
    return JSON.parse(JSON.stringify( elem ));
  }
  
  N.prototype.get = function(elem){
    // 不能直接赋值, elem or elem() 有可能是对象
    var v = typeof elem == "function" ? _copy( elem() ) : _copy( elem );
    
    if( v !== undefined ){
      this.arr.push( v );
    }
  }
  
  N.prototype.len = function(){
    return this.arr.length;
  }
  
  N.prototype.next = function(){
    return this.arr.shift();
  }
  
  /**----------------------------------------------
    @walkSpeed  第N步走完之后，到第N+1步所需要的时间
    
    @callback   每一步处理细节的回调函数
      @v        get 收集起来的值
      @walkKey  里面的key值，如果设置为true，表示可以走下一步
      @walkOver 判断是否结束，如果结束为true
  ----------------------------------------------*/
  N.prototype.walk = function(walkSpeed, callback){
    var self = this;
    
    var walkOver = false;
    var walkKey = {};
    
    //判断是否走一步的帧数
    var fps = 30;
    var fpsTime = parseInt( 1000/fps, 10);
    var fpsInterval = null;
    
    if( arguments.length == 1 ){
      callback = walkSpeed;
      walkSpeed = 1;
    }
    
    function walkIn(){
      walkKey = { key : false };
      
      setTimeout(function(){
        // 如果报错，得停下来
        try{
          if( self.len() === 0 ){
            clearInterval( fpsInterval );
            walkOver = true;
          }
          
          callback( self.next(), walkKey, walkOver);
        }catch(e){
          clearInterval( fpsInterval );
        }
      }, walkSpeed);
      
    }//end walkIn

    fpsInterval = setInterval(function(){
      if( walkKey.key === true){
        walkIn();
      }
    }, fpsTime);
    
    walkIn();
  }
  
  // 可以改名，避免命名冲突
  N.noConflict = function(){
    global.N = anotherN;
    return this;
  }
  
})(this);