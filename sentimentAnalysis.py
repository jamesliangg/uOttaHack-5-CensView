import cohere
import requests
from dumby import token

co = cohere.Client(token)

from cohere.classify import Example

def sentimental(websiteUrl, websiteService):
    review_data = requests.get(url="http://127.0.0.1:3000/?siteurl=" + websiteUrl)
    data = (review_data.text).split('","')

    
    negative = []
    positive = []
    neutral = []

    examples=[
      Example("The order came 5 days early", "positive"),
      Example("The item exceeded my expectations", "positive"),
      Example("I ordered more for my friends", "positive"),
      Example("I would buy this again", "positive"),
      Example("I would recommend this to others", "positive"),
      Example("Nothing beats this.", "positive"),
      Example("Superb quality", "positive"),
      Example("The order was incorrect", "negative"),
      Example("I want to return my item", "negative"),
      Example("The item\'s material feels low quality", "negative"),
      Example("The product was okay", "neutral"),
      Example("I received five items in total", "neutral"),
      Example("I bought it from the website", "neutral"),
      Example("I used the product this morning", "neutral"),
      Example("The product arrived yesterday", "neutral")
      ]

    for i in range(0,len(data)):
        review = data[i]
        review = [review]


        response = co.classify(model='large', inputs=review, examples=examples,)

        if response.classifications[0].prediction == 'negative':
            negative.append(review)
        elif response.classifications[0].prediction == 'positive':
            positive.append(review)
        else:
            neutral.append(review)

    print(negative, positive, neutral)
    print(len(negative), len(positive), len(neutral))

    values = [len(negative), len(positive), len(neutral)]

    return_values = []

    return values