import React, {
  Component
, Suspense
, lazy
} from 'react';
import LoadingScreen from './LoadingScreen';
import Footer from './components/Footer';
import './App.css';

interface State {
  component: string;
}

const LandingPage = lazy(() => import('./components/LandingPage'));
const NotFound = lazy(() => import('./components/NotFound'));

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
  };

  renderComponent = (): JSX.Element => {
    switch(this.state.component) {
    case 'LandingPage':
      return (
        <LandingPage />
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
