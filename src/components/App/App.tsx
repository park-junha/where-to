import React, { Component, Suspense, lazy } from 'react';
import { v4 } from 'uuid';

import {
  AppContents,
  LandingPageItems,
  NewPortalForm
} from '../../models/interfaces';
import { PortalFormType } from '../../models/enums';
import renderVisuals from '../../utils/renderVisuals';
import validatePortal from '../../utils/validatePortal';

import loadContents from '../../utils/loadContents';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LoadingPage from '../LoadingPage/LoadingPage';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import EditPortals from '../EditPortals/EditPortals';
import ItemModal from '../ItemModal/ItemModal';
import SettingsModal from '../SettingsModal/SettingsModal';

interface Props {
  renderVisuals?: boolean;
}

interface State {
  component: string;
  contents: AppContents;
  showItemModal: boolean;
  showSettingsModal: boolean;
}

interface App {
  mount?: any;
}

const NotFound = lazy(() => import('../NotFound/NotFound'));

class App extends Component<Props, State> {
  state: State = {
    component: 'LandingPage',
    contents: loadContents(),
    showItemModal: false,
    showSettingsModal: false
  };

  componentDidMount(): void {
    if (this.props.renderVisuals) {
      renderVisuals(this.mount);
    }
  }

  renderComponent = (): JSX.Element => {
    switch(this.state.component) {
    case 'LandingPageNoFade':
      return (
        <LandingPage
          nofade={true}
          portalSize={this.state.contents.settings.portalSize}
          contents={this.state.contents.main}
          switchComponent={this.switchComponent}
        />
      );
    case 'LandingPage':
      return (
        <LandingPage
          portalSize={this.state.contents.settings.portalSize}
          contents={this.state.contents.main}
          switchComponent={this.switchComponent}
        />
      );
    case 'EditPortals':
      return (
        <EditPortals
          contents={this.state.contents.main}
          editPortals={this.editPortals}
          clonePortal={this.clonePortal}
          editPortal={this.editPortal}
          portalSize={this.state.contents.settings.portalSize}
          removePortal={this.removePortal}
          validatePortalForm={this.validatePortalForm}
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

  showSettingsModal = (): void => {
    this.setState({
      showSettingsModal: true
    });
  }

  hideSettingsModal = (): void => {
    this.setState({
      showSettingsModal: false
    }, this.saveCurrentState);
  };

  switchComponent = (newComponent: string): void => {
    this.setState({
      component: newComponent
    });
  };

  saveCurrentState = (): void => {
    localStorage.setItem('contentsMain',
      JSON.stringify(this.state.contents.main));
    localStorage.setItem('settings',
      JSON.stringify(this.state.contents.settings));
  };

  validatePortalForm = (portal: NewPortalForm, formType: PortalFormType):
    Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      validatePortal(portal).then(() => {
        if (formType === PortalFormType.add &&
          (this.state.contents.main.length >=
            this.state.contents.settings.maxPortals)) {
          reject('ERROR: Maximum number of portals reached.');
        }
        resolve('');
      })
      .catch((err) => {
        reject(err);
      });
    });
  };

  createPortal = (portal: NewPortalForm): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      this.validatePortalForm(portal, PortalFormType.add)
        .then(() => {
          this.setState(prevState => ({
            ...prevState,
            contents: {
              ...prevState.contents,
              main: [
                ...prevState.contents.main,
                {
                  ...portal,
                  id: v4()
                }
              ]
            }
          }), this.saveCurrentState);
          resolve('');
        })
        .catch((err) => {
          reject(err)
        });
    });
  };

  editPortals = (newPortals: LandingPageItems): void => {
    this.setState(prevState => ({
      ...prevState,
      contents: {
        ...prevState.contents,
        main: newPortals
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
      ...prevState,
      contents: {
        ...prevState.contents,
        main: [
          ...prevState.contents.main.slice(0, index),
          {
            ...portal,
            id: v4()
          },
          ...prevState.contents.main.slice(index + 1)
        ]
      }
    }), this.saveCurrentState);
  };

  clonePortal = (idToEdit: string, portal: NewPortalForm): void => {
    const index = this.state.contents.main.findIndex(i =>
      i.id === idToEdit);
    if (index === -1) {
      console.error('Error: Could not clone portal.');
      return;
    };
    this.setState(prevState => ({
      ...prevState,
      contents: {
        ...prevState.contents,
        main: [
          ...prevState.contents.main.slice(0, index + 1),
          {
            ...portal,
            id: v4()
          },
          ...prevState.contents.main.slice(index + 1)
        ]
      }
    }), this.saveCurrentState);
  };

  removePortal = (idToRemove: string): void => {
    this.setState(prevState => ({
      ...prevState,
      contents: {
        ...prevState.contents,
        main: [
          ...prevState.contents.main.filter(item => item.id !== idToRemove)
        ]
      }
    }), this.saveCurrentState);
  };

  updatePortalSize = (newPortalSize: number): void => {
    this.setState(prevState => ({
      ...prevState,
      contents: {
        ...prevState.contents,
        settings: {
          ...prevState.contents.settings,
          portalSize: newPortalSize
        }
      }
    }), this.saveCurrentState);
  };

  resetPortals = (): void => {
    localStorage.removeItem('contentsMain');
    localStorage.removeItem('settings');
    this.setState({
      contents: loadContents(),
      component: 'LandingPageNoFade'
    }, this.saveCurrentState);
    this.hideSettingsModal();
  };

  loadContents = (): void => {
    this.setState({
      contents: loadContents(),
      component: 'LandingPageNoFade'
    }, this.saveCurrentState);
    this.hideSettingsModal();
  };

  public render (): JSX.Element {
    return (
      <div className='App'>
        <div
          ref={ref => (this.mount = ref)}
          id='visuals-scene'
        >
        </div>
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
          showSettingsModal={this.showSettingsModal}
          switchComponent={this.switchComponent}
        />
        <ItemModal
          showModal={this.state.showItemModal}
          hideModal={this.hideItemModal}
          removePortal={() => {}}
          submitForm={this.createPortal}
          mode='create'
        />
        <SettingsModal
          showModal={this.state.showSettingsModal}
          hideModal={this.hideSettingsModal}
          loadContents={this.loadContents}
          portalSize={this.state.contents.settings.portalSize}
          updatePortalSize={this.updatePortalSize}
          resetPortals={this.resetPortals}
        />
      </div>
    );
  }
}

export default App;
