$(function(){
	var apiKey = '4597ceced7548b684ffbd5b871c0f2d4';
  var tags = 'tokyo';
  var photos = [];
  var imgContainer = $('#image-container');

  var promise = $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + tags + '&format=json&jsoncallback=?',
    method: 'GET',
    dataType: 'jsonp'
  });

  promise.then(function (data) {
    $.each(data.photos.photo, function(index, item){
      photos[index] = item;
      photos[index].url = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
      $('<img alt="" />').attr('id', item.id).attr('src', photos[index].url).hide().appendTo('#image-container');
    });

    $('#' + photos[0].id).show();

    var count = photos.length;
    var i = 0;

    setInterval(function() {
      if (i > count) { i = 0; }
      $('#' + photos[i].id).fadeOut(2000);
      $('#' + photos[i + 1].id).fadeIn(2000);
      i += 1;
    }, 3000);
  });

  // promise.then(function (data) {
  //   $.each(data.photos.photo, function(index, item){
  //     photos[index] = item;
  //     photos[index].url = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
  //   });
  //
  //   $('#image').attr('src', photos[0].url);
  //
  //   var count = photos.length;
  //   var i = 0;
  //
  //   setInterval(function() {
  //     if (i > count) { i = 0; }
  //     i += 1;
  //     $('#image').attr('src', photos[i].url);
  //   }, 2000);
  // });
});
