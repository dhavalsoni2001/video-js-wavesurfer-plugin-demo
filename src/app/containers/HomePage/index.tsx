import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

export function HomePage() {
  let audioNode : any = useRef();
  const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 600,
    height: 300,
    fluid: false,
    plugins: {
        wavesurfer: {
            backend: 'MediaElement',
            displayMilliseconds: true,
            debug: true,
            waveColor: '#163b5b',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};
useEffect(() => {
let player = videojs(audioNode, videoJsOptions, () => {
  // print version information at startup
  const version_info = 'Using video.js ' + videojs.VERSION +
      ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
      ' and wavesurfer.js ' + WaveSurfer.VERSION;
  videojs.log(version_info);

  // load file
  player.src({src: 'hal.wav', type: 'audio/wav'});
});

player.on('waveReady', (event) => {
  console.log('waveform: ready!');
});

player.on('playbackFinish', (event) => {
  console.log('playback finished.');
});

// error handling
player.on('error', (element, error) => {
  console.error(error);
});
},[])

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <div data-vjs-player>
            <audio id="myAudio" ref={ node => audioNode = node} className="video-js vjs-default-skin"></audio>
      </div>
      <NavBar />
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper>
    </>
  );
}
