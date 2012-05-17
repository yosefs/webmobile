$(document).ready(function(){
    displayRemarks();
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
});
function createRemark(){
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
function addRemark(remarkStr){
    if(!sessionStorage.remarks){
        sessionStorage.remarks='';
    }
    sessionStorage.remarks+=remarkStr;
    return sessionStorage.remarks;
}
function removeAllRemarks(){
    sessionStorage.removeItem("remarks");
}
            
function removeRemark(){
                
}
function displayRemarks(){
    $('ul').html(sessionStorage.remarks);
}