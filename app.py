from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load both the model AND the scaler
model = pickle.load(open('model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Extract data in the exact order your dataframe had it: [cgpa, iq]
    cgpa = float(data['cgpa'])
    iq = float(data['iq'])
    
    # Format and scale the input features
    input_features = np.array([[cgpa, iq]]) 
    scaled_features = scaler.transform(input_features)
    
    # Make the prediction
    prediction = model.predict(scaled_features)[0]
    
    return jsonify({'prediction': int(prediction)})

if __name__ == '__main__':
    app.run(debug=True)