import flask
from flask import render_template, Flask, request
import sentimentAnalysis

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    args = request.args.get('siteurl')
    print(args)
    values = sentimentAnalysis.sentimental(args)
    resp = flask.Response(str(values))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)