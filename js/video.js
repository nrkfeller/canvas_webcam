(function(){
  var canvas = document.getElementById('canvas'), context = canvas.getContext('2d'), video = document.getElementById('camera'), vendorUrl = window.URL || window.webkitURL;

  navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  navigator.getMedia({
    video:true,
    audio:false
  }, function(stream) {
    video.src = vendorUrl.createObjectURL(stream);
    video.play();
  }, function(error){
    // error occured
  });

  video.addEventListener('play', function(){
    draw(this, context, 400, 300);
  }, false);
  function draw(video, context, width, height){
    var image, data, i, r, g, b, brightness;
    context.drawImage(video,0,0, width, height);

    image = context.getImageData(0,0,width,height);
    data = image.data;

    for (i = 0; i < data.length; i=i+4){
      r = data[i];
      g = data[i+1];
      b = data[i+2];
      brightness = (r+g+b)/3;

      data[i] = data[i+1] = data[i+2] = brightness;
    }

    image.data = data;

    context.putImageData(image,0,0);

    // console.log(data.length)

    setTimeout(draw, 10, video, context, width, height);
  }
})();
