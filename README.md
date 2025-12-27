# Movie Recommendation System


![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)
![Pandas](https://img.shields.io/badge/Pandas-1.0+-orange.svg)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-0.24+-red.svg)
![OpenPyXL](https://img.shields.io/badge/OpenPyXL-3.0+-green.svg)

![Algorithm Visualizer Demo](./public/algvis.png)

A sophisticated movie recommendation system built with Python that provides personalized movie suggestions based on content-based filtering using TF-IDF and cosine similarity.

Features

- Weighted Rating System: Implements IMDB's weighted rating formula for accurate movie scoring
- Content-Based Filtering: Uses TF-IDF vectorization and cosine similarity for recommendations
- Genre Matching: Analyzes movie genres to find similar films
- Top Movies Ranking: Displays top-rated movies based on vote counts and averages

Tech Stack

- language Python 3.9
- Data Processing: Pandas
- Machine Learning: Scikit-learn (cosine similarity, TF-IDF)
- Data Handling: OpenPyXL (for Excel operations in tests)
- Dataset: Movie metadata CSV (movies_metadata.csv)

Prerequisites

- Python 3.7+
- Required packages: pandas, scikit-learn, openpyxl

installation

1. Clone the repository:
   git clone https://github.com/dshak1/movie-recommendation-system.git
   cd movie-recommendation-system

2. Install dependencies:
   pip install pandas scikit-learn openpyxl

3. Ensure you have the movie dataset (`movies_metadata.csv`) in the project directory.

Usage

Run the main recommendation system:
python RecSystem.py

This will:
- Load and process movie metadata
- Calculate weighted ratings for movies
- Display top 20 movies based on the scoring system
- Prepare for content-based recommendations (TF-IDF and cosine similarity)

