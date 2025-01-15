// audio-worklet.js
export const createAudioWorkletNode = async (
    audioContext: AudioContext,
    sourceNode: AudioNode
): Promise<AudioWorkletNode | null> => {
    try {
        const url = new URL("./audio-worklet-processor.js", import.meta.url);
       await audioContext.audioWorklet.addModule(url);

      const workletNode = new AudioWorkletNode(
         audioContext,
            'audio-worklet-processor'
       );

       sourceNode.connect(workletNode);
        return workletNode;
    } catch (error) {
        console.error("Error creating AudioWorkletNode:", error);
        return null;
    }
};