import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def getCurrentTime():
    return {'time': time.time()}