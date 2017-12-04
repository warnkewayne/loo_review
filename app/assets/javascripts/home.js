//Area-Listing
var hasAreaOpened=false;
// bottom bar
var isMenuOpen = false;
// individual listing
var indivOpened = false;
//bottom bar helper
var height;
// markers for map
var marker, marker1, marker2;
//bathroom to rate
var bathroomToRate;
var fooCount = 0;
var dooCount = 0;
// growRating helper
var halfUp = false;
var rateCounter = 0;
var raterOpened = false;
//toggleHandicap helper
var handi = false;

// Load in Map Screen
//After 5 seconds of loader

$(document).ready(
  setTimeout(loadMapScreen, 5000));

function loadMapScreen(){
   $('#loader_screen').css("z-index", "0")
   $('#map_screen').animate({left: '0'});
   $('#listing_screen').css("left", "100%");
   $('#indiv_listing').css("left", "100%");
   $('#rate_bathroom_screen').css("left", "100%");
}

// initialize Google Map API
function initMap() {
  var image = {
    url: 'https://image.flaticon.com/icons/png/512/196/196145.png',
    scaledSize: new google.maps.Size(100,100)
  }
  var fredCtr = {lat: 42.451796, lng: -79.338035};

  var map = new google.maps.Map(document.getElementById('map'),{
	   zoom: 17,
	   center: fredCtr,
     disableDefaultUI: true
   });

   $.getJSON('/mason')
	  .done(function(data){
	   var mCoords = {lat: data.lat, lng: data.long};
	   marker = new google.maps.Marker({
		 position: mCoords,
		 map: map,
     icon: image,
     //label: data.name,
     //animation: google.maps.Animation.DROP,
	   });
	  })
	  .fail(function(data){
	  console.log("Could not find Mason");
	});

  $.getJSON('/william')
	 .done(function(data){
	  var wCoords = {lat: data.lat, lng: data.long};
	  marker1 = new google.maps.Marker({
		position: wCoords,
		map: map,
    icon: image,
    //label: data.name,
    //animation: google.maps.Animation.DROP,
	  });
	})
	.fail(function(data){
	  console.log("Could not find William");
	 });

  $.getJSON('/fenton')
	  .done(function(data){
	   var fCoords = {lat: data.lat, lng: data.long};
	   marker2 = new google.maps.Marker({
		 position: fCoords,
		 map: map,
     icon: image,
     //label: data.name,
     //animation: google.maps.Animation.DROP,
	  });
	})
	.fail(function(data){
	  console.log("Could not find Fenton");
	});
  ////////////////////////////////////////////////////////////////////
}

function menuClick(){
  if(isMenuOpen){
    $('.bottom-bar').animate({height: '80px'});
    $('.bottom-bar').css("opacity", "1");

    setTimeout(function() {
      $('.map-btn').css("display", "none");
      $('.list-btn').css("display", "none");
    }, 1000);

    isMenuOpen = false;
  } else {
    $('.map-btn').css("display", "block");
    $('.list-btn').css("display", "block");
    $('.bottom-bar').animate({height: '300px'});
    $('.bottom-bar').css("opacity", ".9");
    isMenuOpen = true;
  }
}

