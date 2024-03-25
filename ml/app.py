from flask import Flask, request, send_file, make_response
from flask_cors import CORS
import cv2
import numpy as np
from io import BytesIO
import traceback
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
cors = CORS(app, resources={
            r"/process_image": {"origins": "http://localhost:3000"}})

# Load the pre-trained YOLOv5 model and class names
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
classes = model.names


@app.route('/process_image', methods=['POST'])
def process_image_route():
    try:
        # Receive the uploaded image from the React application
        image_file = request.files['image']
        # Convert the image to a format readable by OpenCV
        file_bytes = np.frombuffer(image_file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # Perform object detection using YOLOv5
        results = model(img)

        # Extract bounding boxes and class names from results
        detected_objects = classes
        bounding_boxes = results.xyxy[0].cpu().numpy().tolist()

        # Draw bounding boxes on the image
        for box in bounding_boxes:
            x1, y1, x2, y2, conf, class_id = box
            cv2.rectangle(img, (int(x1), int(y1)),
                          (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(img, detected_objects[int(class_id)], (int(x1), int(
                y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Print the number of detected objects
        num_objects = len(bounding_boxes)
        print(f"Number of detected objects: {num_objects}")

        # Encode the processed image as JPEG with higher quality
        _, encoded_img = cv2.imencode(
            '.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), 90])

        # Create a BytesIO object and write the encoded image data
        output_image_bytes = BytesIO()
        output_image_bytes.write(encoded_img)
        output_image_bytes.seek(0)

        # Create a response object with the processed image and headers
        response = make_response(
            send_file(output_image_bytes, mimetype='image/jpeg'))

        # Add the number of detected objects to response headers
        response.headers['X-Num-Detected-Objects'] = str(num_objects)

        # Return the processed image file
        return response

    except Exception as e:
        print(f"Error processing image: {e}")
        traceback.print_exc()
        return {'error': str(e)}, 500


if __name__ == '__main__':
    app.run(debug=True)
