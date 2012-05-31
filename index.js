$(document).ready(function(){
    MyRemarkController();
});

/*implement crud = create, read, update, delete*/
var MyItemModel = function(mainKey,storageOb){
    var initMainKey='{}';
    storageOb[mainKey]=storageOb[mainKey]||initMainKey;
    var setItem = function(key,value){
        var itemsOb=JSON.parse(storageOb[mainKey]);
        itemsOb[key]=value;
        storageOb[mainKey]=JSON.stringify(itemsOb);
    }
    return{
        createItem:function (value){
            var date=new Date();
            var key='remark'+date.getTime();
            setItem(key, value);
        },
        deleteAllItems:function(){
            // storageOb.removeItem(mainKey);
            storageOb[mainKey]=initMainKey;
        },      
        deleteItem:function(key){
            var itemsOb=JSON.parse(storageOb[mainKey]);
            delete itemsOb[key];
            storageOb[mainKey]=JSON.stringify(itemsOb);
        },
        updateItem:function(key,value){
            setItem(key,value)
        },
        getItems:function(){
            var items=JSON.parse(storageOb[mainKey]);
            var res={};
            var item;
            for(item in items){
                res[item]=this.getItem(item);
            }
            return res;
        },
        getItem:function(key){
            return JSON.parse(storageOb[mainKey])[key];
        }
    };
}
var MyRemarkModel=function(){}
if(sessionStorage){
    MyRemarkModel.prototype = new MyItemModel('remarks', sessionStorage);  
}
else{
    alert('your device not support this application');
    MyRemarkModel=false;
}

var MyRemarkController = function(){
    var  myRemarkModel=new MyRemarkModel();
    if(!myRemarkModel){
        return false;
    }
    var  myRemarkView=new MyRemarkView();
    myRemarkView.displayRemarks(myRemarkModel.getItems());
    var myDetails=$('.my-remark-list');
    $('.my-button-submit').on('click',function(){ 
        var value=$.trim($('#remark-text').val());
        if(!value){
            alert('please fill data');
            return false;
        }
        myRemarkModel.createItem(value);
        myRemarkView.displayRemarks(myRemarkModel.getItems());
        return false;
    });
    myDetails.on('click','.my-button-edit',function(){
        myRemarkView.editRemark($(this).parent());
        return false;
    });
    myDetails.on('click','.my-button-save',function(){
        var parent=$(this).parent().parent();
        var value=$.trim(parent.find('textarea').val());
        if(!value){
            alert('please fill data');
            return false;
        }
        parent.find('.my-button-edit').css('display','inline-block');
        myRemarkModel.updateItem(parent.attr('id'), value);
        myRemarkView.displayRemarks(myRemarkModel.getItems());
        //$(this).hide();
        return false;
    });
    myDetails.on('click','.my-button-delete',function(){
        myRemarkModel.deleteItem($(this).parent().parent().attr('id'));
        myRemarkView.displayRemarks(myRemarkModel.getItems());
        return false;
    });
    $('.my-button-clear-all-remarks').on('click',function(){
        myRemarkModel.deleteAllItems();
        myRemarkView.displayRemarks();
        return false;
    });
}
var MyRemarkView = function(){   
    var createRemark = function(id,remarkText){
        //var strDate=date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear();
        var strDate='';
        if(!remarkText){
            return false;
        }
        var str='<li id="'+id+'">';
        
        /**   if(window.navigator){
                        navigator.geolocation.getCurrentPosition(function(position) {   
                            str+=' latitude:'+startPos.coords.latitude+' longitude:'+startPos.coords.longitude;
                        });
                    }
                    */
        str+='<div class="my-details"><div class="my-button my-button-style1 my-button-edit">edit</div>'+
        '<div class="my-button my-button-style1 my-button-save">save</div>'+
        '<div class="my-button my-button-style2 my-button-delete">delete</div>'+
        '<div class="my-remark-date">'+strDate+'</div>'+
        '</div><div class="my-text">'+remarkText+'</div></li>';
        return str;
    } 
    return {
        displayRemarks: function(items){
            var res='';
            var item;
            for(item in items){    
                res+=createRemark(item,items[item])
            }
            $('.my-remark-list').html(res);
        },
        editRemark: function(remark){
            remark.find('.my-button-save').css('display','inline-block');
            remark.find('.my-button-edit').css('display','none');
            var myText=remark.parent().find('.my-text');
            myText.html('<textarea>'+myText.html()+'</textarea>');
        }
    };
}