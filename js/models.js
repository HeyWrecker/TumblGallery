function getQueryVariable(filterString) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == filterString){return pair[1];}
    }
    return(false);
}

function loadTumblogLimit(blog, apiKey, filter, type, notes, offset, limit) {
    var test = $.ajax({
        url: 'http://api.tumblr.com/v2/blog/' + blog + '/posts?filter=' + filter + '&type=' + type + '&notes_info=' + notes + '&offset=' + offset + '&limit=' + limit,
        method: 'get',
        data : ({
            api_key : apiKey,
            initialOffset:offset
            }),
        dataType: "jsonp",
        success: function(data) {
            loadTumblogPosts(data, false);
        },
        error: function(data) {
            console.log(data);
        }

    })
}

function loadTumblogPosts(data, isFilter) {
    var isModelDataSuccess = false;
    
    if(isFilter !== false) {
        $.ajax({
                url: 'http://api.tumblr.com/v2/blog/' + blogInfo[0].blogName + '/posts?filter=' + blogInfo[0].postFilter + '&type=' + blogInfo[0].postType + '&notes_info=' + blogInfo[0].notesInfo + '&offset=' + blogInfo[0].postOffset + '&limit=' + data.postLimit + '&tag=' + data.filterString,
                method: 'get',
                data : ({
                    api_key :blogInfo[0].blogKey,
                    initialOffset:blogInfo[0].postOffset
                    }),
                dataType: "jsonp",
                error: function(data) {
                    console.log(data);  
                },
                success: function(data) {
                    isModelDataSuccess = modelData(data);
                   
                    if(isModelDataSuccess === true) {
                        controllerButtonState();
                        $('#blogContent').fadeToggle();
                        $('#nextPage').fadeIn();
                        $('#prevPage').fadeIn();
                    }
                    
                }
            })
      
    } else {
        var postLimit = data.response.total_posts;
            
        $.ajax({
            url: 'http://api.tumblr.com/v2/blog/' + blogInfo[0].blogName + '/posts?filter=' + blogInfo[0].postFilter + '&type=' + blogInfo[0].postType + '&notes_info=' + blogInfo[0].notesInfo + '&offset=' + blogInfo[0].postOffset + '&limit=' + postLimit,
            method: 'get',
            data : ({
                api_key :blogInfo[0].blogKey,
                initialOffset:blogInfo[0].postOffset
                }),
            dataType: "jsonp",
            success: function(data) {
                isModelDataSuccess = modelData(data);
                if(isModelDataSuccess === true) {
                    controllerButtonState();
                    $('#blogContent').fadeToggle();
                    $('#nextPage').fadeIn();
                    $('#prevPage').fadeIn();
                }
            }
        });
    }
}
            

function modelData(data) {
    
    var posts = data.response.posts;
    var photo = {};
    var caption = '';
    var tags    = '';
    var postID  =   '';
    var photoSetIndex;
    var jsonDataSet = { };
    var photo;
    var finalDataSet = {};
    var tmpDataSet = {};
    var dataSetIndex = 0;
     
    for(var key1 in posts) {
        var photoSets = posts[key1].photos
        , caption       = posts[key1].caption
        , tags          = posts[key1].tags
        , postID        = posts[key1].id
        , photoSetIndex = [key1];
       
        
        for(var key2 in photoSets) {
            var photo = photoSets[key2];
            var photoIndex = [key2];
           
            
            for(var key3 in photo.alt_sizes) {
                if(photo.alt_sizes[key3].width == 75) {
                   
                    var uID                 = photo.alt_sizes[key3].url;
                    uID                     = uID.substring(0, uID.length - 4);
                    uID                     = uID.substring(60);
                    
                    jsonDataSet[dataSetIndex] = {
                            "index"             : dataSetIndex,
                            "thumbWidth"        : photo.alt_sizes[key3].width,
                            "thumbHeight"       : photo.alt_sizes[key3].height,
                            "thumbURL"          : photo.alt_sizes[key3].url,
                            "highResWidth"      : photo.alt_sizes[1].width,
                            "highResHeight"     : photo.alt_sizes[1].height,
                            "highResURL"        : photo.alt_sizes[1].url,
                            "imageCaption"      : caption,
                            "imageTags"         : tags,
                            "uID"               : uID,
                            "postID"            : postID,
                            "photoSetIndex"     : photoSetIndex
                        
                    } 
                    dataSetIndex = dataSetIndex + 1;
                }
            }
            
        }
     
    }
    
    for(var key in jsonDataSet) {
        tmpDataSet[key] = {
            "index"                     : jsonDataSet[key].index,
            "thumbWidth"                : jsonDataSet[key].thumbWidth,
            "thumbHeight"               : jsonDataSet[key].thumbHeight,
            "thumbURL"                  : jsonDataSet[key].thumbURL,
            "highResWidth"              : jsonDataSet[key].highResWidth,
            "highResHeight"             : jsonDataSet[key].highResHeight,
            "highResURL"                : jsonDataSet[key].highResURL,
            "imageCaption"              : jsonDataSet[key].imageCaption,
            "imageTags"                 : jsonDataSet[key].imageTags,
            "uID"                       : jsonDataSet[key].uID,
            "postID"                    : jsonDataSet[key].postID,
            "photoSetIndex"             : jsonDataSet[key].photoSetIndex
        }
        dataSetIndex = dataSetIndex + 1;
    }
    
    finalDataSet = {
        'blogInfo'   : {
            'postCount' : data.response.total_posts,
        }, 
        'blogImages' : jsonDataSet
    }
    
    sessionStorage.clear();
    
    sessionStorage.blogDataSet = JSON.stringify(finalDataSet);
    
    isConstructionComplete = constructViewPage();
    
    return isConstructionComplete;

}