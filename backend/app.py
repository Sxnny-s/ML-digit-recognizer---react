from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from fastai.learner import load_learner


app = Flask(__name__)

CORS(app)

def get_x_fn(row):
    return PILImage.create(np.repeat(row[1:].values.reshape(28, 28, 1), 3, axis=2).astype(np.uint8))

model = load_learner('mnist_cnn.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    
    pixel_vals = request.get_json()
    
    if pixel_vals is None or len(pixel_vals) != 784:
        return jsonify({"error": "invalid"})
    
    input_array = np.array(pixel_vals).reshape(28,28,1).astype(np.uint8)
    
    three_channel_array = np.repeat(input_array,3, axis=2)
    
    prediction = model.predict(three_channel_array)[0]
    
    return jsonify({prediction: int(prediction)})
    


if __name__ == '__main__':
    app.run(debug=True)