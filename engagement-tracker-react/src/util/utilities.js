import * as tf from "@tensorflow/tfjs";

export const detect = async (net, webcamRef, canvasRef, updateEngagementLevel) => {
    if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const img = tf.browser.fromPixels(video)
        const resized = tf.image.resizeBilinear(img, [120,120])
        const normalized = resized.div(tf.scalar(255.0))
        
        const casted = normalized.cast('float32')
        const expanded = casted.expandDims(0)

        const obj = await net.predict(expanded)

        const isFace = await obj[0].array()
        const isEngaged = await obj[1].array()
        const boxes = await obj[2].array()
        
        const ctx = canvasRef.current.getContext("2d");

        requestAnimationFrame(
            () => {
                drawRect(boxes[0], isFace[0], isEngaged[0], videoWidth, videoHeight, ctx, updateEngagementLevel)
            }); 

        tf.dispose(img)
        tf.dispose(resized)
        tf.dispose(normalized)
        tf.dispose(casted)
        tf.dispose(expanded)
        tf.dispose(obj)
    }
}

export const drawRect = (boxes, isFace, isEngaged, imgWidth, imgHeight, ctx, updateEngagementLevel) => {
    boxes[0] = boxes[0] * imgWidth
    boxes[1] = boxes[1] * imgHeight
    boxes[2] = boxes[2] * imgWidth
    boxes[3] = boxes[3] * imgHeight

    if(isFace[0] > 0.7){
        const [x1, y1, x2, y2] = boxes
        
        if (isEngaged[0] > 0.9) {
            updateEngagementLevel(1)

            ctx.strokeStyle = '#32cd80'
            ctx.lineWidth = 10
            ctx.fillStyle = '#f5f5f5'
            ctx.font = '1.2em Staatliches'         
            
            ctx.beginPath()
            ctx.fillText('Engaged: ' + Math.round(isEngaged[0] * 100) / 100, x1, y1 - 10)
            ctx.rect(x1, y1, (x2 - x1), (y2 - y1));
            ctx.stroke()
        } else {
            updateEngagementLevel(-1)

            ctx.strokeStyle = '#ff4d4d'
            ctx.lineWidth = 10
            ctx.fillStyle = '#f5f5f5'
            ctx.font = '1.2em Staatliches'         
            
            ctx.beginPath()
            ctx.fillText('Not Engaged: ' + Math.round((1 - isEngaged[0]) * 100) / 100, x1, y1 - 10)
            ctx.rect(x1, y1, (x2 - x1), (y2 - y1));
            ctx.stroke()
        }
    } else {
        updateEngagementLevel(-1)
    }
}