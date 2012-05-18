$(document).ready(function(){
    MyRemarkController();
});

var MyRemarkController = function(){
    var  myStorage=new MyStorage();
    this.displayRemarks();
    $('.my-button-submit').on('click',function(){ 
        addRemark(createRemark());
        displayRemarks();
        return false;
    });
    $('.my-button-edit').live('click',function(){
        $(this).parent().find('.my-button-save').css('display','inline-block');
        var myText=$(this).parent().parent().find('.my-text');
        myText.html('<textarea>'+myText.html()+'</textarea>');
        return false;
    });
    $('.my-button-save').live('click',function(){
        var myText=$(this).parent().parent().find('textarea');
        myText.parent().html(myText.val());
        $(this).hide();
        return false;
    });
    $('.my-button-delete').live('click',function(){
        sessionStorage.remarks=$(sessionStorage.remarks).find($(this).parent().parent().attr('id')).remove();
        $(this).parent().parent().remove();
        return false;
    });
    $('.my-button-clear-all-remarks').live('click',function(){
        alert('sdsds');
        removeAllRemarks();
        displayRemarks();
        return false;
    });
    this.createRemark = function(){
        var date=new Date();
        //var strDate=date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear();
        var strDate='';
        var valElement=$('#remark-text').val();
        if(!valElement){
            return false;
        }
        var str='<li id="remark'+date.getMilliseconds()+'">'+
        '<div class="my-text">'+valElement+'</div>';
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
    this.displayRemarks = function(){
        $('ul').html(myStorage.getItems());
    }
}


var MyStorage = function(mainKey,storageOb){
    if('sessionStorage'!=storageOb || 'localStorage'!=storageOb){
        return false;
    }
    var storageOb=storageOb;
    storageOb[mainKey]='';
    this.addItem = function (key,value){
        var itemsOb=JSON.parse(storageOb[mainKey]);
        itemsOb[key]=value;
        storageOb[mainKey]=JSON.stringify(itemsOb);
    }
    this.removeAllItems = function(){
        storageOb.removeItem(mainKey);
    }      
    this.removeItem = function(key){
        var itemsOb=JSON.parse(storageOb[mainKey]);
        delete itemsOb[key];
        storageOb[mainKey]=JSON.stringify(itemsOb);
    }
    this.editItem = function(key,value){
        MyItemStorage.addItem(key,value);
    }
    this.getItems = function(){
        return storageOb[mainKey];
    }
    this.getItem = function(key){
        return JSON.stringify(JSON.parse(storageOb[mainKey])[key]);
    }
}