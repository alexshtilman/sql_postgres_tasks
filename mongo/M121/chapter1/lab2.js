/*
imdb.rating is at least 7
genres does not contain "Crime" or "Horror"
rated is either "PG" or "G"
languages contains "English" and "Japanese"


Our first movie night was a success. Unfortunately, our ISP called to let us know we're close to our bandwidth quota, but we need another movie recommendation!

Using the same $match stage from the previous lab, add a $project stage to only display the the title and film rating (title and rated fields).
*/


var pipeline = [
    {
        $match: {
            "imdb.rating": { $gte: 7 },
            genres: { $nin: ["Crime", "Horror"] },
            rated: { $in: ["PG", "G"] },
            languages: { $all: ["English", "Japanese"] }
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            rated: 1
        }
    }
];
