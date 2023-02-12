import flask
from flask import Flask, request

import sentimentAnalysis

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    websiteUrl = request.args.get('siteurl')
    websiteService = request.args.get('website')
    print(websiteUrl)
    print(websiteService)
    values = sentimentAnalysis.sentimental(websiteUrl, websiteService)
    resp = flask.Response(str(values))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)