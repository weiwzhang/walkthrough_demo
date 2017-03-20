import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joyride from 'react-joyride';
import './react-joyride-compiled.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.resetTour = this.resetTour.bind(this);
  }

  handleSelect(index, last) {
    if (this.joyride.getProgress().index === 2) {
      setTimeout(() => {
        this.joyride.next();
        }, 1); 
    }
  }

  resetTour() {
    console.dir(this);
    this.joyride.reset(true);
    this.callback();
  }

  render() {

    return (
      <div className="App">
        <Joyride
          ref={c => (this.joyride = c)}
          steps={[
            {
              title: 'First Step',
              text: 'Prototype!',
              selector: '.App-intro',
            },
            {
              title: 'Item One',
              selector: '.itemone',
            },
            {
              title: 'Click Tab 2',
              text: 'Hides the "next" button!',
              selector: '.tabtwo',
              style: {
                footer: {
                  display: 'none',
                },
              },
            },
            {
              title: 'Item Two',
              selector: '.itemtwo',
            }
            ]}
          run={true} // or some other boolean for when you want to start it
          type={"continuous"}
          showOverlay={true}
          allowClicksThruHole={true}
          autoStart={true}
          disableOverlay={true}
          showSkipButton={true}
          callback={type:'step:Item One', index:1}
        />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Tabs onSelect={this.handleSelect}>
          <TabList>
            <Tab>One</Tab>
            <Tab className="tabtwo">Two</Tab>
          </TabList>
          <TabPanel>
            <p className="itemone">11111111</p>
          </TabPanel>
          <TabPanel>
            <p className="itemtwo">22222222</p>
          </TabPanel>
        </Tabs>

        <button type="button" onClick={this.resetTour}>Reset Tour</button>
      </div>
    );
  }
}

export default App;
