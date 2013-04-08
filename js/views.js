function constructViewPage() {
    viewPageHTML();
}
         
function viewPageHTML() {
    var dataSet = JSON.parse(sessionStorage.blogDataSet)
    , content
    ,ul;
    
    $('#blogContent').hide();
    
    for(var key in dataSet.blogImages) {
        if(key % 18 === 0) {
            $('#blogContent').append(ul);
            ul = $('<ul>', {'id': 'portfolioList_' + key, 'class' : 'clearfix imageContainer'});
        }
        
        content = '<a href="#" class="thumbnails"><img id="portfolioItem_' + dataSet.blogImages[key].uID + '" src="' + dataSet.blogImages[key].thumbURL + '" width="' + dataSet.blogImages[key].thumbWidth + '" height="' + dataSet.blogImages[key].thumbHeight + '" data-index="' + dataSet.blogImages[key].index  +'" class="img-circle" style="border: 1px solid #ffffff;" /></a>';
                
        var li = $('<li>', {'class' : 'span3'}).append(content);
        ul.append(li);
    }
    
    $('#blogContent').append(ul);
            
    $('#blogContent ul:nth-child(1n + 1)').hide();
    $('#blogContent ul:nth-child(1)').show();
            
    $('#blogContent').fadeToggle();

    $('a.thumbnails').click(function(e){ triggerModal(e); return false; });
    $('#nextPage').click(function(e) { controllerPagination(e, 'up'); return false; });
    $('#prevPage').click(function(e) { controllerPagination(e, 'down'); return false; });
    $('#prevButton').click(function(e) { controllerModalImage(e, 'previous', $(largePortfolioImage).attr('data-index')); return false; });
    $('#nextButton').click(function(e) { controllerModalImage(e, 'next', $(largePortfolioImage).attr('data-index')); return false; });
}

function viewModalPage(currentTargetIndex) {
    var currentTargetIndex  = eval(currentTargetIndex)
    , tagContent          = ''
    , prevTargetIndex     =   currentTargetIndex - 1
    , nextTargetIndex     =   currentTargetIndex + 1
    , dataSet = $.parseJSON(sessionStorage.blogDataSet)
    , selectedObject = dataSet.blogImages[currentTargetIndex];
    
    controllerModalButtonState(prevTargetIndex, nextTargetIndex);
    
    $('#largePortfolioImage').attr('src', selectedObject.highResURL);
    $('#largePortfolioImage').attr('width', selectedObject.highResWidth);
    $('#largePortfolioImage').attr('height', selectedObject.highResHeight);
    $('#largePortfolioImage').attr('data-index', selectedObject.index);
    
    if(selectedObject.imageCaption !== '') {
        $('#caption').html(selectedObject.imageCaption);
    }
    
    if(selectedObject.imageTags !== '') {
                
        for(i = 0; i < selectedObject.imageTags.length; i++) {
            tagContent += '<span class="label label-info" style="margin-right: 5px; margin-bottom: 5px;"><i class="icon-tag icon-white"></i>' + selectedObject.imageTags[i] + '</span>';
                   
        }
               
    }
            
    $('#tags').html(tagContent);
}         