import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joyride from 'react-joyride';
import './react-joyride-compiled.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
// import {ButtonToolbar, Button} from 'react-bootstrap'

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.resetTour = this.resetTour.bind(this);
    this.state = {
      modalIsOpen: true,
      run: false,
      showModal: true,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.yes = this.yes.bind(this);
    this.never = this.never.bind(this);
    this.close = this.close.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
  } 

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleSelect(index, last) {
    if (this.joyride.getProgress().index === 2) {
      setTimeout(() => {
        this.joyride.next();
        }, 1); 
    }
  }

  handleJoyrideCallback(result) {
    const{joyride} = this.props;

    if (result.action == 'close') {
      this.setState({run: false});
    }

  }

  resetTour() {
    console.dir(this);
    this.joyride.reset(true);
    this.setState({run: true});
  }

  // const buttonsInstance = (
  //   <ButtonToolbar>
  //     <Button href="#">Link</Button>
  //     <Button>Button</Button>
  //   </ButtonToolbar>// );

  /* Modal funcs */
  // Yes! start tour
  yes() {
    this.closeModal();
    this.setState({run: true});
  }

  never() {
    this.closeModal();
    this.close();
  }

  close(){
    this.setState({ showModal: false });
  }

  render() {

    return (
      <div className="App">
        <Joyride
          ref={c => (this.joyride = c)}
          steps={[
            {
              title: 'Start',
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
          run={this.state.run} // or some other boolean for when you want to start it
          type={"continuous"}
          showOverlay={true}
          allowClicksThruHole={true}
          autoStart={this.state.run}
          disableOverlay={true}
          showSkipButton={true}
          callback={this.handleJoyrideCallback}
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
            <Tab onChange={this.resetTour} >One</Tab>
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

        <Modal
          className="modal"
          overlayClassName ="modal-overlay"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="prototype Modal"
          show={this.state.showModal} 
          onHide={this.close}
        >

          <h2 className="modal-title">Welcome!</h2>
          <div className="modal-content">Would you like to start the walkthrough tutorial?</div>
          <button onClick={this.yes} className="modal-button">Yes!</button>
          <button onClick={this.closeModal}>Later</button>
          <button onClick={this.never}>never again...</button>
        </Modal>
      </div>
    );
  }
}

export default App;
