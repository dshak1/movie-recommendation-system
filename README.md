# 🎬 Movie Recommendation System


A sophisticated movie recommendation system built with Python that provides personalized movie suggestions based on content-based filtering using TF-IDF and cosine similarity.

## 🚀 Features

- **Weighted Rating System**: Implements IMDB's weighted rating formula for accurate movie scoring
- **Content-Based Filtering**: Uses TF-IDF vectorization and cosine similarity for recommendations
- **Genre Matching**: Analyzes movie genres to find similar films
- **Top Movies Ranking**: Displays top-rated movies based on vote counts and averages

## 🛠️ Tech Stack

- **Language**: Python 3.x
- **Data Processing**: Pandas
- **Machine Learning**: Scikit-learn (cosine similarity, TF-IDF)
- **Data Handling**: OpenPyXL (for Excel operations in tests)
- **Dataset**: Movie metadata CSV (movies_metadata.csv)

## 📋 Prerequisites

- Python 3.7+
- Required packages: pandas, scikit-learn, openpyxl

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dshak1/movie-recommendation-system.git
   cd movie-recommendation-system
   ```

2. Install dependencies:
   ```bash
   pip install pandas scikit-learn openpyxl
   ```

3. Ensure you have the movie dataset (`movies_metadata.csv`) in the project directory.

## 🎯 Usage

Run the main recommendation system:
```bash
python RecSystem.py
```

This will:
- Load and process movie metadata
- Calculate weighted ratings for movies
- Display top 20 movies based on the scoring system
- Prepare for content-based recommendations (TF-IDF and cosine similarity)

## 📁 Project Structure

- `RecSystem.py` - Main recommendation system implementation
- `hashTableCacheTEST.py` - Test file for caching mechanisms
- `README.md` - Project documentation
- `movie-recommender.zip` - Archived project files

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source. Please check the license file for details.
