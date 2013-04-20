function controllerRemoveListeners() {
    $('a.filter').unbind('click');
    $('a.thumbnails').unbind('click');
    $('a.filter').unbind('click');
    $('#nextPage').unbind('click');
    $('#prevPage').unbind('click');
    $('#prevButton').unbind('click');
    $('#nextButton').unbind('click');
}

function controllerAddListeners() {
    $('a.thumbnail-target').click(function(e){ triggerModal(e); return false; });
    $('a.filter').click(function(e){ controllerFilter(e); return false; });
    $('#nextPage').click(function(e) { controllerPagination(e, 'up'); return false; });
    $('#prevPage').click(function(e) { controllerPagination(e, 'down'); return false; });
    $('#prevButton').click(function(e) { controllerModalImage(e, 'previous', $(largePortfolioImage).attr('data-index')); return false; });
    $('#nextButton').click(function(e) { controllerModalImage(e, 'next', $(largePortfolioImage).attr('data-index')); return false; });   
}
    

function controllerFilter(event) {
    $('[data-toggle="dropdown"]').parent().removeClass('open');
    //$('a.filter').unbind('click');
    controllerRemoveListeners();
    
    var dataSet = JSON.parse(sessionStorage.blogDataSet);
    var postLimit = dataSet.blogInfo.postCount;
    var filterString = event.currentTarget.childNodes.item(0).textContent;
    
    if(filterString == 'All') {
        loadTumblogLimit(blogInfo[0].blogName, blogInfo[0].blogKey, blogInfo[0].postFilter, blogInfo[0].postType);
    } else {
        var data = {
            "postLimit"     : postLimit,
            "filterString"  : filterString
        }
    
        loadTumblogPosts(data, true);
    }
   
   if($('#blogContent').children().length <= 1) {
        $('#nextPage').unbind('click');
        $('#nextPage').addClass('disabled');
    }
}



function controllerButtonState() {
    
    if($('#blogContent').children().length <=1) {
         $('#nextPage').addClass('disabled');
         $('#prevPage').addClass('disabled');
    } else {
    
    $('#blogContent').children().each(function(index, element) {
        if($(element).css('display') != 'none') {
            activeChildIndex            = index;
            activeChildID               = $('#blogContent')[0].childNodes[activeChildIndex].attributes.id.value;
            previousChildIndex          = index - 1;
            nextChildIndex              = index + 1;
                   
            if(previousChildIndex >= 0) {
                previousChildID = $('#blogContent')[0].childNodes[previousChildIndex].attributes.id.value;
                 $('#prevPage').removeClass('disabled');
            } else {
                previousChildID = '';
                $('#prevPage').addClass('disabled');
            }
                    
            if(nextChildIndex == $('#blogContent').children().length) {
                $('#nextPage').addClass('disabled');
            } else {
                $('#nextPage').removeClass('disabled');
            }
                                     
                                     
        }
    });
    }
}

function controllerModalButtonState(previousTargetIndex, nextTargetIndex) {
    var newNextTargetIndex = eval(nextTargetIndex) + 1;
    var dataSet = JSON.parse(sessionStorage.blogDataSet);
    var blogImages = dataSet.blogImages;
    var blogImagesArray = [];
    
    for(var key in blogImages) {
        blogImagesArray.push(blogImages[key]);   
    }
    
    var blogImagesArrayLength = blogImagesArray.length - 1;
    var outOfBounds = blogImagesArrayLength;
    
    //if(previousTargetIndex === 0 || previousTargetIndex < 0) {
    if(previousTargetIndex < 0) {
        $('#prevButton').addClass('disabled');
    } else {
        $('#prevButton').removeClass('disabled');
    }
    
    if(blogImagesArrayLength < nextTargetIndex || blogImagesArrayLength === nextTargetIndex) {
        $('#nextButton').addClass('disabled');
     
    } else {
        $('#nextButton').removeClass('disabled');      
    
    }

}

