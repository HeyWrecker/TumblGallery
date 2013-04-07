function loadTumblogLimit(blog, apiKey, filter, type, notes, offset, limit) {
    $.ajax({
        url: 'http://api.tumblr.com/v2/blog/' + blog + '/posts?filter=' + filter + '&type=' + type + '&notes_info=' + notes + '&offset=' + offset + '&limit=' + limit,
        method: 'get',
        data : ({
            api_key : apiKey,
            jsonp : 'loadTumblogPosts',
            initialOffset:offset
        }),
        dataType: "jsonp"
    });
}
            
function loadTumblogPosts(data) {
            
    if(data.meta.status == 200) {
                    
        var postLimit   =  data.response.total_posts;
        
        $.ajax({
            url: 'http://api.tumblr.com/v2/blog/' + blogInfo[0].blogName + '/posts?filter=' + blogInfo[0].postFilter + '&type=' + blogInfo[0].postType + '&notes_info=' + blogInfo[0].notesInfo + '&offset=' + blogInfo[0].postOffset + '&limit=' + postLimit,
            method: 'get',
            data : ({
                api_key :blogInfo[0].blogKey,
                jsonp : 'modelData',
                initialOffset:blogInfo[0].postOffset
                }),
            dataType: "jsonp"
        });
                   
        } else {
            content = '<div class="alert alert-block"><h4>An Error Occurred</h4><p>There was an error retrieving the requested information from Tumblr. Please try again later.</p></div>';
            $('#blogContent').append(content);
    }
}
            

function modelData(data) {
    var posts = data.response.posts;
    var photo = [];
    var caption = '';
    var tags    = '';
    var postID  =   '';
    var photoSetIndex   = '';
    var jsonDataSet = [];
    var finalDataSet = [];
    var tmpDataSet = [];
            
    $(posts).each(function(index, element){
        var photoSets   = element.photos;
        caption         = element.caption;
        tags            = element.tags;
        postID          = element.id;

        $(photoSets).each(function(index2, element) {
                       
            var photos = element.alt_sizes;
                       
            $(photos).each(function(index, element) {
                           
                var item = element;
                
                if(item.width == 75) {
                    var uID                 = photos[1].url;
                    uID                     = uID.substring(0, uID.length - 4);
                    uID                     = uID.substring(60);
                               
                    jsonDataSet.push({
                        "photo" : {
                        "thumbWidth"        : item.width,
                        "thumbHeight"       : item.height,
                        "thumbURL"          : item.url,
                        "highResWidth"      : photos[1].width,
                        "highResHeight"     : photos[1].height,
                        "highResURL"        : photos[1].url,
                        "imageCaption"      : caption,
                        "imageTags"         : tags,
                        "uID"               : uID,
                        "postID"            : postID,
                        "photoSetIndex"     : index2
                        }
                    });
                }
                           
            });
        }); 
    });
                
    $(jsonDataSet).each(function(index, element) {
                    
        tmpDataSet.push( {
            "photo": {
                "index"                     : index,
                "thumbWidth"                : element.photo.thumbWidth,
                "thumbHeight"               : element.photo.thumbHeight,
                "thumbURL"                  : element.photo.thumbURL,
                "highResWidth"              : element.photo.highResWidth,
                "highResHeight"             : element.photo.highResHeight,
                "highResURL"                : element.photo.highResURL,
                "imageCaption"              : element.photo.imageCaption,
                "imageTags"                 : element.photo.imageTags,
                "uID"                       : element.photo.uID,
                "postID"                    : element.photo.postID,
                "photoSetIndex"             : element.photo.photoSetIndex
            }
        });
    });
                
    finalDataSet.push( {
        'blogInfo'   : {
            'postCount' : data.response.total_posts,
        }, 
        'blogImages' : tmpDataSet
    });
    
    sessionStorage.blogDataSet = JSON.stringify(finalDataSet);
            
    constructViewPage();
}