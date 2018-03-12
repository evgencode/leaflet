'use strict';
import React, { Component } from 'react';
import { log } from '../utils';

import {
  LayerGroup,
  Map,
  Marker,
  TileLayer
} from 'react-leaflet';

import { fetchLayers, fetchSave } from '../mock';

class AppMap extends Component {

  state = {
    lat: 56.323,
    lng: 43.995,
    zoom: 13,
    attribution: 'copyright',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    layers: []
  }

  /**
   * Add new layer
   * @param evt
   */
  addLayer = (evt) => {
    evt.preventDefault();
    if(!this.input.value.trim()) {
      alert('Please, tap the layer name');
      return;
    }
    const arIds = this.state.layers.map(l => l.id);
    const nextId = arIds.length ? Math.max(...arIds)+1 : 1;
    this.setState({
      layers: [
        ...this.state.layers.map(l => ({...l, checked: false})),
        ...[{
          id: nextId,
          name: this.input.value,
          checked: true,
          markers: []
        }]
      ]
    });
  }

  /**
   * rename active layer
   * @param evt
   */
  renameLayer = (evt) => {
    evt.preventDefault();
    if(!this.input.value.trim()) {
      alert('The layer name is empty');
      return;
    }
    this.setState({
      layers: this.state.layers.map(l => {
        if(l.checked) {
          return {
            ...l,
            name: this.input.value.trim()
          }
        }
        return l;
      })
    })
  }

  deleteLayer = (evt) => {
    evt.preventDefault();
    this.setState(() => ({
      layers: this.state.layers.filter(l => {
        return !l.checked;
      })
    }), () => {
      this.setInput();
    })

  }

  /**
   * Add marker to active layer
   * @param evt
   */
  addMarker = (evt) => {
    if(!this.state.layers.some(l => l.checked)) {
      alert('Please, choose the layer');
      return;
    }
    let activeLayer = this.state.layers.find(l => l.checked);
    let arIds = activeLayer.markers.map(m => m.id);
    let nextId = arIds.length ? Math.max(...arIds)+1 : 1;

    this.setState({
      layers: this.state.layers.map(l => {
        if(l.checked) {
          return {
            ...l,
            markers: [
              ...l.markers,
              {
                id: nextId,
                position: Object.values(evt.latlng)
              }
            ]
          }
        }
        return l;
      })
    })
  }

  /**
   * delete marker from active layer
   * @param layerId
   * @param markerId
   */
  deleteMarker = (layerId, markerId) => {
    this.setState({
      layers: this.state.layers.map(l => {
        if(l.id == layerId) {
          return {
            ...l,
            markers: l.markers.filter(m => m.id !== markerId)
          }
        }
        return l;
      })
    })
  }

  /**
   * Select layer
   * @param evt
   */
  selectLayer = (evt) => {
    const id = +evt.target.value;
    this.setState(() => ({
      layers: this.state.layers.map(l => {
        return l.id == id ? {...l, checked: true} : {...l, checked: false}
      })
    }), () => {
      this.setInput();
    })
  }

  save = async (evt) => {
    evt.preventDefault();
    const result = await fetchSave(this.state.layers);
    log(result)
    alert('Saved');
  }

  setInput = () => {
    this.input.value = '';
    this.state.layers.forEach(l => {
      if(l.checked) {
        this.input.value = l.name;
      }
    })
  }

  componentDidMount() {
    fetchLayers().then(layers => {
      this.setState({layers});
      this.setInput();
    })
  }


  render() {
    const position = [this.state.lat, this.state.lng]
    const { layers, attribution, url } = this.state;
    let checked = 0;
    layers.forEach(l => { if(l.checked) checked = l.id });

    return (
      <div>
        <div className="control">
          <form>
            <input type="text" placeholder="Add new layer" ref={(inpt) => this.input = inpt}/>
            <button onClick={this.addLayer}>Add</button>
            <button onClick={this.renameLayer}>Rename</button>
            <button onClick={this.deleteLayer}>Delete</button>
            <button onClick={this.save}>Save State</button>
          </form>
        </div>
        <div className="switcher">
          <select onChange={this.selectLayer} value={checked}>
            <option>--</option>
            {
              layers.map(layer => <option value={layer.id} key={layer.id}>{layer.name}</option>)
            }
          </select>
        </div>
        <Map id="app_map" center={position} zoom={this.state.zoom} onClick={this.addMarker}>
            <TileLayer
              attribution={attribution}
              url={url}
            />
            {
              layers.map(layer => {
                return (
                  layer.checked && (
                    <LayerGroup key={layer.id}>
                      {
                        layer.markers.map(marker =>
                          <Marker position={marker.position} key={marker.id} onClick={() => {this.deleteMarker(layer.id, marker.id)}}/>)
                      }
                    </LayerGroup>
                  )
                )
              })
            }
        </Map>
      </div>
    )
  }
}


export default AppMap;