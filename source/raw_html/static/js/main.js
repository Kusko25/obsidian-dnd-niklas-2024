// Coordinates in CRS.Simple take the form of [y, x] instead of [x, y].
const AYUN_MAP_HEIGHT = 2483;
const AYUN_MAP_WIDTH = 3513;
const AYUN_MAP_RATIO = AYUN_MAP_HEIGHT / AYUN_MAP_WIDTH;

//#region Map
// TODO: fix the bounds
const bounds = [[0,0],[2483,3513]];

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1.7,
    maxBounds: bounds
});
map.fitBounds(bounds);
const image = L.imageOverlay("./assets/Ayun-Map-Aktuell.jpg", bounds).addTo(map)
const paintToPoint = (coords) => ([AYUN_MAP_HEIGHT-coords[1],coords[0]]) ;

// keyword configurations for markers
const config_markers = {

};
const config_city_marker = {
    ...config_markers,
    icon: L.icon({
        iconUrl: './assets/town-icon.png',
        iconSize: [32, 37],
    })
};
const minorCityPopup = (label ,href, flavor) => (
    "<b>" + label + "</b><br><i>" + flavor + "</i><br><a href='" + href + "' target='_blank'>More Info</a>"
)
const markers = {
    majorCities: {

    },
    minorCities: {
        amstedaim: L.marker(
            paintToPoint([1274,834]),
            config_city_marker
        ).bindPopup(minorCityPopup("Amstedaim", "./Orte/Städte/Amstedain", "A small town known for its beautiful landscapes.")),
        moulin: L.marker(paintToPoint([1423,931]), config_city_marker).bindPopup(minorCityPopup("Moulin", "./Orte/Städte/Moulin", "A quaint village famous for its windmill.")),
        ledreux: L.marker(paintToPoint([1474,1025]), config_city_marker).bindPopup(minorCityPopup("Ledreux", "./Orte/Städte/Ledreux", "A bustling town known for its markets.")),

    },
    encounters: {

    }
};

const majorCityMarkers = new L.FeatureGroup();
const minorCityMarkers = new L.FeatureGroup();
for (const key in markers["minorCities"]) {    
    const element = markers["minorCities"][key];
    minorCityMarkers.addLayer(element);
}
const encounterMarkers = new L.FeatureGroup();

map.on('zoomend', function() {
    if (map.getZoom() <0){
            map.removeLayer(minorCityMarkers);
    }
    else {
            map.addLayer(minorCityMarkers);
        }
});

// TODO: https://ruibarreira.github.io/jvectormap-svg-converter/