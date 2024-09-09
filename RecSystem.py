import pandas as pd
# import zipfile
# with zipfile.ZipFile('ml-latest-small.zip', 'r') as zip_ref:
#     zip_ref.extractall('data')
from sklearn.metrics.pairwise import cosine_similarity

# class user:
#     # User inputted movies they like which we can use to find something similar
#     moviePicks = ["Matrix", "Superbad", "Avengers"]
    
#     #create a specific playlist of movies similar to what they previously liked
#     recommendationShortlist = []
# # print(user.moviePicks[2])

metadata = pd.read_csv('movies_metadata.csv', low_memory = False)

C = metadata['vote_average'].mean()

m = metadata['vote_count'].quantile(.9)

q_movies = metadata.copy().loc[metadata['vote_count'] >= m]

q_movies.shape
metadata.shape



# Function that computes the weighted rating of each movie
# where c is the average and m is the minimum num of votes to be considered
def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    # Calculation based on the IMDB formula
    return (v/(v+m) * R) + (m/(m+v) * C)

# Define a new feature 'score' and calculate its value with `weighted_rating()`
q_movies['score'] = q_movies.apply(weighted_rating, axis=1)

q_movies = q_movies.sort_values('score', ascending=False)


# Create a simple user-item matrix
data = {'User1': [4, 0, 3, 5],
        'User2': [5, 5, 4, 0],
        'User3': [0, 4, 0, 3],
        'User4': [3, 0, 0, 2]}

df = pd.DataFrame(data, index=['Item1', 'Item2', 'Item3', 'Item4'])

# Transpose the matrix so that items are in the columns and users are in the rows
df_T = df.T
# Compute the cosine similarity
cosine_sim = cosine_similarity(df_T)
cosine_sim_df = pd.DataFrame(cosine_sim, index=df_T.columns, columns=df_T.columns)
print(cosine_sim_df)












class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        n = 1
        i = 0
        for num in nums:
            if nums[i] + nums[n] == target:
                return i, n
            
            else:
                n+=1
                
            i+=1