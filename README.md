# Interactive Timezone Map

A Flask-based web application for displaying and interacting with an interactive timezone map.

## Live Demo

https://web.interactive-timezone-map.workers.dev/

## App Preview

![Interactive Timezone Map in action](docs/assets/drop_pins.gif)

### Features
- Drop pins on map to track timezones
- Easily copy timestamps from from dropped pins (local and UTC times)
- Search for locations and drop pins from results
- Go backwards, forwards or pause time by dragging the selector or by choosing from a datetime picker.
  - All dropped pins follow the selected date and time accordingly
  - Easily return to current time
- Zoom and pan
- Dropped pins and selector timezone persist browser sessions using cookies
- Hide and show top bar
- Show selected timezones in a list
  - Drag and drip list items to reorder
  - Copy all slected timezones to clipboard
  - Quickly and easily remove all pins
- Automatically adjusts to cater for daylight savings in all timezones
- Switch between Modern and Classic themes

## Setup

### Prerequisites
- Python 3.9+
- pip or poetry

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AussieDavo/interactive-timezone-map.git
   cd interactive-timezone-map
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create environment file**
   ```bash
   cp .env.example .env
   ```

### Running the Application

```bash
python run.py
```

The application will be available at `http://localhost:5000`

## Project Structure

```
interactive_Timezone_Map/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── routes.py            # Route handlers
│   ├── templates/           # HTML templates
│   │   ├── base.html        # Base template
│   │   └── index.html       # Home page
│   └── static/              # Static files
│       ├── css/
│       │   └── style.css    # Stylesheet
│       └── js/
│           └── main.js      # JavaScript
├── tests/                   # Test files
├── config.py                # Configuration
├── run.py                   # Application entry point
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Configuration

Environment variables can be set in `.env` file:
- `FLASK_ENV`: Set to `development` or `production`
- `FLASK_APP`: Set to `run.py`

## Development

### Running tests
```bash
pytest tests/
```

## License

MIT License
