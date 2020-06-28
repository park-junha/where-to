import React, {
  Component
  , Suspense
  , lazy
} from 'react';
import LoadingScreen from './LoadingScreen';
import Footer from './components/Footer';
import {
  AppContents
  , LandingPageLayout
} from './interfaces';

interface State {
  component: string;
  contents: AppContents;
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

const setDefaultContents = (): LandingPageLayout => {
  return [
    [
      {
        id: '100-000001'
        , title: 'Facebook'
        , url: 'https://www.facebook.com'
      }
      , {
        id: '100-000002'
        , title: 'Amazon'
        , url: 'https://www.amazon.com'
      }
      , {
        id: '100-000003'
        , title: 'Netflix'
        , url: 'https://www.netflix.com'
      }
      , {
        id: '100-000004'
        , title: 'Google'
        , url: 'https://www.google.com'
      }
    ]
  ]
}

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
    , contents: loadContents()
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
        <Footer />
      </div>
    );
  }
}

export default App;
