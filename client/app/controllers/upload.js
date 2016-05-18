import Ember from 'ember';


export default Ember.Controller.extend({
  preview: Ember.observer('file', function() {

    var file = document.getElementById('file-field').files[0];
    var data = new FormData()
    data.append('file', file)
    var preview = $('.preview');

    preview.css.background = 'pink'

    var colorThief = new ColorThief();
    if (file) {

      if (file.type === 'video/mp4') {
        this.set('isVideo', true)
        $('#preview-image').attr('src', '');
        // $('#preview-video').attr('src', URL.createObjectURL(file));
        this.set('videosrc', URL.createObjectURL(file))
      } else {
        this.set('isVideo', false);
        // $('#preview-video').attr('src', URL.createObjectURL(''));
      }

      this.set('isUpload', true)
      console.log(file)
      this.set('filesrc', window.location.href + 'data/' + file.name)


      this.set('thumbnailImage', file)

      var boundary = Math.floor((Math.random() * 10000000) + 1);
      var reader = new FileReader();

      reader.onload = function(e) {
        console.log($('#preview-image'))
        if (file.type === 'video/mp4') {

        } else {
          //
          $('#preview-image').attr('src', e.target.result);
          setTimeout(function(){
          var thisimage = document.getElementById("preview-image");
          var colour = colorThief.getColor(thisimage);
          preview.css('background-color', 'rgb(' + colour + ')')
          })
        }
      }
      reader.readAsDataURL(file);
    }

    var form = new FormData();
    form.append('file', file);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/api/v1/files",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "bc31b302-c5b2-e579-1e86-9bb4d507d7d8"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function(response) {

    });


  }),
  isVideo: false,
  isUpload: false

});
