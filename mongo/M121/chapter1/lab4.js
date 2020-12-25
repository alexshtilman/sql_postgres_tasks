/*
Our movies dataset has a lot of different documents, some with more convoluted titles than others. 
If we'd like to analyze our collection to find movie titles that are composed of only one word, 
we could fetch all the movies in the dataset and do some processing in a client application, 
but the Aggregation Framework allows us to do this on the server!

Using the Aggregation Framework, find a count of the number of movies that have a title composed of one word. To clarify, "Cinderella" and "3-25" should count, where as "Cast Away" would not.

Make sure you look into the $split String expression and the $size Array expression

To get the count, you can append itcount() to the end of your pipeline*/

db.movies.aggregate([
    {
        $match: {
            writers: { $elemMatch: { $exists: true } },
            directors: { $elemMatch: { $exists: true } },
            cast: { $elemMatch: { $exists: true } },
        }
    },
    {
        $project: {
            _id: 0,
            cast: 1,
            directors: 1,
            writers: {
                $map: {
                    input: "$writers",
                    as: "writer",
                    in: {
                        $arrayElemAt: [
                            {
                                $split: ["$$writer", " ("]
                            },
                            0
                        ]
                    }
                }
            }
        }
    },
    {
        $project:
        {
            cast: 1,
            directors: 1,
            writers: 1,
            commonToBoth: { $size: { $setIntersection: ["$cast", "$directors", "$writers"] } }
        }
    },
    {
        $match: {
            commonToBoth: { $gt: 0 }
        }
    }
]).itcount();
