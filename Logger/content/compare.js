$(document).ready(function(){
var showFlag=true;
    $('#compare').click(function(){
        var isChecked=$('#isUnique').is(":checked")
        var leftText=$('#console-div-left').val().trim();
        var rightText=$('#console-div-right').val().trim();
        
        var lArray=leftText.split("\n");
        var rArray=rightText.split("\n");
        var result1=compare(lArray,rArray);
        var result2=compare(rArray,lArray);
        var matched=compare(result1.match,result2.match);
        var unmatched=compare(rArray,matched.match).unMatch;
        unmatched=unmatched.concat(compare(lArray,matched.match).unMatch);
        if(isChecked){
            BuildUI(UniqueArray(matched.match),UniqueArray(unmatched));
        }
        else{
            BuildUI(matched.match,unmatched);
        }
    });
    $('#make-unique-list').click(function(){
        var leftText=$('#console-div-left').val().trim();
        var _array=leftText.split("\n");
        var unique=UniqueArray(_array);
        var _html='';
        $.each(unique,function(i,d){
            _html+='<span class="number">'+(i+1)+'</span> <span class="bg-success"><i class="glyphicon glyphicon-ok-circle"></i> '+d+'</span><br/>';
        });
        $('#result-match').empty().append(_html);
        $('#result-area').fadeIn(1000);
    });
	$('#make-duplicate-list').click(function(){
        var leftText=$('#console-div-left').val().trim();
        var _array=leftText.split("\n");
        var duplicate=findDuplicates(_array);
        var _html='';
        $.each(duplicate,function(i,d){
            _html+='<span class="number">'+(i+1)+'</span> <pre class="bg-danger"><i class="glyphicon glyphicon-ok-circle"></i> '+d+'</pre>';
        });
        $('#result-match').empty().append(_html);
        $('#result-area').fadeIn(1000);
    });
    function compare(arr1,arr2){
        var matched=[];
        var unMatched=[];
        $.each(arr1,function(i,d){
            var flag=0;
            for(var j=0;j<arr2.length;j++){
                if(d.trim()==arr2[j].trim()){
                   flag++;
                   break;
                }
            }
            if(flag!=0){
                matched.push(d.trim());
            }
            else{
                unMatched.push(d.trim());
            }
        });
        return {match:matched,unMatch:unMatched};
    }
    function BuildUI(match,unmatch){
        var _html='';
        $.each(match,function(i,d){
            _html+='<span class="number">'+(i+1)+'</span> <span class="bg-success"><i class="glyphicon glyphicon-ok-circle"></i> '+d+'</span><br/>';
        });
        $('#result-match').empty().append(_html);
        _html='';
        $.each(unmatch,function(i,d){
            _html+='<span class="number">'+(i+1)+'</span> <span class="bg-danger"><i class="glyphicon glyphicon-remove-circle"></i> '+d+'</span><br/>';
        });

        $('#result-unmatch').empty().append(_html);
        $('#result-area').fadeIn(1000);
    }
    function UniqueArray(arr){
        var unique = arr.filter( onlyUnique );
        return unique;
    }
	function findDuplicates(arr){
	let sorted_arr = arr.slice().sort(); 
  
	let results = [];
	for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(sorted_arr[i]);
		}
	}
	return results;
	}
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }
    $('#hide-show-number').click(function(){
        if(showFlag)
        $('.number').hide();
        else
        $('.number').show();

        showFlag=!showFlag;
    });

});