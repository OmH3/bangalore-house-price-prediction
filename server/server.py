from flask import Flask, request, jsonify
import util
from flask_cors import CORS
app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "https://bhp-ksql0ciaf-om-harshs-projects.vercel.app/"}})

@app.route('/')
def home():
    return "Welcome to Bangalore House Price Prediction API"

@app.route('/api/get-locations', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations' : util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response)
    return response

@app.route('/api/predict-price',methods=['POST'])
def predict_home_price():
    data = request.json
    total_sqft = float(data['total_sqft'])
    location = data['location']
    bhk = int(data['bhk'])
    bath = int(data['bath'])


    response = jsonify({
        'estimated_price' : util.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response)
    return response

if __name__ == '__main__':
    util.load_saved_artifacts()
    app.run(debug=True,host="0.0.0.0", port=5000)