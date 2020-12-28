db.air_routes.aggregate([
    {
        $match: {
            src_airport: { $in: ["LHR", "JFK"] },
            dst_airport: { $in: ["LHR", "JFK"] }
        }
    },
    {
        $lookup: {
            from: "air_alliances",
            foreignField: "airlines",
            localField: "airline.name",
            as: "alliance"
        }
    },
    {
        $match: { alliance: { $ne: [] } }
    },
    {
        $addFields: {
            alliance: { $arrayElemAt: ["$alliance.name", 0] }
        }
    },
    {
        $group: {
            _id: "$airline.id",
            alliance: { $first: "$alliance" }
        }
    },
    {
        $sortByCount: "$alliance"
    }
])