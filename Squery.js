(function (window) {
    var doc = window.document;
    function o() {
    }
    o.Elem=null;
    o.prototype = {
        constructor: o,
        event:{
            click: function (fn) {
                var elem= o.Elem;
                if (elem.length > 0) {
                    for (var i = elem.length; i--;) {
                        elem[i].onclick = fn;
                    }

                } else {
                    elem.onclick = fn;
                }

            }

        },
        css:{


        },
        addChild:function(element){
           if(element instanceof o){
               o.Elem.appendChild(element.Elem);
           }else{
               alert("sss");
           }
        },
        clone:function(bool){
            o.Elem=o.Elem.cloneNode(bool);
        },
        init: function (selector) {
            selector.trim();
            if (selector.substr(0, 1) === "#" && selector.search(" ") === -1) {
                o.Elem = doc.getElementById(selector.substr(1));
            } else {
                o.Elem = doc.querySelectorAll(selector);
            }

        }
    };


    var Squery = function (selector) {
        var myObj = new o();
        if (selector) {
            myObj.init(selector);
            return myObj;
        } else {

        }
    };

    window.$ = window.Squery = Squery;
})(window);