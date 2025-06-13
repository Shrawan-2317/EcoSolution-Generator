from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_solutions', methods=['POST'])
def get_solutions():
    waste_material = request.json.get("wasteMaterial").lower()
    with open('solutions.json') as f:
        solutions_data = json.load(f)
    
    solutions = solutions_data.get(waste_material, None)
    
    if solutions:
        return jsonify({"status": "success", "solutions": solutions})
    else:
        return jsonify({"status": "error", "message": "No solutions found for the entered material."})

if __name__ == '__main__':
    app.run(debug=True)
