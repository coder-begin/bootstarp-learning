/**
 * Created by rulersex on 2017/1/15.
 */
/*
 每一个节点都有nodeType
 nodeType类型:
 value=1 元素
 value=2 属性
 value=3 文本
 value=8 注释
 value=9 document

 */
var getWindowInfo = (function () {
    var doc = document, win = window;

    function getScreenLeft() {
        return (typeof win.screenLeft === "number") ? win.screenLeft : win.screenX;
    }

    function getScreenTop() {
        return (typeof win.screenTop === "number") ? win.screenTop : win.screenY;
    }

    function getPageWidth() {
        var pageWidth = win.innerWidth;
        if (typeof pageWidth !== "number") {

            if (doc.compatMode === "CSS1Compat") {
                //混杂模式
                pageWidth = doc.documentElement.clientWidth;

            } else {
                //标准模式
                pageWidth = doc.body.clientWidth;
            }

        }
        return pageWidth;

    }

    function getPageHeight() {
        var pageHeight = win.innerHeight;
        if (typeof pageHeight !== "number") {
            if (doc.compatMode === "CSS1Compat") {
                //混杂模式
                pageHeight = doc.documentElement.clientHeight;

            } else {
                //标准模式
                pageHeight = doc.body.clientHeight;
            }

        }
        return pageHeight;

    }

    return {
        getLeftLoc: getScreenLeft,
        getTopLoc: getScreenTop,
        getPageWidth: getPageWidth,
        getPageHeight: getPageHeight
    }
})();

var getLocationInfo = (function () {
    //获取搜索的值:以对象的方式返回，键值对:name:value
    function getSearchInfo() {
        var searchInfo = (location.search.length > 0) ? location.search.substring(1) : "",
            arg = {},
            items = (searchInfo.length > 0) ? searchInfo.split("&") : [],
            item = null,
            name = null,
            value = null;
        for (var i = 0; i < items.length; i++) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                arg[name] = name;
                arg[value] = value;
            }
        }
    }


    return {
        getSearchInfo: getSearchInfo
    }
})();
/*
 设置本页跳转:location.href指定地址url
 设置锚点:location.hash
 ....
 这些方法都会形成历史纪录，都可以使用回退键返回
 replace方法不会形成历史纪录
 reload方法可以重新加载当前页面，不带参数是从缓存加载，带true是从服务器加载

 */
