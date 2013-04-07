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

function controllerModalImage(index, dataSet) {
                    
    //$('#largePortfolioImage').attr('height', '');
    //$('#largePortfolioImage').attr('width', '');
    $('#largePortfolioImage').attr('src', '');
    $('#caption').html('');
    $('#tags').html('');
    viewModalPage(index, dataSet);
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