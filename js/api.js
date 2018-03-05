(function ($) {

  //fetch a random quote post http://localhost:8888/project5/wp-json/wp/v2/posts

  //load all the posts and count them and then do a random number from 1 to whatver

  //history api mdn HISTORYpushstate

  //submit a new quote with the form using jquery 

  var restUrl = api_vars.root_url;
  var restNameSpace = 'wp/v2/';
  var lastPage = '';

  console.log(restUrl + restNameSpace);

  $('#new-quote-button').on('click', function (event) {
    event.preventDefault();
    console.log('Hi');

    $.ajax({
      method: 'get',
      url: restUrl + restNameSpace + 'posts?filter[orderby]=rand&filter[posts_per_page]=1',
    }).done(function (data) {
      lastPage = document.URL;
      console.log('something');
      console.log(data);

      $('.entry-title').text(data[0].title.rendered);
      $('.entry-content').html(data[0].content.rendered);

      if (data[0]._qod_quote_source && data[0]._qod_quote_source_url) {
        $('.source').html(', <a>' + data[0]._qod_quote_source + '</a>');
        $('.source a').attr('href', data[0]._qod_quote_source_url);
      } else if (data[0]._qod_quote_source) {
        $('.source').html(', ' + data[0]._qod_quote_source);
      } else {
        $('.source').html('');
      }
      var push_url = api_vars.home_url + "/" + data[0].slug;



      history.pushState(null, null, push_url);

      $(window).on('popstate', function () {
        if (window.location.hash.indexOf('qm-overview ') === 1) {
          return false;
        } else {
          window.location.replace(lastPage);
        }

      })

    }); // end of .done and .ajax

  }); //  end of click


  // submit a new quote from the form, e.g. button .on click form .submit

  $('#quote-submission-form').on('submit', function (submit) {
   
    console.log ('heyo');
    submit.preventDefault();

    $.ajax({
      method: 'post',
      url: api_vars.root_url + 'wp/v2/posts',
      data: {
        title: $('#quote-author').val(),
        content: $('#quote-the-quote').val(),
        _qod_quote_source: $('#quote-source').val(),
        _qod_quote_source_url: $('#quote-source-url').val(),

        // before send nonce authentication, it's in the slides from wp ajax lesson

      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
      }

    }).done(function () {
      console.log(api_vars.success);
      $('#quote-submission-form').hide({
        duration: 200
      });
      $('.submit-success-message').css("display", "block");
      $('.submit-success-message').text(api_vars.success);
    });
  });




})(jQuery);