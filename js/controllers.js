function controllerButtonState() {
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

function controllerModalButtonState(previousTargetIndex, nextTargetIndex) {
    
    var dataSet = JSON.parse(sessionStorage.blogDataSet);
    
    if(previousTargetIndex >= 0) {
        $('#prevButton').removeClass('disabled');
    } else {
        $('#prevButton').addClass('disabled');
    }
    
    if(dataSet.blogImages[nextTargetIndex] !== undefined) {
        $('#nextButton').removeClass('disabled');
    } else {
        $('#nextButton').addClass('disabled');      
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
                $('#nextButton').removeClass('disabled');
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
                $('#nextButton').addClass('disabled');
            }
            break;
        
        case 'previous':
            previousTargetIndex = eval(currentIndex) - 1;
            
            if(dataSet.blogImages[previousTargetIndex] !== undefined) {
                $('#prevButton').removeClass('disabled');
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
                $('prevButton').addClass('disabled');
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
                    top: '-600',
                    display: 'show'
                            
                }, 800, function() {
                    // Active child animation complete. Hide active child.
                    $('#' + activeChildID).hide();
                           
                    // Begin next child animation.
                    $('#' + nextChildID).css('top', +600);
                           
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
                        top: '+600',
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
                         
                        $('#prevPage').attr('class', 'btn');
                }
                     
                break;
    }
}

function triggerModal(target) {
            
    var currentTargetIndex = $(target.target).attr('data-index');
    var loadItemResult = viewModalPage(currentTargetIndex);
            
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