import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

function Mic() {
  const [isRecording, setIsRecording] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    const files = document.getElementById('soundBlob');

    const formData = new FormData();

    for (let i = 0; i < files.files.length; i++) {
      console.log(files.files[i]);
      formData.append('soundBlob', files.files[i]);
    }

    fetch('http://localhost:3001/upload_sound', {
      method: 'POST',
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => ('Error occured', err));
  }

  const onData = (recordedBlob) => {
    // console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    // console.log('recordedBlob is: ', recordedBlob);

    const formData = new FormData();

    recordedBlob.blob.lastModifiedDate = new Date();
    recordedBlob.blob.filename = 'recording.mp3';

    let file = new File([recordedBlob.blob], 'recording.mp3', {
      type: 'audio/mpeg',
    });
    console.log(file);

    formData.append('soundBlob', file);

    fetch('http://localhost:3001/upload_sound', {
      method: 'post',
      body: formData,
      // headers: new Headers({
      //   enctype: 'multipart/form-data',
      // }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log('Error occurred', err));
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        className='sound-wave'
        mimeType='audio/mp3'
        onStop={onStop}
        onData={onData}
        strokeColor='#000000'
        backgroundColor='#FF4081'
      />
      <button onClick={() => setIsRecording(true)} type='button'>
        Start
      </button>
      <button onClick={() => setIsRecording(false)} type='button'>
        Stop
      </button>
      <div className='container'>
        <form id='form' onSubmit={submitForm}>
          <input id='soundBlob' type='file' />
          <button className='submit-btn' type='submit'>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Mic;
