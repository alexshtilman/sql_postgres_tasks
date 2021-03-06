/*
Let's use our increasing knowledge of the Aggregation Framework to explore our movies collection in more detail.
We'd like to calculate how many movies every cast member has been in and get an average imdb.rating for each cast member.
What is the name, number of movies, and average rating (truncated to one decimal) 
for the cast member that has been in the most number of movies with English as an available language?

Provide the input in the following order and format
{ "_id": "First Last", "numFilms": 1, "average": 1.1 }
*/


db.movies.aggregate([
    {
        $match: {
            languages: { $in: ["English"] },
            cast: { $elemMatch: { $exists: true } },
        }
    },
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: "$cast",
            numFilms: { $sum: 1 },
            avg: { $avg: "$imdb.rating" }
        }
    },
    {
        $project: {
            _id: 1,
            numFilms: 1,
            avge: { $trunc: ["$avg", 1] }
        }
    }
    ,
    {
        $sort: {
            numFilms: -1
        }
    }
])
