function constructViewPage(isFilter) {
    
    isComplete = viewPageHTML();
    
    if(isComplete === true) {
        viewFilterMenu();
        controllerAddListeners();
        //$('a.thumbnails').click(function(e){ triggerModal(e); return false; });
    } else {
        isComplete = false;   
    }
    return isComplete;
}

function viewFilterMenu() {
    var filterContent,
        filterMenu,
        filterArray;
        
        filterArray     = blogInfo[0].filterList.split(',');
    
    filterMenu = $('#filterMenu').html('');
    
    for(var key in filterArray) {
        filterContent = ' <li><a class="filter" href="#">' + filterArray[key] + '</a></li>';
        filterMenu.append(filterContent);
    }
}

function viewPageHTML() {
    var dataSet = JSON.parse(sessionStorage.blogDataSet)
    , content
    ,ul;
    
    $('#blogContent').hide();
    $('#blogContent').html('');
    
    for(var key in dataSet.blogImages) {
        if(key % 18 === 0) {
            $('#blogContent').append(ul);
            ul = $('<ul>', {'id': 'portfolioList_' + key, 'class' : 'clearfix imageContainer thumbnails pagination-centered'});
        }
        
        content = '<a href="#" class="thumbnail-target"><img id="portfolioItem_' + dataSet.blogImages[key].uID + '" src="' + dataSet.blogImages[key].thumbURL + '" width="' + dataSet.blogImages[key].thumbWidth + '" height="' + dataSet.blogImages[key].thumbHeight + '" data-index="' + dataSet.blogImages[key].index  +'" class="img-polaroid" style="border: 1px solid #ffffff;" /></a>';
                
        var li = $('<li>', {'class' : 'span4', 'style' : 'margin-left: 0'}).append(content);
        ul.append(li);
    }
    
    $('#blogContent').append(ul);
            
    $('#blogContent ul:nth-child(1n + 1)').hide();
    //$('#blogContent ul:nth-child(1)').show();
     $('#blogContent ul:nth-child(1)').css({display:'inline-block'});      
    //$('#blogContent').fadeToggle();
    
    if(blogInfo[0].paginationType == 'horizontal') {
        $('#nextPage').addClass('horizontal');   
        $('#prevPage').addClass('horizontal');   
    }
    
   return true;
    
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