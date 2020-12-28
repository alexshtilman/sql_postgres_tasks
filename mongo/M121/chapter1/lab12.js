/*
How many movies are in both the top ten highest rated movies according to the imdb.rating 
and the metacritic fields? We should get these results with exactly one access to the database.
*/
db.movies.aggregate([
    {
        $match: {
            metacritic: { $gte: 0 },
            "imdb.rating": { $gte: 0 }
        }
    },
    {
        $project: {
            _id: 0,
            metacritic: 1,
            imdb: 1,
            title: 1
        }
    },
    {
        $facet: {
            top_metacritic: [
                {
                    $sort: {
                        metacritic: -1,
                        title: 1
                    }
                },
                {
                    $limit: 10
                },
                {
                    $project: {
                        title: 1
                    }
                }
            ],
            top_imdb: [
                {
                    $sort: {
                        "imdb.rating": -1,
                        title: 1
                    }
                },
                {
                    $limit: 10
                },
                {
                    $project: {
                        title: 1
                    }
                }
            ]
        }
    },
    {
        $project: {
            movies_in_both: {
                $setIntersection: ["$top_metacritic", "$top_imdb"]
            }
        }
    }
])