import React, {
  Component
  , Suspense
  , lazy
} from 'react';
import { uuid } from 'uuidv4';

import LoadingScreen from './LoadingScreen';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import RemovePortals from './components/RemovePortals';
import ResetPortals from './components/ResetPortals';
import NewItemModal from './components/NewItemModal';
import {
  AppContents
  , LandingPageItems
  , NewPortalForm
  , DEFAULT_PORTALS
} from './api';

interface State {
  component: string;
  contents: AppContents;
  showNewItemModal: boolean;
  showResetModal: boolean;
}

const NotFound = lazy(() => import('./components/NotFound'));

const loadContents = (): AppContents => {
  let storedContents = localStorage.getItem('contentsMain');
  let main = [];
  if (storedContents === null) {
    main = setDefaultContents();
    localStorage.setItem('contentsMain', JSON.stringify(main));
  } else {
    main = JSON.parse(storedContents ?? '[]');
  }
  return {
    'main': main
    , 'footer': []
  }
};

const setDefaultContents = (): LandingPageItems => {
  return DEFAULT_PORTALS ?? [];
};

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
    , contents: loadContents()
    , showNewItemModal: false
    , showResetModal: false
  };

  renderComponent = (): JSX.Element => {
    switch(this.state.component) {
    case 'LandingPageNoFade':
      return (
        <LandingPage
          nofade={true}
          contents={this.state.contents.main}
        />
      );
    case 'LandingPage':
      return (
        <LandingPage
          contents={this.state.contents.main}
        />
      );
    case 'RemovePortals':
      return (
        <RemovePortals
          contents={this.state.contents.main}
          removeWebPortal={this.removeWebPortal}
        />
      );
    default:
      return (
        <NotFound />
      );
    }
  };

  showNewItemModal = (): void => {
    this.setState({
      showNewItemModal: true
    });
  }

  hideNewItemModal = (): void => {
    this.setState({
      showNewItemModal: false
    });
  };

  showResetModal = (): void => {
    this.setState({
      showResetModal: true
    });
  }

  hideResetModal = (): void => {
    this.setState({
      showResetModal: false
    });
  };

  switchComponent = (newComponent: string): void => {
    this.setState({
      component: newComponent
    });
  };

  saveCurrentState = (): void => {
    localStorage.setItem('contentsMain',
      JSON.stringify(this.state.contents.main));
  };

  createNewWebPortal = (portal: NewPortalForm): void => {
    this.setState(prevState => ({
      ...prevState
      , contents: {
        ...prevState.contents
        , main: [
          ...prevState.contents.main
          , {
            ...portal
            , id: uuid()
          }
        ]
      }
    }), this.saveCurrentState);
  };

  removeWebPortal = (idToRemove: string): void => {
    this.setState(prevState => ({
      ...prevState
      , contents: {
        ...prevState.contents
        , main: [
          ...prevState.contents.main.filter(
            item => item.id !== idToRemove
          )
        ]
      }
    }), this.saveCurrentState);
  };

  resetPortals = (): void => {
    localStorage.removeItem('contentsMain');
    this.setState({
      contents: loadContents()
      , component: 'LandingPageNoFade'
    });
    this.hideResetModal();
  };

  public render (): JSX.Element {
    return (
      <div className='App'>
        <div className='contents-main'>
          <Suspense fallback={
            <div>
              <LoadingScreen />
            </div>
          }>
            {this.renderComponent()}
          </Suspense>
        </div>
        <Footer
          currentComponent={this.state.component}
          showNewItemModal={this.showNewItemModal}
          showResetModal={this.showResetModal}
          switchComponent={this.switchComponent}
        />
        <NewItemModal
          showModal={this.state.showNewItemModal}
          hideModal={this.hideNewItemModal}
          createNewWebPortal={this.createNewWebPortal}
        />
        <ResetPortals
          showModal={this.state.showResetModal}
          hideModal={this.hideResetModal}
          resetPortals={this.resetPortals}
        />
      </div>
    );
  }
}

export default App;
