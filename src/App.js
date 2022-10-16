import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import {FileDrop} from 'react-file-drop'
import { AppCoordinateMap } from './AppCoordinateMap';
import * as ReactDOM from 'react-dom/client';
import Papa from "papaparse"

export default class ConfigureCSVFile extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onDropFiles(files) {

    for (var i=0; i<files.length; i++) {
      var file_type = files[i].type
      var file_size = files[i].size
      
      console.log(files[i].type)
      if (file_type == "text/csv") {
        console.log("CSV file dropped")
        this.parseData(files[i])
      }
      else {
        window.alert("provide valid file type")
      }

    }

  }

  parseData(file) {
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);
      console.log(columns)

      var mapArea = document.getElementById('mappedFields');
      mapArea.innerHTML = this.prepareContent(columns);
    };
    reader.readAsText(file);
    
  }

  prepareContent(columns) {
    var selList = this.prepareSelectList(columns)
    var innerStr = 'Select X map: ' + selList;
    innerStr += '<br />Select Y map: '+ selList;
    innerStr += '<br />Select Z map: '+ selList;
    return innerStr;
  }

  prepareSelectList(columns) {
    var innerStr = '<select>';
    for(var i=0; i<columns.length; i++) {
      innerStr += '<option value="' + columns[i] + '">' + columns[i] + '</option>'
    }
    innerStr += '</select>'
    return innerStr;
  }

  render() {
    const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
      <div>
        <div style={styles}>
          <FileDrop 
            /* onFrameDragEnter={(event) => console.log('onFrameDragEvent',event)}
            onFrameDragLeave={(event) => console.log('onFrameDragEvent',event)}
            onFrameDrop={(event) => console.log('onFrameDropEvent', event)}
            onDragOver={(event) => console.log('onDragOverEvent', event)}
            onDragLeave={(event) => console.log('onDragLeaveEvent', event)} */
            onDrop={(files, event) => this.onDropFiles(files) }
            >
              Drop files here !!!
          </FileDrop>
        </div>
        <div id='mappedFields'>
        </div>
      </div>
    );
  }
}