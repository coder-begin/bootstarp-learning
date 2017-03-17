/**
 * Created by rulersex on 2017/1/16.
 */
//检测对象是否存在某个方法
function  isHostFun(object,property){
    var funType=typeof  object[property];
    //检测是一个功能或者unknown或者是对象
    return funType=== "function"||funType==="unknown"||(!!(funType==="object"&&funType[property]));
}
//bug检测：检测和内置原型属性同名的方法能否被for in遍历
function  canErgodic(){
    //toString在内置对象中是不能被枚举的
    //这个函数检测和toString同名的自定义函数能否被枚举
    var o={toString:function(){}};
    for(var i in o){
        if(i==="toString"){
            return true
        }
    }

}
//将获取的NodeList类型文档节点转化为数组类型
function  listToArr(nodelist){
    var array;
    try{
        array=Array.prototype.slice(nodelist,0);
    }
    catch(ex){
        array=[];
        for(var i=0;i<nodelist.length;i++){
            array.push(nodelist[i]);
        }
    }
    return array;
}
//添加节点,没有第二个参数是父节点下的某个子节点
function  addNode(newNode,oldNode){
    if(!oldNode){

    }else{

    }

}
/*
document.documentElement是对html的最快引用
document.body是对body最快的引用
*/
//documnet.getElementById()兼容写法
//在IE8以及之前的版本不区分id大小写，IE7之前name和id相同的话返回也会出错
function  getElem(id){
    var elem=document.getElementById(id);
    var bodyChilds=document.body.children;
    if(elem.id!==id){
     //遍历整个文档树查找
        // 法1:递归方法:深度和广度遍历
        //法2:
        var allElems=document.getElementsByTagName("*");
        for(var i=allElems.length;i--;){
            if(allElems[i].id===id){
                elem=allElems[i];
            }else{
                elem=null;
            }
        }
    }
    return elem;
}