// load Individual Listing onCLick?
function loadIndivListing(building){
  // var masonArrow = 'arrow1', williamArrow = 'arrow2', fentonArrow = 'arrow3';
  //   if(building == 'mason'){ $('#' + masonArrow).animate({left: '100%'});}
  //   if(building == 'william'){ $('#' + williamArrow).animate({left: '100%'});}
  //   if(building == 'fenton'){ $('#' + fentonArrow).animate({left: '100%'});}

  building = '/' + building;

  if(indivOpened == true){
    $('#bathroom-name').empty();
    $('#rating').empty();
    $('#give-rating-btn').remove();
    $('#placeHolderHandicap').empty();
    $('#comments').empty();

    indivOpened = false;
  }

  //console.log("FIRST");
  //$('#map').animate({height: '600px'});
  $('#indiv_listing').animate({left: '0'});
  $('#map_screen').css("left", "100%");
  $('#listing_screen').css("left", "100%");
  $('#rate_bathroom_screen').css("left", "100%");
  //$('#arrow1, #arrow2, #arrow3').css("left", "0");


  if(indivOpened == false){
    //TODO: LOAD INDIVIDUAL RATING/COMMENTS FROM SPECIFIC JSON HASHS
    //console.log("SECOND");
    var rating;
    var name;
    var handicap;
    var comments;
    var counter=0;
    var halfCount=0;

    $.getJSON(building)
    .done(function(data) {
      rating = data.rating;
      name = data.name;
      handicap = data.handicap;
      comments = data.comments;

      //TODO: Append html for each category

      $('#bathroom-name').append(name);

      //appends rating image
      console.log("THIRD");
      while(rating != 0){

        if(rating >= 1){
          $('#rating').append(`<img id="whole-`+ counter +`" src="/assets/whole-soap-bar.png" />`);
          rating--;
          counter++;
        }
        if(rating < 1 && rating > 0){
          $('#rating').append(`<img id="half-`+ halfCount +`" style="width:50px ! important;" src="/assets/half-soap-bar.png" />`);
          rating = rating - 0.5;
          halfCount++;
        }
      }
      // END adding the rating images

      //appends handicap image if true
      if(handicap) {$('#placeHolderHandicap').append(`<img id="handicap" src="/assets/handicap.png" style="width:80px;height:80px"/>`);}
      //END adding the handicap

      //grab comments and append them
      for(var i=0; i < comments.length; i++){
        $('#comments').append(`<li>${comments[i]}</li>`);
      }
        $('<button id="give-rating-btn" onclick="goToRateBathroom()">Rate This Bathroom!</button>').insertAfter("#comments");
      //END appending comments

      //TODO: ZOOM MAP TO LAT AND LONG

    })
    .fail(function(data) {
      alert("SOMETHING WENT WRONG"); // for DEVELOPMENT
      console.log("Couldn't grab JSON for " + building);
    });

    indivOpened = true;
  }
}

// load full list onCLick
function loadAreaList(){
  $('#listing_screen').animate({left: '0'});
  $('#map_screen').css("left", "100%");
  $('#indiv_listing').css("left", "100%");
  $('#rate_bathroom_screen').css("left", "100%");

  //TODO: Grab json hashes with rating and name... each div is clickable to indiv_listing
  var mName; //mason name
  var mRating; // mason rating
  var mHandi;
  var wName; // william name
  var wRating; // william rating
  var wHandi;
  var fName; // fenton name
  var fRating //fenton rating
  var fHandi;

  var counter = 0;
  var halfCount = 0;


  if(hasAreaOpened == false){
    $.getJSON('/mason')
        .done(function(data){
            mName=data.name;
            mRating=data.rating;
            mHandi=data.handicap;

            // append HTML WITH JSON DATA
            $('#area-list').append(
              `<li id="masonLi" onclick="loadIndivListing('mason')">
                <div id="name-container1">`+ mName + `</div>
                <div id="rating-container1"></div>
                <div id="handi-container1"></div>
                <div id="arrow1"></div>
              </li>`
            );
            while(mRating != 0){

              if(mRating >= 1){
                $('#rating-container1').append(`<img id="whole-`+ counter +`" src="/assets/whole-soap-bar.png" />`);
                mRating--;
                counter++;
              }
              if(mRating < 1 && mRating > 0){
                $('#rating-container1').append(`<img id="half-`+ halfCount +`" src="/assets/half-soap-bar.png" />`);
                mRating = mRating - 0.5;
                halfCount++;
              }
            }
            if(mHandi==true){$('#handi-container1').append(`<img id="handi-m" src="/assets/handicap.png" />`);}
            else {$('#handi-container1').append(`<img id="handi-m" style="filter: grayscale(100%);opacity:0.5;" src="/assets/handicap.png" />`);}
        })
        .fail(function(){
          console.log("Could not find Mason JSON");
        });
    $.getJSON('/william')
        .done(function(data) {
            wName=data.name;
            wRating=data.rating;
            wHandi = data.handicap;

            // append HTML WITH JSON DATA
            $('#area-list').append(`
              <li id="williamLi" onclick="loadIndivListing('william')">
                <div id="name-container2">`+ wName +`</div>
                <div id="rating-container2"></div>
                <div id="handi-container2"></div>
                <div id="arrow2"></div>
              </li>`
            );

            while(wRating != 0){

              if(wRating >= 1){
                $('#rating-container2').append(`<img id="whole-`+ counter +`" src="/assets/whole-soap-bar.png" />`);
                wRating--;
                counter++;
              }
              if(wRating < 1 && wRating > 0){
                $('#rating-container2').append(`<img id="half-`+ halfCount +`" src="/assets/half-soap-bar.png" />`);
                wRating = wRating - 0.5;
                halfCount++;
              }
            }
            if(wHandi==true){$('#handi-container2').append(`<img id="handi-w" src="/assets/handicap.png" />`);}
            else {$('#handi-container2').append(`<img id="handi-w" style="filter: grayscale(100%);opacity:0.5;" src="/assets/handicap.png" />`);}
        })
        .fail(function(){
          console.log("Could not find William JSON");
        });
    $.getJSON('/fenton')
        .done(function(data){
            fName=data.name;
            fRating=data.rating;
            fHandi = data.handicap;

            // append HTML WITH JSON DATA
            $('#area-list').append(
              `<li id="fentonLi" oncLick="loadIndivListing('fenton')">
                <div id="name-container3">`+ fName +`</div>
                <div id="rating-container3"></div>
                <div id="handi-container3"></div>
                <div id="arrow3"></div>
                </li>`
              );

            while(fRating != 0){

              if(fRating >= 1){
                $('#rating-container3').append(`<img id="whole-`+ counter +`" src="/assets/whole-soap-bar.png" />`);
                fRating--;
                counter++;
              }
              if(fRating < 1 && fRating > 0){
                $('#rating-container3').append(`<img id="half-`+ halfCount +`" src="/assets/half-soap-bar.png" />`);
                fRating = fRating - 0.5;
                halfCount++;
              }
            }
            if(fHandi==true){$('#handi-container3').append(`<img id="handi-f" src="/assets/handicap.png" />`);}
            else {$('#handi-container3').append(`<img id="handi-f" style="filter: grayscale(100%);opacity:0.5;" src="/assets/handicap.png" />`);}

        })
        .fail(function(){
          console.log("Could not find Fenton JSON");
        });

    hasAreaOpened=true;
  }
}

