from flask import Flask, request, send_file, make_response
from flask_cors import CORS
import cv2
import numpy as np
from io import BytesIO
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
cors = CORS(app, resources={
            r"/process_image": {"origins": "http://localhost:3000"}})

# Load the pre-trained YOLO model and class names
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
classes = []
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]


@app.route('/process_image', methods=['POST'])
def process_image_route():
    try:
        # Receive the uploaded image from the React application
        image_file = request.files['image']
        # Convert the image to a format readable by OpenCV
        file_bytes = np.frombuffer(image_file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        height, width, channels = img.shape

        # Process the image using your existing code
        # (Skipping the parts related to input/output file paths)

        # Initialize lists for detected objects and bounding boxes
        detected_objects = []
        bounding_boxes = []
        confidences = []
        class_ids = []

        # Loop through the outputs and extract the bounding boxes, confidences, and class IDs
        blob = cv2.dnn.blobFromImage(
            img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
        net.setInput(blob)
        outputs = net.forward(output_layers)
        for output in outputs:
            for detection in output:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.4:
                    # Extract the bounding box coordinates
                    x = int(detection[0] * width)
                    y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)
                    bounding_boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)

        # Apply non-maximum suppression
        indices = cv2.dnn.NMSBoxes(bounding_boxes, confidences, 0.5, 0.4)

        # Draw the remaining bounding boxes on the image
        for i in indices:
            box = bounding_boxes[i]
            x, y, w, h = box
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            detected_objects.append(classes[class_ids[i]])

        # Print the number of bounding boxes
        num_bounding_boxes = len(indices)
        print(f"Number of bounding boxes: {num_bounding_boxes}")

        # Encode the processed image as JPEG
        _, encoded_img = cv2.imencode('.jpg', img)

        # Create a BytesIO object and write the encoded image data
        output_image_bytes = BytesIO()
        output_image_bytes.write(encoded_img)
        output_image_bytes.seek(0)

        # Create a response object with the processed image and headers
        response = make_response(
            send_file(output_image_bytes, mimetype='image/jpeg'))
        response.headers['X-Num-BoundingBoxes'] = str(num_bounding_boxes)

        # Return the processed image file
        return response

    except Exception as e:
        print(f"Error processing image: {e}")
        traceback.print_exc()
        return {'error': str(e)}, 500


if __name__ == '__main__':
    app.run(debug=True)
