 /* eslint-disable */
// audio-worklet-processor.js
class AudioWorkletProcessor {
    constructor(){

        this.buffer = [];
    }
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

      if (input && output) {
          for (let channel = 0; channel < output.length; channel++) {
              const inputChannel = input[channel];
              const outputChannel = output[channel];

              if(inputChannel && outputChannel){
                  for (let i = 0; i < inputChannel.length; i++) {
                      outputChannel[i] = inputChannel[i]
                  }
              }

          }
      }

    return true;
  }
}


registerProcessor("audio-worklet-processor", AudioWorkletProcessor);