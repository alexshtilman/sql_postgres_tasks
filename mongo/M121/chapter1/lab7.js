/*
For all films that won at least 1 Oscar, calculate the standard deviation, highest, lowest, and average imdb.rating. Use the sample standard deviation expression.

HINT - All movies in the collection that won an Oscar begin with a string resembling one of the following in their awards field
*/


db.movies.aggregate([
    {
        $match: {
            awards: /Won \d{1,2} Oscars?/,
            "imdb.rating": { $exists: true },
        }
    },
    {
        $group: {
            _id: null,
            highest: { $max: "$imdb.rating" },
            lowest: { $min: "$imdb.rating" },
            avg: { $avg: "$imdb.rating" },
            stdDev: { $stdDevSamp: "$imdb.rating" }
        }
    }
])
