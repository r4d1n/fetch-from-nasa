'use strict'

const NASA_API_KEY = require('../env.json').NASA_KEY

function getRoverManifest() {
  const manifestURI = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=${NASA_API_KEY}`
  return fetch(manifestURI)
  .then((res) => res.json())
}

// sol: sol from manifest
// list: number of images for this sol from the manifest
function getImgSources(sol, list) {
  console.log('get sources', sol);
  const uri = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`
  return fetch(uri)
  .then((res) => res.json())
  .then((json) => {
    while (json.photos.length) {
      list.push(json.photos.shift())
      console.log('photos length', json.photos.length,'in sol', sol, 'list length', list.length, list[list.length - 1]);
    }
    return list
  })
  .catch((err) => {
    console.warn(err)
  })
}

getRoverManifest()
.then((res) => {
  console.log(res.photo_manifest.photos)
  const list = []
  while (res.photo_manifest.photos.length) {
    let sol = res.photo_manifest.photos.pop()
    console.log(sol);
    getImgSources(sol.sol, list)
  }
  console.log('the list', list);
})
