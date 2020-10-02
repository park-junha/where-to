import React, {
  Component
  , Suspense
  , lazy
} from 'react';
import { v4 } from 'uuid';

import LoadingScreen from './LoadingScreen';
import LoadingPage from './components/LoadingPage';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import EditPortals from './components/EditPortals';
import ResetModal from './components/ResetModal';
import ItemModal from './components/ItemModal';
import {
  AppContents
  , LandingPageItems
  , NewPortalForm
  , DEFAULT_PORTALS
  , MAX_PORTALS
} from './shared';

interface State {
  component: string;
  contents: AppContents;
  showItemModal: boolean;
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
    , showItemModal: false
    , showResetModal: false
  };

  renderComponent = (): JSX.Element => {
    switch(this.state.component) {
    case 'LandingPageNoFade':
      return (
        <LandingPage
          nofade={true}
          contents={this.state.contents.main}
          switchComponent={this.switchComponent}
        />
      );
    case 'LandingPage':
      return (
        <LandingPage
          contents={this.state.contents.main}
          switchComponent={this.switchComponent}
        />
      );
    case 'EditPortals':
      return (
        <EditPortals
          contents={this.state.contents.main}
          editPortals={this.editPortals}
          editPortal={this.editPortal}
          removePortal={this.removePortal}
        />
      );
    case 'LoadWebsite':
      return (
        <LoadingPage />
      );
    default:
      return (
        <NotFound />
      );
    }
  };

  showItemModal = (): void => {
    this.setState({
      showItemModal: true
    });
  }

  hideItemModal = (): void => {
    this.setState({
      showItemModal: false
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

  createPortal = (portal: NewPortalForm): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (this.state.contents.main.length >= MAX_PORTALS) {
        reject('ERROR: Maximum number of portals reached.');
      } else {
        this.setState(prevState => ({
          ...prevState
          , contents: {
            ...prevState.contents
            , main: [
              ...prevState.contents.main
              , {
                ...portal
                , id: v4()
              }
            ]
          }
        }), this.saveCurrentState);
        resolve('Success!');
      }
    });
  };

  editPortals = (newPortals: LandingPageItems): void => {
    this.setState(prevState => ({
      ...prevState
      , contents: {
        ...prevState.contents
        , main: newPortals
      }
    }), this.saveCurrentState);
  };

  editPortal = (idToEdit: string, portal: NewPortalForm): void => {
    const index = this.state.contents.main.findIndex(i =>
      i.id === idToEdit);
    if (index === -1) {
      console.error('Error: Could not edit portal.');
      return;
    };
    this.setState(prevState => ({
      ...prevState
      , contents: {
        ...prevState.contents
        , main: [
          ...prevState.contents.main.slice(0, index)
          , {
            ...portal
            , id: v4()
          }
          , ...prevState.contents.main.slice(index + 1)
        ]
      }
    }), this.saveCurrentState);
  };

  removePortal = (idToRemove: string): void => {
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
          showItemModal={this.showItemModal}
          showResetModal={this.showResetModal}
          switchComponent={this.switchComponent}
        />
        <ItemModal
          showModal={this.state.showItemModal}
          hideModal={this.hideItemModal}
          removePortal={() => {}}
          submitForm={this.createPortal}
          mode='create'
        />
        <ResetModal
          showModal={this.state.showResetModal}
          hideModal={this.hideResetModal}
          resetPortals={this.resetPortals}
        />
      </div>
    );
  }
}

export default App;
