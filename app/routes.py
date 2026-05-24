from flask import Blueprint, render_template, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """Home page"""
    return render_template('index.html', title='Interactive Timezone Map')

@main_bp.route('/api/status')
def api_status():
    """API status endpoint"""
    return jsonify({'status': 'ok', 'message': 'API is running'})