var getNavigatorInfo = (function () {
    function hasPlugin(name) {

        if (navigator.plugins) {
            var pluginName = name.toLowerCase();
            for (var i = navigator.plugins.length; i--;) {
                if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            try {
                new ActiveXObject(name);
                return true;
            } catch (ex) {
                return false;

            }
        }


    }

    return {
        hasPlugin: hasPlugin

    }
})();

//获取元素的所有属性，在格式化的时候会使用，因为ie7之前的版本问题
//在获取的时候进行一个判断，公用属性有specified，除了ie7之前，别的都会自己内置属性

function getAllAttritubes(elem) {
    var arr = {}, attritube = elem.attributes;
    for (var i = attritube.length; i--;) {
        //针对iE7以及之前的版本，attritubes会返回所有可能性，而我们只要特定的公用属性
        if (attritube[i].specified) {
            arr[attribute[i].nodeName()] = attritube[i].nodeValue;
        }
    }
    return arr;
}

/*
 文本节点就是夹杂在标签中的文本，一般相连的文本会自动合并，除非使用js手动将他们分割成两个节点
 splitText()//分割文本
 还有一些文本节点操纵的其他方法
 */

/*
 DocumentFragment文档片段，用来离开文档树添加元素，防止多次渲染
 var fragment=document.createDocumentFragment()
 然后将需要加入到文档树中的元素都加入到这个文档片段中，在将文档片段加入到文档树中
 */

//向文档中添加script可以有两种方式
//1.使用src引用外部文档，创建script元素，src指定外部文件，appendChild添加进去
//2.直接创建内部文档
//在创建内部script文档的时候，加入内容使用以下方法
//传入js代码
function addScript(text) {
    var lastTwoWords = text.substring(text.length - 2, text.length).toLowerCase();
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    if (lastTwoWords === "js") {
        scriptNode.src = text;
    } else {
        try {
            //对于非safari3之前的有效
            //ie只支持text属性添加
            scriptNode.text = text;
        }
        catch (ex) {
            scriptNode.appendChild(document.createTextNode(text));
        }
    }
    document.head.appendChild(scriptNode);
}


/*
 对于操作表格table有一些特殊方法
 */
//创建表格,第一个是行，第二个是列，第三个是要添加的数据，以数组的形式传入
//数组每个元素表示每一行的数据，以逗号间隔
function createTable(rows, lines, textArr) {
    var table = document.createElement("table"),
        tbody = document.createElement("tbody"),
        lineInfo;
    table.border = 1;
    table.width = "100%";
    for (var i = 0; i < rows; i++) {
        tbody.insertRow(i);
        lineInfo = textArr[i].split(",");
        for (var j = 0; j < lines; j++) {
            tbody.rows[i].insertCell(j);
            tbody.rows[i].cells[j].appendChild(document.createTextNode(lineInfo[j]));
        }
    }
    table.appendChild(tbody);
    return table;
}
/*
 对于表格的增删查该方法和表格的css样式设计方法:


 */

//使用css类型择符选取元素
function getElem(cssSelector) {
    //ie7以及之前的版本不支持此方法
    if (document.querySelector) {
        arguments.callee = function () {
            return document.querySelectorAll(cssSelector);
        };
        return document.querySelectorAll(cssSelector);
    } else {
        //解析选择符，遍历文档，获取元素

        arguments.callee = function () {

        }

    }

}

//使用类名来选择元素
//document.getElementsByClassName()
function getElemByClassName(classname) {
    if (document.getElementsByClassName === "function") {
        arguments.callee = function () {
            return document.getElementsByClassName(classname);
        };
        return arguments.callee();

    } else {
        //ie8以及之前的没有此方法
        //遍历文档，获取元素获取所有元素，检查classname相符者
        arguments.callee = function () {
            var allElem = document.getElementsByTagName("*");
            for (var i = allElem.length; i--;) {
                if (allElem[i].className.indexOf(classname) > -1) {
                    return allElem[i];
                }
            }
        }
        return arguments.callee();
    }
}

//操作元素的类名，增加，修改，删除类
function getChangeFn(elem) {
    var addClass, deleteClass, changeClass, searchClass, className = elem.className.split("/\s+/");
    if (!elem.classList) {
        //ie9及以下没有此方法
        addClass = function (classname) {
            className.push(classame);
            elem.className = className.join(" ");
        }
        deleteClass = function (classname) {
            for (var i = 0; i < className.length; i++) {
                if (className[i] === classname) {
                    className.splice(i, 1);
                }
            }
            elem.className = className.join(" ");
        }
        searchClass = function (classname) {
            for (var i = 0; i < className.length; i++) {
                if (className[i] === classname) {
                    return true;
                }
            }

        }
    } else {
        addClass = function (classname) {
            elem.classList.add(classname);
        }
        deleteClass = function (classname) {
            elem.classList.remove(classname);
        }
        searchClass = function (classname) {

            return elem.classList.contains(classname);

        }

    }
    changeClass = function (classname) {
        for (var i = 0; i < className.length; i++) {
            if (className[i] === classname) {
                className.splice(i, 1, classname);
            }
        }
        elem.className = className.join(" ");
    }
    return {
        addclass: addClass,
        deleteclass: deleteClass,
        changeclass: changeClass,
        searchclass: searchClass
    }
}

/*
 document的一些属性重写
 */
function docAttr() {
    return {
        head: document.head || document.getElementsByTagName("head")[0]
    }
}

/*
 添加自定义属性:
 elem.dataset.属性:这个方法自定义属性必须是要data-开头
 使用elem.attributes来遍历每个属性
 */

/*
 innerHTML方法在插入script元素的时候不会立即执行
 style标签也一样，为了立即执行，需要在这些标签前面添加有作用域的标签，如span，div等标签
 当然也有一些标签不支持这个属性。。
 这个方法会替换所有子节点
 */

/*
 获取元素包含的文本
 innerText
 chrome之前的版本无法使用
 textcontent
 ie9之前的版本无法使用
 */
function getTextContent(elem) {
    if (elem.innerText === "string") {
        return elem.innerText;
    } else {
        return elem.textContent;
    }
}
function setTextContent(elem, text) {
    if (elem.innerText === "string") {
        return elem.innerText = text;
    } else {
        return elem.textContent = text;
    }
}

//-----------------------------------------------------------
//DOM2和DOM3级
//在DOM2级中添加了css样式的访问style属性，需要检测是否支持DOM2级
var dom2css2 = document.implementation.hasFeature("CSS2", "2.0");
//DOM2级支持遍历操作，ie除外
//参数:开始遍历的节点，筛选对象，过滤器(一个对象，包含筛选方法acceptNode(node)，方法名只能用这个),false
function getFilterObj(selector) {
    return {
        acceptNode: function (node) {
            return (node.className.indexOf(selector) > -1) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    }
}
//创建迭代器
/*
 var iterator=document.createNodeIterator(document.body,NodeFilter.SHOW_ElEMENT,getFilterObj("age"),false);
 var node=iterator.nextNode();
 while (node!==null){

    执行一些功能

    node=iterator.nextNode();
 }
 */
//事件处理
var dealEvent = {
    addEvent: function (elem, type, fn) {
        if (typeof elem.addEventListener === "function") {
            elem.addEventListener(type, fn, false);
        } else {
            try {
                elem["on" + type] = fn;
            } catch (ex) {
                elem.attachEvent(("on" + type), fn);
            }
        }
    }
    ,
    removeEvent: function (elem, type, fn) {

        if (typeof elem.removeEventListener === "function") {
            elem.removeEventListener(type, fn, false);
        } else {
            try {
                elem["on" + type] = null;
            } catch (ex) {
                elem.detachEvent(("on" + type), fn);
            }
        }

    },
    getEvebt:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    //取消冒泡

    stopPg:function(event){
       if(event.stopPropagation){
           event.stopPropagation();
       } else {

           event.cancelable=true;
       }

    },
    //取消默认行为
    preventDe:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;

        }

    }


}

var getSelected=function(text){
    if(typeof  text.selectionStart==="number"){

        return text.value.substr(text.selectionStart,text.selectionEnd);
    }else{
        var range=text.createTextRange();
        range.collapse(true);
        range.moveStart("character",0);
        range.moveEnd("character",text.value.length);
        return range.select();
    }


};