$(document).ready(function(){
var path=settings.path;
var lastIndex=0;
var logCount=0;
var newUnreadLogCount=0;
FileLoad();
setInterval(function(){ FileLoad(); }, 2000);
$('#refresh').click(function(){
        FileLoad();
    });

    $('#info').click(function(){
        $('#modal-body').html(" log path is : "+path);
    });
    $('#markAllRead').click(function(){
        $('.warning-block').removeClass("bg-unread");
        $('title').text("Log Console");
        newUnreadLogCount=0;
    });
    function FileLoad(){
        var lineArray=[];
        var xhttp = new XMLHttpRequest();
        method = "GET",
        url = path+'?cache=false';
        xhttp.open(method, url, true);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var response=this.responseText;
            //console.log(this.responseText);
            lineArray=response.split("\n");
            if(lastIndex!=lineArray.length){
               var tempCount= UpdateUi(lineArray.slice(lastIndex,lineArray.length));
                lastIndex=lineArray.length -1;
                logCount=logCount+tempCount;
                $('#logCount').text(logCount);
                lineArray=[];
                response='';
                if(tempCount!=0){
                    newUnreadLogCount=newUnreadLogCount+tempCount;
                    $('title').text('('+newUnreadLogCount+') Log Console');
                }
                
            }

           }
        };
        xhttp.send();
    }
    function UpdateUi(newLines){
        var count=0;
        $.each(newLines,function(index,item){
            item=item.replace(' ','&nbsp;').replace('http://','<u>http://</u>');
            
            if(item!=''){
                itemSplitArray=item.replace(' ','&nbsp;').split("|");
                if(itemSplitArray.length>2){
                    itemSplitArray[0]='<span class="text-info"><i class="glyphicon glyphicon-warning-sign text-warning"></i> '+itemSplitArray[0]+'</span>';
                    itemSplitArray[1]='<span class="text-danger">'+itemSplitArray[1]+'</span>';
                    itemSplitArray[2]='<span class="text-info">'+itemSplitArray[2]+'</span>';
                    item=itemSplitArray.join('|');
                    count++;
                }
                $('#console-div').append('<div class="col-sm-12 bg-unread warning-block">'+item+'</div><br/>');
            }
        });
        return count;
    }

});