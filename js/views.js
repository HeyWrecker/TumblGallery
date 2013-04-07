function constructViewPage() {
    viewPageHTML();
}
         
function viewPageHTML() {
    var dataSet = JSON.parse(sessionStorage.blogDataSet)
    , content
    ,ul;
            
    $('#blogContent').hide();
            
    $(dataSet[0].blogImages).each(function (index, element) {
        if (index % 18 === 0)  {
            $('#blogContent').append(ul);
            ul = $('<ul>', {'id': 'portfolioList_' + index, 'class' : 'clearfix imageContainer'});
        }
                
        content = '<a href="#" class="thumbnails"><img id="portfolioItem_' + element.photo.uID + '" src="' + element.photo.thumbURL + '" width="' + element.photo.thumbWidth + '" height="' + element.photo.thumbHeight + '" data-index="' + element.photo.index  +'" class="img-circle" style="border: 1px solid #ffffff;" /></a>';
                
        var li = $('<li>', {'class' : 'span3'}).append(content);
        ul.append(li);
    });
            
    $('#blogContent').append(ul);
            
    $('#blogContent ul:nth-child(1n + 1)').hide();
    $('#blogContent ul:nth-child(1)').show();
            
    $('#blogContent').fadeToggle();

    $('a.thumbnails').click(function(e){ triggerModal(e); return false; });
    $('#nextPage').click(function(e) { controllerPagination(e, 'up'); return false; });
    $('#prevPage').click(function(e) { controllerPagination(e, 'down'); return false; });
}

function viewModalPage(currentTargetIndex) {
    var currentTargetIndex  = eval(currentTargetIndex)
    , tagContent          = ''
    , prevTargetIndex     =   currentTargetIndex - 1
    , nextTargetIndex     =   currentTargetIndex + 1
    , dataSet = $.parseJSON(sessionStorage.blogDataSet);
    
    for(i = 0; i < dataSet[0].blogImages.length; i++) {
        
       
        if(currentTargetIndex == dataSet[0].blogImages[i].photo.index) {
            
             $('#largePortfolioImage').attr('src', dataSet[0].blogImages[i].photo.highResURL);
            $('#largePortfolioImage').attr('width', dataSet[0].blogImages[i].photo.highResWidth);
            $('#largePortfolioImage').attr('height', dataSet[0].blogImages[i].photo.highResHeight);
                    
            if(dataSet[0].blogImages[i].photo.imageCaption !== '') {
                $('#caption').html(dataSet[0].blogImages[i].photo.imageCaption);
            }
                    
            if(dataSet[0].blogImages[i].photo.imageTags !== '') {
                
                for(j = 0; j < dataSet[0].blogImages[i].photo.imageTags.length; j++) {
                    tagContent += '<span class="label label-info" style="margin-right: 5px; margin-bottom: 5px;"><i class="icon-tag icon-white"></i>' + dataSet[0].blogImages[i].photo.imageTags[j] + '</span>';
                   
                }
               
            }
            
            $('#tags').html(tagContent);
            break;    
        }
       
    }
    
    if(prevTargetIndex >= 0) {
        //$('#prevButton').show();
        $('#prevButton').removeClass('disabled');
        $('#prevButton').click(function(e) { controllerModalImage(prevTargetIndex, $(dataSet[0].blogImages)); return false; });
    } else {
        //$('#prevButton').hide();
        $('#prevButton').addClass('disabled');
    }
        
    if(nextTargetIndex < $(dataSet[0].blogImages).length) {
       // $('#nextButton').show();
        $('#nextButton').removeClass('disabled');
        $('#nextButton').click(function(e) { controllerModalImage(nextTargetIndex, $(dataSet[0].blogImages)); return false; });
    } else {
        //$('#nextButton').hide();
        $('#nextButton').addClass('disabled');      
    }
}         