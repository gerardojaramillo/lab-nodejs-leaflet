/**
 * @author
 *   Gerardo Jaramillo (https://gerardojaramillo.dev)
 * 
 * index.js
 */

import './css/styles.css'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const log = console.log;

const err = console.error;

const url = 'geo.geojson';
const response = await fetch(url, { method: 'get' });

const result = await response.json();
log('result', result);

const opts = {
    attributionControl: false,
    boxZoom: true,
    center: [0, 0],
    closePopupOnClick: true,
    doubleClickZoom: true,
    dragging: true,
    fadeAnimation: true,
    preferCanvas: false,
    zoom: 13,
    zoomAnimation: true,
    zoomAnimationThreshold: 4,
    zoomControl: true,
    zoomDelta: 0.5,
    zoomSnap: 0.1,
}

const map = L.map('map', opts);

const style = {
    color: '#fff',
    fillColor: '#ffc107',
    fillOpacity: 1.0,
    weight: 1.2,
    interactive: true,
};

const geoLayer = L.geoJSON(result, {
    style: style,
    onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.id}`)
            .on('mousemove', e => {
                log('mouse moving...')
            })
            .on('click', e => {
                log(feature.properties);
            });
    },
}).addTo(map);

let allBounds = null;
map.eachLayer(layer => {
    if (layer instanceof L.GeoJSON) {
        let bounds = layer.getBounds();
        allBounds = allBounds ? allBounds.extend(bounds) : bounds;
    }
});

if (allBounds) {
    map.invalidateSize();
    map.fitBounds(allBounds, { padding: [20, 20] });
}