function controllerModalImage(event, direction, index) {
    var currentIndex = index
    , previousTargetIndex
    , nextTargetIndex
    , tagContent = ''
    , dataSet = JSON.parse(sessionStorage.blogDataSet);
    
    switch(direction) {
        case 'next':
            
            nextTargetIndex = eval(currentIndex) + 1;
            
            if(dataSet.blogImages[nextTargetIndex] !== undefined) {
                controllerModalButtonState(currentIndex, nextTargetIndex);
                
                $('#largePortfolioImage').attr('height', dataSet.blogImages[nextTargetIndex].highResHeight);
                $('#largePortfolioImage').attr('width', dataSet.blogImages[nextTargetIndex].highResWidth);
                $('#largePortfolioImage').attr('src', dataSet.blogImages[nextTargetIndex].highResURL);
                $('#largePortfolioImage').attr('data-index', dataSet.blogImages[nextTargetIndex].index);
                
                if(dataSet.blogImages[nextTargetIndex].imageCaption !== '') {
                    $('#caption').html(dataSet.blogImages[nextTargetIndex].imageCaption);
                }
                
                if(dataSet.blogImages[nextTargetIndex].imageTags !== undefined) {
                    for(var key in dataSet.blogImages[nextTargetIndex].imageTags) {
                        tagContent += '<span class="label label-info" style="margin-right: 5px; margin-bottom: 5px;"><i class="icon-tag icon-white"></i>' + dataSet.blogImages[nextTargetIndex].imageTags[key] + '</span>';
                    }
                }
                
                $('#tags').html(tagContent);
            } else {
               
            }
            break;
        
        case 'previous':
            
            previousTargetIndex = eval(currentIndex) - 1;
            
            if(dataSet.blogImages[previousTargetIndex] !== undefined) {
                
                var newPreviousTargetIndex = previousTargetIndex - 1;
                
                controllerModalButtonState(newPreviousTargetIndex, currentIndex);
                $('#largePortfolioImage').attr('height', dataSet.blogImages[previousTargetIndex].highResHeight);
                $('#largePortfolioImage').attr('width', dataSet.blogImages[previousTargetIndex].highResWidth);
                $('#largePortfolioImage').attr('src', dataSet.blogImages[previousTargetIndex].highResURL);
                $('#largePortfolioImage').attr('data-index', dataSet.blogImages[previousTargetIndex].index);
                
                if(dataSet.blogImages[previousTargetIndex].imageCaption !== '') {
                    $('#caption').html(dataSet.blogImages[previousTargetIndex].imageCaption);
                }
                
                if(dataSet.blogImages[previousTargetIndex].imageTags !== undefined) {
                    for(var key in dataSet.blogImages[previousTargetIndex].imageTags) {
                        tagContent += '<span class="label label-info" style="margin-right: 5px; margin-bottom: 5px;"><i class="icon-tag icon-white"></i>' + dataSet.blogImages[previousTargetIndex].imageTags[key] + '</span>';
                    }
                }
                
                $('#tags').html(tagContent);
         
            } else {
               
            }
            break;
    }
}

function controllerPagination(event, direction) {
            
    var activeChildIndex
    , activeChildID
    , nextChildIndex
    , nextChildID
    , previousChildIndex
    , previousChildID;
             
            
    switch(direction) {
        case 'up':
            // Set active and next child ID and class.
            $('#blogContent').children().each(function(index, element) {
                if($(element).css('display') != 'none') {
                    activeChildIndex = index;
                    activeChildID = $('#blogContent')[0].childNodes[activeChildIndex].attributes.id.value;
                    nextChildIndex = index + 1;
                    
                    if(nextChildIndex < $('#blogContent').children().length) {
                        nextChildID = $('#blogContent')[0].childNodes[nextChildIndex].attributes.id.value;
                    } else {
                        nextChildID = '';
                    }
                }
            });
    
            if(nextChildID !== '') {
                $('#' + activeChildID).animate({
                    top: '-700',
                    display: 'show'
                            
                }, 800, function() {
                    // Active child animation complete. Hide active child.
                    $('#' + activeChildID).hide();
                           
                    // Begin next child animation.
                    $('#' + nextChildID).css('top', +700);
                           
                    $('#' + nextChildID).animate({
                        display: 'show',
                        top: '-0'
                        }, 800, function() {
                        controllerButtonState();
                    });
                });
            }
            break;
                    
            case 'down':
                // Set active and previous child ID and Index.
                $('#blogContent').children().each(function(index, element) {
                    if($(element).css('display') != 'none') {
                        activeChildIndex = index;
                        activeChildID = $('#blogContent')[0].childNodes[activeChildIndex].attributes.id.value;
                        previousChildIndex = index - 1;
                             
                        if(previousChildIndex >= 0) {
                            previousChildID = $('#blogContent')[0].childNodes[previousChildIndex].attributes.id.value;
                        } else {
                            previousChildID = '';   
                        }
                    }
                      
                });
                     
                if(previousChildID !== '') {
                    // Begin active child down page animation.
                    $('#' + activeChildID).animate({
                        top: '+700',
                        display: 'hide'
                        }, 800, function() {
                            // Active child animation complete. Hide active child.
                            $('#' + activeChildID).hide();
                            
                            // Begin previous child down page animation.
                            $('#' + previousChildID).animate({
                                top: '+0',
                                display: 'show'
                             }, 800, function() {
                                controllerButtonState();
                            });
                        });
                         
                }
                     
                break;
    }
}

function triggerModal(target) {
    var currentTargetIndex = $(target.target).attr('data-index')
        , nextTargetIndex = eval(currentTargetIndex) + 1
        , previousTargetIndex = eval(currentTargetIndex) - 1
        , loadItemResult = viewModalPage(currentTargetIndex);
    
    controllerModalButtonState(previousTargetIndex, nextTargetIndex);
            
    //Call BS Modal
    $('#portfolioModal').modal('show');
            
    $('#xButton').click(function(e){ closeModal(); return false; });
    $('#closeButton').click(function(e){ closeModal(); return false; });
}
        
function closeModal() {
             
    //Close Modal
    $('#portfolioModal').modal('hide');
             
    //Clear out modal interior
    $('#largePortfolioImage').attr('height', '');
    $('#largePortfolioImage').attr('width', '');
    $('#largePortfolioImage').attr('src', '');
    $('#caption').html('');
    $('#tags').html('');
            
}