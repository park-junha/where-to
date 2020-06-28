import React, {
  Component
  , Suspense
  , lazy
} from 'react';

import LoadingScreen from './LoadingScreen';
import Footer from './components/Footer';
import NewItemModal from './components/NewItemModal';
import {
  AppContents
  , LandingPageItems
} from './interfaces';
import {
  DEFAULT_PORTALS
} from './locales';

interface State {
  component: string;
  contents: AppContents;
  showNewItemModal: boolean;
}

const LandingPage = lazy(() => import('./components/LandingPage'));
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
}

const setDefaultContents = (): LandingPageItems => {
  return DEFAULT_PORTALS ?? [];
}

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
    , contents: loadContents()
    , showNewItemModal: false
  };

  renderComponent = (): JSX.Element => {
    switch(this.state.component) {
    case 'LandingPage':
      return (
        <LandingPage
          contents={this.state.contents.main}
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

  hideModal = (): void => {
    this.setState({
      showNewItemModal: false
    });
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
          showNewItemModal={this.showNewItemModal}
        />
        <NewItemModal
          showModal={this.state.showNewItemModal}
          hideModal={this.hideModal}
        />
      </div>
    );
  }
}

export default App;
