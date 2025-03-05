import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

export async function loadModel(): Promise<mobilenet.MobileNet> {
  return await mobilenet.load();
}

export async function processSignature(image: string): Promise<tf.Tensor> {
  return new Promise<tf.Tensor>((resolve) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
      resolve(tensor);
    };
  });
}

export async function compareSignatures(
  model: mobilenet.MobileNet,
  sig1: string,
  sig2: string
): Promise<number> {
  const t1 = await processSignature(sig1);
  const t2 = await processSignature(sig2);

  const features1 = model.infer(t1, true);
  const features2 = model.infer(t2, true);

  const similarity = tf.losses
    .cosineDistance(features1, features2, 0)
    .dataSync()[0];
  return 1 - similarity;
}
