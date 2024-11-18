import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
# import zipfile
# with zipfile.ZipFile('ml-latest-small.zip', 'r') as zip_ref:
#     zip_ref.extractall('data')

# class user:
#     # User inputted movies they like which we can use to find something similar
#     moviePicks = ["Matrix", "Superbad", "Avengers"]
    
#     #create a specific playlist of movies similar to what they previously liked
#     recommendationShortlist = []
# # print(user.moviePicks[2])

# Load Movies Metadata. Use low_memory false 
# since we have small dataset and data inference could be wrong
metadata = pd.read_csv('movies_metadata.csv', low_memory = False)

#find average vote count
vote_average = metadata['vote_average'].mean()

#find the top 10% vote count number 
m = metadata['vote_count'].quantile(.9)

# create a new filtered dataset with vote count over 160.0
top_movies = metadata.copy().loc[metadata['vote_count'] >= m]


# Function that computes the weighted rating of each movie
def weighted_rating(x, m=m, vote_average=vote_average):
    v = x['vote_count'] #popularity metric
    R = x['vote_average'] #rating of a movie
    # Calculation based on the IMDB formula
    return (v/(v+m) * R) + (m/(m+v) * vote_average)

# Define a new feature 'score' and calculate its value with `weighted_rating()`
top_movies['score'] = top_movies.apply(weighted_rating, axis=1) #axis = 1 specifies to appply on the column

top_movies = top_movies.sort_values('score', ascending=False)
#ascending false ensures it goes from best to worst if u go from top to bottom

#top 15 movies based on weigthed rating system
print(top_movies[['title', 'vote_count', 'vote_average', 'score']].head(20))

############### MOVIES NOW RATED ON COMMON SCALE AND SORTED IN DESCENDING ORDER #########################################

'''
SO far we have a weighted rating system with the movies sorted in descending order (best to worst) and that score is like a new column

Next Steps:
Ensure language is compatible with user? or ignore for now and assume theyre ok w subtitles


Find similar movies to that which the user inputted and make a subset of them
How? 
- BoW model comparing the frequency of related words in keywords/overview column 
- Within the new subset sort the movies based how many genre tags they have in common from most to least
 or something like: from the movies with more than x genre tags in common to the input select the 5 highest rated ones

- to convert to the new model i will create a new column/row to append like we did with the new weighted score
   to the new subset with  .apply which can take weighted rating as a parameter 
   *still figuring out syntax for that and need ot make sure i fully get what ali meant

- the TF-IDF is: Term Frequency-Inverse Document Frequency which sounds to me like BoW
if so i will use library to import a module which can help

- for cosine similarity we should know what we are comparing:
 genres in common,
 keywords in common, bow
 overview similarity (bow)
 actors/directors,
 i thibnk all can be done wuth tf-idf. Chatgpt also said using tf-idf is the best way to convert genres into numbers



'''

#                  Genres          Lang.           keywords? 
#users = {'User1': [[10,2,5,....], [45,5,0,0,0...], [39,8,9,2,5, 7,11,...]]}



# create this new dataframe by appending our binary genre checker format      using .apply() to create a new column just like the weigthed rating 
          #             genres         language       keywords       metadata
#new_subset = top_movies[[1,0,1,0,0,1], [1,0,0,0...] , [1,2,3.,0,0], ['title', 'vote_count', 'vote_average', 'score],]




#distance of genres: ai = (100000 - number of genre for user)  e.g. action:26 representing 26 action movies inputted
# bi = number of genre for the movie ( 0 or 1)  -> cosine similarity





















# # Create a simple user-item matrix
# data = {'User1': [4, 0, 3, 5],
#         'User2': [5, 5, 4, 0],
#         'User3': [0, 4, 0, 3],
#         'User4': [3, 0, 0, 2]}

# df = pd.DataFrame(data, index=['Item1', 'Item2', 'Item3', 'Item4'])

# # Transpose the matrix so that items are in the columns and users are in the rows
# df_T = df.T
# # Compute the cosine similarity
# cosine_sim = cosine_similarity(df_T)
# cosine_sim_df = pd.DataFrame(cosine_sim, index=df_T.columns, columns=df_T.columns)
# print(cosine_sim_df)


