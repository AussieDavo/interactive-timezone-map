import time
from pathlib import Path

from flask import Flask
from config import config

def create_app(config_name='development'):
    """Application factory"""
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    static_root = Path(app.static_folder)

    @app.context_processor
    def inject_asset_version():
        def asset_version(filename):
            try:
                return int((static_root / filename).stat().st_mtime)
            except OSError:
                return int(time.time())

        return {'asset_version': asset_version}
    
    # Register blueprints
    from app.routes import main_bp
    app.register_blueprint(main_bp)
    
    return app
