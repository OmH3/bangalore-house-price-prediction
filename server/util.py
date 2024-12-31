import json, pickle
import numpy as np
_model = None
_location= None
_columns = None

def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index = _columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(_columns))
    x[0]=sqft
    x[1] = bath
    x[2] = bhk
    if loc_index>=0:
        x[loc_index] = 1
    
    return round(_model.predict([x])[0],2)


def get_location_names():
    return _location


def load_saved_artifacts():
    global _model
    global _location
    global _columns
    print('loading saved artifacts...')
    with open('./artifacts/columns (1).json','r') as f:
        _columns = json.load(f)['data_columns']
        _location = _columns[3:]
    with open('./artifacts/banglore_home_prices_model (1).pickle','rb') as f:
        _model = pickle.load(f)
    print('saved artifacts loaded successfully...')
if __name__ == "__main__":
    load_saved_artifacts()
    # print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar',1000, 3, 3))
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print(get_estimated_price('Kalhalli', 1000, 2, 2)) # other location
    print(get_estimated_price('Ejipura', 1000, 2, 2))  # other location
