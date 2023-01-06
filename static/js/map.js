//-- TODO:
//      Geolocation - get user's current location
//                  - https://www.youtube.com/watch?v=oVr6unKZbg4

function initMap() {
   const sfBayCoords = {
      lat: 37.601773,
      lng: -122.20287,
    };
    
    const basicMap = new google.maps.Map(document.querySelector('#map'), {
      center: sfBayCoords,
      zoom: 11,
    });

    const sfMarker = new google.maps.Marker({
      position: sfBayCoords,
      title: 'SF Bay',
      map: basicMap,
    });
  
    sfMarker.addListener('click', () => {
      alert('Hi!');
    });
  
    const sfInfo = new google.maps.InfoWindow({
      content: '<h1>San Francisco Bay!</h1>',
    });
  
    sfInfo.open(basicMap, sfMarker);
  
    const locations = [
      {
        name: 'Hackbright Academy',
        coords: {
          lat: 37.7887459,
          lng: -122.4115852,
        },
      },
      {
        name: 'Powell Street Station',
        coords: {
          lat: 37.7844605,
          lng: -122.4079702,
        },
      },
      {
        name: 'Montgomery Station',
        coords: {
          lat: 37.7894094,
          lng: -122.4013037,
        },
      },
    ];
  
    const markers = [];
    for (const location of locations) {
      markers.push(
        new google.maps.Marker({
          position: location.coords,
          title: location.name,
          map: basicMap,
         //  icon: {
         //    // custom icon
         //    url: '/static/img/marker.svg',
         //    scaledSize: {
         //      width: 30,
         //      height: 30,
         //    },
         //  },
        }),
      );
    }
  
    for (const marker of markers) {
      const markerInfo = `
        <h1>${marker.title}</h1>
        <p>
          Located at: <code>${marker.position.lat()}</code>,
          <code>${marker.position.lng()}</code>
        </p>
      `;
  
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo,
        maxWidth: 200,
      });
  
      marker.addListener('click', () => {
        infoWindow.open(basicMap, marker);
      });
    }  

    //-------------------------------------
    // Google places autocompletion
    //-------------------------------------
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("search"),
      {
        componentRestrictions: {'country': ['us']},
        // fields: ['geometry', 'name', 'formatted_address', 'photos'],
        fields: ['geometry', 'name', 'formatted_address'],
        types: ['establishment']
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        const formatted_address = place.formatted_address;
        const name = place.name;
        const photos = place.photos;

        console.log("Photos: ", photos);
        console.log("name: ", name);
        console.log("Address: ", formatted_address);

        if (!place.geometry) {
          alert("No location found");
          //-- Clear
          document.getElementById("search").value = "";
        } else {
          //-- Place a marker
          new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: basicMap
          });

          //-- Center map to searched location
          basicMap.setCenter(place.geometry.location);
          basicMap.setZoom(18);

          // Fetch: add new search result to history
          // Fetch: get history
          // Update frontend using querySelector

          //-- Add to history in the database
          const history = document.querySelector('.history');

        }
      });
 }