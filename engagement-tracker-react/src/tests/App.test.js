import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the jest-dom matchers
import App from '../ui/App';
import * as tf from "@tensorflow/tfjs";
import * as utilities from '../util/utilities';
import Footer from '../ui/Footer';
import EngagementTracker from '../ui/EngagementTracker';

// ---------------------------------------- //

jest.mock('../util/utilities', () => ({
    ...jest.requireActual('../util/utilities'),
    detect: jest.fn(),
}));

jest.mock('@tensorflow/tfjs', () => {
  const originalModule = jest.requireActual('@tensorflow/tfjs');
  return {
      __esModule: true,
      ...originalModule,
      loadLayersModel: jest.fn(),
  };
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

// ----------------------------------------- //

it('should load the model and run detection', async () => {
  const fakeModel = {};
  tf.loadLayersModel.mockResolvedValue(fakeModel);
  
  render(<App />);

  await waitFor(() => expect(tf.loadLayersModel).toHaveBeenCalledTimes(1));

  await waitFor(() => {
    expect(utilities.detect).toHaveBeenCalledTimes(1);
  });
});

it('model fails to load, logs exception', async () => {
  const error = new Error('Model loading failed')
  tf.loadLayersModel.mockRejectedValue(error);
  
  render(<App />);

  await waitFor(() => expect(tf.loadLayersModel).rejects.toThrow('Model loading failed'));
});

// ----------------------------------------- //

it('renders Footer', async () => {
  render(<Footer />);
  const version = screen.getByText('v0.1');
  expect(version).toBeInTheDocument();
  const linkedinButton = await screen.findByTestId('linkedin-share-button');
  expect(linkedinButton).toBeInTheDocument();
  const twitterButton = await screen.findByTestId('twitter-share-button');
  expect(twitterButton).toBeInTheDocument();
  const facebookButton = await screen.findByTestId('facebook-share-button');
  expect(facebookButton).toBeInTheDocument();
  const emailButton = await screen.findByTestId('email-share-button');
  expect(emailButton).toBeInTheDocument();
});

// ----------------------------------------- //

it('renders EngagementTracker', async () => {
  render(<EngagementTracker />);
  const webcam = await screen.findByTestId('webcam');
  expect(webcam).toBeInTheDocument();
  const canvas = await screen.findByTestId('canvas');
  expect(canvas).toBeInTheDocument();
  // const graph = await screen.findByTestId('graph');
  // expect(graph).toBeInTheDocument();
});
