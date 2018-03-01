(function($){

  //fetch a random quote post http://localhost:8888/project5/wp-json/wp/v2/posts
  
  //load all the posts and count them and then do a random number from 1 to whatver
  
  //history api mdn HISTORYpushstate
  
  //submit a new quote with the form using jquery 
  
  $( '#new-quote-button' ).on( 'click', function ( s ) {
      s.preventDefault();
      $.ajax({
        url: '/wdft-2018/quotes-on-dev/wordpress/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
            success: function ( data ) {
  
  
              var content = data[0].content.rendered;
              var quoteUrl = data[0]._qod_quote_source_url;
              var template = '';
  
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
  
      }});
  
    } );
  
  
    // submit a new quote from the form, e.g. button .on click form .submit
    // post request wp-json/wp/v2/posts
    // before send nonce authentication, it's in the slides from wp ajax lesson
  
  
  })(jQuery); 