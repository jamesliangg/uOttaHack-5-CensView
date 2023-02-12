# uOttaHack-5-CensView
 
## Setting Up
1. Clone repository from GitHub
2. run `npm install` in terminal1
3. run `python3 -m venv venv` in terminal2
4. run `. venv/bin/activate` in terminal2
5. run the following pip installs in terminal2
```
pip install Flask
pip install cohere
```
6. create a file with your Cohere API token called `dumby.py`. The contents of the file should look like below:
```python
token = 'API_TOKEN'
```
7. in terminal2 window run `flask --app app run`
8. in terminal1 window run `node app`
9. Can sent a GET request to flask for array result `http://127.0.0.1:5000?siteurl=https://www.bestbuy.ca/en-ca/product/sonos-arc-sound-bar-black/14597172`