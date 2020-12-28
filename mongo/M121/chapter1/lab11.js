db.coll.explain().aggregate([{ $bucket: { groupBy: "$x", boundaries: [0, 50, 100] } }])
