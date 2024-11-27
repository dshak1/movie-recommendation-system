import pandas as pd
from openpyxl import load_workbook




# Load Excel data
df = pd.read_excel("users.xlsx")
user_cache = {}

df.set_index('user_id', inplace=True)

user_id = "user123"

if user_id not in user_cache:
    user_cache[user_id] = {
        "name": "Unknown", 
        "country": "Unknown",
        "topGenres": [],
        "moviesWatched": {
            "Action": 0,
            "Comedy": 0,
            "Drama": 0,
        }
    }

# Access and modify data
user_cache[user_id]["moviesWatched"]["Action"] += 1

# Recalculate top genres
movies = user_cache[user_id]["moviesWatched"]
user_cache[user_id]["topGenres"] = sorted(movies, key=movies.get, reverse=True)[:3]


# Populate hash table
for _, row in df.iterrows():
    user_cache[row['user_id']] = {
        "name": row["Name"],
        "country": row["Country"],
        "topGenres": row["Top Genres"].split(", "),
        "moviesWatched": {
            "Action": row["Action"],
            "Comedy": row["Comedy"],
            "Drama": row["Drama"],
        }
    }

user_id = "user123"
if user_id in user_cache:
    user_info = user_cache[user_id]
    print(f"{user_info['name']} has watched {user_info['moviesWatched']['Action']} Action movies.")


# Update cache
user_cache["user123"]["moviesWatched"]["Action"] += 1

# Recalculate top genres
movies = user_cache["user123"]["moviesWatched"]
user_cache["user123"]["topGenres"] = sorted(movies, key=movies.get, reverse=True)[:3]


# Convert hash table back to DataFrame
for user_id, user_info in user_cache.items():
    if user_id in df.index:  # Check if user exists in DataFrame
        df.at[user_id, "Top Genres"] = ", ".join(user_info["topGenres"])
        for genre, count in user_info["moviesWatched"].items():
            df.at[user_id, genre] = count

# Reset index before saving to Excel
df.reset_index(inplace=True)

# Save to Excel
df.to_excel("users.xlsx", index=False)