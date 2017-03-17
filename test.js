/**
 * Created by rulersex on 2017/1/14.
 */
(function(window,undefined){
    var jquery=function(){
        var jquery=function(selector){
            return new jquery.fn.init();
        }
        jquery.fn=jquery.prototype={

        }
        jquery.fn.init=function(){

        }
        jquery.fn.init.prototype=jquery.fn;


        return jquery;
    }

    window.$=window.jquery=jquery;
})(window);