from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__, static_folder='public/static', template_folder='public/templates')

DATA_FILE = 'public/data/ratings.json'  # Use correct path to ratings.json

# Route: Home Page
@app.route('/')
def index():
    return render_template('index.html')

# Route: Get All Ratings
@app.route('/api/ratings', methods=['GET'])
def get_ratings():
    if not os.path.exists(DATA_FILE):
        return jsonify([])

    with open(DATA_FILE, 'r') as f:
        data = json.load(f)
    return jsonify(data)

# Route: Add a New Rating
@app.route('/api/ratings', methods=['POST'])
def add_rating():
    new_rating = request.get_json()

    # Load existing data
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
    else:
        data = []

    # Add new rating and save
    data.append(new_rating)
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

    return jsonify({"message": "Rating added successfully"}), 201

import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