function goToRateBathroom(){
  // TODO: Load the rating form page ...
  if(raterOpened == true){
    $('rating-container').empty();
    $('#bathroom-rater-name').remove();
  }
  $('#helper-overlay').animate({left: '0'});
  $('#rate_bathroom_screen').animate({left: '0'});
  raterOpened = true;

  bathroomToRate = $('#bathroom-name').text();
  console.log(bathroomToRate);

  $('#rating-form').prepend(`<h1 id="bathroom-rater-name">` + bathroomToRate + `</h1>`);


  setTimeout(function(){
    $('#helper-overlay').fadeOut();
  }, 2000);
}

function goBack(){
  $('#rate_bathroom_screen').animate({left: '100%'});
  $('#rating-container').empty();
  $('#added-comment').val("");
  $('#handicap-bool-img').css('filter', 'grayscale(100%)');
}

function toggleHandicap(){
  if(handi == true){
    $('#handicap-bool-img').css('filter', 'grayscale(100%)');
    handi = false;
  }
  else {
    $('#handicap-bool-img').css('filter', 'grayscale(0%)');
    handi = true;
  }
}

function growRating(){
  //check if counter is at 5, if so empty container
  if(rateCounter >= 5){
    $('#rating-container').empty();
    rateCounter = 0;
    fooCount = 0;
    dooCount = 0;
    return;
  }
  //add half picture
  if(halfUp == false){
    $('#rating-container').append(`<img style="display:none" id="removeable-` + dooCount + `" src="assets/half-soap-bar.png">`);
    $('#removeable-' + dooCount).fadeIn('normal');
    halfUp = true;
    return;
  }
  //replace half with whole pic
  if(halfUp == true){
    $('#removeable-' + dooCount).fadeOut('normal');
    $('#removeable-' + dooCount).remove();
    dooCount++;
    $('#rating-container').append(`<img id="foo-` + fooCount + `" style="display:none" src="assets/whole-soap-bar.png">`);
    $('#foo-' + fooCount).fadeIn('slow');
    halfUp = false;
    fooCount++;
    rateCounter++;
    return;
  }
}

function grabComment(){
  //grab comment from textarea
  //check if its null
  var textAreaText = $('#added-comment').val();
  if(textAreaText == null || textAreaText == ""){
    console.log("Null Comment Submitted")
    return;
  }

  //if not, then attach it to the JSON array to the
  // corilated bathroom

}
