# AI Services

This branch contains the Artificial Intelligence components used to analyze product reviews. It performs sentiment analysis, topic modelling, and validation of prediction accuracy.

## Features

- Sentiment analysis on customer reviews
- Topic extraction from review text
- Generation of a final processed dataset
- Accuracy validation using rating-based ground truth

## Tech Used

- Python
- Pandas
- Natural Language Processing (NLP)

## Accuracy Validation

Ground truth sentiment is derived from ratings:

- **4–5 → Positive**
- **3 → Neutral**
- **1–2 → Negative**

Predicted sentiment is compared with ground truth to calculate the **overall accuracy percentage**.

