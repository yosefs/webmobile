$(document).ready(function(){
    MyRemarkController();
});

var MyRemarkController = function(){
    var  myRemarkModel=MyRemarkModel();
    var  myRemarkView=new MyRemarkView();
    myRemarkView.displayRemarks(myRemarkModel.getItems());
    var myDetails=$('ul');
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
    this.displayRemarks = function(items){
        var res='';
        var item;
        for(item in items){    
            res+=createRemark(item,items[item])
        }
        $('ul').html(res);
    }
    this.editRemark = function(remark){
        remark.find('.my-button-save').css('display','inline-block');
        var myText=remark.parent().find('.my-text');
        myText.html('<textarea>'+myText.html()+'</textarea>');
    }
    var createRemark = function(id,remarkText){
        //var strDate=date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear();
        var strDate='';
        if(!remarkText){
            return false;
        }
        var str='<li id="'+id+'">'+
        '<div class="my-text">'+remarkText+'</div>';
        /**   if(window.navigator){
                        navigator.geolocation.getCurrentPosition(function(position) {   
                            str+=' latitude:'+startPos.coords.latitude+' longitude:'+startPos.coords.longitude;
                        });
                    }
                    */
        str+='<div class="my-details"><div class="my-button my-button-edit">edit</div>'+
        '<div class="my-button my-button-delete">delete</div>'+
        '<div class="my-button my-button-save">save</div>'+
        '<div class="my-remark-date">'+strDate+'</div>'+
        '</div></li>';
        return str;
    }   
}
var MyRemarkModel=function(){
     return new MyItemModel('remarks', sessionStorage);    
}


/*implement crud = create, read, update, delete*/
var MyItemModel = function(mainKey,storageOb){
    var initMainKey='{}';
    storageOb[mainKey]=storageOb[mainKey]||initMainKey;
    this.createItem = function (value){
        var date=new Date();
        var key='remark'+date.getTime();
        setItem(key, value);
    }
    this.deleteAllItems = function(){
     // storageOb.removeItem(mainKey);
      storageOb[mainKey]=initMainKey;
    }      
    this.deleteItem = function(key){
        var itemsOb=JSON.parse(storageOb[mainKey]);
        delete itemsOb[key];
        storageOb[mainKey]=JSON.stringify(itemsOb);
    }
    this.updateItem = function(key,value){
       setItem(key,value)
    }
    this.getItems = function(){
        var items=JSON.parse(storageOb[mainKey]);
        var res={};
        var item;
        for(item in items){
            res[item]=this.getItem(item);
        }
        return res;
    }
    this.getItem = function(key){
        return JSON.parse(storageOb[mainKey])[key];
    }
    var setItem = function(key,value){
        var itemsOb=JSON.parse(storageOb[mainKey]);
        itemsOb[key]=value;
        storageOb[mainKey]=JSON.stringify(itemsOb);
    }
    return this;
}