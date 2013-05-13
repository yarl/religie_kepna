var mapa = {};
var poi = {};

//podklady
var layers = {};
layers.attrib = ' &copy; autorzy <a href="http://openstreetmap.org">OpenStreetMap</a> (lic. <a href="http://www.openstreetmap.org/copyright">CC BY-SA 2.0 oraz ODbL</a>)';
layers.osmapa = new L.tileLayer(
    'http://{s}.osm.trail.pl/osmapa.pl/{z}/{x}/{y}.png',
    {attribution: layers.attrib, maxZoom: 18, opacity:0.8}
); 
layers.osm = new L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: layers.attrib, maxZoom: 18, opacity:0.8}
);


//punkty
poi.array = new Array();    //tablica na itemy
poi.list = new Array();
poi.item = function(coord, desc) {
    this.coord = coord;
    this.desc = desc;
    this.getMarker = function() {
        var m = new L.Marker(this.coord);
            m.bindPopup(this.desc);
        return m;
    };
};


$(document).ready(function() {
    //init mapy
    mapa = L.map('map', {
        center: new L.LatLng(51.2790, 17.9850),
        zoom: 14,
        layers: [layers.osmapa],
        minZoom: 3
    });
    mapa.controlLayers = {
        "OpenStreetMap": layers.osm,
        "Osmapa": layers.osmapa
    };
    
    //maly konfig
    L.control.layers(mapa.controlLayers, null).addTo(mapa);    
    mapa.attributionControl.setPrefix('');
    new L.Hash(mapa);
    $(".leaflet-control-zoom").append( $("#map-loading") );
    
    mapa.dodaj = function(coor_, title, desc) {
        var coor = new L.LatLng(coor_[0], coor_[1]);
        var text = "<p><strong>"+title+"</strong><br />"+desc+"</p>";
        
        var flag = false;
        for(var i in poi.array) {
            if(poi.array[i].coord.equals(coor)) {
                poi.array[i].desc += text;
                flag = true;
                break;
            }
        }
        if(!flag)
            poi.array.push(new poi.item(coor, text));
    };
    
    mapa.wyswietl = function() {
        for(var i in poi.array) {
            poi.array[i].getMarker().addTo(mapa);
            //todo: lista
        }
    };
});

