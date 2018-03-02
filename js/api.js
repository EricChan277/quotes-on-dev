(function($){

  //fetch a random quote post http://localhost:8888/project5/wp-json/wp/v2/posts
  
  //load all the posts and count them and then do a random number from 1 to whatver
  
  //history api mdn HISTORYpushstate
  
  //submit a new quote with the form using jquery 

  var restUrl = api_vars.root_url;
  var restNameSpace = 'wp/v2/';

  console.log(restUrl + restNameSpace);
  
  $( '#new-quote-button' ).on( 'click', function ( event ) {
      event.preventDefault();
      console.log('Hi');

      $.ajax({
        method: 'get',
        url: restUrl + restNameSpace + 'posts',
      }).done(function(data){
              console.log('something');
              console.log(data);
              // var content = data[0].content.rendered;
              var quoteUrl = data[0]._qod_quote_source_url;
              // var template = '';
  
              if(quoteUrl > 0){
                template += '<div class="entry-content"></div>';
              } else {
  
              }
  
              
              
              $(".entry-content").empty();
              $(".entry-content").append(data[0].content.rendered);
              $(".entry-title").empty();
              $(".entry-title").append(data[0].title.rendered);
  
  
  
             // article append template variable
  
              $(".source").empty();
              $(".source").append("," + '<a href="' + data[0]._qod_quote_source_url + '">' + data[0]._qod_quote_source + '</a>');
  
 
  
    }).fail(function(){
      console.log('nope');
     });// end of .done and .ajax

  });//  end of click
  
  
    // submit a new quote from the form, e.g. button .on click form .submit



    // before send nonce authentication, it's in the slides from wp ajax lesson
  
  
  })(jQuery); 