# Using Van Diagrams for finding movies in common

def movieGenres(data, genre):
    genres = data['genres'].apply(lambda x: ast.literal_eval(x))
    movies=[]
   # i = 0
    for movie , genre_list in zip(data['title'],genres):
        if any(g['name'] == genre for g in genre_list):
            movies += [movie]
    return movies

def similarGenres(data1, data2): #find movies found in lists data1 and data2
    data = data1
    if len(data1) > len(data2):
        data = data2
    final = []
    for movie in data:
        flag = 0
        if movie in data1 and movie in data2:
            flag = 1
        if flag == 1:
            final += [movie]

    # for movie in data:
    #     flag = 0
    #     if movie in data1 and movie in data2:
    #         final += [movie]

    return final

data1 = movieGenres(metadata,'Action') # returns a list "movies" with action as one of the genres
data2 = movieGenres(metadata,'Comedy') # returns a list "movies" with comedy as one of the genres


data3 = movieGenres(metadata, 'Drama') # returns a list "movies" with drama as one of the genres
data4 = movieGenres(metadata,'Romance') # returns a list "movies" with romance as one of the genres

data5 = similarGenres(data1, data2)

data6 = similarGenres(data3, data4)

data7 = similarGenres(data5, data6)

print(data7)



# SURPRISE ME! (using thumbsed up movies)
# step -1
# complete this
liked_movies = ["The Matrix", "Inception", "The Dark Knight"]
def surpriseMe(likedMovies[]):
    # Take user's previously liked movies and use genre info to give
    # something similar but less obvious. 
    """iterate through the last 20 liked movies and add scores for each genre
    (+1 for every genre tag)
    """
    genres = {
        "Action": 0,
        "Comedy": 0,
        "Drama": 0,
        "Horror": 0,
        "Romance": 0,
        "Sci-Fi": 0,
        "Fantasy": 0,
        "Thriller": 0,
        "Documentary": 0,
        "Animation": 0
    }

    # if certain actor/genre/director shows up more than x,y,z times,
    # add related movies from the top 10% rated pile
    # humans go through phases rather than perfectly interleaving
    # their genre picks so give priority to recently watched
    # ensure movie is not in liked movies to not give duplicates
    #diversification function



    #topxgenre function get the x most watched genres out of last y movies

    for movie in liked_movies[-20:]: #assuming the liked movies are in oldest to newest
        
        # Iterate through the last 20 liked movies (assuming oldest to newest)
        for movie in likedMovies[-20:]:
            # Check each genre tag in the movie
            for genre in movie['genres']:
                # Skip if user already liked this movie


                if movie in liked_movies:
                    continue
                if genre in genres:  # Increment the score if the genre is valid
                    genres[genre] += 1
        
        # for the 3 most watched genres out of 20 
        recommendation = get_movie_genres(movie)
        
      
            
        # Stop once we have enough recommendations
        if len(recommendations) >= num_recommendations:
            break
    
    return recommendations



   
     # Each user has a dictionary of genre scores based on their last 20 watched movies
    # dictionary score for all liked movies
    # each user has a last of all liked movies

    # 10 surprise recommendations
    # top 3 genres from last 20 liked
    # 2 intersection of all 3 most watched
    # 2 from non related genres



























### new ####
def similarGenres2(Big_Data):
    start_time = time.time()
    length = len(Big_Data)
    final = []
    minData = Big_Data[0]
    for movie in minData:
        flag = 0
        for genre in Big_Data:
            if movie in genre :
                flag += 1
        if flag == length:
            final += [movie]
    endtime = time.time()
    print(endtime - start_time)
    return final
# similargenres 2 take more time to compile
# # the structure is therebut needs to be better  
data9 = similarGenres2(data8)
if data9 == data7:
   print(1)

lets assume our users data contains moviesand they are organised based of ratings 
def sameGenre(target_movie, data):
    inCommon = 0
    genres = data['genres'].apply(lambda x: ast.literal_eval(x))
    main = target_movie['genres'].apply(lambda x: ast.literal_eval(x))
    for movies, genre in zip(data['movies'],genres):
    return 1
print(sameGenre('hi',top_movies))




