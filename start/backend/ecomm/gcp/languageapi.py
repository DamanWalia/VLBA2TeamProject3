from google.cloud import language

# END TODO

# TODO: Import enums and types

from google.cloud.language import enums
from google.cloud.language import types

# END TODO


# TODO: Create the Language API client

lang_client = language.LanguageServiceClient()

# END TODO

"""
Returns sentiment analysis score
- create document from passed text
- do sentiment analysis using natural language applicable
- return the sentiment score
"""
def analyze(text):

    # TODO: Create a Document object

    doc = types.Document(content=text, type=enums.Document.Type.PLAIN_TEXT)

    # END TODO

    # TODO: Analyze the sentiment

    sentiment = lang_client.analyze_sentiment(document=doc).document_sentiment

    # END TODO


    # TODO: Return the sentiment score

    return sentiment.score