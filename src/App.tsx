import React, { Component, Suspense, lazy } from 'react';
import { v4 } from 'uuid';
import { isUri } from 'valid-url';
import * as THREE from 'three';

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import EditPortals from './components/EditPortals/EditPortals';
import ResetModal from './components/ResetModal/ResetModal';
import ItemModal from './components/ItemModal/ItemModal';
import {
  AppContents,
  LandingPageItems,
  NewPortalForm,
  PortalFormType,
  DEFAULT_PORTALS,
  MAX_PORTALS
} from './shared';

import smoke from './img/smoke.png';

interface State {
  component: string;
  contents: AppContents;
  showItemModal: boolean;
  showResetModal: boolean;
  maxPortals: number;
}

interface App {
  mount?: any;
}

const NotFound = lazy(() => import('./components/NotFound/NotFound'));

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
    'main': main,
    'footer': []
  }
};

const loadMaxPortals = (): number => {
  let storedMaxPortals = localStorage.getItem('maxPortals');
  if (storedMaxPortals === null) {
    localStorage.setItem('maxPortals', MAX_PORTALS.toString());
    return MAX_PORTALS;
  } else {
    return parseInt(storedMaxPortals);
  }
};

const setDefaultContents = (): LandingPageItems => {
  return DEFAULT_PORTALS ?? [];
};

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage',
    contents: loadContents(),
    maxPortals: loadMaxPortals(),
    showItemModal: false,
    showResetModal: false
  };

  componentDidMount(): void {
    this.renderVisuals()
  }

  //  TODO (park-junha): Can we make this more performant?
  renderVisuals = (): void => {
    let scene: THREE.Scene = new THREE.Scene();
    let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(60,
      window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient: THREE.AmbientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    let cloudParticles: THREE.Mesh[] = [];

    scene.fog = new THREE.FogExp2(0x011014, 0.001);
    renderer.setClearColor(scene.fog.color);

    this.mount.appendChild(renderer.domElement);

    //  Render the sick visuals
    let renderScene = function () {
      renderer.render(scene, camera);
      requestAnimationFrame(renderScene);
      cloudParticles.forEach(p => {
        p.rotation.z -= 0.001;
      });
    };

    let loader = new THREE.TextureLoader();

    //  Load clouds
    loader.load(smoke, function (texture) {
      let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
      let cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      for(let p = 0; p < 19; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400
          , 500
          , Math.random() * 500 - 500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 2 * Math.PI;
        cloud.material.opacity = 0.55;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    });

    //  Lights
    let darkBlueLight: THREE.PointLight =
      new THREE.PointLight(0x021024, 50, 450, 1.7);
    let blueLight: THREE.PointLight =
      new THREE.PointLight(0x0000cc, 50, 450, 1.7);
    let lochmaraLight: THREE.PointLight =
      new THREE.PointLight(0x3677ac, 50, 450, 1.7);

    darkBlueLight.position.set(100, 300, 100);
    blueLight.position.set(100, 300, 100);
    lochmaraLight.position.set(300, 300, 200);

    scene.add(darkBlueLight);
    scene.add(blueLight);
    scene.add(lochmaraLight);

    //  Resize scene on window resize
    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    renderScene();
    window.addEventListener('resize', onWindowResize, false);
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

  validatePortalForm = (portal: NewPortalForm, formType: PortalFormType):
    Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (portal.title.length <= 0) {
        reject('ERROR: Please enter a name.');
      }
      if (portal.url.length <= 0) {
        reject('ERROR: Please enter a URL.');
      }
      if (formType === PortalFormType.add &&
        (this.state.contents.main.length >= this.state.maxPortals)) {
        reject('ERROR: Maximum number of portals reached.');
      }
      if (!isUri(portal.url)) {
        reject('ERROR: Invalid URL.')
      }
      resolve('');
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

  resetPortals = (): void => {
    localStorage.removeItem('contentsMain');
    this.setState({
      contents: loadContents(),
      component: 'LandingPageNoFade'
    });
    this.hideResetModal();
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
